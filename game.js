import Player from './player.js'
import Projectile from './projectile.js'
import Wave from './wave.js'

export default class Game {
    constructor(canvas){
        this.canvas = canvas
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.player = new Player(this)
        
        // Game Stats 
        this.score = 0;
        this.gameOver = false;

        // Projectiles
        this.projectilesPool = [];
        this.numberOfProjectiles = 10;
        this.createProjectiles();


        // Enemys 
        this.columns = 1;
        this.rows = 1; 
        this.enemySize = 60; 

        // Waves
        this.waves = [];
        this.waves.push(new Wave(this));
        this.waveCount = 1;
        this.nextWaveTrigger = false;

        // Keyboard movement events
        window.addEventListener('keydown', keyPressed => {
            const { player } = this;
            
            const canMoveLeft = player.x - player.speed >= 0 - player.width * 0.5;
            const canMoveRight = player.x + player.speed <= this.width - player.width * 0.5;
            const canMoveUp = player.y - player.speed >= 0;
            const canMoveDown = player.y + player.speed <= this.height - player.height;

            // Movement
            if (keyPressed.key == 'd' && canMoveRight) {
                player.x += player.speed;
            } else if (keyPressed.key == 'a' && canMoveLeft) {
                player.x -= player.speed;
            } else if (keyPressed.key == 'w' && canMoveUp) {
                player.y -= player.speed;
            } else if (keyPressed.key == 's' && canMoveDown) {
                player.y += player.speed;
            } else if (keyPressed.key == 'r') {
                this.restart()
            } 

            // Actions
            if (keyPressed.key == ' ') {
                player.shoot();
            }
        });
 
    }
    render(context){
        this.drawStatusText(context);
        this.player.draw(context)
        this.player.update()
        this.projectilesPool.forEach(projectile => {
            projectile.update();
            projectile.draw(context);
        })
        this.waves.forEach( wave => {
            wave.render(context);
            if( wave.enemies.length < 1 && !wave.nextWaveTrigger && !this.gameOver){
                this.newWave();
                this.waveCount++;
                wave.nextWaveTrigger = true;
                if (this.player.lives < 3) this.player.lives++;
            }
        } )
    }

    // Create  - Projectiles Object pool 
    createProjectiles(){
        for (let i = 0; i < this.numberOfProjectiles; i++){
            this.projectilesPool.push(new Projectile());
        }
    }
    // Get Free Projectiles from pool
    getProjectile(){
        for (let i = 0; i < this.projectilesPool.length; i++){
            if (this.projectilesPool[i].free) return this.projectilesPool[i];
        }
    }

    // Collisions 
    checkCollision(a, b) {
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y 
            )
    }

    drawStatusText(context) {
        context.save();
        context.fillText('Score: ' + this.score, 10 , 20); 
        context.fillText('Wave: ' + this.waveCount, this.width - 100, 20); 
        context.fillText('Lives: ' + this.player.lives, this.width - 100, 50); 
        if (this.gameOver) {
            context.textAlign = 'center';
            context.font = '100px Arial';
            context.fillText('GAME OVER', this.width * 0.5, this.height * 0.5);
            context.font = '20px Arial';
            context.fillText('Press "R" to restart..', this.width * 0.5, this.height * 0.6);
        }
        context.restore();
    }

    newWave(){
        if (Math.random() < 0.5 && this.columns < 6 && this.rows < 5 ){
            this.columns++;
        } else {
            this.rows++;
        }
        this.waves.push(new Wave(this));
    }
    restart(){

        // Player
        this.player.restartGame();
        this.player.speed = 10;

        // Game Stats 
        this.score = 0;
        this.gameOver = false;

        // Projectiles
        this.projectilesPool = [];
        this.numberOfProjectiles = 10;
        this.createProjectiles();
        
        // Enemys 
        this.columns = 1;
        this.rows = 1; 

        // Waves
        this.waves = [];
        this.waves.push(new Wave(this));
        this.waveCount = 1;
        this.nextWaveTrigger = false;
    }
    restartWaveAfterDeath(){
        this.player.restorePlayerAfterDeath();
        this.waves = [];
        this.waves.push(new Wave(this));
    }

}