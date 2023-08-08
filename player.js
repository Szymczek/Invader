export default class Player {
    constructor(game){
        this.game = game;
        this.width = 60;
        this.height = 80;
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = this.game.height - this.height;
        this.speed = 10;
    }
    draw(context){
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    update(){

    }
    shoot(){
        const projectile = this.game.getProjectile();
        if (projectile) projectile.start(this.x + this.width / 2, this.y )
    }
}