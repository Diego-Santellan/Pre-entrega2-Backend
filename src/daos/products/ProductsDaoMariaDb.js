import config from "../../config";
import SQLContainer from "../../containers/SQLContainer.js";

class ProductsDaoMariaDb extends SQLContainer{
     
    constructor() {
        super(config.mariaDb, 'products')
    }
}

export default ProductsDaoMariaDb