import { COL_PER_VIEW, HALF_WIDTH, HEIGHT, MAP_LENGTH, ROW_PER_VIEW, WIDTH } from "./constants.js";
import Player from "./Player.js";

export default class Map {
    constructor() {
        this.blockWdith = 100;
        this.blockHeight = 100;
        this.seeds = [];


        this.ground = new Image();
        this.ground.src = './assets/ground.png'

        this.sky = new Image();
        this.sky.src = './assets/sky.png'

        this.block = new Image();
        this.block.src = './assets/upper_block.png'

        this.generate();

    }

    generate() {

        // generate seeds 
        for (let i = 0; i < COL_PER_VIEW * MAP_LENGTH; i++) {

            let row = [];
            for (let j = 0; j < ROW_PER_VIEW; j++) { 

                // genere un booleen aleatoire
                const random = (Math.random() * 2) > 1 ? true : false
                row.push(random)
            }
            this.seeds.push(row);
        }
        
    }

    draw(ctx, player) {


        // static blocks
        for (let i = 0; i < WIDTH; i+= this.blockWdith) {
            
            // ground
            ctx.drawImage(this.ground, i, HEIGHT - this.blockHeight, this.blockWdith, this.blockHeight);
           
            // sky
            ctx.drawImage(this.sky, i, 0, this.blockWdith, this.blockHeight);
                        
        }


        // dynamic blocks

        // kernel

        const mapindex = Math.floor((MAP_LENGTH * COL_PER_VIEW) / ( player.x ))
        const seedIndex = Math.floor(this.seeds.length / ( mapindex + 1 )) 

        for (let heightIndex = 0; heightIndex < ROW_PER_VIEW; heightIndex++) {
            
            // convert to screen positions
            for (let widthIndex = seedIndex; widthIndex < COL_PER_VIEW * MAP_LENGTH; widthIndex++) {
            
                if (this.seeds[widthIndex][heightIndex]) {                    
                    ctx.drawImage(this.block, (widthIndex - seedIndex) * this.blockWdith, HEIGHT - this.blockHeight * heightIndex, this.blockWdith, this.blockHeight);
                }
                
            }
                
        }

    }
}