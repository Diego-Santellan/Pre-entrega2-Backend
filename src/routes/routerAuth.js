import express from 'express';
import passport from 'passport';
import { Strategy } from 'passport-local';
import UserModel from '../models/user.model';
import bcrypt from 'bcrypt';


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
        UserModel.findOne({username: username}, async (err,userDB) => { 
            if(err) return done(err, false, {message:`Hubo un error al buscar el usuario ${err}`});
            if(userDB) return done(null, false, {message: " El usuario ya existe"});

            try {
                //generamos el hash de la  contraseña utilizando bcrytp
                const salt = await bcrypt.genSalt(10);  // se utiliza bcrypt.genSalt para generar una sal aleatoria --> porque el 10? -->  El 10 refiere al costo del proceso de hash realizado por bcrypt. Bcrypt utiliza un algoritmo de hash adaptable que permite ajustar el costo computacional del proceso de hash. El costo determina la cantidad de iteraciones que bcrypt realizará para generar el hash. Un costo más alto aumenta la resistencia a ataques de fuerza bruta, pero también aumenta el tiempo necesario para calcular el hash. 10 es lo normal utilizable
                const hashedPassword = await bcrypt.hash(password, salt);   //bcrypt.hash para generar el hash de la contraseña proporcionada por el usuario.

                //2. Si el usuario no existe, cremaos el usuario en la DB
                const newUser ={
                    name:req.body.name,
                    username: username,
                    password: hashedPassword,
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

            } catch (error) {
                return done(error, false, {message:`Hubo un error al crear el usuario --> ${error} `})
            }

        });
    }
));


//creacion de estrategia para el login
passport.use("loginStrategy", new Strategy(
    {
        usernameField:'username',
        passwordField:'password',
    },
    (username, password, done) =>{
        UserModel.findOne({username: username}, async(err, userDB) => {
            if(err) return done(err, false, {message:`Hubo un error al buscar el usuario ${err}`});
            if(userDB) return done(null, false, {message: " El usuario no existe"});

            try {
                //comparar la contraseña proporcionada con el hash almacenado utilizando el metodo bcrypt.compare
                const passwordMatch = await bcrypt.compare(password, userDB.password);

                if (!passwordMatch) return done(null, flase, {message:`Contraseña incorrecta`});

                return done(null, userDB, {message:`Inicio de sesion exitosso`});

            } catch (error) {
                return done(error, false, { message: `Hubo un error al iniciar sesión` });
            }

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
router.post("/login", passport.authenticate("loginStrategy",{
    failureRedirect: "/inicio-sesion",
    failureMessage: true
}),(req,res) =>{
    res.redirect("/perfil")
    
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