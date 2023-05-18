import knex from 'knex'
import config from '../src/config/config.js'


//opciones SQL
createTableProducts(knex(config.sqlite3))
createTableCart(knex(config.sqlite3))

//------------------------------------------
// products
async function createTableProducts(sqlClient){

    try {
        
        await sqlClient.schema.dropTableIfExists('products')
        
        await sqlClient.schema.createTable('products', table => {
            table.increments('id').primary()
            table.string('title', 30).notNullable()
            table.float('price').notNullable()
            table.string('thumbnail', 1024)
        })
        
        await sqlClient.destroy()
        
        console.log('tabla products en sqlite3 creada con éxito')
    } catch (error) {
        console.log('error al crear tabla products en sqlite3')
        console.log(error)
    }
    
}


//------------------------------------------
// cart
async function createTableCart(sqlClient) {
    
    try {
        await sqlClient.schema.dropTableIfExists('cart');
        
        await sqlClient.schema.createTable('cart', table => {
            table.increments('id').primary();
            table.boolean('deleted').defaultTo(false);
        })

        await sqlClient.schema.dropTableIfExists('productsInCart');

        await sqlClient.schema.createTable('productsInCart', table => {
            table.increments('id').primary()
            table.integer('idCart').notNullable()
            table.string('title', 30).notNullable()
            table.float('price').notNullable().notNullable()
            table.string('thumbnail', 1024)
        })
        
        await sqlClient.destroy();
        
        console.log('tablas carritos en sqlite3 creada con éxito')
    } catch (error) {
        console.log('error al crear tabla carritos en sqlite3')
    }
}


//------------------------------------------
// messages en SQLite3
try {
    const sqlite3Client = knex(config.sqlite3);
    
    await sqlite3Client.schema.dropTableIfExists('messages');
    
    await sqlite3Client.schema.createTable('messages', table => {
        table.increments('id').primary();
        table.string('autor', 30);
        table.string('texto', 128);
        table.string('fyh', 50);
    })
    
    await sqlite3Client.destroy();
    
    console.log('tabla messages en sqlite3 creada con éxito')
} catch (error) {
    console.log('error al crear tabla messages en sqlite3')
}

