import { HEIGHT, ctx, canvas, WIDTH } from "./constants.js";
import { keyboardInputs_getter } from "./events.js";
import Player from "./Player.js";
import Gun from "./Gun.js";
import Map from "./Map.js";

let animation_timer = 0;
let timer_shoot = 0;

// pour être sur des valeurs du canvas
const dpr = window.devicePixelRatio || 1;

canvas.width = Math.round(window.innerWidth * dpr);
canvas.height = Math.round(window.innerHeight * dpr);
ctx.setTransform(dpr, 0, 0, dpr, 0, 0); 


const player = new Player(100, HEIGHT); // x,y
player.gun = new Gun(player);
keyboardInputs_getter(player);

const map = new Map();

let delta = 0;
function mainloop() {

        const t0 = performance.now();

        // animations timer

        timer_shoot += delta / 100 
        animation_timer += parseInt(delta / 4)

        if (animation_timer > 20) {
            animation_timer = 0;
        }
        if (timer_shoot > 3) {
            timer_shoot = 0;
        }
        
        // refresh
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        


        // map
        map.draw(ctx, player);


        // player logic
        player.move();
        player.draw(ctx, animation_timer);
        if (player.shooting) {
            player.shoot(timer_shoot);
        }


        requestAnimationFrame(mainloop)
        delta = performance.now() - t0;

}


canvas.width = WIDTH;
canvas.height = HEIGHT;

requestAnimationFrame(mainloop);
//setInterval(mainloop, 1000 / 24); // 24 FPS