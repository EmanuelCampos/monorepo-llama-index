from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from llama_index import StorageContext, load_index_from_storage

# rebuild storage context
storage_context = StorageContext.from_defaults(persist_dir="./storage")

# load index
index = load_index_from_storage(storage_context)

app = Flask(__name__)
cors = CORS(app)

@app.route("/", methods=['POST'])
@cross_origin()
def hello_world():
    body = request.get_json()

    query_engine = index.as_query_engine()
    response = query_engine.query(body['question'])
    
    return jsonify({ "answer": response.response })

app.run(host= '0.0.0.0')