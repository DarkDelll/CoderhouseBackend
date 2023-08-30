import express, { application } from "express";
import RouterProduct from "./routes/product-routes.js";
import RouterCart from "./routes/cart-routes.js";
import handlebars from "express-handlebars";
import exphbs from "express-handlebars";
import __dirname from "./Utils.js";
import viewRouter from "./routes/views-routes.js";
import { Server } from "socket.io";
import config from "./config/config.js";
import mongoose from "mongoose";
import { productService } from "./services/repository/services.js";
import MessagesManager from "./services/dao/Mongo/MessagesManagerDB.js";
import sessionRouter from "./routes/sessions-routes.js";
import userRouter from "./routes/users-routes.js";
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from "passport";
import githubLoginViewRouter from "./routes/github-login.views.router.js"
import initializePassport from "./config/passport.config.js";
import { addLogger } from "./config/logger.js";
import loggerTest from './routes/loggerTest.js';
import swaggerUiExpress from "swagger-ui-express";
import {swaggerSpecs}  from "./swaggerSpecs.js";



const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
const handlebarss = exphbs.create();

handlebarss.handlebars.registerHelper('ifeq', function(a, b, options) {
    if (a === b) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

app.use(express.static(__dirname + "/public/"));

const MONGO_URL = config.mongoURL
app.use(session({
  store:MongoStore.create({
    mongoUrl:process.env.MONGO_URL || MONGO_URL,
    mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
    ttl: 120000
  }),
  secret:"CoderS3cret",
  resave: false,
  saveUninitialized: true

}))
initializePassport()
app.use(passport.initialize())
app.use(passport.session())


app.use(addLogger);
app.use("/", viewRouter);
app.use("/api/products", RouterProduct);
app.use("/api/carts", RouterCart);
app.use("/api/sessions", sessionRouter);
app.use("/github", githubLoginViewRouter);
app.use("/loggerTest", loggerTest);
app.use("/api/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpecs))
app.use("/api/users", userRouter )



const httpServer = app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

const socketServer = new Server(httpServer);
let messages = []
socketServer.on("connection", async (socket) => {
  socket.emit("products", await productService.getProducts());

  socket.on("new-product", async (data) => {
      await productService.addProducts(data)
    
  });
  socket.on("delete-product", async (id) => {
    await productService.deleteProduct(+id);
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
    await mongoose.connect(process.env.MONGO_URL || MONGO_URL,)
    console.log("Conectado con exito a MongoDB usando Moongose.");
  }
  catch(error) {
    console.error("No se puedo conectar a la base de datos " + error)
    process.exit()
  }
}
connectMongoDB()