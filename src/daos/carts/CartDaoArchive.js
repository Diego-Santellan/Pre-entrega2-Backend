import ArchiveContaine from "../../containers/ArchiveContainer.js";

class CartDaoArchive extends ArchiveContaine{
    constructor(){
        super('carrito.json');
    }

    async save(cart = {products :[] }) {            //Se utiliza el metodo save del contenedor padre, al cual por defecto se le da como carrito un array vacio
        return super.save(cart)         //El super llama al metodo save del contenedor padre, para guardar los productos, y devuelve el resultado
    }
}

export default CartDaoArchive;