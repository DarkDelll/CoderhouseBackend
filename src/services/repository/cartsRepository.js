export default class cartsRepository{
    constructor(dao){
        this.dao = dao
    }
    newCart = (cart)=>{
        return this.dao.newCart(cart)
    }
    getCart = (cid)=>{
        return this.dao.getCart(cid)
    }
    addProducts = (cid, pid)=> {
        return this.dao.addProducts(cid, pid)
    }
    deleteProducts = (cid,pid)=>{
        return this.dao.deleteProducts(cid,pid)
    }
    updateProducts = (cid,body)=> {
        return this.dao.updateProducts(cid,body)
    }
    updateQuantity = (cid,pid,qty)=>{
        return this.dao.updateQuantity(cid,pid,qty)
    }
    emptyCart = (cid)=>{
        return this.dao.emptyCart(cid)
    }

}