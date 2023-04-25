// Este archivo esta vinculado a server.js y products.html, 
// utilizando los metodos: get, post, put y delete para modificar la lista de productos (viendo lo desde un lado del administrador)

const ApiProducts = {
    get: () =>{
        return fecht('/api/products').then(data => data.json())
    },

    post: (newProducts) =>{
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProducts)
        }
        return fecht('/api/products', options)
    },

    put: (idProducts, newProducts) => {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProducts)
        }
        return fecht(`/api/products/${idProducts}`, options)

    },

    delete: (idProducts) => {
        const options = {
            method: 'DELETE',
        }
        return fecht(`/api/products/${idProducts}`, options)

    }
}

//---------------------------------------------------------------------
//PRODUCTOS
updateProductList()

const addProductForm = document.getElementById('addProductForm');
addProductForm.addEventListener('submit', e => {
    e.preventDefault()
    const product = readProductFrom()
    ApiProducts.post(product)
        .then(updateProductList)
        .then(() => {
            addProductForm.reset()
        })
        .catch((error) => {
            alert(error.message)
        })
})

//Leer el formulario de productos
function readProductFrom() {
    const product = {
        title: addProductForm[0].value,
        price: addProductForm[1].value,
        thumbnail: addProductForm[2].value
    }
    return product
}

//Actualizar lista de productos
function updateProductList() {
    return ApiProducts.get()
        .then(prods => makeHtmlTable(prods))
        .then(html => {
            document.getElementById('products').innerHTML = html

        })
}

//Borrar producto
function deleteProduct(idProd) {
    ApiProducts.delete(idProd)
        .then(updateProductList)
}

//Actualizar producto
function updateProduct(idProd) {
    const newProduct = readProductFrom()
    ApiProducts.put(idProd, newProduct)
        .then(updateProductList)
}

//Llenar formuario
function fillForm(title = '', price ='', thumbnail ='') {
    addProductForm[0].value = title
    addProductForm[1].value = price
    addProductForm[2].value = thumbnail
}

//Hacer la tabla en el HTML
function makeHtmlTable(products) {
    let html = ``

    if (products.length > 0) {
        html +=`
        
        <h2>Lista de Productos</h2>
        <div class="table-responsive">
            <table class="table table-dark">
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Foto</th>
                </tr>

        `
        for ( const prod of products) {
            html +=`
                <tr>
                    <td><a type="button" onclick="fillForm('${prod.title}', '${prod.price}','${prod.thumbnail}')" title="copiar a formulario...">${prod.title}</a></td>
                    <td>$${prod.price}</td>
                    <td><img width="50" src=${prod.thumbnail} alt="imagen no cargada"></td>
                    <td><a type="button" onclick="deleteProduct('${prod.id}')">borrar producto</a></td>
                    <td><a type="button" onclick="updateProduct('${prod.id}')">actualizar producto</a></td>
                </tr>`
            
        }
        html +=`
                
            </table>
        </div >
        `
    }
    return Promise.resolve(html)
}