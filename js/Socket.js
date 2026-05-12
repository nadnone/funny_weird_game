export default class Connector {

    constructor() {
        this.socket = io("127.0.0.1:30000");
        
        this.socket.on("connect", () => {
            if (this.socket.connected)
                console.log("Connecté !");
                        
        })
        
    }

    async get_chunk(x) {

        if (this.socket.connected)
        {
            this.socket.emit("get_map_chunk", x);
        }

        return await this.receive_chunk();
    }

    receive_chunk() {

        return new Promise((resolve) => {
            this.socket.on("give_map_chunk", (chunk) => {
                resolve(chunk);
            });
        })
      
    }
}