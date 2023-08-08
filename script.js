import Game from './game.js'

window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 500;
    ctx.fillStyle = 'grey';
    ctx.lineWidth = 5;
    ctx.font = '20px Arial'
    const game = new Game(canvas);
    function animate(){
        ctx.clearRect(0,0, canvas.width, canvas.height);
        game.render(ctx);
        window.requestAnimationFrame(animate);
    }
    animate();
})

