import { Router } from "express";
//import CartManager from "../dao/CartManager.js";
import CartManager from "../dao/CartManagerDB.js";

const router = Router()
const cartService = new CartManager()

router.get("/:cid", async (req,res)=>{
    const id = req.params.cid
    const carts = await cartService.getCart(parseInt(id))
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

export default router
