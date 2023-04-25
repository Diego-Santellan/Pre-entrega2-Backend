const ApiProducts = {
    get: () => {
        return fetch('/api/products')
            .then(data => data.json())
    }
}

const ApiCarts = {
    createCart: () => {
        const options = { method: "POST"}
        return fetch('/api/carts', options)           
        .then(data => data.json())

    },

    getIds: () => {
        return fetch('/api/carts', options)           
        .then(data => data.json())
    },

    postPrduct: (idCart, idProduct) => {
        const data = {id: idProduct}
        const options = {
            method: 'POST',
            headers: {   
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
        return fetch(`/api/carts/${idCart}/products`, options)
    },

    getProducts: idCart => {
        return fetch(`/api/carts/${idCart}/products`)
            .then(data => data.json())

    },

    deleteProduct: (idCart, idProduct) => {
        const options = {
            method: 'DELETE',
        }
        return fetch(`/api/carts/${idCart}/products/${idProduct}`, options)
    }
}

loadComboProducts ()

loadComboCart()

document.getElementById('addToCartBTN').addEventListener('click', () => {
    const  idCart = document.getElementById('comboCart').value
    const  idProducts = document.getElementById('comboProducts').value
    if (idProducts && idCart) {
        addToCart(idProducts, idCart)
    } else {
        alert('se debe que seleccionar un carrito y un producto')
    }
})

document.getElementById('createCart').addEventListener('click', () =>{
    ApiCarts.createCart()
        .then(({id}) =>{
            loadComboCart().then(() => {
                const combo = document.getElementById('comboCart')
                combo.value =`${id}`
                combo.dispatchEvent(new Event('change'));
            })
        })
})

document.getElementById('comboCart').addEventListener('change',() => {
    const idCart = document.getElementById('comboCart').value
    updateCartList(idCart)
})

function addToCart(idCart, idProduct) {
    return ApiCarts.postPrduct(idCart, idProduct).then(() =>{
        updateCartList(idCart)
    })
}

function removeFromCart(idProduct) {
    const idCart = document.getElementById('comboCart').value
    return ApiCarts.deleteProduct(idCart, idProduct).then(() => {
        updateCartList(idCart)
    })
}

function updateCartList(idCart) {
    return ApiCarts.getProducts(idCart)
        .then(products => makeHtmlTable(products))
        .then( html =>
            document.getElementById('cart').innerHTML = html
        )
}

function makeHtmlTable(products) {
    let html =``

    if (products.length > 0) {
        html += `
        <h2>Lista de Productos</h2>
        <div class="table-responsive">
            <table class="table table-dark">
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Foto</th>
                </tr>
        `
        for (const prod of products) {
            html += `
                <tr>
                    <td>${prod.title}</td>
                    <td>$${prod.price}</td>
                    <td><img width="50" src=${prod.thumbnail} alt="imagen no cargada"></td>
                    <td><a type="button" onclick="removeFromCart('${prod.id}')">Eliminar del carrito</a></td>
                </tr>
            `
        }
        html += `
            </table>
        </div >`
    } else {
        
        html += `
            <br>
            <h2>carrito sin productos</h2>
        `
    }
    return Promise.resolve(html)
}

function createInitialOption(legend) {
    const defaultItem = document.createElement("option")
    defaultItem.value=''
    defaultItem.text=legend
    defaultItem.hidden=true
    defaultItem.disabled=true
    defaultItem.selected=true
    return defaultItem
}

function loadComboProducts() {
    return ApiProducts.get()
        .then(products => {
            const combo = document.getElementById('comboProducts');
            combo.appendChild(createInitialOption('elija un producto'));
            for (const prod of products) {
                const comboItem = document.createElement("option");
                comboItem.value = prod.id;
                comboItem.text = prod.title;
                combo.appendChild(comboItem);

            }
        })
}

function emptyCart(combo) {
    while (combo.childElementCount > 0) {
        combo.remove(0)
    }
}

function loadComboCart() {
    return ApiCarts.getIds()
        .then(ids => {
            const combo = document.getElementById('comboCart');
            emptyCart(combo);
            combo.appendChild(createInitialOption('elija un carrito'));
            for (const id of ids) {
                const comboItem = document.createElement("option");
                comboItem.value = id;
                comboItem.text = id;
                combo.appendChild(comboItem);

            }
        })
}