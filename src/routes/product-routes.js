import { Router } from "express";
//import ProductManager from "../dao/ProductManager.js";
import ProductManager from "../dao/ProductManagerDB.js";

const router = Router();
const productService = new ProductManager();

router.get("/", async (req, res) => {
    const respuesta = await productService.getProducts();
    const limite = req.query.limit;
    if (limite == undefined) {
      res.send(respuesta);
    } else {
      res.send(respuesta.slice(0, limite));
    }
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