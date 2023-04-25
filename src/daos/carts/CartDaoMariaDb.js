import config from "../../config"
import SQLContainer from "../../containers/SQLContainer.js"

class CartDaoMariaDb extends SQLContainer{
    constructor() {
        super(config.mariaDb, config.mariaDb)
    }
}
export default CartDaoMariaDb;