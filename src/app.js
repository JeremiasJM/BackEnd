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


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));
app.use(cookieParser())
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

const URI = 'mongodb+srv://topolobo:je10re9mias@cluster0.50zimzz.mongodb.net/ecommerce';
const BD_NAME= 'ecommerce';

app.use(session({
    
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));

initializePassport();
app.use(passport.initialize());
app.use(passport.session());


try {
    await mongoose.connect(URI, {
    dbName: BD_NAME
    });

    const httpServer = app.listen(8080, () => console.log('Server Up!!!'));
    const socketServer = new Server(httpServer);
    httpServer.on('error', (e) => console.log('ERROR:' + e));

    run(socketServer, app);
} catch (error) {
    console.log(error);
}