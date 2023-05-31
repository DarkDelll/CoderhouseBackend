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
        let cart = await cartsModel.findOne(
            {
                _id : cid
            }   
        )
        let indice = cart.products.findIndex((p)=>p.product._id == pid)
        let objeto = cart.products[indice]

        if(indice>=0){
            objeto.quantity++
            cart.products[indice] = objeto
            let res = await cartsModel.updateOne(cart)
            return {success: "añadido correctamente"}
        }else{
            cart.products.push({product: pid})
            let result = await cartsModel.updateOne(cart)
            return {success: "añadido correctamente"}
        }
        
    }
    async deleteProducts(cid,pid){
        let cart = await cartsModel.findOne(
            {
                _id : cid
            }
            
        )
         let carritoActual = cart.products
         let indice = carritoActual.findIndex((p)=>p.product._id == pid)
         let result = await cartsModel.findOneAndUpdate(
            {
                _id : cid
            },
            {
                $pull: {
                    products: {_id: carritoActual[indice]._id},
                }
            }
         )
            return {success: "eliminado correctamente"}
    }
    async updateProducts(cid,body){
        body.forEach(async (product,i)=>{
        let result = await cartsModel.findOneAndUpdate(
            {
                _id : cid
            },
            {
                $push: {
                    products: {product: body[i]._id},
                }
            }
         )})
        return {success: "carrito actualizado"}
    }
    async updateQuantity(cid,pid,qty){
        let cart = await cartsModel.findOne(
            {
                _id : cid
            }   
        )
        let indice = cart.products.findIndex((p)=>p.product._id == pid)
        let objeto = cart.products[indice]
        let result = await cartsModel.findOneAndUpdate(
            {"products._id" : objeto._id },
            {$set: {'products.$.quantity': qty}},
            {new:true}
        )
        return {success: "cantidad modificada correctamente"}

    }
    async emptyCart(cid){
        let result = await cartsModel.findOneAndUpdate(
            { _id: cid},
            {$set: {"products": []}},
            {new:true}
        )
        return {success: "carrito vaciado"}
    }


}

export default CartManager