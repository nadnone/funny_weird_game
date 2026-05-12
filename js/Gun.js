import Bullet from "./Bullet.js";

export default class Gun {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.bullets = [];
        this.fire_rate = 5;
        this.cooldown = 10;
    }

    shoot(player, timer) {

        const bool_direction = player.animID.includes("right") ? true : false;

        let bullet = new Bullet(
            player.x + (bool_direction ? 20 + player.width : -20),
            player.y - 25 - player.height / 2,
            bool_direction
            );
        this.bullets.push(bullet);

        this.fire_rate--;

        if (this.fire_rate <= 0 && !player.gun_locked) {
            player.gun_locked = true;
            this.fire_rate = 5;
        }
    
    }

    draw(ctx) {

        for (let bullet of this.bullets) {
            bullet.shoot();
            bullet.draw(ctx);

            // ressources logic
            if (bullet.x < 0 || bullet.x > 800) {
                this.bullets.splice(this.bullets.indexOf(bullet), 1);
            }
        }
    }
}