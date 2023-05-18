//permisos para el administrador
const esAdmin = true;

function crearErrorNoEsAdmin(ruta, metodo) {
    const error = {
        error: -1,
    }
    if(ruta && metodo){
        error.description = `ruta${ruta} o metodo ${metodo} no autorizado`
    } else{
        error.description ='no autorizado'
    }
    return error
}

function soloAdmins(req, res, net) {
    if(!esAdmin) {
        res.json(crearErrorNoEsAdmin())
    }else{
        next()
    }
}

module.exports = {soloAdmins};