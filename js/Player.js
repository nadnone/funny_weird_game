import Bullet from "./Bullet.js";
import { ctx, COL_PER_VIEW, HALF_WIDTH, HEIGHT, MAP_LENGTH, MAP_ROW_SIZE, MAX_VELOCITY as MAX_JUMP_VELOCITY, MAX_WALK_VELOCITY, WALK_SPEED, WIDTH } from "./constants.js";

export default class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.height = 260;
        this.width = 115;
        this.jumping = false;
        this.velocity = {"x": 0, "y": 0};
        this.gun = null;
        this.shooting = false;
        this.gun_locked = false;
        this.anim_cache = null;

        this.images = {
            "jmp_left": "./assets/jump_left/",
            "jmp_right": "./assets/jump_right/",
            "idle_right": "./assets/idle_right/",
            "idle_left": "./assets/idle_left/",
            "walk_right": "./assets/walk_right/",
            "walk_left": "./assets/walk_left/"
        }
        this.animations = {
            "jmp_right": [],
            "jmp_left": [],
            "walk_right": [],
            "idle_right": [],
            "walk_left": [],
            "idle_left": []
        }
        this.animID = "idle_right";

    }

    async load_images() {

       for (let i = 0; i < 20; i++) {
            
            // walk right
            const img_walk_right = new Image();
            img_walk_right.src = this.images.walk_right + "image" + "0".repeat(4 - i.toString().length) + i + ".png";

            // walk left
            const img__walk_left = new Image();
            img__walk_left.src = this.images.walk_left + "image" + "0".repeat(4 - i.toString().length) + i + ".png";
        
            // idle right
            const img_idle_right = new Image();
            img_idle_right.src = this.images.idle_right + "image" + "0".repeat(4 - i.toString().length) + i + ".png";

            // idle left
            const img_idle_left = new Image();
            img_idle_left.src = this.images.idle_left + "image" + "0".repeat(4 - i.toString().length) + i + ".png";

            // jump right
            const img_jmp_right = new Image();
            img_jmp_right.src = this.images.jmp_right + "image" + "0".repeat(4 - i.toString().length) + i + ".png";

            // jump left
            const img_jmp_left = new Image();
            img_jmp_left.src = this.images.jmp_left + "image" + "0".repeat(4 - i.toString().length) + i + ".png";


            // push to animations
            this.animations.jmp_right.push(img_jmp_right);
            this.animations.jmp_left.push(img_jmp_left);
            this.animations.idle_right.push(img_idle_right);
            this.animations.idle_left.push(img_idle_left);
            this.animations.walk_right.push(img_walk_right);
            this.animations.walk_left.push(img__walk_left);


            this.anim_cache = this.animation(this.animID)[0]
        }
    }

    shoot(timer) {
        this.gun.shoot(this, timer);
    }

    async animation(timer) {
        return this.animations[this.animID][parseInt(timer)];
    }

    async draw(timer) {

        let img = await this.animation(timer); // pour dessiner les animations
        
        // cache au cas ou l'image prend du temps ä charger 
        if (img == null)
            img = this.anim_cache
        else if (img != null)
            this.anim_cache = img;
        
        
        ctx.drawImage(img, HALF_WIDTH, this.y - this.height, this.width, this.height);
        this.gun.draw(ctx)
    }

    move() { 

        if (this.jumping) {


            this.velocity.y += WALK_SPEED;


            // animation logic
            if (this.velocity.x >= 0) {
                this.animID = "jmp_right";
            } else if (this.velocity.x <= 0) {
                this.animID = "jmp_left";
            }
            // jumping logic 
            if (this.velocity.y >= MAX_JUMP_VELOCITY) {
                this.velocity.y = MAX_JUMP_VELOCITY;
            }
            else if (this.velocity.y <= -MAX_JUMP_VELOCITY) {
                this.velocity.y = -MAX_JUMP_VELOCITY;
            }

            if (this.y > HEIGHT) {
                this.y = HEIGHT;
                this.jumping = false;
                this.velocity.y = 0;
            }
            

        }
        else {

            if (this.velocity.x > 0) {
                this.animID = "walk_right";
            } else if (this.velocity.x < 0) {
                this.animID = "walk_left";
                
            } else if (this.velocity.x === 0 && this.animID === "walk_left") {
                this.animID = "idle_left";
                this.velocity.x = 0;

            } else if (this.velocity.x === 0 && this.animID === "walk_right") {
                this.animID = "idle_right";
                this.velocity.x = 0;
            }

            // jump animation reset logic
            if (this.velocity.y <= 0 && this.animID === "jmp_right") {
                this.animID = "idle_right";
            }
            else if (this.velocity.y <= 0 && this.animID === "jmp_left") {
                this.animID = "idle_left";
            }

        }
            if (this.x <= 1) {
                this.x = 10;
                this.velocity.x = 0;
            }
            if (this.x > MAP_ROW_SIZE) {
                this.x = MAP_ROW_SIZE - 10
                this.velocity.x = 0;
            }



            if (this.velocity.x > MAX_WALK_VELOCITY)
            {
                this.velocity.x = MAX_WALK_VELOCITY;
            }
            else if (this.velocity.x < -MAX_WALK_VELOCITY)
            {
                this.velocity.x = -MAX_WALK_VELOCITY;
            }


            this.x -= this.velocity.x;
            this.y += this.velocity.y;

    }
} 