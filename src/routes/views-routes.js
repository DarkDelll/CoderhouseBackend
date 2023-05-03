import express from 'express'
import productsModel from '../dao/models/products.js'
import cartsModel from '../dao/models/carts.js'

const router = express.Router()

router.get('/products', async (req, res)=>{
    let page = parseInt(req.query.page);
    if(!page) page=1;
    let result = await productsModel.paginate({},{page,limit:5,lean:true})
    result.prevLink = result.hasPrevPage?`http://localhost:8080/products?page=${result.prevPage}`:'';
    result.nextLink = result.hasNextPage?`http://localhost:8080/products?page=${result.nextPage}`:'';
    result.isValid= !(page<=0||page>result.totalPages)
    res.render('index', {resultado: result, user: req.session.user, rol: req.session.rol})
})


router.get("/realtimeproducts", (req, res)=>{
    res.render("realTimeProducts",{});
});
router.get("/chat", (req,res)=>{
    res.render("chat",{})
})
router.get("/carts/:cid", async(req,res)=>{
    const cartId = req.params.cid
    let result = await cartsModel.findById(cartId).lean()
    res.render('carts', {result, products: result.products})
})
router.get('/login', (req, res)=>{
    res.render("login");
})

router.get('/register', (req, res)=>{
    res.render("register");
})
router.get('/logout', (req, res)=>{
    req.session.destroy(error => {
        if(error){
            res.json({error: "Error de logout", msg: 'Error al cerrar session'})
        }
        res.clearCookie('connect.sid').redirect("/login")
        
    })
})

export default router;