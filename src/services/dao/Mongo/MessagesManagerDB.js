import messagesModel from "./models/messages.js";

class MessagesManager{
    constructor(){
        console.log('Mensajes con persistencia de datos en mongoDB')
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