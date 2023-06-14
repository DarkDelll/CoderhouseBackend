export default class userDTO{
    constructor(usuario){
        this.name = `${usuario.first_name} ${usuario.last_name}`
        this.email = usuario.email
        this.age = usuario.age
        this.cart = usuario.carts._id
        this.role = usuario.role

    }
}
