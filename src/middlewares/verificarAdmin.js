//permisos para el administrador
const esAdmin = process.env.ADMIN;

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

export function soloAdmins(req, res, next) {
    if(!esAdmin) {
        res.json(crearErrorNoEsAdmin());
    }else{
        next();
    }
}
export default {soloAdmins};