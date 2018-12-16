import Perlin from './lib/perlin';
import Figure from './components/Figure';
import Mouse from './components/Mouse';

let figure1 = new Figure(4, "#ffffff");

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
let mouse = new Mouse(canvas);
let mfX = 0, mfY = 0;

function initialCanvas(canvas){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.onresize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    document.body.appendChild(canvas);
}

initialCanvas(canvas);

function clear(canvas, ctx){
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

const figures = [
    new Figure(4, "#111", 100),
    new Figure(4, "#535552", 100),
    new Figure(4, "white", 100),
    new Figure(4, "#ff3443", 100),
];

function update(canvas, ctx, time){

    mfX += 0.05 * (mouse.x / canvas.width/2 - mfX);
    mfY += 0.05 * (mouse.y / canvas.height/2 - mfY);

    console.log(mfX);

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(time/100 * Math.PI / 180);
    figures.forEach((figure, index) => {
        figure.draw(ctx, time, index, mfX, mfY);
    });

    ctx.restore();
}

function raf(time){
    clear(canvas, ctx);
    update(canvas, ctx, time);
    requestAnimationFrame(raf);
}

raf();
