import Enemy from './enemy.js'

export default class Wave {
    constructor(game){
        this.game = game;
        this.width = this.game.columns * this.game.enemySize;
        this.height = this.game.rows * this.game.enemySize;
        this.x = 0;
        this.y = -this.height;
        this.speedX = 4;
        this.speedY = 0;
        this.enemies = [];
        this.create();
    }

    render(context) {
        if (this.y < 0) this.y += 2;
        this.speedY = 0;
        if (this.x < 0 || this.x > this.game.width - this.width){
            this.speedX *= -1;
            this.speedY = this.game.enemySize;
        }
        this.x += this.speedX;
        this.y += this.speedY;
        this.enemies.forEach( enemy => {
            enemy.update(this.x, this.y);
            enemy.draw(context);
        })

        this.enemies = this.enemies.filter( object => !object.markedForDelitation); 
    }

    create(){
        for ( let y = 0; y < this.game.rows; y++){
            for (let x = 0; x < this.game.columns; x++) {
                let enemyX = x * this.game.enemySize;
                let enemyY = y * this.game.enemySize;
                this.enemies.push(new Enemy(this.game, enemyX, enemyY));
            }
        }
    }    
}