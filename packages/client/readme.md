### How to start

#### Required

Node (12.13.1)
npm (6.13.7)

#### Install packages

`npm i`

#### Start development server

`npm start`

This command create a development server at `localhost:4200` and use `src/enviroments/environment.ts` to get api url.

#### Create production dist

`npm run build -- --prod`

This command create a producction dist (uglify, threeshakin, etc) and use `src/environments/environment.prod.ts` to get api url.

### Generate client api

JVM required

Next command create `src/app/api/` with all models and services nedeed to access to REST api.

Needs server running

#### Install swagger-codegen

`npm install -g @openapitools/openapi-generator-cli`

#### Create client library from openapi specification
`openapi-generator generate -i http://localhost:8000/swagger.yaml -g typescript-angular -o ./src/app/api -c openapi-options.json`
