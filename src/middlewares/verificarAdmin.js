import dotenv from "dotenv";
dotenv.config();

export function soloAdmins (req, res, next){
    if( req.user.role !== "admin") {
        res.json(crearErrorNoEsAdmin());
    }else{
        // const userAdmin = req.user.role == "admin";
        // console.log(userAdmin);
        // res.render('navBar', {userAdmin});;
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