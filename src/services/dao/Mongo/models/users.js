import mongoose from 'mongoose'; 

const collection = "users";
const schema = mongoose.Schema({
    first_name:String,
    last_name:String,
    email:{
        type:String,
        unique:true
    },
    age: Number,
    password:String,
    carts: {
        type: mongoose.Schema.Types.ObjectId,
                ref:"carts"
    
    },
    role: {type:String, default:"user"}
})
schema.pre('findOne',function(){
    this.populate("carts")
})
const userModel = mongoose.model(collection,schema);
export default userModel;