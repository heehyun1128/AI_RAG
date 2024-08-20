from pinecone.grpc import PineconeGRPC as Pinecone

from pinecone import ServerlessSpec
import os
from dotenv import load_dotenv


load_dotenv()

def create_index():
    pc = Pinecone(api_key=os.environ.get("PINECONE_API_KEY"))

    index_name = "rate-my-professor"

    if index_name not in pc.list_indexes().names():
        pc.create_index(
            name="rate-my-professor",
            dimension=1536, 
            metric="cosine", 
            spec=ServerlessSpec(
                cloud="aws", 
                region="us-east-1"
            ) 
        ) 
    
     
create_index()


    
     
