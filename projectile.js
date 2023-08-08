export default class Projectile {
    constructor() {
        this.width = 5;
        this.height = 50;
        this.x = 0;
        this.y = 0;
        this.speed = 20;
        this.free = true;
    }
    draw(context) {
         if(!this.free){
            context.fillRect(this.x, this.y, this.width, this.height);
         }
    }
    update(){
        if(!this.free){
            this.y -= this.speed;
            if ( this.y < -this.height ) {
                this.free = true;
            }
        }
    }
    start(x, y){
        this.free = false;
        this.x = x - this.width / 2;
        this.y = y;
    }
    reset(){
        this.free = true; 
    }
}
