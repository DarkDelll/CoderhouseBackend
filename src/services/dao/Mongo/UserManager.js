import userModel from "./models/users.js";
import userDTO from "../../dto/user.dto.js";

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
    async getAllUsers(){
        let users = await userModel.find()
        const usuarios = users.map(user => {
            return new userDTO(user);
        });
        return usuarios
    }
    async deleteUser(uid){
        let result = await userModel.deleteOne({_id: uid})
        return result
    }
    async updateUser(uid){
        const filter = {_id: uid}
        const update = {role:"premium"}
        try {
            const updatedUser = await userModel.findOneAndUpdate(filter, update);
            return updatedUser
        } catch (err) {
            return err;
        }
    }



}

export default UserManager