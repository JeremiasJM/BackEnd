import express from 'express'
import handlebars from 'express-handlebars'
import productsRouter from './Routers/products.router.js';
import cartsrouter from './Routers/carts.router.js';
import viewsRouter from './Routers/views.router.js'
import rtpRouter from './Routers/rtp.router.js'
import __dirname from './utils.js'
import { Server } from 'socket.io'

const app= express();

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

app.use(express.json());

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsrouter)
app.use('/', viewsRouter)
app.use('/realtimeproducts', rtpRouter)


const httpServer= app.listen(8080, ()=>console.log("server up"))

const socketServer = new Server(httpServer) 

socketServer.on('connection', socketClient =>{
    socketClient.on('productList', pList =>{
        socketServer.emit(pList)
    })
})