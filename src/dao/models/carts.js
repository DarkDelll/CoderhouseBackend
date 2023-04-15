import mongoose from "mongoose";

const collectionName = 'carts'

const cartSchema = new mongoose.Schema({

    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"products",
                    quantity: {type: Number, default: 1}
                }
            }
        ],
        default: []
    }
})

const cartsModel =  mongoose.model(collectionName, cartSchema)
export default cartsModel