export default class Bullet {
    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.speed = 20;
    }

    draw(ctx) {

        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.arc(this.x, this.y, 2.5, 0, 2 * Math.PI);
        ctx.fill();
    }
    
    shoot() {
        this.x += (this.direction ? 1: -1) * this.speed; 
    }

}