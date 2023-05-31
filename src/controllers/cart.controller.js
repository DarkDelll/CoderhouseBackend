import CartManager from "../services/dao/Mongo/CartManagerDB.js";

const cartService = new CartManager();

export async function getCartById(req,res){
    const id = req.params.cid
    const carts = await cartService.getCart(id)
    res.send(carts)
}

export async function createCart(req,res){
    const newCart = await cartService.newCart()
    res.send(newCart)
}

export async function addProducts(req,res){
    const cartid = req.params.cid
    const productid = req.params.pid
    let respuesta = await cartService.addProducts(cartid,productid)
    res.send(respuesta)
}

export async function deleteProducts(req,res){
    const cartid = req.params.cid
    const productid = req.params.pid
    let respuesta = await cartService.deleteProducts(cartid,productid)
    res.send(respuesta)
}
export async function updateProducts(req,res){
    const cartid = req.params.cid
    let array = req.body
    let respuesta = await cartService.updateProducts(cartid,array)
    res.send(respuesta)
}
export async function updateQuantity(req,res){
    const cartid = req.params.cid
    const productid = req.params.pid
    const {quantity} = req.body
    let respuesta = await cartService.updateQuantity(cartid,productid,parseInt(quantity))
    res.send(respuesta)
}
export async function emptyCart(req,res){
    const cartid = req.params.cid
    let respuesta = await cartService.emptyCart(cartid)
    res.send(respuesta)
}