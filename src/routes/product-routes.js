import { Router } from "express";
import { getProducts, getProductsById, addProducts, updateProduct, deleteProduct, getMockedProducts } from "../controllers/product.controller.js";
import { authUser, authAdmin, authPremium } from '../Utils.js'
const router = Router();

router.get("/", getProducts);

router.get("/mockingproducts", getMockedProducts)
  
router.get("/:pid", getProductsById)

router.post("/",authAdmin, authPremium, addProducts);

router.put("/:pid",authAdmin, updateProduct)

router.delete("/:pid",authAdmin, deleteProduct)



export default router;