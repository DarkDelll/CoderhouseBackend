import fs from "fs";

class CartManager {
  constructor(path) {
    this.path = path;
    this.newFile();
  }
  async newFile() {
    try {
      const filenameExist = fs.existsSync(this.path);
      if (!filenameExist) {
        await fs.promises.writeFile(this.path, "[]");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getcart(id) {
    const filecontent = await fs.promises.readFile(this.path, "utf-8");
    const filecontentParsed = JSON.parse(filecontent);
    if (filecontentParsed.filter((cart) => cart.id === id) == 0) {
      return { Error: "Product not found" };
    } else {
      return filecontentParsed.filter((cart) => cart.id === id);
    }
  }
  async newCart() {
    const Cart = {
      id: Date.now(),
      products: "[]",
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

    if(filecontentParsed.filter((cart)=> cart.id === cartid) == 0 ){
        return {Error: "El carrito id: "+ cartid + " no existe"}
    }
    if (filecontentParsed.filter((cart)=> cart.products.filter((product)=> product.id === productid) == 0)){
        const product = {
            id: productid,
            cantidad: 1
        }
        filecontentParsed.filter((cart)=> cart.id === cartid).products.push(product)
        await fs.promises.writeFile(
            this.path,
            JSON.stringify(filecontentParsed, null, 2)
            );
        return {Success: "Producto agregado correctamente"}
    }
    else{
        filecontentParsed.filter((cart)=> cart.id === cartid).products.cantidad += 1
        await fs.promises.writeFile(
            this.path,
            JSON.stringify(filecontentParsed, null, 2)
            );
        return {Success: "Cantidad agregada correctamente"}
    }



  }
}

export default CartManager;
