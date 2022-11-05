const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['src/api/routes/index.ts']

swaggerAutogen(outputFile, endpointsFiles)