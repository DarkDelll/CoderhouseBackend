import { Router } from "express";
import { addProducts, createCart, deleteProducts, emptyCart, getCartById, updateProducts, updateQuantity } from "../controllers/cart.controller.js";

const router = Router()

router.get("/:cid", getCartById)

router.post("/", createCart)

router.post("/:cid/product/:pid", addProducts)

router.delete("/:cid/product/:pid", deleteProducts)

router.put("/:cid", updateProducts)

router.put("/:cid/product/:pid", updateQuantity)

router.delete("/:cid", emptyCart)

export default router
