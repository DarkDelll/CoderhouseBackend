import mongoose from "mongoose";

const collection = "ticket"

const Schema = mongoose.Schema({
    code: {type: String, unique: true},
    purchase_datetime: {type: Date, default: Date.now},
    amount: {type: Number},
    purchaser:{type: String}
})

const ticketModel = mongoose.model(collection,Schema)
export default ticketModel