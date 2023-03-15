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
    const { title, description,  price, thumbnail, code, stock } = req.body;
    const respuesta = await Manager1.addProducts(title, description, price, thumbnail,code, stock);
    res.send(respuesta);
    });

export default router;