import productsModel from "./models/products.js";

class ProductManager {
    constructor(){
        
    }
    async getProducts(){
        let products = await productsModel.find()
        return products.map(product=>product.toObject())
    }
    async getProductById(pid){
        let product = await productsModel.findById(pid)
        return product
    }
    async addProducts(product){
        let result = productsModel.create(product)
        return result
    }
    async updateProduct(pid, product){
        const {id, ...destruct} = product
        let result = productsModel.findByIdAndUpdate(pid,destruct)
        return result
    }
    async deleteProduct(pid){
        let result = productsModel.deleteOne({_id: pid})
        return result
    }

}

export default ProductManager