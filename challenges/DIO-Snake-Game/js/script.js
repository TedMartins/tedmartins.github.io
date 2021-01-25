let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = 'right';
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
let score = 0;

function background() {
    context.fillStyle = '#333030';
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function addSnake() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = '#e1e1e1';
        context.strokeStyle = "#333030";
        context.strokeRect(snake[i].x, snake[i].y, box, box);
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function addFood() {
    context.fillStyle = '#e1e1e1';
    context.strokeStyle = "#333030";
    context.strokeRect(food.x, food.y, box, box);
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 65 && direction != 'right') direction = 'left';
    if (event.keyCode == 87 && direction != 'down') direction = 'up';
    if (event.keyCode == 68 && direction != 'left') direction = 'right';
    if (event.keyCode == 83 && direction != 'up') direction = 'down';
}

function startGame() {
    if (snake[0].x > 15 * box && direction == 'right') snake[0].x = 0;
    if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == 'down') snake[0].y = 0;
    if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game);
            Swal.fire({
                title: 'Game Over',
                html: 'Your score is:<br><br><strong>' + score + ' points.</strong><br><br>Would you like to play again?<br>',
                icon: 'none',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes',
                cancelButtonText: 'No'
            }).then((result) => {
                if (result.isConfirmed) {
                        document.location.reload();
                }
            })
        }
    }

    background();
    addSnake();
    addFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == 'right') snakeX += box;
    if (direction == 'left') snakeX -= box;
    if (direction == 'up') snakeY -= box;
    if (direction == 'down') snakeY += box;

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box,
            food.y = Math.floor(Math.random() * 15 + 1) * box
        score = score + 10;
        document.getElementById("score").innerHTML = score;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let game = setInterval(startGame, 100);

function info(){
    Swal.fire({
        icon: 'info',
        title: 'How to Play:',
        html: 'Use your keyboard keys to move the snake:<br><br> <b>W</b> (up), <b>A</b> (left), <b>S</b> (down) and <b>D</b> (right).<br><br>If your game is freezed, press F5 to restart.',
        footer: 'Snake Game by <a href="http://github.com/TedMartins"> Ted Martins</a>'
    })
}