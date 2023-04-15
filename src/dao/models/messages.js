import mongoose from "mongoose";

const collectionName = 'messages'

const stringTypeNonUniqueRequired = {
    type: String,
    required: true
}

const messagesSchema = new mongoose.Schema({
    user: stringTypeNonUniqueRequired,
    message: stringTypeNonUniqueRequired
})

const messagesModel = mongoose.model(collectionName, messagesSchema)
export default messagesModel