import express from 'express'
import handlebars from 'express-handlebars'
import productsRouter from './Routers/products.router.js';
import cartsRouter from './Routers/carts.router.js';
import viewsRouter from './Routers/views.router.js'
import rtpRouter from './Routers/rtp.router.js'
import __dirname from './utils.js'
import { Server } from 'socket.io'
import mongoose from 'mongoose';
import messagesRouter from './Routers/messages.router.js';


const uri = 'mongodb+srv://topolobo:je10re9mias@cluster0.50zimzz.mongodb.net/ecommerce'
const app= express();

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/products', productsRouter)
app.use('/carts', cartsRouter)
app.use('/', viewsRouter)
app.use('/messages', messagesRouter)
app.use('/realtimeproducts', rtpRouter)


mongoose.set('strictQuery', false)
try{
    await mongoose.connect(uri)
    console.log('DB connected!')
    const httpServer= app.listen(8080, ()=>console.log("server up"))

    const io = new Server(httpServer)    
   
}catch(err){
    console.log('Nose puede conectar a la DB')
}



/* const httpServer= app.listen(8080, ()=>console.log("server up"))

const socketServer = new Server(httpServer) 

socketServer.on('connection', socketClient =>{
    socketClient.on('productList', pList =>{
        socketServer.emit(pList)
    })
}) */