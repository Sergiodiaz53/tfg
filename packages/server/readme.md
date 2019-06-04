### Generate client api

#### Install swagger-codegen

`npm install -g @openapitools/openapi-generator-cli`

#### Create client library from openapi specification
`openapi-generator generate -i http://localhost:8000/swagger.yaml -g typescript-angular -o ./client/src/app/api -c swagger-config.json`