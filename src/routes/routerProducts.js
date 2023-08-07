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
    res.render('products', {products: products, esAmind: req.usuarioEsAdmin})
        
});

routerProducts.get('/:id', async (req, res) => {        //Buscar productos por id
    // res.json( await productsApi.toList(req.params.id) )
    const producto =  await productsApi.toList(req.params.id) 
    res.render('productDetail', {producto: producto})

});

routerProducts.post("/search", async (req,res) =>{      //Buscar productos por nombre
    const products = await productsApi.searchProducts(req.body.title);
    res.render('products', {products: products})

})

routerProducts.post('/', soloAdmins, async (req, res) => {      //Guardar producto
    // res.json(await productsApi.save(req.body))
    await productsApi.save(req.body)
    res.redirect('/api/products/')

});

routerProducts.put('/:id', soloAdmins, async (req, res) => {        //Actualizar producto
    res.json( await productsApi.update(req.body, req.params.id) )
});

routerProducts.delete('/:id', soloAdmins, async (req, res) => {     //Eliminar producto
    res.json( await productsApi.delete(req.params.id) )
});

export default routerProducts;