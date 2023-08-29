export default class productRepository{
    constructor(dao){
        this.dao = dao
    }
    getProducts = ()=>{
        return this.dao.getProducts()
    }
    getProductById = (id)=>{
        return this.dao.getProductById(id)
    }
    addProducts = (product)=>{
        return this.dao.addProducts(product)
    }
    updateProduct = (id,product)=>{
        return this.dao.updateProduct(id,product)
    }
    deleteProduct = (id)=>{
        return this.dao.deleteProduct(id)
    }

}