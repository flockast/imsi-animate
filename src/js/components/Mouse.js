export default class Mouse{
    constructor(canvas){
        this.x = 0;
        this.y = 0;
        window.onmousemove = event => {
            this.x = event.clientX - canvas.width / 2;
            this.y = event.clientY - canvas.height / 2;
        }
    }
}
