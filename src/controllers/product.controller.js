import { generateProduct } from "../Utils.js";
import ProductManager from "../services/dao/Mongo/ProductManagerDB.js";
import productsModel from '../services/dao/Mongo/models/products.js';

const productService = new ProductManager();

export async function getProducts(req, res) {
    const limite = req.query.limit || 5;
    const page = req.query.page || 1;
    let sort = req.query.sort ? {price:req.query.sort} : {}
    let query = req.query.query ? JSON.parse(req.query.query) : {}
    
    let result = await productsModel.paginate(query,{page:page,limit:limite,lean:true, sort:sort})
    result.prevLink = result.hasPrevPage?`http://localhost:8080/api/products/${req.query.limit? `?limit=${limite}`:''}?page=${result.prevPage}`:null;
    result.nextLink = result.hasNextPage?`http://localhost:8080/api/products/${req.query.limit? `?limit=${limite}`:''}?page=${result.nextPage}`:null;
    result.isValid= !(page<=0||page>result.totalPages)
    res.json({
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.prevLink,
      nextLink: result.nextLink
    })
}

export async function getProductsById (req,res){
    let id = req.params.pid
    const respuesta = await productService.getProductById(id)
    res.send(respuesta)
}

export async function addProducts (req, res){
    try {
        const { title, description,  code, price, stock, category, thumbnail } = req.body;
        const respuesta = await productService.addProducts({title, description,  code, price, stock, category, thumbnail});
        res.send(respuesta);
    } catch (error) {
        res.status(500).send({error: error, message: "error al agregar productos"})
    }
    
}

export async function getMockedProducts(req, res){
    try {
        let products = [];
        for (let i = 0; i < 100; i++) {
            products.push(generateProduct());
        }
        res.send({ status: "success", payload: products });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo obtener los productos:" });
    }
}


export async function updateProduct (req,res){
    try {
        let id = req.params.pid
        const { campo, valor } = req.body
        console.log(req.body)
        const respuesta = await productService.updateProduct(parseInt(id), campo, valor)
        res.send(respuesta)
    } catch (error) {
        res.status(500).send({error: error, message: "error al actualizar el producto"})
    }
    
}
export async function deleteProduct (req,res){
    try {
        let id = req.params.pid
        const respuesta = await productService.deleteProduct(parseInt(id))
        res.send(respuesta)
    } catch (error) {
        res.status(500).send({error: error, message: "error al eliminar el producto"})
    }
    
}