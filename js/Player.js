export default class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.height = 280;
        this.width = 193;
        this.images = {
            "idle": "./assets/player1_right.png",
            "walk_right": "./assets/walk_right/",
            "walk_left": "./assets/walk_left/"
        }
        this.animations = {
            "walk_right": [],
            "walk_left": []
        }
        this.animID = "walk_right";

        this.load_images();
    }


    load_images() {

       for (let i = 0; i < 20; i++) {
            let img = new Image();
            img.src = this.images.walk_right + "image" + "0".repeat(4 - i.toString().length) + i + ".png";

            let img_left = new Image();
            img_left.src = this.images.walk_left + "image" + "0".repeat(4 - i.toString().length) + i + ".png";
        
            this.animations.walk_right.push(img);
            this.animations.walk_left.push(img_left);
        }
    }


    animation(timer) {

        return this.animations[this.animID][timer % 20];
    }


    draw(ctx, timer) {

        const image = this.animation(timer);
        ctx.drawImage(image, this.x, this.y - this.height);
    }

    walk(x, y, direction) { 

        if (direction > 0) {
            this.animID = "walk_right";
        } else if (direction < 0) {
            this.animID = "walk_left";
        }

        this.x = x;
        this.y = y;


    }
} 