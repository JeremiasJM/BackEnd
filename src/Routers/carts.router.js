import { Router } from "express";
import cartManager from '../dao/Manager/cartManager.js'
import __dirname from '../utils.js'
import cartsModel from "../dao/models/carts.model.js";


const cartsRouter= Router();

cartsRouter.get('/:cid', async (req,res)=>{
    const carts =await cartsModel.find().lean().exec()
    res.render('listcarts', {carts})
})

cartsRouter.get('/', (req,res)=>{
    res.render('createcarts',{})
})

cartsRouter.post('/', async (req,res)=>{
    const cartsNew = req.body
    const cartsGenerated = new cartsModel(cartsNew)
    await cartsGenerated.save()
    res.redirect(`/carts`)
})



/* const cartsRouter= Router()
const manager= new cartManager(__dirname+('/data/carts.json'))

//POST /api/carts --> create cart
cartsRouter.post('/', (req, res)=>{
    manager.createCart()
    res.status(201).send("New cart created")
})
//GET /api/carts/:cid ---> To list products in the cart whose id it's equal to cid
cartsRouter.get('/:cid', (req,res)=>{
    const cid= req.params.cid
    const list = manager.getProductsFromACart(cid)
    if(list == false){
        res.send(`The cart ${cid} doesn't exist`)
    }else{
        res.send(list)
    }
})
//POST /api/carts/:cid/products/:pid --> To add a product(pid) to a specific cart(cid)
cartsRouter.post('/:cid/products/:pid', (req, res)=>{
    const cid= req.params.cid
    const pid= req.params.pid
    manager.addProductToCart(cid,pid)
    res.status(201).send(`producto ${pid} añadido al carrito ${cid}`)

}) */
export default cartsRouter