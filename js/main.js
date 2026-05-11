
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const WIDTH = document.body.clientWidth;
const HEIGHT = document.body.clientHeight;

import { keyboardInputs_getter } from "./events.js";
import Player from "./Player.js";


let animation_timer = 0;

const player = new Player(100, HEIGHT);
keyboardInputs_getter(player);

function mainloop() {

        animation_timer++;
        if (animation_timer > 20) {
            animation_timer = 0;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        player.draw(ctx, animation_timer);

}


canvas.width = WIDTH;
canvas.height = HEIGHT;


setInterval(mainloop, 1000 / 24); // 24 FPS