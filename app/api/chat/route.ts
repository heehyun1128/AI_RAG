import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

const systemPrompt = `You are an intelligent assistant designed to help students find the best professors based on their queries. Your role involves using Retrieval-Augmented Generation (RAG) to provide precise and relevant recommendations. 

**Objective:**
Your task is to understand student queries about professors and provide a list of the top 3 professors that match their criteria. You should retrieve relevant data about professors from a database and generate responses that include:

1. **Professor Names:** The names of the top 3 professors who best fit the student’s query.
2. **Subject Expertise:** The subjects or courses these professors are known for.
3. **Ratings/Reviews:** Summarize the key ratings or reviews that highlight the strengths of these professors.

**Instructions:**

1. **Retrieve Information:**
   - Use the student’s query to search the professor database.
   - Retrieve relevant information about professors, including their names, subjects, and ratings.

2. **Generate Recommendations:**
   - Based on the retrieved information, generate a response that lists the top 3 professors.
   - Include details about each professor’s expertise and any noteworthy ratings or reviews.
   - Make sure the response is concise and informative.

3. **Format the Response:**
   - Start with a brief summary that acknowledges the query.
   - List the top 3 professors with a short description for each, including their subject expertise and ratings.
   - Ensure that the information is clear and easy to understand.

**Example Response Format:**

`;

export async function POST(req: Request) {
  const data = await req.json();

  const key = process.env.PINECONE_API_KEY;
  if (!key) {
    throw new Error("No api key");
  }
  const pc = new Pinecone({
    apiKey: key,
  });

  const index = pc.index("rate-my-professor").namespace("ns2");
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const text = data[data.length - 1].content;
  const embedding = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  });

  const results = await index.query({
    topK: 3,
    includeMetadata: true,
    vector: embedding.data[0].embedding,
  });

  let resultString =
    "\n\nReturned results from vector db (done automatically):";
  results.matches.forEach((match) => {
    if (!match.metadata) {
      throw new Error("no metadata");
    }
    resultString += `\n
    Professor: ${match.id}
    Review: ${match.metadata.review}
    Subject: ${match.metadata.subject}
    Stars: ${match.metadata.stars}
    \n\n
    `;
  });

  const lastMsg = data[data.length - 1];
  const lastMsgContent = lastMsg.content + resultString;

  const lastDataWithoutLastMessage = data.slice(0, data.length - 1);
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      ...lastDataWithoutLastMessage,
      { role: "user", content: lastMsgContent },
    ],
    model: "gpt-4",
    stream: true,
  });

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      try {
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content;

          if (content) {
            const text = encoder.encode(content);
            controller.enqueue(text);
          }
        }
      } catch (err) {
        controller.error(err);
      } finally {
        controller.close();
      }
    },
  });

  return new NextResponse(stream);
}
