import { canvas, COL_PER_VIEW, HALF_WIDTH, HEIGHT, MAP_LENGTH, MAP_ROW_SIZE, ROW_PER_VIEW, WIDTH } from "./constants.js";
import Player from "./Player.js";

export default class Map {
    constructor() {
        this.blockWdith = 100;
        this.blockHeight = 100;
        this.seeds = [];


        this.wallpapper = new Image();
        this.wallpapper.src = './assets/wallpapper.jpeg'

        this.block = new Image();
        this.block.src = './assets/upper_block.jpg'

        this.generate();

    }

    generate() {

        // generate seeds 
        for (let i = 0; i < MAP_ROW_SIZE; i++) {

            let row = [];
            for (let j = 0; j < ROW_PER_VIEW; j++) { 

                // genere un booleen aleatoire
                const random = (Math.random() * 3) < 1 ? true : false
                row.push(random)
            }
            this.seeds.push(row);
        }
        
    }

    async draw(ctx, player) {

        // static block
        ctx.drawImage(this.wallpapper, 0,0, WIDTH, HEIGHT);
           
        // dynamic blocks
        // kernel
        const seedIndex = Math.floor(this.seeds.length / parseInt(player.x)) 

        for (let heightIndex = 0; heightIndex < ROW_PER_VIEW; heightIndex++) {
            
            if (seedIndex + WIDTH > MAP_ROW_SIZE)
                continue

            // convert to screen positions
            for (let widthIndex = seedIndex; widthIndex < seedIndex + WIDTH ; widthIndex++) {
            
                if (this.seeds[widthIndex][heightIndex]) {                    
                    ctx.drawImage(this.block, parseInt(widthIndex - seedIndex) * this.blockWdith, HEIGHT - this.blockHeight * heightIndex, this.blockWdith, this.blockHeight);
                }
                
            }
                
        }

        

    }
}