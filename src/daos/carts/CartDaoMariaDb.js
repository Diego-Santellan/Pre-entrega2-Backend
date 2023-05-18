import config from "../../config/config.js"
import SQLContainer from "../../containers/SQLContainer.js"

class CartDaoMariaDb extends SQLContainer{
    constructor() {
        super(config.mariaDb, config.mariaDb)
    }
}
export default CartDaoMariaDb;