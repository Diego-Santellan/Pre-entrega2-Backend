import { Router } from "express";
import http from "https";
import { Server } from "socket.io";

// Crear la aplicación Express y el servidor HTTP
const routerSocket = new Router();
const  server = http.createServer(routerSocket);
const io = Server(server);


// Configurar la ruta para servir el cliente
routerSocket.get("/", (req, res) =>{
    res.sendFile(__dirname + '/home.hbs')
});


// Escuchar conexiones de clientes
io.on('connection', (Socket) =>{
    console.log('Un usuario se a conectado');

    
    // Escuchar mensajes del cliente
    Socket.on('chat message', (msg) => {
        console.log('Mensaje recibido: ' + msg);
        io.emit('chat message', msg ) // Emitir el mensaje a todos los clientes conectados.
    });

    // Manejar la desconexión de un cliente
    Socket.on('disconnect', () => {
        console.log('El usuario se a desconectado');
    });
});

