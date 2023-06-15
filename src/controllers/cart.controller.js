import CartManager from "../services/dao/Mongo/CartManagerDB.js";
import ProductManager from "../services/dao/Mongo/ProductManagerDB.js";
import TicketManager from "../services/dao/Mongo/TicketManager.js";
import UserManager from "../services/dao/Mongo/UserManager.js";
import nodemailer from 'nodemailer';
import config from '../config/config.js';

const cartService = new CartManager();
const productService = new ProductManager();
const userService = new UserManager();
const ticketService = new TicketManager();

export async function getCartById(req,res){
    try {
        const id = req.params.cid
        const carts = await cartService.getCart(id)
        res.send(carts)
    } catch (error) {
        res.status(500).send({error: error, message: "no se pudo obtener el carrito"})
    }
}

export async function createCart(req,res){
    const newCart = await cartService.newCart()
    res.send(newCart)
}

export async function addProducts(req,res){
    try {
        const cartid = req.params.cid
        const productid = req.params.pid
        let respuesta = await cartService.addProducts(cartid,productid)
        res.status(200).send(respuesta)
    } catch (error) {
        res.status(500).send({error: error, message: "no se pudo agregar el producto"})
    }
}
export async function cartPurchase(req,res){
    try {
        const cartid = req.params.cid
        const cart = await cartService.getCart(cartid)
        const cartProducts = cart.products
        const disponible = cartProducts.filter(productos=> productos.product.stock - productos.quantity > 0)
        const noDisponible = cartProducts.filter(productos=> productos.product.stock - productos.quantity < 0)
        const precioTotal = disponible.reduce((acc, producto) => acc + (producto.product.price * producto.quantity), 0);
        const user = await userService.getUserByCartId(cartid)
        const userEmail = user.email
        const code = new Date().getTime()

        const ticketNuevo = {code: code, amount: precioTotal, purchaser: userEmail}
        const ticket = await ticketService.createTicket(ticketNuevo)

        const newProducts = disponible.map((producto)=>{
            const productoNuevo = disponible.find(p => p.product._id === producto.product._id);
            if (productoNuevo) {
                producto.product.stock -= productoNuevo.quantity;
                return producto;
            }
            return producto;  
        })
        const resultado = newProducts.map(async (productos)=>{
          let result =  await productService.updateProduct(productos.product._id, productos.product)
          return result
        })

        const vaciarCarrito = await cartService.emptyCart(cartid)
        vaciarCarrito

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            auth: {
                user: config.gmailAccount,
                pass: config.gmailAppPassword
            }
        });
        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log('Server is ready to take our messages');
            }
        });

        const mailOptions = {
            from: "TICKET DE COMPRA " + config.gmailAccount,
            to: userEmail,
            subject: "TICKET DE COMPRA N° " + code,
            html: `<div><h1>Gracias por su compra</h1> </div><div><h2> ${user.first_name} su ticket ${code} ha sido generado con exito</h2></div>
            <div> Comprador: ${userEmail}</div> <div> Total: ${precioTotal}</div>`,
            attachments: []
        }
        try {
            let result2 = transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    res.status(400).send({ message: "Error", payload: error })
                }
                console.log('Message sent: ', info.messageId);
                
            })
        } catch (error) {
            console.error(error);
        }

        if (noDisponible){
            noDisponible.map(async (producto)=>{
                let addProducto = await cartService.addProducts(cartid, producto.product._id)
                return addProducto
            })
            return res.status(201).send(cart)
        }
        res.status(200).send(cart, result)
        
    } catch (error) {
        res.status(500).send({error: error, message: "no se pudo finalizar la compra"})
    }
}

export async function deleteProducts(req,res){
    try {
        const cartid = req.params.cid
        const productid = req.params.pid
        let respuesta = await cartService.deleteProducts(cartid,productid)
        res.send(respuesta)
    } catch (error) {
        res.status(500).send({error: error, message: "no se pudo eliminar el producto"})
    }
    
}
export async function updateProducts(req,res){
    try {
        const cartid = req.params.cid
        let array = req.body
        let respuesta = await cartService.updateProducts(cartid,array)
        res.send(respuesta)
    } catch (error) {
        res.status(500).send({error: error, message: "no se pudo actualizar los productos"})
    }
    
}
export async function updateQuantity(req,res){
    try {
        const cartid = req.params.cid
        const productid = req.params.pid
        const {quantity} = req.body
        let respuesta = await cartService.updateQuantity(cartid,productid,parseInt(quantity))
        res.send(respuesta)
    } catch (error) {
        res.status(500).send({error: error, message: "error al actualizar la cantidad"})
    }
    
}
export async function emptyCart(req,res){
    try {
        const cartid = req.params.cid
        let respuesta = await cartService.emptyCart(cartid)
        res.send(respuesta)
    } catch (error) {
        res.status(500).send({error: error, message: "error al vaciar el carrito"})
    }
    
}