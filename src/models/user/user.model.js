import mongoose from "mongoose";

//definimos la collecion
const userCollection = "users";

//definimos los schemas
const userSchema = new mongoose.Schema({
    //definimos las propiedades y caracteristicas de los usuarios antes de guardar en al DB
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique: true    //comando para que no se vuelvan a repetir los nombres de los usuarios en la DB
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    role:{
        type:String,
    },
    thumbnail:{
        type: String, 
    }
});

//definimos el modelo    
const UserModel = mongoose.model(userCollection, userSchema);

export default UserModel;