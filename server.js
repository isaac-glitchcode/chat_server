const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);

const socketio = require('socket.io');
const io = socketio(server);

//Conexión 
io.on('connection', socket => {
    //Para cuando alguien se conecte
    socket.on('Conected', (name) => {
        //Cada vez que un cliente se conecte, se ejecutará lo siguiente
        console.log(name + " Conected! ")
    })

    socket.on('Message', (content) => {
        //Enviar msn a los clientes que llegue al servidor
        // content ="Message From Server";
        // io.emit("Messages", {content});
        console.log("from server: ", content)
        // console.log({avatar, name, date, content, showOptions})
        io.emit("Messages", {content});
    })

    socket.on('Disconnected', () => {
        io.emit("Message", {server: "Server", message:"Disconnected"});
    })
});

server.listen(3000, () => console.log("Server Connected!"));