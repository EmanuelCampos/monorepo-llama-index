import logging
import sys

from llama_index.embeddings.openai import OpenAIEmbedding
from llama_index import GPTVectorStoreIndex, SimpleDirectoryReader, ServiceContext

service_context = ServiceContext.from_defaults(embed_model=OpenAIEmbedding(embed_batch_size=50))

logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)
logging.getLogger().addHandler(logging.StreamHandler(stream=sys.stdout))

documents = SimpleDirectoryReader('essays').load_data()
index = GPTVectorStoreIndex.from_documents(documents, service_context=service_context)
index.storage_context.persist()

print("Index built and persisted to storage directory")