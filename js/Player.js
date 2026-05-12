import Bullet from "./Bullet.js";
import { COL_PER_VIEW, HEIGHT, MAP_LENGTH, MAX_VELOCITY, WIDTH } from "./constants.js";

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

        this.load_images();
    }


    load_images() {

       for (let i = 0; i < 20; i++) {
            
            // walk right
            let img_walk_right = new Image();
            img_walk_right.src = this.images.walk_right + "image" + "0".repeat(4 - i.toString().length) + i + ".png";

            // walk left
            let img__walk_left = new Image();
            img__walk_left.src = this.images.walk_left + "image" + "0".repeat(4 - i.toString().length) + i + ".png";
        
            // idle right
            let img_idle_right = new Image();
            img_idle_right.src = this.images.idle_right + "image" + "0".repeat(4 - i.toString().length) + i + ".png";

            // idle left
            let img_idle_left = new Image();
            img_idle_left.src = this.images.idle_left + "image" + "0".repeat(4 - i.toString().length) + i + ".png";

            // jump right
            let img_jmp_right = new Image();
            img_jmp_right.src = this.images.jmp_right + "image" + "0".repeat(4 - i.toString().length) + i + ".png";

            // jump left
            let img_jmp_left = new Image();
            img_jmp_left.src = this.images.jmp_left + "image" + "0".repeat(4 - i.toString().length) + i + ".png";


            // push to animations
            this.animations.jmp_right.push(img_jmp_right);
            this.animations.jmp_left.push(img_jmp_left);
            this.animations.idle_right.push(img_idle_right);
            this.animations.idle_left.push(img_idle_left);
            this.animations.walk_right.push(img_walk_right);
            this.animations.walk_left.push(img__walk_left);
        }
    }

    shoot(timer) {
        this.gun.shoot(this, timer);
    }

    animation(timer) {
        return this.animations[this.animID][timer % 20];
    }

    draw(ctx, timer) {

        const image = this.animation(timer); // pour dessiner les animations
        ctx.drawImage(image, WIDTH/2, this.y - this.height, this.width, this.height);
        this.gun.draw(ctx)
    }

    move() { 

        if (this.jumping) {


            this.velocity.y += 10;


            // animation logic
            if (this.velocity.x >= 0) {
                this.animID = "jmp_right";
            } else if (this.velocity.x <= 0) {
                this.animID = "jmp_left";
            }

            // jumping logic 
            if (this.velocity.y >= MAX_VELOCITY) {
                this.velocity.y = MAX_VELOCITY;
            }
            else if (this.velocity.y <= -MAX_VELOCITY) {
                this.velocity.y = -MAX_VELOCITY;
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
            if (this.x > MAP_LENGTH * COL_PER_VIEW) {
                this.x = MAP_LENGTH * COL_PER_VIEW - 10
                this.velocity.x = 0;
            }

            this.x += this.velocity.x;
            this.y += this.velocity.y;

    }
} 