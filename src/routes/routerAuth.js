import { Router } from "express";
import passport from 'passport';
import { Strategy } from 'passport-local';
import UserModel from "../models/user/user.model.js";
import bcrypt from "bcryptjs";
import { checkUserLogged } from "../middlewares/verificarUser.js";
import soloAdmins from "../middlewares/verificarAdmin.js";

const routerAuth = new Router();

//serializacion y deserializacion
// serializar:{.. usuario} -> {id:1}  "Contexto: comvertimos a un usuario en un objeto"
passport.serializeUser((user, done) => {
    return done(null, user.id)
}); //req.session.passport.user = {id:1}    ---> por el metodo don que esp propio de js nos agarra al usuario y l convierte a un objeto que nos da un id en ese req que esta señalizado

// }); //req.user  -> se crea este objeto con los datos del usuario
passport.deserializeUser((id, done) => {
    UserModel.findById(id)
      .then(userDB => {
        return done(null, userDB);
      })
      .catch(err => {
        return done(err, null);
      });
});

//crear estrategia para registrar a los usuarios
passport.use("signupStrategy",new Strategy(//primer parametro nombre de la estrategia, segundo parametro logica de la estrategia para registrar a los usuarios
    {
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
        try {
            // LOGICA DEL REGISTRO
            // 1. Verificar si el usuario ya existe en la base de datos
            const userDB = await UserModel.findOne({ username: username });
    
            if (userDB) {
            return done(null, false, { message: "El usuario ya existe" });
            }
            
            //generamos el hash de la  contraseña utilizando bcrytp
            const salt = await bcrypt.genSalt(10);  // se utiliza bcrypt.genSalt para generar una sal aleatoria --> porque el 10? -->  El 10 refiere al costo del proceso de hash realizado por bcrypt. Bcrypt utiliza un algoritmo de hash adaptable que permite ajustar el costo computacional del proceso de hash. El costo determina la cantidad de iteraciones que bcrypt realizará para generar el hash. Un costo más alto aumenta la resistencia a ataques de fuerza bruta, pero también aumenta el tiempo necesario para calcular el hash. 10 es lo normal utilizable
            const hashedPassword = await bcrypt.hash(password, salt);   //bcrypt.hash para generar el hash de la contraseña proporcionada por el usuario.
                        
            // 2. Crear el nuevo usuario en la base de datos
            const newUser = {
                name: req.body.name,
                username: req.body.username,
                password: hashedPassword,
                email: req.body.email,
                address: req.body.address,
                age: req.body.age,
                phoneNumber: req.body.phoneNumber,
                thumbnail: req.body.thumbnail,
                role:'client'   
                
            };
  
            const userCreated = await UserModel.create(newUser);
            
            return done(null, userCreated, { message: "Usuario creado" });

        } catch (error) {
            return done(error, false, { message: "Hubo un error al crear el usuario" });
        }
    }
));
  

//creacion de estrategia para el login
passport.use("loginStrategy", new Strategy(
    {
        passReqToCallback:true,
    },
    (req, username, password, done) =>{
        UserModel.findOne({username:username})
            .then(async (userDB) => {
                if (!userDB) {
                    return done(null, false, {message: "El usuario no existe"});
                }
                try {
                    const isPasswordVaild = await bcrypt.compare(password, userDB.password);
                    if (!isPasswordVaild) {
                        return done(null, false, { message: "Contraseña incorrecta"});
                    }
                    return done (null, userDB);
                } catch (error) {
                    console.log(error);
                    return done(error);
                }
            });

    }
));



//ROUTERS
// Para registrar un usuario 
routerAuth.post("/signup", passport.authenticate("signupStrategy", {
    successRedirect: '/api/auth/perfil',
    failureRedirect:"/api/auth/registro",
    failureMessage:true, //req.session.messages => se genera un arreglo con mensajes
}));

routerAuth.get("/registro",  (req, res) => {
    const errorMsg = req.session.messages ? req.session.messages[0] :'';
    res.render("signup", {error: errorMsg});
    req.session.messages = [];
});

//para loguear un usuario
routerAuth.post("/login", passport.authenticate("loginStrategy", {
    successRedirect: '/api/auth/perfil',
    failureRedirect:"/api/auth/inicio-sesion",
    failureMessage:true, //req.session.messages => se genera un arreglo con mensajes
}));

routerAuth.get("/inicio-sesion", (req, res) => {
    const errorMsg = req.session.messages ? req.session.messages[0] :'';
    res.render("login", {error: errorMsg});
    req.session.messages = [];
});

//Perfil
routerAuth.get("/perfil", checkUserLogged, async (req,res)=>{
    const user = {
        name: req.user.name,
        age: req.user.age,
        address: req.user.address,
        email: req.user.email,
        thumbnail: req.user.thumbnail,
        role:'client'
    }
    res.render("profile",{user: user, esAmind: req.usuarioEsAdmin});
});

//Home
routerAuth.get("/home", checkUserLogged, soloAdmins,  (req, res) => {   
    res.render("home");
})

//Polictics
routerAuth.get("/politics", checkUserLogged, (req, res) => {
    res.render("politics");
})

//Nosotros
routerAuth.get("/nosotros", checkUserLogged, (req, res) => {
    res.render("nosotros");
})

//por lo general se usa un metodo post
routerAuth.get("/logout",  (req, res) => { 
    req.logout(error => {       
        if(error) return res.send("Hubo un error al cerrar la sesion");     //para eliminar la session de la db

        req.session.destroy( error => {
            if(error) return console.log("Hubo un error al cerrar la sesion");     //para eliminar la sesion del lado del servidor
            res.redirect("/api/auth/inicio-sesion"); 
        });

    });
});

export default routerAuth;