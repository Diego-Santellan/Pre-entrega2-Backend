import MemoryContainer from "../../containers/MemoryContainer.js"

class CartDaoMemory extends MemoryContainer {

    async save(cart = {products :[] }) {            
        return super.save(cart)        
    }
}

export default CartDaoMemory;