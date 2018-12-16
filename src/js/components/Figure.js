import Perlin from "../lib/perlin";

export default class Figure {
    constructor(canvas, ctx, number, color, radius = 100){
        this.number = number;
        this.color = color;
        this.radius = radius;
        this.pos = {
            x: Math.floor(Math.random() * canvas.width/2) - canvas.width/2,
            y: Math.floor(Math.random() * canvas.height/2) - canvas.height/2
        }
    }
    draw(ctx, time, order, offsetX = 0, offsetY = 0){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        for(let i = 0; i < this.number; i++){
            let angle = 2 * Math.PI * i / this.number;

            // base position
            let x = 0;
            let y = 0;

            // let x = this.pos.x;
            // let y = this.pos.y;

            // round
            x += this.radius * Math.cos(angle);
            y += this.radius * Math.sin(angle);

            // perlin
            x += 100 * Perlin(Math.cos(angle) + order * time/5000, time/5000, 0);
            y += 100 * Perlin(Math.sin(angle) + order * time/5000, time/5000, 0);

            //mouse move
            x += 2*order*offsetX*this.radius;
            y += 2*order*offsetY*this.radius;

            // let x = this.pos.x + order*offsetX*this.radius + this.radius * Math.cos(angle) + 100 * Perlin(Math.cos(angle) + order * time/5000, time/5000, 0);
            // let y = this.pos.y + order*offsetY*this.radius + this.radius * Math.sin(angle) + 100 * Perlin(Math.sin(angle) + order * time/5000, time/5000, 0);
            ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
    }
}

