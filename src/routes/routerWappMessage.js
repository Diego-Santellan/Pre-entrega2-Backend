import  express from "express";
import  {twilioWapp, twilioCliente, adminWapp} from "../message/twilio-wapp.js";

const {Router} = express;

// Config routerUsers
const routerWappMessage = new Router();

routerWappMessage.post("/wapp-twilio", async (req, res) => {
    try {
        //crear el mensaje que vamos a enviar a traves de twilio
        const info = await twilioCliente.messages.create({
            from:twilioWapp,
            to:adminWapp,
            body: "Cuales son los puntos de venta de la tienda?"
        }); 
        console.log(info);
        res.send(`El mensaje de whatsapp se envio correctamente`);
    } catch (error) {
        res.send(error);
    }
});

export default routerWappMessage;