export default class Enemy {
    constructor(game, positionX, positionY){
        this.game = game;
        this.width = this.game.enemySize;
        this.height = this.game.enemySize;
        this.x = 0;
        this.y = 0;
        this.positionX = positionX;
        this.positionY = positionY;
        this.markedForDelitation = false;
    }
    draw(context) {
        context.strokeRect(this.x, this.y, this.width, this.height);
    }
    update(x, y){
        this.x = x + this.positionX;
        this.y = y + this.positionY;
        // Check Collision Enemies
        this.game.projectilesPool.forEach( projectile => {
             if ( !projectile.free && this.game.checkCollision(this, projectile)) {
                this.markedForDelitation = true
                projectile.reset(); 
             }
        })
    }

}