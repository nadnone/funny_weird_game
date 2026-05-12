import Bullet from "./Bullet.js";
import { FIRE_RATE_MAX, HALF_WIDTH, MAX_VELOCITY, WIDTH } from "./constants.js";
import Player from "./Player.js";

export default class Gun {
    constructor(player) {
        this.x = player.x;
        this.y = player.y;
        this.bullets = [];
        this.fire_rate = FIRE_RATE_MAX;
        this.cooldown = 3;

    }

    shoot(player, timer) {
        
        if (timer % this.cooldown === 0)
        {
            player.gun_locked = false;
            this.fire_rate = FIRE_RATE_MAX
        }

        
        if (this.fire_rate <= 0)
        {
            player.gun_locked = true;
            return
        }
            
        this.fire_rate--;

       

        const bool_direction = player.animID.includes("right") ? true : false;

        let bullet = new Bullet(
                HALF_WIDTH + (bool_direction ? player.width : 0),
                player.y - 25 - player.height / 2,
                bool_direction
            );
        this.bullets.push(bullet);

    }

    draw(ctx) {

        for (let bullet of this.bullets) {
            
            bullet.shoot();
            bullet.draw(ctx);

            // ressources logic
            if (bullet.x <= 0 || bullet.x >= WIDTH) {
                this.bullets.splice(this.bullets.indexOf(bullet), 1);
            }
        }
    }
}