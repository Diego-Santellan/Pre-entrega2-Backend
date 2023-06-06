import MongoDBContainer from "../../containers/mongoDBContainer.js";

class ProductsDaoMongoDB extends MongoDBContainer{
    constructor(){
        super('products',{
            title: { type: String, required: true },
            price: { type: Number, required: true },
            thumbnail: { type: String, required: true },
        });
    }

}

export default ProductsDaoMongoDB;