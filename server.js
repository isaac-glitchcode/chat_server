const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);

const socketio = require('socket.io');
const io = socketio(server);

//Conexión 
io.on('connection', socket => {
    // let messages =[]
    //Para cuando alguien se conecte
    socket.on('Conected', (name) => {
        //Cada vez que un cliente se conecte, se ejecutará lo siguiente
        console.log(name + " Conected! ")
    })

    socket.on('Message', (name,content) => {
        //Enviar msn a los clientes que llegue al servidor
        io.emit("Messages", {name,content});
    })

   

    socket.on('Disconnected', () => {
        io.emit("Message", {server: "Server", message:"Disconnected"});
    })
});

server.listen(3000, () => console.log("Server Connected!"));