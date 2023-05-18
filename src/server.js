//NOTA: en caso de que algo no ande fijarse si alguno de los import llevaba->{}
import express from 'express';
import session from 'express-session';
import  ExpressHandlebars from "express-handlebars";
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import options from './config/options.js';
import { checkUserLogged } from "./middlewares/verificarUser.js";
import routerCarts from './routes/routerCarts.js';
import routerProducts from './routes/routerProducts.js';
import routerAuth from './routes/routerAuth.js';


//coexion a la db
mongoose.set('strictQuery', false);     //ese comando nos lo da visual para que nos deje de aparecer una advertensia 
mongoose.connect(options.options.mongoDB.url, (err)=>{
    if(err)return console.log(`Error al conectarse a la base de datos---> ${err}`);
    console.log('Conexion a la DB exitosa!!');

})


// Instancio el servidor
const app = express();


//motor de plantilla
//inicializar el motor de plantillas
app.engine(".hbs",ExpressHandlebars.engine({extname: '.hbs'}));
//ruta de las vistas
app.set("views", __dirname+"/views");
//vinculacion del motor a express
app.set("view engine", ".hbs");


//Agrego  middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


//configuracion de la sesion
app.use(session({
    store:MongoStore.create({ //le indicamos que vamos a  tener una conexion externa, en este caso con mongo atlas
        mongoUrl:options.mongoDB.url
    }),

    secret:"claveSecreta", //clave de encriptacion de la sesion

    //config para guardar en la memoria del servidor
    resave:false,
    saveUninitialized:false,
}));


//configurar passport
app.use(passport.initialize()); //como inicializar passport dentro de nuestra sesion
app.use(passport.session()); //vinculamos a passport con una sesion, para que luego de la autenticacion le asignaemos una session al usuario y con ello poder utilizar bien todos los metodos


let users =[]; //---> [{name:"diego", username:diego10, password:"123321"}]


//routes
app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);
app.use('/api/auth', routerAuth);

app.get("/home", (req,res)=>{
    res.render("home");
});

app.get("/perfil", checkUserLogged,  (req, res) => {
    res.render("profile");
});

export default app