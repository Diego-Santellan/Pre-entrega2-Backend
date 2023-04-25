import knex from 'knex'
import config from '../src/config.js'


//opciones SQL
createTableProducts(knex(config.mariaDb))
createTableCart(knex(config.mariaDb))

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
        
        console.log('tabla products en mariaDb creada con éxito')
    } catch (error) {
        console.log('error al crear tabla products en mariaDb')
        console.log(error)
    }
    
}


//------------------------------------------
// cart
async function createTableCart(sqlClient) {
    
    try {
        await sqlClient.schema.dropTableIfExists('messages');
        
        await sqlClient.schema.createTable('messages', table => {
            table.increments('id').primary();
            table.string('autor', 30);
            table.string('texto', 128);
            table.string('fyh', 50);
        })
        
        await sqlClient.destroy();
        
        console.log('tabla messages en sqlite3 creada con éxito')
    } catch (error) {
        console.log('error al crear tabla messages en sqlite3')
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

