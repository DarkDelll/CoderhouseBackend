const productManager = require('./ProductManager');

const FILENAME = './products.json'

const Manager1 = new productManager(FILENAME)

const executeApp = async () => {
  try {
    
  } catch (error) {
    console.log(error);
  }
}
executeApp()