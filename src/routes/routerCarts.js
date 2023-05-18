import express from 'express';

const {Router} = express;

import { cartsDao as cartsApi } from '../daos/index.js';

// Config routerCarts
const router = new Router();

router.get('/', async (req, res) => {       //Listar todos los productos carritos
    res.json( (await cartsApi.toListAll()).map(c => c.id) )
    
})

router.post('/:id/products', async (req, res) => {     //Agrega un producto al carrito 
    const cart = await cartsApi.listar(req.params.id)       //Busco el carrito en la base de datos de carritos 
    const product = await cartsApi.listar(req.body.id)      //Busco el producto en la base de datos de productos 
    cart.products.push(product)         //Agrego el producto al carrito en memoria (no en la base de datos) 
    await cartsApi.update(cart)         //Actualizo el carrito con el nuevo producto agregado
    res.end()       // "end" es para que no devuelva nada en el body de la respuesta (si no, devuelve un objeto vacío)
})

router.post('/', async (req, res) => {      //Guardar carrito
    res.json(await cartsApi.save())

})

router.delete('/:id', async (req, res) => {     //Eliminar carrito
    res.json( await cartsApi.delete(req.params.id) )
})


// Config de products en routerCart
router.get('/:id/products', async (req, res) => {
    const cart = await cartsApi.toList(req.params.id)
    res.json(cart.products)
})


router.delete('/:id/products/:idProd', async (req, res) => {
    const cart = await cartsApi.toList(req.params.id)
    const index = cart.products.findIndex(p => p.id == req.params.idProd)
    if (index != -1) {
        cart.products.splice(index, 1)
        await cartsApi.update(cart)
    }
    res.end()
})


export default {routerCarts:router};