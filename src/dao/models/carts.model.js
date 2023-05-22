import mongoose from "mongoose";

const cartsCollection = 'carts' 

const cartsScheme = mongoose.Schema({
    title: String,
    idproducto: String,
    quantity: String
})

const cartsModel = mongoose.model(cartsCollection, cartsScheme)

export default cartsModel