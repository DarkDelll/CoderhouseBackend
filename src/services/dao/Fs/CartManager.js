import fs from "fs";
import ProductManager from "./ProductManager.js"
import __dirname from "../Utils.js";
const productService = new ProductManager();

class CartManager {
  constructor() {
    this.path = __dirname + "/files/carts.json";
    this.newFile();
  }
  async newFile() {
    try {
      const filenameExist = fs.existsSync(this.path);
      if (!filenameExist) {
        await fs.promises.writeFile(this.path, "[]");
      }
    } catch (error) {
      
    }
  }
  async getCart(id) {
    const filecontent = await fs.promises.readFile(this.path, "utf-8");
    const filecontentParsed = JSON.parse(filecontent);
    if (filecontentParsed.filter((cart) => cart.id === parseInt(id)) == 0) {
      return { Error: "Cart not found" };
    } else {
      return filecontentParsed.filter((cart) => cart.id === parseInt(id));
    }
  }
  async newCart() {
    const Cart = {
      id: Date.now(),
      products: [],
    };
    const filecontent = await fs.promises.readFile(this.path, "utf-8");
    const filecontentParsed = JSON.parse(filecontent);
    filecontentParsed.push(Cart);
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(filecontentParsed, null, 2)
    );
    return { Success: "carrito creado correctamente id: " + Cart.id };
  }

  async addProducts(cartid, productid) {
    const filecontent = await fs.promises.readFile(this.path, "utf-8");
    const filecontentParsed = JSON.parse(filecontent);
    const carritoactual = filecontentParsed.filter(
      (cart) => cart.id === parseInt(cartid)
    );
    

    if (carritoactual == 0) {
      return { Error: "El carrito id: " + cartid + " no existe" };
    }

    if (!(await productService.productExist(parseInt(productid)))) {
      return { Error: "Product not found" };
    }

    if (
      carritoactual.map((carrito) =>
        carrito.products.filter((cartproduct) => cartproduct.id == parseInt(productid))
      ) == 0
    ) {
      const product = {
        id: parseInt(productid),
        quantity: 1,
      };
      carritoactual.map((carrito) => carrito.products.push(product));
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(filecontentParsed, null, 2)
      );
      return { Success: "Producto agregado correctamente" };
    } else {
      filecontentParsed.map((carrito) => {
        if (carrito.id == parseInt(cartid)) {
          carrito.products.map((producto) => {
            if (producto.id == parseInt(productid)) {
              producto.quantity += 1;
            }
          });
        }
      });
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(filecontentParsed, null, 2)
      );
      return { Success: "Cantidad agregada correctamente" };
    }
  }
}

export default CartManager;
