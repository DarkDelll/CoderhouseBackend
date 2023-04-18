import express from "express";
import RouterProduct from "./routes/product-routes.js";
import RouterCart from "./routes/cart-routes.js";
import handlebars from "express-handlebars";
import __dirname from "./Utils.js";
import viewRouter from "./routes/views-routes.js";
import { Server } from "socket.io";
//import ProductManager from "./dao/ProductManager.js";
import mongoose from "mongoose";
import ProductManager from "./dao/ProductManagerDB.js";
import MessagesManager from "./dao/MessagesManagerDB.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public/"));

app.use("/", viewRouter);
app.use("/api/products", RouterProduct);
app.use("/api/carts", RouterCart);

const httpServer = app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

const socketServer = new Server(httpServer);
const productService = new ProductManager();
let messages = []
socketServer.on("connection", async (socket) => {
  socket.emit("products", await productService.getProducts());

  socket.on("new-product", async (data) => {
    console.log(
      await productService.addProducts(data)
    );
  });
  socket.on("delete-product", async (id) => {
    console.log(await productService.deleteProduct(+id));
  });

  socket.on('message', async data =>{
    const messagesService = new MessagesManager()
    await messagesService.createMessage(data)
    let msg = await messagesService.AllMessages()
    messages.push(msg);
    socketServer.emit('messageLogs', messages )
})
});

const connectMongoDB = async ()=>{
  try {
    await mongoose.connect('mongodb://localhost:27017/ecommerce?retryWrites=true&w=majority')
    console.log("Conectado con exito a MongoDB usando Moongose.");
  }
  catch(error) {
    console.error("No se puedo conectar a la base de datos " + error)
    process.exit()
  }
}
connectMongoDB()