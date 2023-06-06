const postAuthController = (req,res) =>{
    res.redirect("/perfil")
    
};

const getRegistroAuthController = (req, res) => {
    const errorMsg = req.session.messages ? req.session.messages[0] :'';
    res.render("signup", {error: errorMsg});
    req.session.messages = [];
};

const getLoginAuthController = (req,res)=>{
    res.render("login");
};

const getLogoutAuthController = (req, res) => { 
    req.logout(error => {       
        if(error) return res.send("Hubo un error al cerrar la sesion");     //para eliminar la session de la db

        req.session.destroy( error => {
            if(error) return res.send("Hubo un error al cerrar la sesion");     //para eliminar la sesion del lado del servidor
            res.redirect("/home"); 
        });

    });
};

export default{ postAuthController, getRegistroAuthController, getLoginAuthController, getLogoutAuthController }