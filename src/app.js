import express from "express";
import  RouterProduct  from "./routes/product-routes.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/products", RouterProduct);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
