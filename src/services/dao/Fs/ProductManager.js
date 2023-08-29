import fs from 'fs'
import __dirname from '../../../Utils.js';

class ProductManager {
  constructor() {
    this.path = __dirname + '/files/products.json';
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

  async addProducts(title, description, code, price, stock, category, thumbnail) {
    try {
      

      if (
        title !== "" &&
        description !== "" &&
        price !== "" &&
        code !== "" &&
        stock !== "" &&
        category !== ""
      ) {
        if (
          typeof title === "string" &&
          typeof description === "string" &&
          typeof price === "number" &&
          typeof code === "string" &&
          typeof stock === "number" &&
          typeof category === "string"
        ) {
          const Product = {
            id: Date.now(),
            title: title,
            description: description,
            code: code,
            price: price,
            status: true,
            stock: stock,
            category: category,
            thumbnail: thumbnail,
          };
          const filecontent = await fs.promises.readFile(this.path, "utf-8");
          const filecontentParsed = JSON.parse(filecontent);

          if (
            filecontentParsed.filter((product) => product.code === code) == 0
          ) {
            filecontentParsed.push(Product);
            await fs.promises.writeFile(
              this.path,
              JSON.stringify(filecontentParsed, null, 2)
            );
            return {Success:"Producto agregado correctamente Producto: " + Product.title + " id:" + Product.id};
          } else {
            return {Error: "el código ya existe"};
          }
        } else {
          return {Error: "el tipo de dato introducido no es correcto"};
        }
      } else {
        return {Error: "hay un campo vacío"};
      }
    } catch (error) {
      
    }
  }
  async getProducts() {
    const filecontent = await fs.promises.readFile(this.path, "utf-8");
    const filecontentParsed = JSON.parse(filecontent);
    return filecontentParsed;
  }
  async getProductById(id) {
    const filecontent = await fs.promises.readFile(this.path, "utf-8");
    const filecontentParsed = JSON.parse(filecontent);
    if (filecontentParsed.filter((product) => product.id === parseInt(id)) == 0) {
      return {Error: "Product not found"};
    } else {
      return filecontentParsed.filter((product) => product.id === parseInt(id))
    }
  }

  async updateProduct(id, updateCampo, updateValor) {
    const filecontent = await fs.promises.readFile(this.path, "utf-8");
    const filecontentParsed = JSON.parse(filecontent);
    if (filecontentParsed.filter((product) => product.id === parseInt(id)) == 0) {
      return {Error: "product not found"};
    } else {
      if (updateCampo == "id") {
        return {Error: "El id no se puede modificar"};
      } else {
        filecontentParsed.map((product) => {
          if (product.id == parseInt(id)) {
            product[updateCampo] = updateValor;
          }
        });
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(filecontentParsed, null, 2)
        );
        return {Success: "El campo: " + updateCampo + " ha sido actualizado"}
      }
    }
  }
  async deleteProduct(id) {
    const filecontent = await fs.promises.readFile(this.path, "utf-8");
    const filecontentParsed = JSON.parse(filecontent);
    if (filecontentParsed.filter((product) => product.id === parseInt(id)) == 0) {
      return {Error: "Product not found"};
    } else {
      const filecontentfiltered = filecontentParsed.filter(
        (product) => product.id !== parseInt(id)
      );
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(filecontentfiltered, null, 2)
      );
      return {Success: "Producto eliminado"};
    }
  }
  async productExist(id){
    const filecontent = await fs.promises.readFile(this.path, "utf-8");
    const filecontentParsed = JSON.parse(filecontent);
    if (filecontentParsed.filter((product) => product.id === parseInt(id)) == 0) {
      return false;
    } else {return true}
  }



}

export default ProductManager
