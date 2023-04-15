import cartsModel from "./models/carts.js";

class CartManager{
    constructor(){
        console.log('Carritos con persistencia de datos en mongoDB')
    }
    async newCart(cart){
        let result = await cartsModel.create(cart)
        return result
    }
    
    async getCart(cid){
        let cart = await cartsModel.findById(cid)
        return cart
    }
    async addProducts(cid, pid){
        let cart = await cartsModel.findOne({_id: cid})
        cart.products.push({product: pid})
        const result = await cartsModel.updateOne(cart)
        return result
    }


}

export default CartManager