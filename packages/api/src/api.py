from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from llama_index import StorageContext, load_index_from_storage, ServiceContext, LLMPredictor
from langchain.llms import OpenAI

# rebuild storage context
storage_context = StorageContext.from_defaults(persist_dir="storage")



app = Flask(__name__)
cors = CORS(app)

@app.route("/", methods=['POST'])
@cross_origin()
def hello_world():
    body = request.get_json()

    service_context = ServiceContext.from_defaults(
        llm_predictor=LLMPredictor(llm=OpenAI(model_name='text-davinci-003', temperature=0, openai_api_key=body['apiKey']))
    )

    global index
    index = load_index_from_storage(storage_context, service_context=service_context)

    query_engine = index.as_query_engine()

    response = query_engine.query(body['question'])
    
    return jsonify({ "answer": response.response })

app.run(host= '0.0.0.0')