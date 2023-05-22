import mongoose from "mongoose";

const productsCollection = 'products' 

const productsScheme = mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    photo: String,
    price:Number,
    code: String,
    stock: Number,
    category:String,

})

const productsModel = mongoose.model(productsCollection, productsScheme)

export default productsModel