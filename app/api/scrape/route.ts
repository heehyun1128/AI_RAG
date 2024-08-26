import { NextResponse } from "next/server";
import axios from "axios";
import cheerio from "cheerio";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

export async function POST(req: Request) {
  const { url } = await req.json();

  try {
    // Scrape the Rate My Professor page
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Extract relevant information
    const professorName = $('div.NameTitle__Name-sc-19nh5ot-0').text().trim();
    const department = $('div.NameTitle__Title-sc-19nh5ot-1').text().trim();
    const overallRating = $('div.RatingValue__Numerator-qw8sqy-2').text().trim();
    const reviews = $('div.Comments__StyledComments-dzzyvm-0 div.Comments__Comment-dzzyvm-3')
      .map((_, el) => $(el).text().trim())
      .get();

    // Prepare data for Pinecone
    const reviewText = reviews.join(" ");
    const documentText = `Professor: ${professorName}\nDepartment: ${department}\nOverall Rating: ${overallRating}\nReviews: ${reviewText}`;

    // Generate embedding
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const embedding = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: documentText,
    });

    // Insert into Pinecone
    const pineconeApiKey = process.env.PINECONE_API_KEY;
    if (!pineconeApiKey) throw new Error("PINECONE_API_KEY is not set");
    const pc = new Pinecone({ apiKey: pineconeApiKey });
    const index = pc.index("rate-my-professor");
    await index.upsert([
      {
        id: professorName,
        values: embedding.data[0].embedding,
        metadata: {
          name: professorName,
          department: department,
          overallRating: overallRating,
          url: url,
        },
      },
    ]);

    return NextResponse.json({
      message: `Successfully scraped and stored data for ${professorName}`,
    });
  } catch (error) {
    console.error("Error scraping and storing data:", error);
    return NextResponse.json({ error: "Failed to scrape and store data" }, { status: 500 });
  }
}