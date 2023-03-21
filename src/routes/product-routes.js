import { Router } from "express";
import { Manager1 } from "../../index.js";

const router = Router();

router.get("/", async (req, res) => {
    const respuesta = await Manager1.getProducts();
    const limite = req.query.limit;
    if (limite == undefined) {
      res.send(respuesta);
    } else {
      res.send(respuesta.slice(0, limite));
    }
  });
  
  router.get("/:pid", async (req,res)=>{
      let id = req.params.pid
      const respuesta = await Manager1.getProductById(parseInt(id))
      res.send(respuesta)
  })
    

  router.post("/", async (req, res) => {
    const { title, description,  code, price, stock, category, thumbnail } = req.body;
    const respuesta = await Manager1.addProducts(title, description,  code, price, stock, category, thumbnail);
    res.send(respuesta);
    });

  router.put("/:pid", async (req,res)=>{
    let id = req.params.pid
    const { campo, valor } = req.body
    console.log(req.body)
    const respuesta = await Manager1.updateProduct(parseInt(id), campo, valor)
    res.send(respuesta)
  })

  router.delete("/:pid", async (req,res)=>{
    let id = req.params.pid
    const respuesta = await Manager1.deleteProduct(parseInt(id))
    res.send(respuesta)
  })

export default router;