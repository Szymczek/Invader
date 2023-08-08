
import Player from './player.js'
import Projectile from './projectile.js'
import Wave from './wave.js'

export default class Game {
    constructor(canvas){
        this.canvas = canvas
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.player = new Player(this)
        
        // Projectiles
        this.projectilesPool = [];
        this.numberOfProjectiles = 10;
        this.createProjectiles();

        // Enemys 
        this.columns = 4;
        this.rows = 5; 
        this.enemySize = 60; 

        // Waves
        this.waves = [];
        this.waves.push(new Wave(this));

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
            } 
            // Actions
            if (keyPressed.key == ' ') {
                player.shoot();
            }
        });
 
    }
    render(context){
        this.player.draw(context)
        this.player.update()
        this.projectilesPool.forEach(projectile => {
            projectile.update();
            projectile.draw(context);
        })
        this.waves.forEach( wave => {
            wave.render(context);
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

}