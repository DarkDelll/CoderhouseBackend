const productManager = require('./ProductManager');

const FILENAME = './products.json'

const Manager1 = new productManager(FILENAME)

const executeApp = async () => {
  try {
    Manager1.getProductById(1678224994148)
  } catch (error) {
    console.log(error)
  }
}
executeApp()