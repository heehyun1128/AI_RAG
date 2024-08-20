import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain.chains import RetrievalQA
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore
import logging

# Initialize Flask application
app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

# Configure logging
logging.basicConfig(level=logging.INFO)

@app.route('/query', methods=['POST'])
def query():
    logging.info("Received a query request")
    
    data = request.json
    user_prompt = data.get('userPrompt', '')
    logging.info(f"user_prompt: {user_prompt}")
    
    # Initialize LangChain LLM for querying
    llm = ChatOpenAI(
        openai_api_key=os.environ.get("OPENAI_API_KEY"),
        model_name="gpt-3.5-turbo",
        temperature=0.0
    )
    
    # Initialize LangChain Pinecone vector store
    knowledge = PineconeVectorStore.from_existing_index(
        index_name="rate-my-professor",
        namespace="ns2",
        embedding=OpenAIEmbeddings(openai_api_key=os.environ["OPENAI_API_KEY"])
    )
    print("knowledge",knowledge)

    # Initialize LangChain RetrievalQA
    qa = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=knowledge.as_retriever()
    )
    
    # Perform the query
    try:
        result = qa.invoke(user_prompt)
        response = result.get("result")
        logging.info(f"Query result: {response}")
    except Exception as e:
        logging.error(f"An error occurred: {e}")
        response = "An error occurred while processing your request."
    
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
