import messagesModel from "./models/messages.js";

class MessagesManager{
    constructor(){
        
    }
    async AllMessages(){
        let messages = await messagesModel.find()
        return messages.map(msg=>msg.toObject())
    }
    async createMessage(msg){
        let message = await messagesModel.create(msg)
        return message
    }


}

export default MessagesManager