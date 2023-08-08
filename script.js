class Player {
    constructor(game){
        this.game = game;
        this.width = 100;
        this.height = 100;
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = this.game.height - this.height;
        this.speed = 15;
    }
    draw(context){
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    update(){
        // Boundaries
        if (this.x < 0) {
            this.x = 0
        } else if (this.x > this.game.width - this.width) {
            this.x = this.game.width - this.width;
        } else if (this.y < 0) {
            this.y = 0;
        } else if (this.y > this.game.height - this.height) {
            this.y = this.game.height - this.height;
        }
    }
}

class Enemy {
    
}

class Projectile {
    
}

class Game {
    constructor(canvas){
        this.canvas = canvas
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.player = new Player(this)
        
        // Keyboard Events
        window.addEventListener('keydown', keyPressed => {
            if (keyPressed.key == 'd') {
                this.player.x += this.player.speed;
            } else if (keyPressed.key == 'a') {
                this.player.x -= this.player.speed;
            } else if (keyPressed.key == 'w') {
                this.player.y -= this.player.speed;
            } else if (keyPressed.key == 's') {
                this.player.y += this.player.speed;
            }
        })

    }
    render(context){
        this.player.draw(context)
        this.player.update()
    }


}


window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 800;
    const game = new Game(canvas);
    function animate(){
        ctx.clearRect(0,0, canvas.width, canvas.height);
        game.render(ctx);
        window.requestAnimationFrame(animate);
    }
    animate();
})
