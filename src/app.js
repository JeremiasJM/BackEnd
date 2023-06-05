import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import { Server } from 'socket.io'
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';


import productsRouter from './Routers/products.router.js';
import cartsRouter from './Routers/carts.router.js';
import rtpRouter from './Routers/rtp.router.js'
import chatRouter from './Routers/chat.router.js';
import { messageModel } from './dao/models/messageModel.js';
import homeRouter from "./Routers/home.router.js"
import productviewRouter from './Routers/productViews.router.js'
import userRouter from "./Routers/users.router.js"

mongoose.set('strictQuery', false)

const uri = 'mongodb+srv://topolobo:je10re9mias@cluster0.50zimzz.mongodb.net/ecommerce'
const app= express();

app.use(session({
    store: MongoStore.create({
        mongoUrl: uri,
        dbName:'ecommerce',
        mongoOptions:{
            useNewUrlParser: true,
            useUnifiedTopology:true,
        },
        ttl:120, 
        
    }),
    secret: 'coder',
    resave: true,
    saveUninitialized:true
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')


app.use("/", homeRouter);

app.use("/", userRouter);
app.use('/api/products', productsRouter)
app.use('/products', productviewRouter)
app.use('/api/carts', cartsRouter)
app.use('/chat', chatRouter)
app.use('/realtimeproducts', rtpRouter)




try {
    await mongoose.connect(
        "mongodb+srv://topolobo:je10re9mias@cluster0.50zimzz.mongodb.net/ecommerce",
        {
            serverSelectionTimeoutMS: 5000,
        },
    );
    console.log("DB conected");
    const httpServer = app.listen(8080, () => {
        console.log("Server UP");
    });

    const socketServer = new Server(httpServer);

    socketServer.on("connection", (socketClient) => {
        //const prod = new ProductManager("./src/data/productos.json");
        console.log("User conected");
        socketClient.on("deleteProd", (prodId) => {
            const result = prod.deleteProduct(prodId);
            if (result.error) {
                socketClient.emit("error", result);
            } else {
                socketServer.emit("products", prod.getProducts());
                socketClient.emit("result", "Producto eliminado");
            }
        });
        socketClient.on("addProd", (product) => {
            const producto = JSON.parse(product);
            const result = prod.addProduct(producto);
            if (result.error) {
                socketClient.emit("error", result);
            } else {
                socketServer.emit("products", prod.getProducts());
                socketClient.emit("result", "Producto agregado");
            }
        });
        socketClient.on("newMessage", async (message) => {
            try {
                console.log(message);
                let newMessage = await messageModel.create({
                    user: message.email.value,
                    message: message.message,
                });
                console.log("app", newMessage);
                socketServer.emit("emitMessage", newMessage);
            } catch (error) {
                console.log(error);
                socketClient.emit("error", error);
            }
        });
    });
} catch (error) {
    console.log(error);
}
