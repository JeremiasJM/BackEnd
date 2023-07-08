import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import { Server } from 'socket.io'
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import run from "./run.js";
import passport from "passport"
import cookieParser from 'cookie-parser';
import initializePassport from "./config/passport.config.js";
import env from './config/environment.config.js'


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));
app.use(cookieParser())
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')



app.use(session({ 
    
    secret:env.session_secret, 
    resave:true, 
    saveUninitialized:true
})); 
 
initializePassport();
app.use(passport.initialize());
app.use(passport.session());


try {
    await mongoose.connect(env.mongo_uri, {
    dbName: env.bd_name
    });

    const httpServer = app.listen(env.port, () => console.log('Server Up!!!'));
    const socketServer = new Server(httpServer);
    httpServer.on('error', (e) => console.log('ERROR:' + e));

    run(socketServer, app);
} catch (error) {
    console.log(error);
}