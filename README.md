# Star Wars Characters API

This repository contains code for a serverless API that retrieves and stores Star Wars character data using AWS services.

## Endpoints

### Get All Characters

Endpoint: `GET - https://h805fpa86l.execute-api.us-east-1.amazonaws.com/dev/api/personajes`

This endpoint retrieves a list of Star Wars characters from the SWAPI (Star Wars API) and translates their attributes before sending the response.

### Save Character

Endpoint: `POST - https://h805fpa86l.execute-api.us-east-1.amazonaws.com/dev/api/personajes`

This endpoint allows you to save a Star Wars character's data to a DynamoDB table. The data is processed and stored for future retrieval.

### Get Stored Characters

Endpoint: `GET - https://h805fpa86l.execute-api.us-east-1.amazonaws.com/dev/api/personajes-almacenados`

This endpoint retrieves a list of Star Wars characters that have been stored in the DynamoDB table using the "Save Character" endpoint.

## Setup

1. Clone this repository.

2. Install the necessary dependencies using:

   ```sh
   npm install
3. Configure your AWS credentials using one of the following methods:
Using AWS CLI: Run the following command and provide your AWS access key, secret key, default region, and output format:

   ```sh
   npm install

2. Deploy the serverless application using:
   ```sh
   npm run deploy

## Technologies Used

- Serverless Framework
- AWS Lambda
- AWS API Gateway
- AWS DynamoDB
- AWS SDK for JavaScript
- Express.js
- Axios
- TypeScript
- Jest (for testing)



