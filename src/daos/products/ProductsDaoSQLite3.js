import config from "../../config";
import SQLContainer from "../../containers/SQLContainer.js";

class ProductsDaoSQLite3 extends SQLContainer{
    constructor() {
        super(config.sqlite3, 'products')
    }
}

export default ProductsDaoSQLite3