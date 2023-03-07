const fs = require("fs");

class ProductManager {
  constructor(filePath) {
    this.path = filePath;

  }
  async addProducts(title, description, price, thumbnail, code, stock) {
    try {
      const filenameExist = fs.existsSync(this.path);

      if (!filenameExist) {
        await fs.promises.writeFile(this.path, "[]");
      }

      if (
        title !== "" &&
        description !== "" &&
        price !== "" &&
        thumbnail !== "" &&
        code !== "" &&
        stock !== ""
      ) {
        if (
          typeof title === "string" &&
          typeof description === "string" &&
          typeof price === "number" &&
          typeof thumbnail === "string" &&
          typeof code === "string" &&
          typeof stock === "number"
        ) {
          const Product = {
            id: Date.now(),
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
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
            console.log("Producto agregado correctamente");
          } else {
            console.log("Error: el código ya existe");
          }
        } else {
          console.log("Error: el tipo de dato introducido no es correcto");
        }
      } else {
        console.log("Error: hay un campo vacío");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getProducts() {
    const filecontent = await fs.promises.readFile(this.path, "utf-8");
    const filecontentParsed = JSON.parse(filecontent);
    return console.log(filecontentParsed);
  }
  async getProductById(id) {
    const filecontent = await fs.promises.readFile(this.path, "utf-8");
    const filecontentParsed = JSON.parse(filecontent);
    if (filecontentParsed.filter((product) => product.id === id) == 0) {
      return "Error: product not found";
    } else {
      return console.log(
        filecontentParsed.filter((product) => product.id === id)
      );
    }
  }

  async updateProduct(id, updateCampo, updateValor) {
    const filecontent = await fs.promises.readFile(this.path, "utf-8");
    const filecontentParsed = JSON.parse(filecontent);
    if (filecontentParsed.filter((product) => product.id === id) == 0) {
      return console.log("Error: product not found");
    } else {
      if (updateCampo == "id") {
        return console.log("El id no se puede modificar");
      } else {
        filecontentParsed.map((product) => {
          if (product.id == id) {
            product[updateCampo] = updateValor;
          }
        });
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(filecontentParsed, null, 2)
        );
        return console.log(
          filecontentParsed.filter((product) => product.id === id)
        );
      }
    }
  }
  async deleteProduct(id) {
    const filecontent = await fs.promises.readFile(this.path, "utf-8");
    const filecontentParsed = JSON.parse(filecontent);
    if (filecontentParsed.filter((product) => product.id === id) == 0) {
      return console.log("Error: product not found");
    } else {
      const filecontentfiltered = filecontentParsed.filter(
        (product) => product.id !== id
      );
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(filecontentfiltered, null, 2)
      );
      return console.log("Producto eliminado");
    }
  }



}

module.exports = ProductManager;
