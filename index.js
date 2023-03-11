import {ProductManager} from './src/ProductManager.js'

const FILENAME = './src/products.json'

const Manager1 = new ProductManager(FILENAME)

const executeApp = async () => {
  try {
    
  } catch (error) {
    console.log(error);
  }
}
executeApp()
export {Manager1}