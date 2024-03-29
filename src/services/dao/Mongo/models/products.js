import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const collectionName = 'products'

const stringTypeNonUniqueRequired = {
    type: String,
    required: true
}
const stringTypeUniqueRequired = {
    type: String,
    unique: true,
    required: true
}
const booleanTypeNonRequired={
    type: Boolean,
    default: true
}
const numericTypeRequired={
    type: Number,
    required: true
}

const productsSchema = mongoose.Schema({
    title:stringTypeNonUniqueRequired,
    description:stringTypeNonUniqueRequired,
    code:stringTypeUniqueRequired,
    price:numericTypeRequired,
    status:booleanTypeNonRequired,
    stock:numericTypeRequired,
    category:stringTypeNonUniqueRequired,
    thumbnails: {
        type: [
            {
                url: {type: String}
                
            }
        ],
        default: []
    }
})
productsSchema.plugin(mongoosePaginate)
const productsModel = mongoose.model(collectionName, productsSchema)
export default productsModel