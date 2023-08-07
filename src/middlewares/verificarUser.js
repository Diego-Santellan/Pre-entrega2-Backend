export const checkUserLogged = (req, res, next) => {
    //si el usuario esta autenticado
    if (req.isAuthenticated()) {      //si en sesion hay una varia user, quiere decir que esta autenticado, debido a que estaria la sesion iniciada
        req.usuarioEsAdmin = req.user.role === "admin"
        next();     //nos pasa al siguiente paso de la operacion, en este caso la de cerrar sesion
    } else {
        res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Redirec</title>
            <link rel="stylesheet" href="../../css/estilos.css">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
    
        </head>
        <body class="bg-secondary-light">

            <div class="d-flex justify-content-center mt-5 pt-5">

                <div class="p-4 w-50 border border-5 border-danger align-middle">
                    <h1 class="text-danger fw-bold p-1">Advertencia!</h1>
                    <p class="card-text">Para ver el contenido de esta pagina se require iniciar sesion.</p>
                    <br>
                    <a href="/api/auth/inicio-sesion" class="fs-4"> INICIAR SESION </a> 
                    <br>
                    <a href="/api/auth/registro" class="fs-6">Todavía no tienes una cuenta?, registrate</a>

                </div>
            </div>
        </body>
        </html>

        `)      //en caso de que no pase la autenticacion, lo retorna a inicio de sesion
    }
}

export default {checkUserLogged};