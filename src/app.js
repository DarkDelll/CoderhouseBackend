import express from "express";
import  RouterProduct  from "./routes/product-routes.js";
import RouterCart from "./routes/cart-routes.js"

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/products", RouterProduct);
app.use("/api/carts", RouterCart)

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
