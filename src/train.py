import logging
import sys

from llama_index import GPTVectorStoreIndex, SimpleDirectoryReader

logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)
logging.getLogger().addHandler(logging.StreamHandler(stream=sys.stdout))

documents = SimpleDirectoryReader('essays').load_data()
index = GPTVectorStoreIndex.from_documents(documents)
index.storage_context.persist()

print("Index built and persisted to storage directory")