import mongoose, { Mongoose } from "mongoose";

const productCollection = "product";

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
        unique: true
    },
    price:{
        type:Number,
        required: true
    },
    thumbnail:{
        type:String,
        required: true
    },
})

const ProductModel = mongoose.model(productCollection, productSchema);

export default ProductModel;