import productRouter from "./Routers/products.router.js";
import cartRouter from "./Routers/carts.router.js";
import chatRouter from "./Routers/chat.router.js";
import messagesModel from "./dao/models/message.model.js";
import productViewsRouter from "./Routers/productViews.router.js";
import sessionRouter from "./Routers/session.router.js";

const run = (socketServer, app) => {
    app.use((req,res,next)=>{
        req.io = socketServer
        next()
    })

    app.use("/products", productViewsRouter);
    app.use("/session", sessionRouter);

    app.use("/api/products", productRouter);
    app.use("/api/carts", cartRouter);
    app.use("/api/chat", chatRouter);

    socketServer.on("connection", socket =>{
        console.log("New Client Connected");
        socket.on("message", async data =>{
            await messagesModel.create(data)
            let messages = await messagesModel.find().lean().exec();
            socketServer.emit("logs", messages);
        });
    });

    app.use("/", (req,res) => res.send("HOME"));
}

export default run