import {ProductManager} from './src/ProductManager.js'

const FILENAME = './src/products.json'

const Manager1 = new ProductManager(FILENAME)

const executeApp = async () => {
  try {
    Manager1.getProducts()
    
  } catch (error) {
    console.log(error);
  }
}
executeApp()
export {Manager1}