import { COL_PER_VIEW, MAP_LENGTH, MAP_ROW_SIZE, ROW_PER_VIEW, WIDTH } from "./constants.js";

export default class Map {
    constructor() {
        this.blockWdith = 100;
        this.blockHeight = 100;
        this.seeds = [];

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

    get_map_chunk(x1) {

        if (x1 == null)
        {
            return
        }

        let chunk = []
        for (let i = x1; i < x1 + WIDTH; i++) {
            
            chunk.push(this.seeds[i]);
        }

        return chunk;
    }

}