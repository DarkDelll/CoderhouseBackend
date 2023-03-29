import express from 'express'
import { Manager1 } from "../../index.js";

const router = express.Router()

router.get('/', async (req, res)=>{
    const products = await Manager1.getProducts();
    res.render('index', {products})
})


router.get("/realtimeproducts", (req, res)=>{
    res.render("realTimeProducts",{});
});


export default router;