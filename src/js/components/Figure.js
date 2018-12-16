import Perlin from "../lib/perlin";

export default class Figure {
    constructor(canvas, ctx, number, color, radius = 100){
        this.canvas = canvas;
        this.ctx = ctx;
        this.number = number;
        this.color = color;
        this.radius = radius;
    }
    draw(time, order, offsetX = 0, offsetY = 0){
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.strokeStyle = this.color;
        for(let i = 0; i < this.number; i++){
            let angle = 2 * Math.PI * i / this.number;

            // base position
            let x = 0;
            let y = 0;

            // round
            x += this.radius * Math.cos(angle);
            y += this.radius * Math.sin(angle);

            // perlin
            x += 100 * Perlin(Math.cos(angle) + order * time/5000, time/5000, 0);
            y += 100 * Perlin(Math.sin(angle) + order * time/5000, time/5000, 0);

            //mouse move
            x += 2*order*offsetX*this.radius;
            y += 2*order*offsetY*this.radius;

            this.ctx.lineTo(x, y);
        }
        this.ctx.closePath();
        this.ctx.fill();
    }
}

