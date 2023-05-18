import { json } from 'express'

//la finalidad de este archivo es el switch, para denominar que persistencia de datos vamos a utilizar ya sea mongoDB, firebase,sql, etc.
let productsDao
let cartsDao

switch (process.env.PERS) {
    case 'json':
        const { default: ProductsDaoArchive } = await import('./products/ProductsDaoArchive.js')
        const { default: CartDaoArchive } = await import('./carts/CartDaoArchive.js')

        productsDao = new ProductsDaoArchive()
        cartsDao = new CartDaoArchive()
        
        break;

    case 'memory':        
        const { default: ProductsDaoMemory } = await import('./products/ProductsDaoMemory.js')
        const { default: CartDaoMemory } = await import('./carts/CartDaoMemory.js')
    
        productsDao = new ProductsDaoMemory()
        cartsDao = new CartDaoMemory()
     
        break;

    case 'mariadb':        
        const { default: ProductsDaoMariaDb } = await import('./products/ProductsDaoMariaDb.js')
        const { default: CartDaoMariaDb } = await import('./carts/CartDaoMariaDb.js')

        productsDao = new ProductsDaoMariaDb()
        cartsDao = new CartDaoMariaDb()
    
        break;

    case 'sqlite3':        
        const { default: ProductsDaoSQLite3 } = await import('./products/ProductsDaoSQLite3.js')
        const { default: CartDaoSQLite3 } = await import('./carts/CartDaoSQLite3.js')

        productsDao = new ProductsDaoSQLite3()
        cartsDao = new CartDaoSQLite3()
    
        break;

    case 'mongodb':        
        const { default: ProductsDaoMongoDB } = await import('./products/ProductsDaoMongoDB.js')
        const { default: CartDaoMongoDB } = await import('./carts/CartDaoMongoDB.js')

        productsDao = new ProductsDaoMongoDB()
        cartsDao = new CartDaoMongoDB()
    
        break;

    default: 
        break;
}


export {productsDao, cartsDao}