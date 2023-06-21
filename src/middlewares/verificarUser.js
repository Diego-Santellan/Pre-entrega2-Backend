export const checkUserLogged = (req, res, next) => {
    //si el usuario esta autenticado
    if (req.isAuthenticated()) {      //si en sesion hay una varia user, quiere decir que esta autenticado, debido a que estaria la sesion iniciada
        next();     //nos pasa al siguiente paso de la operacion, en este caso la de cerrar sesion
    } else {
        res.send(`<div>debes iniciar sesion <a href="/api/auth/inicio-sesion"> INICIAR SESION </a> </div>`)      //en caso de que no pase la autenticacion, lo retorna a inicio de sesion
    }
}

export default {checkUserLogged};