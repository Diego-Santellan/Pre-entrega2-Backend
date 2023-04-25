import ArchiveContainer from "../../containers/ArchiveContainer.js"

class ProductsDaoArchive extends ArchiveContainer{

    constructor() {
        super('products.json')
    }

}

export default ProductsDaoArchive;