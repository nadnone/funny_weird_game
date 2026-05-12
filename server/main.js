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

    socket.on("get_map_chunk", (x) => {

        const chunk = map.get_map_chunk(x);
        socket.emit("give_map_chunk", chunk)
    });

   
})


