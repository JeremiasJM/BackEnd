import { Router } from "express"
import ProductManager from "../dao/Manager/ProductManager.js"

const router= Router()
const manager= new ProductManager()

const pList= manager.getProducts()

// GET /realtimeproducts
router.get('/', (req, res)=>{
    res.render('realTimeProducts', {pList})
})
//POST /realtimeproducts
router.post('/',(req, res)=>{
    const data= req.body
    
    if(!data.title || !data.description || !data.price || !data.stock|| !data.category){
        res.status(206).send("incomplete fields")
   }else{
        manager.addProducts(data)
        res.render('realTimeProducts')
    }
})

export default router