import mongoose from 'mongoose';
import { asPOJO, renameField, removeField } from "../utils/ObjectUtils.js";
// import config from '../config/config.js';

// await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)

class MongoDBContainer{
    
    constructor( nameCollection, esquema) {
        this.collection = mongoose.model(nameCollection, esquema)
    }

    async toList(id) {
        try {
            const docs = await this.collection.find({'_id': id}, {__v: 0})      //Buscamos el obj
            if (docs.length == 0) {        
                // throw new Error('Error id no encontrado');
                return {message:'Id no encontrado'}
            } else {
                const reuslt = renameField(asPOJO(docs[0]), '_id', 'id')    
                return reuslt
            }

        } catch (error) {
            // throw new Error(`Error al toList por id: ${error}`)
            return {message:'Id no encontrado'}
        }
    }

    async searchProducts(title) {
        // try {
        //     const docs = await this.collection.find({'title': title})      //Buscamos el obj
        //     if (docs.length == 0) {
        //         return {message:'Producto no encontrado'}
        //     } else {  
        //         return docs
        //     }

        // } catch (error) {
        //     return {message:'Producto no encontrado'}
        // }
        try {
            let docs = await this.collection.find({'title': title}, {__v: 0}).lean()      
            docs = docs.map(asPOJO)
            docs = docs.map( ds => renameField(ds,'_id', 'id'))
            return docs

        } catch (error) {
            throw new Error(`Error al toList todo: ${error}`)
        }

    }

    async toListAll() {
        try {
            let docs = await this.collection.find({}, {__v: 0}).lean()      
            docs = docs.map(asPOJO)
            docs = docs.map( ds => renameField(ds,'_id', 'id'))
            return docs

        } catch (error) {
            throw new Error(`Error al toList todo: ${error}`)
        }
    }

    async save(obj) {
        try {
            let doc = await this.collection.create(obj)
            doc = asPOJO(doc)
            renameField(doc, '_id', 'id')
            removeField(doc, '__v')
            return  doc

        } catch (error) {
            throw new Error(`Error al save: ${error}`)
        }
    }

    async update(newObj, id) {
        try {
            renameField(newObj, 'id', '_id')

            const { n, nModified } = await this.collection.updateOne({ '_id': id }, newObj)
                
            if (n == 0 || nModified == 0) {
                // throw new Error('Error al actualizar: no encontrado')
                return {message:'Error al actualizar: no encontrado'}
            } else {
                renameField(newObj, '_id', 'id')
                removeField(newObj, '__v')
                return asPOJO(newObj)
            }

        } catch (error) {
            // throw new Error(`Error al actualizar: ${error}`)
            return {message:`Error al actualizar`}
        }
        
    }

    async delete(id) {
        try {
            const {N, Ndeleted} = await this.collection.deleteOne({'_id': id})           
            if (N == 0 || Ndeleted == 0) {
                return {message:'Error al borrar: objeto no encontrado'}
            }
            return 'Eliminacion exitosa!'
        } catch (error) {
            return {message:`Error al delete`}
        }
    }

    async deleteAll() {
        try {
            await this.collection.deleteMany({})    
            return 'Eliminacion exitosa!'
        } catch (error) {
            throw new Error(`Error al delete: ${error}`)
        }
    }

}
export default MongoDBContainer

