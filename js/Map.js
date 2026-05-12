import { HEIGHT, WIDTH } from "./constants.js";

export default class Map {
    constructor() {
        this.width = 100;
        this.height = 100;
        this.seeds = [];


        this.ground = new Image();
        this.ground.src = './assets/ground.png'

        this.sky = new Image();
        this.sky.src = './assets/sky.png'

        this.block = new Image();
        this.block.src = './assets/upper_block.png'


        // generate seeds 
        for (let i = 0; i < 4; i++) { // 4 = niveau de blocks

            let row = [];
            for (let j = 0; j < Math.floor(WIDTH / this.width); j++) { 

                // genere un booleen aleatoire
                const random = (Math.random() * 2) > 1 ? true : false
                row.push(random)
            }
            this.seeds.push(row);
        }

    }

    draw(ctx) {


        // static blocks
        for (let i = 0; i < WIDTH; i+= this.width) {
            
            // ground
            ctx.drawImage(this.ground, i, HEIGHT - this.height, this.width, this.height);
           
            // sky
            ctx.drawImage(this.sky, i, 0, this.width, this.height);
                        
        }


        // dynamic blocks
        for (let i = 0; i < Math.floor(WIDTH / this.width); i++) {

            for (let j = 0; j < this.seeds[0].length; j++) {
            
                
                // si il y a un blocks
                if (this.seeds[i] == null)
                    return;

                if (this.seeds[i][j])
                {
                    // on dessine les blocks
                    ctx.drawImage(this.block, j * this.width, HEIGHT - (this.height * 4) / i, this.width, this.height);
                }
                
            }
        }

    }
}