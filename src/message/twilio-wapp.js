import twilio from "twilio";

//credenciales para conectarnos alservicio de twilio
const accountID ="AC0b1d7f4b7ac25c6bf67d3926963eb540";
const accountToken ="408d839fae4fcb8a4df7126cf82b04d7";

//crear un cliente de node para conectarnos a twilio
const twilioCliente = twilio(accountID, accountToken);

//definimos los telefonos a los que vamos a mandar los msj
const twilioWapp="whatsapp:+14155238886"; //Numero que generamos desde twilio
const adminWapp="whatsapp:+5492494207711";

export default {twilioWapp, twilioCliente, adminWapp};
