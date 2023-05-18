import mongoose from "mongoose";

//definimos la collecion
const userCollection = "users";

//definimos los schemas
const userSchema = new mongoose.Schema({
    //definimos las propiedades y caracteristicas de los usuarios antes de guardar en al DB
    name:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true,
        unique: true    //coando para que no se vuelvan a repetir los nombres de los usuarios en la DB
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    age:{
        type:Number,
        require:true
    },
    phoneNumber:{
        type:String,
        require:true
    },
    avatar:{
        type:String,
        require:true
    },
    
});

//definimos el modelo    
const UserModel = mongoose.model(userCollection, userSchema);

export default UserModel;