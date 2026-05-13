import { Server } from 'socket.io'
import Map from './Map.js';

const io = new Server(30000, {
    cors: {
        origin: "*"
    }
});


const map = new Map();
map.generate();



io.on("connection", (socket) => {

    socket.on("get_players_pos", (players) => {

    });

   
})


