class Player {
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

class Enemy {
    constructor(game, positionX, positionY){
        this.game = game;
        this.width = this.game.enemySize;
        this.height = this.game.enemySize;
        this.x = 0;
        this.y = 0;
        this.positionX = positionX;
        this.positionY = positionY;
    }
    draw(context) {
        context.strokeRect(this.x, this.y, this.width, this.height);
    }
    update(x, y){
        this.x = x + this.positionX;
        this.y = y + this.positionY;
    }

}

class Wave {
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

class Projectile {
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

class Game {
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
        this.rows = 2; 
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
}


window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 500;
    ctx.fillStyle = 'grey';
    ctx.lineWidth = 5
    const game = new Game(canvas);
    function animate(){
        ctx.clearRect(0,0, canvas.width, canvas.height);
        game.render(ctx);
        window.requestAnimationFrame(animate);
    }
    animate();
})
