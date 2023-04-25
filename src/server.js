import express from 'express';
const {Router} = express;

import {
    productsDao as productsApi,
    cartsDao as cartsApi
} from './daos/index.js';


// Instancio el servidor
const app = express();


//permisos para el administrador
const esAdmin = true;

function crearErrorNoEsAdmin(ruta, metodo) {
    const error = {
        error: -1,
    }
    if(ruta && metodo){
        error.description = `ruta${ruta} o metodo ${metodo} no autorizado`
    } else{
        error.description ='no autorizado'
    }
    return error
}

function soloAdmins(req, res, net) {
    if(!esAdmin) {
        res.json(crearErrorNoEsAdmin())
    }else{
        next()
    }
}


// Config routerProducs
const routerProducts = new Router();

routerProducts.get('/', async (req, res) => {       //Listar todos los productos
    const products = await productsApi.toListAll()
    res.json( products )
    
})

routerProducts.get('/:id', async (req, res) => {        //Buscar productos por id
    res.json( await productsApi.toList(req.params.id) )

})

routerProducts.post('/', soloAdmins, async (req, res) => {      //Guardar producto
    res.json( await productsApi.save(req.body) )

})

routerProducts.put('/:id', soloAdmins, async (req, res) => {        //Actualizar producto
    res.json( await productsApi.update(req.body) )
})

routerProducts.delete('/:id', soloAdmins, async (req, res) => {     //Eliminar producto
    res.json( await productsApi.delete(req.params.id) )
})


// Config routerCarts
const routerCarts = new Router();

routerCarts.get('/', async (req, res) => {       //Listar todos los productos carritos
    res.json( (await cartsApi.toListAll()).map(c => c.id) )
    
})

routerCarts.post('/:id/products', async (req, res) => {     //Agrega un producto al carrito 
    const cart = await cartsApi.listar(req.params.id)       //Busco el carrito en la base de datos de carritos 
    const product = await cartsApi.listar(req.body.id)      //Busco el producto en la base de datos de productos 
    cart.products.push(product)         //Agrego el producto al carrito en memoria (no en la base de datos) 
    await cartsApi.update(cart)         //Actualizo el carrito con el nuevo producto agregado
    res.end()       // "end" es para que no devuelva nada en el body de la respuesta (si no, devuelve un objeto vacío)
})

routerCarts.post('/', async (req, res) => {      //Guardar carrito
    res.json(await cartsApi.save())

})

routerCarts.delete('/:id', async (req, res) => {     //Eliminar carrito
    res.json( await cartsApi.delete(req.params.id) )
})



// Config de products en routerCart
routerCarts.get('/:id/products', async (req, res) => {
    const cart = await cartsApi.toList(req.params.id)
    res.json(cart.products)
})


routerCarts.delete('/:id/products/:idProd', async (req, res) => {
    const cart = await cartsApi.toList(req.params.id)
    const index = cart.products.findIndex(p => p.id == req.params.idProd)
    if (index != -1) {
        cart.products.splice(index, 1)
        await cartsApi.update(cart)
    }
    res.end()
})



//Agrego  middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/products', routerProducts)
app.use('/api/carts', routerCarts)


export default app