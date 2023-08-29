import { Router } from "express";
import { getProducts, getProductsById, addProducts, updateProduct, deleteProduct, getMockedProducts } from "../controllers/product.controller.js";
import { authAdmin, authPremiumOrAdmin } from '../Utils.js'
const router = Router();

router.get("/", getProducts);

router.get("/mockingproducts", getMockedProducts)
  
router.get("/:pid", getProductsById)

router.post("/", authPremiumOrAdmin, addProducts);

router.put("/:pid",authAdmin, updateProduct)

router.delete("/:pid",authAdmin, deleteProduct)



export default router;