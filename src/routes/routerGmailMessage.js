import { express } from "express";
import { adminEmail, transporter } from "../message/gmail.js";


const {Router} = express;

// Config routerUsers
const router = new Router();


//template del cuerpo de mensaje que queremos crear
const emailTemplate = `
    <div>

        <h1>Nuevo pedido de ${user}</h1>

        <p>Lista de productos: ${products}</p>

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
router.post("/email-coder", async (req, res) => {
    try {
        await transporter.sendMail(mailOptions);
        res.send(`Se envio el mensaje a  ${usersEmail}`)
    } catch (error) {
        res.send(error)
    }
});

export default {routerGmailMessage: router}