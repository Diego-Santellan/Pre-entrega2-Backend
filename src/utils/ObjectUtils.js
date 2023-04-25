export const asPOJO = obj => JSON.parse(JSON.stringify(obj)) // esto hace una copia del objeto y lo convierte en un objeto plano (POJO)


/* 
    POJO son las iniciales de "Plain Old Java Object", traducciòn "Un objeto Java Plano Antiguo". 
    Un POJO es una instancia de una clase que no extiende ni implementa nada en especial. 
    Sirve para enfatizar el uso de clases simples y que no dependen de un framework en especial.
*/

export const renameField = (record, from, to) => { // esto renombra un campo de un objeto
    record[to] = record[from] // asigna el valor del campo from al campo to
    delete record[from] // elimina el campo from
    return record // retorna el objeto
}
export const removeField = (record, field) => { // esto elimina un campo de un objeto
    const value = record[field] // guarda el valor del campo
    delete record[field] // elimina el campo
    return value // retorna el valor del campo
}

//para que se hace esto es para que no se pueda modificar el objeto original y se pueda hacer una copia del objeto y modificarlo