const swaggerJSDoc = require('swagger-jsdoc');

// Swagger configuration options
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Your API Title',
      description: 'Your API Description',
      version: '1.0.0',
    },
  },
  // API files path
  apis: ['./app.js'], // Update the path according to your project structure
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;
