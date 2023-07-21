import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
    definition: {
      openapi: '3.0.1',
      info: {
        title: 'Documentacion API e-commerce',
        description:'Documentacion de los distintos endpoints utilizados en la API e-commerce',
      }
    },
    apis:['./src/docs/**/*.yaml']
  }
  const swaggerSpecs = swaggerJSDoc(swaggerOptions)
  export {swaggerSpecs}