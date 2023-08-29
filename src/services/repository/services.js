import ProductManager from "../dao/Mongo/ProductManagerDB.js";
import CartManager from "../dao/Mongo/CartManagerDB.js";
import UserManager from "../dao/Mongo/UserManager.js";
import TicketManager from "../dao/Mongo/TicketManager.js";


import productRepository from "./productsRepository.js";
import cartsRepository from "./cartsRepository.js";
import usersRepository from "./usersRepository.js";
import ticketsRepository from "./ticketsRepository.js";

const productDao = new ProductManager();
const cartDao = new CartManager();
const userDao = new UserManager();
const ticketDao = new TicketManager();

export const productService = new productRepository(productDao);
export const cartService = new cartsRepository(cartDao);
export const usersService = new usersRepository(userDao);
export const ticketService = new ticketsRepository(ticketDao);