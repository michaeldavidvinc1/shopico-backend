import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import config from './config';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Shopico',
      version: '1.0.0',
      description: 'MixChell',
    },
    servers: [
      {
        url: config.host, 
        description: 'Generate server url',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  };

const options = {
  swaggerDefinition,
  apis: ['./src/api/router/*.ts'], 
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express): void => {
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get('/swagger.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};
