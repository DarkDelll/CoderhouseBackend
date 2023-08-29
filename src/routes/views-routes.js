import express from "express";
import productsModel from "../services/dao/Mongo/models/products.js";
import cartsModel from "../services/dao/Mongo/models/carts.js";
import { usersService } from "../services/repository/services.js";
import { authUser, authAdmin } from "../Utils.js";

const router = express.Router();

router.get("/products", async (req, res) => {
  let page = parseInt(req.query.page);
  if (!page) page = 1;
  let result = await productsModel.paginate({}, { page, limit: 5, lean: true });
  result.prevLink = result.hasPrevPage
    ? `http://localhost:8080/products?page=${result.prevPage}`
    : "";
  result.nextLink = result.hasNextPage
    ? `http://localhost:8080/products?page=${result.nextPage}`
    : "";
  result.isValid = !(page <= 0 || page > result.totalPages);
  res.render("index", { resultado: result, user: req.session.user });
});
router.get("/", (req, res) => {
  res.redirect("/login");
});

router.get("/current", authAdmin, (req, res) => {
  res.render("realTimeProducts", {});
});
router.get("/chat", authUser, (req, res) => {
  res.render("chat", { user: req.session.user.email });
});
router.get("/carts/", authUser, async (req, res) => {
  const cartId = req.session.user.cart;
  let result = await cartsModel.findById(cartId).lean();
  res.render("carts", {
    result,
    products: result.products,
    user: req.session.user,
  });
});
router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});
router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.json({ error: "Error de logout", msg: "Error al cerrar session" });
    }
    res.clearCookie("connect.sid").redirect("/login");
  });
});
router.get("/users", authAdmin, async (req, res) => {
   const usuarios = await usersService.getAllUsers()
  res.render("users", { users: usuarios, user: req.session.user });
});

export default router;
