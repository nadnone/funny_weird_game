import { HEIGHT, ctx, canvas, WIDTH } from "./constants.js";
import { keyboardInputs_getter } from "./events.js";
import Player from "./Player.js";
import Gun from "./Gun.js";
import Map from "./Map.js";


// pour être sur des valeurs du canvas
const dpr = window.devicePixelRatio || 1;

canvas.width = Math.round(window.innerWidth * dpr);
canvas.height = Math.round(window.innerHeight * dpr);
ctx.setTransform(dpr, 0, 0, dpr, 0, 0); 


const player = new Player(100, HEIGHT); // x,y
player.gun = new Gun(player);
keyboardInputs_getter(player);

const map = new Map();

let timer = 0;
let shoot_timer = 0;
let walk_timer = 0;

async function mainloop() {

        // refresh
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // animations timer
        const t0 = new Date().getMilliseconds().toPrecision(3);
        walk_timer++
        if (walk_timer > 20) {
            walk_timer = 0;
        }


        // map
        map.draw(ctx, player);


        // player logic
        player.move();
        player.draw(ctx, walk_timer);
        if (player.shooting) {
            player.shoot(shoot_timer);
        }

        if (++timer >= 1000)
        {
            timer = 0;
        }

        shoot_timer += new Date().getMilliseconds().toPrecision(3) - t0
        
        if (shoot_timer > 1000) {
            shoot_timer = 0;
        }
}

setInterval(mainloop, 1000 / 72); // 72 FPS = 144 MHz