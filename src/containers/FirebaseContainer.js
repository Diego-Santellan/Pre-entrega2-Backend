
import admin from "firebase-admin"
import config from "../config.js"

admin.initializeApp({
    credential: admin.credential.cert(config.firebase),
    databaseURL: 'https://proyectofinalback-end.firebaseio.com',
})
console.log('Base Firebase conectada!!');

const db = admin.firestore();

class firebaseContainer {

    constructor(nombreColeccion) {
        this.coleccion = db.collection(nombreColeccion);
    }

    async toListAll(){
        try {
            
        } catch (error) {
            console.log(`Error al listar: ${error}`);
        }

    }

    async toList(id) {

    
    }

    async save(obj) {
        try {
            
        } catch (error) {
            console.log(`Error al guardar: ${error}`);
        }

    }

    async update(obj, id) {

        
    }

    async delete(id) {

    }

    async deleteAll() {

    }
}

export default firebaseContainer