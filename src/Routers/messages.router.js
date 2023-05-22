import { Router } from "express";
import messagesModel from "../dao/models/messages.model.js"

const messagesRouter = Router();

messagesRouter.get('/', async (req,res)=>{
    const messages = await messagesModel.find().lean().exec()
    res.render('messages', messages)
})

export default messagesRouter