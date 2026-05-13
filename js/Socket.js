export default class Connector {

    constructor() {
        this.socket = io("127.0.0.1:30000");
        
        this.socket.on("connect", () => {
            if (this.socket.connected)
                console.log("Connecté !");
                        
        })
        
    }

   
}