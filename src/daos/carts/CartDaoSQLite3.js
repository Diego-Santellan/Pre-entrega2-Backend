import config from "../../config"
import SQLContainer from "../../containers/SQLContainer.js"

class CartDaoSQLite3 extends SQLContainer{
    constructor() {
        super(config.sqlite3, config.sqlite3)
    }
}
export default CartDaoSQLite3;