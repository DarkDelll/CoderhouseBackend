import userModel from "./models/users.js";
import config from "../../../config/config.js";

class UserManager{
    

    async createUser(usuario){
        let user = await userModel.create(usuario)
        return user
    }

    async getuser(mail){
        let user = await userModel.findOne({email:mail})
        return user
    }
    async getUserById(id){
        let user = await userModel.findById(id);
        return user
    }
    async getUserByCartId(cid){
        let user = await userModel.findOne({carts: cid})
        return user
    }



}

export default UserManager