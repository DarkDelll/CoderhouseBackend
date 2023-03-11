import express from "express";
import { Manager1 } from "../index.js";

const app = express();
const PORT = 8080;

app.get("/products", async (req, res) => {
  const respuesta = await Manager1.getProducts();
  const limite = req.query.limit;
  if (limite == undefined) {
    res.send(respuesta);
  } else {
    res.send(respuesta.slice(0, limite));
  }
});

app.get("/products/:pid", async (req,res)=>{
    let id = req.params.pid
    const respuesta = await Manager1.getProductById(parseInt(id))
    res.send(respuesta)
})

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
