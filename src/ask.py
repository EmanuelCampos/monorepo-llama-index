from llama_index import StorageContext, load_index_from_storage

query_param = "5 bullets with core things about do things that don't scale"

# rebuild storage context
storage_context = StorageContext.from_defaults(persist_dir="./storage")

# load index
index = load_index_from_storage(storage_context)

print("Query param:", query_param)
# query
query_engine = index.as_query_engine()
response = query_engine.query(query_param)
print(response)