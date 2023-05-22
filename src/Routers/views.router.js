import { Router } from "express";

import productsModel from "../dao/models/products.model.js";

const router = Router()


router.get('/', async (req, res)=>{
    const products = await productsModel.find().lean().exec()
    res.render('home', {products})
})

export default router