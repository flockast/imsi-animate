import Figure from './components/Figure';
import Mouse from './components/Mouse';

const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
const mouse = new Mouse(canvas);
const figures = [
    new Figure(canvas, ctx, 64, "rgba(0, 0, 0, .8)", 300),
    new Figure(canvas, ctx, 64, "#222222", 200),
    new Figure(canvas, ctx, 64, "#333333", 150),
    new Figure(canvas, ctx, 4, "#ff3443", 100),
];

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

let mfX = 0, mfY = 0;
let scale = 1;
let turn = 1;

const image = document.querySelector("#bg");
function update(canvas, ctx, time){
    mfX += 0.05 * (mouse.x / canvas.width/2 - mfX);
    mfY += 0.05 * (mouse.y / canvas.height/2 - mfY);

    scale = scale + 1/10000*turn;
    if(scale > 1.2) turn = -1;
    if(scale < 1) turn = 1;

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(scale, scale);
    ctx.drawImage(image, 10*Math.cos(2*Math.PI*time/10000) - image.width/2, 10*Math.sin(2*Math.PI*time/10000) - image.height/2);
    ctx.restore();

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(time/100 * Math.PI / 180);
    figures.forEach((figure, index) => {
        figure.draw(time, index, mfX, mfY);
    });
    ctx.restore();
}

function raf(time){
    clear(canvas, ctx);
    update(canvas, ctx, time);
    requestAnimationFrame(raf);
}

raf();
