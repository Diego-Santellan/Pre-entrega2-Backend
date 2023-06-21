import express from 'express';
import {soloAdmins}  from '../middlewares/verificarAdmin.js';

const {Router} = express;

import {
    productsDao as productsApi,
} from '../daos/index.js';


// Config routerProducs
const routerProducts = new Router();

routerProducts.get('/', async (req, res) => {       //Listar todos los productos
    const products = await productsApi.toListAll()
    res.json( products )
    
});

routerProducts.get('/:id', async (req, res) => {        //Buscar productos por id
    res.json( await productsApi.toList(req.params.id) )

});

routerProducts.post('/', soloAdmins, async (req, res) => {      //Guardar producto
    res.json( await productsApi.save(req.body) )

});

routerProducts.put('/:id', soloAdmins, async (req, res) => {        //Actualizar producto
    res.json( await productsApi.update(req.body, req.params.id) )
});

routerProducts.delete('/:id', soloAdmins, async (req, res) => {     //Eliminar producto
    res.json( await productsApi.delete(req.params.id) )
});

export default routerProducts;