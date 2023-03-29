import express from "express";
import  RouterProduct  from "./routes/product-routes.js";
import RouterCart from "./routes/cart-routes.js"
import handlebars from "express-handlebars";
import __dirname from "./Utils.js";
import viewRouter from "./routes/views-routes.js";
import {Server} from "socket.io";
import { Manager1 } from "../index.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.static(__dirname+'/public/'));

app.use('/', viewRouter)
app.use("/api/products", RouterProduct);
app.use("/api/carts", RouterCart)

const httpServer = app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

const socketServer = new Server(httpServer)

socketServer.on("connection", async socket => {

   socket.emit("products", await Manager1.getProducts())

})

