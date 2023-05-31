import { Router } from "express";
import { getProducts, getProductsById, addProducts, updateProduct, deleteProduct } from "../controllers/product.controller.js";

const router = Router();

router.get("/", getProducts);
  
router.get("/:pid", getProductsById)

router.post("/", addProducts);

router.put("/:pid", updateProduct)

router.delete("/:pid", deleteProduct)

export default router;