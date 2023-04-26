import { Router } from "express";
//import CartManager from "../dao/CartManager.js";
import CartManager from "../dao/CartManagerDB.js";

const router = Router()
const cartService = new CartManager()

router.get("/:cid", async (req,res)=>{
    const id = req.params.cid
    const carts = await cartService.getCart(id)
    res.send(carts)
})

router.post("/", async (req,res)=>{
    const newCart = await cartService.newCart()
    res.send(newCart)
})

router.post("/:cid/product/:pid", async(req,res)=>{
    const cartid = req.params.cid
    const productid = req.params.pid
    let respuesta = await cartService.addProducts(cartid,productid)
    res.send(respuesta)

} )

router.delete("/:cid/product/:pid", async(req,res)=>{
    const cartid = req.params.cid
    const productid = req.params.pid
    let respuesta = await cartService.deleteProducts(cartid,productid)
    res.send(respuesta)

})
router.put("/:cid", async(req,res)=>{
    const cartid = req.params.cid
    let array = req.body
    let respuesta = await cartService.updateProducts(cartid,array)
    res.send(respuesta)
})
router.put("/:cid/product/:pid", async(req,res)=>{
    const cartid = req.params.cid
    const productid = req.params.pid
    const {quantity} = req.body
    let respuesta = await cartService.updateQuantity(cartid,productid,parseInt(quantity))
    res.send(respuesta)
})
router.delete("/:cid", async(req,res)=>{
    const cartid = req.params.cid
    let respuesta = await cartService.emptyCart(cartid)
    res.send(respuesta)
})

export default router
