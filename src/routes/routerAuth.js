import express from 'express';
import passport from 'passport';
import { Strategy } from 'passport-local';
import UserModel from '../models/user.model';

const {Router} = express;

// Config routerUsers
const router = new Router();



//serializacion y deserializacion
// serializar:{.. usuario} -> {id:1}  "Contexto: comvertimos a un usuario en un objeto"
passport.serializeUser((user, done) => {
    return done(null, user.id)
}); //req.session.passport.user = {id:1}    ---> por el metodo don que esp propio de js nos agarra al usuario y l convierte a un objeto que nos da un id en ese req que esta señalizado

// deserializar:{id:1} -> {.. usuario} "Contexto: inverso a la serializacion"
passport.deserializeUser((id, done) =>{
//verificamos si el usuario existe en la DB
UserModel.findById(id, (err, userDB) => {
    return done(err, userDB);
})
}); //req.user  -> se crea este objeto con los datos del usuario


//crear estrategia para registrar a los usuarios
passport.use("signupStrategy", new Strategy(  //primer parametro nombre de la estrategia, segundo parametro logica de la estrategia para registrar a los usuarios
    {
        passReqToCallback: true,
    },
    (req, username, password, done) =>{
        //logica del registro
        //1. Verificar si ya el usuario existe en la db
        UserModel.findOne({username: username}, (err,userDB) => { 
            if(err) return done(err, false, {message:`Hubo un error al buscar el usuario ${err}`});
            if(userDB) return done(null, false, {message: " El usuario ya existe"});

            //2. Si el usuario no existe, cremaos el usuario en la DB
            const newUser ={
                name:req.body.name,
                username: username,
                password: password,
                emil: emil,
                address: address,
                age: age, 
                phoneNumber: phoneNumber,
                avatar: avatar
            };
            UserModel.create(newUser, (err, userCreated) => {
                if (err) return done(err, false, {message:`Hubo un error al crear el usuario`});
                return done(null, userCreated, {message: "Usuario creado"});
            });
        });
    }
));


//ROUTERS

//Para registrar un usuario (tipo crear cuenta)
router.post("/signup", passport.authenticate("signupStrategy", {
    failureRedirect:"/registro",
    failureMessage:true //req.session.messages => se genera un arreglo con mensajes
}), (req, res) => {     
    res.redirect("/perfil")

});

router.get("/registro",  (req, res) => {
    const errorMsg = req.session.messages ? req.session.messages[0] :'';
    res.render("signup", {error: errorMsg});
    req.session.messages = [];
});

//Para inicio de sesion
router.post("/login", (req,res) =>{
    
});

router.get("/inicio-sesion",(req,res)=>{
    res.render("login");
});

//por lo general se usa un metodo post
router.get("/logout",  (req, res) => { 
    req.logout(error => {       
        if(error) return res.send("Hubo un error al cerrar la sesion");     //para eliminar la session de la db

        req.session.destroy( error => {
            if(error) return res.send("Hubo un error al cerrar la sesion");     //para eliminar la sesion del lado del servidor
            res.redirect("/home"); 
        });

    });
});


export default {routerAuth:router};