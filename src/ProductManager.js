import fs from 'fs'

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
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


  async addProducts(title, description, price, thumbnail, code, stock) {
    try {
      

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
      console.log(error);
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
    if (filecontentParsed.filter((product) => product.id === id) == 0) {
      return {Error: "Product not found"};
    } else {
      return filecontentParsed.filter((product) => product.id === id)
    }
  }

  async updateProduct(id, updateCampo, updateValor) {
    const filecontent = await fs.promises.readFile(this.path, "utf-8");
    const filecontentParsed = JSON.parse(filecontent);
    if (filecontentParsed.filter((product) => product.id === id) == 0) {
      return {Error: "product not found"};
    } else {
      if (updateCampo == "id") {
        return {Error: "El id no se puede modificar"};
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
      return {Error: "Product not found"};
    } else {
      const filecontentfiltered = filecontentParsed.filter(
        (product) => product.id !== id
      );
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(filecontentfiltered, null, 2)
      );
      return {Success: "Producto eliminado"};
    }
  }



}

export {ProductManager}
