import serverless from 'serverless-http';
import express from 'express';
import bodyParser from 'body-parser';
import AWS from 'aws-sdk';
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import axios from 'axios';
import { v4 as uuid } from 'uuid';

const app = express();
app.use(bodyParser.json({ strict: false }));

// Configure AWS region
AWS.config.update({ region: 'us-east-1' });

// Create DynamoDB service object
const dynamoDB = DynamoDBDocument.from(new DynamoDB());

// Mapping of translated attributes
const translatedAttributes: Record<string, string> = {
  name: 'nombre',
  height: 'altura',
  mass: 'masa',
  hair_color: 'color_cabello',
  skin_color: 'color_piel',
  eye_color: 'color_ojos',
  birth_year: 'año_nacimiento',
  gender: 'género',
  homeworld: 'planeta_natal',
  films: 'películas',
  species: 'especie',
  vehicles: 'vehículos',
  starships: 'naves_espaciales',
  created: 'creado',
  edited: 'editado',
  url: 'url',
};

// Endpoint to get characters from an external API
app.get('/api/personajes', async (_req, res) => {
  try {
    // Fetch data from external API
    const response = await axios.get('https://swapi.dev/api/people/');
    
    // Translate and format character data
    const characters = response.data.results.map((char: any) => {
      const translatedChar: any = {};
      for (const key in char) {
        if (translatedAttributes[key]) {
          translatedChar[translatedAttributes[key]] = char[key];
        } else {
          translatedChar[key] = char[key];
        }
      }
      return translatedChar;
    });
    
    // Send translated characters in response
    res.json(characters);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching characters' });
  }
});

// Endpoint to save a character to DynamoDB
app.post('/api/personajes', async (req, res) => {
  try {
    const characterData = req.body;
    console.log('Character Data:', characterData);

    // Generate a unique ID for the character
    const id = uuid();
    
    // Save the character data to DynamoDB
    await dynamoDB.put({
      TableName: 'Personajes',
      Item: {
        id,
        ...characterData,
      },
    });
    
    // Respond with the saved character data
    res.status(201).json(characterData);
    console.log('Character saved in DynamoDB:', characterData);
  } catch (error) {
    console.error('Error saving to DynamoDB:', error);
    res.status(500).json({ error: 'Error saving the character' });
  }
});

// Endpoint to retrieve stored characters from DynamoDB
app.get('/api/personajes-almacenados', async (_req, res) => {
  try {
    const params = {
      TableName: 'Personajes', 
    };
    const result = await dynamoDB.scan(params);
    
    // Respond with the stored characters
    res.json(result.Items);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching stored characters' });
  }
});

// Export the Express app wrapped in the Serverless handler
export const appHandler = serverless(app);
