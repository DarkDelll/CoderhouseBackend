import { Router } from "express";
import { cartmanager } from "../../index.js";

const router = Router()

router.get("/:cid", async (req,res)=>{
    const id = req.params.cid
    const carts = await cartmanager.getcart(parseInt(id))
    res.send(carts)
})

router.post("/", async (req,res)=>{
    const newCart = await cartmanager.newCart()
    res.send(newCart)
})

router.post("/:cid/product/:pid", async(req,res)=>{
    const cartid = req.params.cid
    const productid = req.params.pid
    let respuesta = await cartmanager.addProducts(parseInt(cartid),parseInt(productid))
    res.send(respuesta)

} )

export default router
