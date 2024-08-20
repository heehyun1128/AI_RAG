from dotenv import load_dotenv

import os
import asyncio

import openai 
import json
from pinecone import Pinecone

load_dotenv()

# chunking
async def chunk_and_embed_document():
    try:
        data=json.load(open("reviews.json"))
        print(data)
        processed_data=[]
        
        for review in data["reviews"]:
            res=openai.embeddings.create( 
                                         input=review['review'],
                                         model="text-embedding-ada-002"
                )
            embedding=res.data[0].embedding
            processed_data.append({
                "values":embedding,
                "id":review["professor"],
                "metadata": {
                    "review": review["review"],
                    "subject": review["subject"],
                    "stars": review["stars"]}
                })

        print(processed_data[0])
        
        pc = Pinecone(api_key=os.environ.get("PINECONE_API_KEY"))
        index = pc.Index("rate-my-professor")
        
        index.upsert(
            vectors=processed_data,
            namespace="ns2"
        )
       
     
        
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    asyncio.run(chunk_and_embed_document())


