import { Router } from "express";

import passport from "passport";

const sessionRouter = Router();

sessionRouter.get('/register', (req,res)=>{
    res.render('sessions/register');
});

sessionRouter.post('/register',
    passport.authenticate('register', {failureRedirect: '/session/failureRegister'}),
    async(req,res)=>{
        res.redirect('/session/login');
});

sessionRouter.get('/failureRegister',  (req,res)=>{
    res.send({error: 'failed!'});
});

sessionRouter.get('/login', (req,res)=>{
    res.render('sessions/login');
});

sessionRouter.post('/login',
    passport.authenticate('login', {failureRedirect:'/session/failLogin'}),
    async(req,res)=>{

        if(!req.user){
            return res.status(400).send({status: 'error', error: 'Invalid creadentials'});
        }

        req.session.user={
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            rol: req.user.rol
        }
        res.redirect('/products');
});
sessionRouter.get('/failLogin', (req, res)=>{
    res.send({error:'Fail login'})
})

sessionRouter.get('/logout', (req,res)=>{
    req.session.destroy(err=>{
        if(err){
            console.log('err');
            res.status(500).render('errors/base', {error: err})
        }else res.redirect('/session/login');
    })
});

export default sessionRouter