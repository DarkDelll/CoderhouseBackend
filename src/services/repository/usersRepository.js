export default class usersRepository{
    constructor(dao){
        this.dao = dao
    }
    createUser = (user)=>{
        return this.dao.createUser(user)
    }
    getuser = (mail)=>{
        return this.dao.getuser(mail)
    }
    getUserById = (id)=>{
        return this.dao.getUserById(id)
    }
    getUserByCartId = (cid)=>{
        return this.dao.getUserByCartId(cid)
    }
    deleteUser = (uid)=>{
        return this.dao.deleteUser(uid)
    }
    getAllUsers = ()=>{
        return this.dao.getAllUsers()
    }
    updateUser = (uid)=>{
        return this.dao.updateUser(uid)
    }
    deleteManyUsers = (filter)=>{
        return this.dao.deleteManyUsers(filter)
    }
    
}