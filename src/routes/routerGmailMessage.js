import express from "express";
import { transporter } from "../message/gmail.js";


const {Router} = express;

// Config routerUsers
const routerGmailMessage = new Router();


//template del cuerpo de mensaje que queremos crear
const emailTemplate = `
    <div>
        <h1>Bienvenido!!</h1>
        <p>Ya puedes empezar a usar nuestros servicios</p>
        <a href="https://www.google.com/">Explorar</a>
    </div>
`
//correo de receptor
const usersEmail="diego_santellan@yahoo.com"
//Estructura del correo
const mailOptions = {
    from:"servidor node", //quien envia el correo
    to: usersEmail,//receptor del correo
    subject:"correo enviado desde node", //asunto del correo
    html: emailTemplate
}

//cramos una ruta para enviar el correro
routerGmailMessage.post("/email-coder", async (req, res) => {
    try {
        await transporter.sendMail(mailOptions);
        res.send(`Se envio el mensaje a  ${usersEmail}`)
    } catch (error) {
        res.send(error)
    }
});

export default routerGmailMessage;