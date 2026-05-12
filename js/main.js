import { HEIGHT, ctx, canvas, WIDTH } from "./constants.js";
import { keyboardInputs_getter } from "./events.js";
import Player from "./Player.js";
import Gun from "./Gun.js";
import Map from "./Map.js";

let animation_timer = 0;
let timer = 0;

// pour être sur des valeurs du canvas
const dpr = window.devicePixelRatio || 1;

canvas.width = Math.round(window.innerWidth * dpr);
canvas.height = Math.round(window.innerHeight * dpr);
ctx.setTransform(dpr, 0, 0, dpr, 0, 0); 

const player = new Player(100, HEIGHT); // x,y
player.gun = new Gun(player.x, player.y);
keyboardInputs_getter(player);

const map = new Map();

function mainloop() {

        // timers
        if (animation_timer++ > 20) {
            animation_timer = 0;
        }
        if (timer++ > 1000) {
            timer = 0;
        }

        // refresh
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        


        // map
        map.draw(ctx);






        // player logic
        player.move();
        player.update(timer);
        player.draw(ctx, animation_timer);
        player.gun.draw(ctx);

}


canvas.width = WIDTH;
canvas.height = HEIGHT;


setInterval(mainloop, 1000 / 24); // 24 FPS