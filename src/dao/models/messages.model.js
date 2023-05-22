import mongoose from "mongoose";

const messagesCollection = 'messages' 

const messagesScheme = mongoose.Schema({
    user: String,
    messages: String,
    
})

const messagesModel = mongoose.model(messagesCollection, messagesScheme)

export default messagesModel