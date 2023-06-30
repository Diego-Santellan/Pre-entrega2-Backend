import dotenv from "dotenv";
dotenv.config();

export function soloAdmins (req, res, next){
    const esAdmin = true;
    if(!esAdmin) {
        res.json(crearErrorNoEsAdmin());
    }else{
        next();
    }
}

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

export default soloAdmins;