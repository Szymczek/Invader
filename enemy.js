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
        // Check Collision Enemies - Projectiles
        this.game.projectilesPool.forEach( projectile => {
             if ( !projectile.free && this.game.checkCollision(this, projectile)) {
                this.markedForDelitation = true
                projectile.reset(); 
                if (!this.game.gameOver) {this.game.score++;}

             }
        });
        // Check Collision Enemies - Player
        if (this.game.checkCollision(this, this.game.player)){
            this.markedForDeletion = true;
            this.game.restartWaveAfterDeath();
            if (!this.game.gameOver && this.game.score > 0) this.game.score -= 10;
            if (this.game.player.lives > 0) this.game.player.lives--;
            if (this.game.player.lives < 1) {
                this.game.gameOver = true;
                this.game.waves = [];
                this.game.player.speed = 0;
                this.game.projectilesPool = [];
                this.game.numberOfProjectiles = 0;
            }
        }

    
        // Lose Condition 
        if (this.y + this.height > this.game.height) {
            this.game.gameOver = true;
            this.markedForDeletion = true;
        }
    }

}