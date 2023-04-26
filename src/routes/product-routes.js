import { Router } from "express";
//import ProductManager from "../dao/ProductManager.js";
import ProductManager from "../dao/ProductManagerDB.js";
import productsModel from '../dao/models/products.js'

const router = Router();
const productService = new ProductManager();

router.get("/", async (req, res) => {
    // const respuesta = await productService.getProducts();
    const limite = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort
    let result = await productsModel.paginate({},{page,limit:limite,lean:true})
    result.prevLink = result.hasPrevPage?`http://localhost:8080/api/products/${req.query.limit? `?limit=${limite}`:''}?page=${result.prevPage}`:null;
    result.nextLink = result.hasNextPage?`http://localhost:8080/api/products/${req.query.limit? `?limit=${limite}`:''}?page=${result.nextPage}`:null;
    result.isValid= !(page<=0||page>result.totalPages)
    res.json({
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.prevLink,
      nextLink: result.nextLink
    })
  });
  
  router.get("/:pid", async (req,res)=>{
      let id = req.params.pid
      const respuesta = await productService.getProductById(id)
      res.send(respuesta)
  })
    

  router.post("/", async (req, res) => {
    const { title, description,  code, price, stock, category, thumbnail } = req.body;
    const respuesta = await productService.addProducts({title, description,  code, price, stock, category, thumbnail});
    res.send(respuesta);
    });

  router.put("/:pid", async (req,res)=>{
    let id = req.params.pid
    const { campo, valor } = req.body
    console.log(req.body)
    const respuesta = await productService.updateProduct(parseInt(id), campo, valor)
    res.send(respuesta)
  })

  router.delete("/:pid", async (req,res)=>{
    let id = req.params.pid
    const respuesta = await productService.deleteProduct(parseInt(id))
    res.send(respuesta)
  })

export default router;