import Perlin from "../lib/perlin";

export default class Figure {
    constructor(number, color, radius = 100){
        this.number = number;
        this.color = color;
        this.radius = radius;
    }
    draw(ctx, time, koeff, offsetX = 0, offsetY = 0){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        for(let i = 0; i < this.number; i++){
            let angle = 2 * Math.PI * i / this.number;
            let x = 2*koeff*offsetX*this.radius + this.radius * Math.cos(angle) + 100 * Perlin(Math.cos(angle) + koeff * time/5000, time/5000, 0);
            let y = 2*koeff*offsetY*this.radius + this.radius * Math.sin(angle) + 100 * Perlin(Math.sin(angle) + koeff * time/5000, time/5000, 0);
            ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
    }
}

