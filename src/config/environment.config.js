import dotenv from 'dotenv'
dotenv.config()


export default{
    //app.js
    port: process.env.PORT,
    mongo_uri: process.env.MONGO_URI,
    session_secret: process.env.SESSION_SECRET,
    bd_name: process.env.DB_NAME,
    //github passport -- passport.config.js
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    //JWT
    jwt_private_key: process.env.JWT_PRIVATE_KEY,
    jwt_cookie_name: process.env.JWT_COOKIE_NAME
}