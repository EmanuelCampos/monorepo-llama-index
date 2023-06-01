# Monorepo llama Index
![A screenshot of website package](./assets/flow.png)

A fullstack application containing a crawler, API and web page to augment LLMs based on essays an articles.

> ⚠️ Every time that you need to index new web pages, even using `text-ada-002` embedding from OpenAI, essays and articles can be bigger and consume a lot of tokens, be sure to limitate your quota usage on OpenAI to unforeseen events.

> ⚠️ The project is expensive because the texts/websites aren't being pre-processed yet, it's one of the biggest priorities

> ⚠️ For each question/prompt  you will be charged from OpenAI too

## Requirements:
- A Computer
- Python 3.9.12
- Node v16.14.2

## Crawler
Download all essays from a web page based on a config file and store to be used by llama-index.

### How to run
Provide the websites on `config.json` file and after run `yarn crawler` all the anchors links there will be crawled and store on a examples folder.

1. `yarn install`
2. Add the personal site/blog on `config.json` files. (prefer the page that only list essays/articles)
3. run `yarn crawler`

## LLAMA
Index the essays and interact with the LLM through a Flask API

### How to run

> ⚠️ can be expensive depending of the quantity of files

To index all the files and generate a storage of the indexes on disk run
```bash
python ./packages/llama/index.py
```

After this a storage folder will be generated and you will be able to use a Flask API to interact with the LLM using the indexes.

run locally after `pip install`:
```bash
 flask --app ./src/api run --host=0.0.0.0 -p 3000
```

## Web
![A screenshot of website package](./assets/readme-img.png)
Interact with the LLM through your OpenAI api key

run locally after `yarn install`
```
yarn web:dev
```

## Next steps
- [ ] Pre-process texts
- [ ] Improve crawler to not get shit stuff
- [ ] Make web application more generic 
- [ ] Support other types of index