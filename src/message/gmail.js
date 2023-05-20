import nodemailer from "nodemailer";

//credenciales del correo empresarial (correo equipo de ventas)
const adminEmail="diego.santellan2001@gmail.com";
const adminPasswordEmail="pihzmsotudqvckgc"


//configurar un canal para realizar el envio de mensajes
const transporter = nodemailer.createTransport({        //transporte va a ser el canal
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: adminEmail,
        pass: adminPasswordEmail,
    },

    //importante para agregar seguridad al canal de comunicacion
    secure:false,
    tls:{
        rejectUnauthorized:false
    }
});

export default {transporter, adminEmail};