import {ProductManager} from './src/services/ProductManager.js'
import CartManager from './src/services/CartManager.js'

const FILENAME_PRODUCTS = './files/products.json'
const FILENAME_CART = './files/carts.json'

const Manager1 = new ProductManager(FILENAME_PRODUCTS)
const cartmanager = new CartManager(FILENAME_CART)

const executeApp = async () => {
  try {
    
  } catch (error) {
    console.log(error);
  }
}


executeApp()
export {Manager1, cartmanager}