import express from 'express'
import ProductManager from '../dao/ProductManager.js'

const router = express.Router()
const productService = new ProductManager()

router.get('/', async (req, res)=>{
    const products = await productService.getProducts();
    res.render('index', {products})
})


router.get("/realtimeproducts", (req, res)=>{
    res.render("realTimeProducts",{});
});


export default router;