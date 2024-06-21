const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

const snakeBlock = 10;
const snakeSpeed = 100;
let snake = [{x: width / 2, y: height / 2}];
let direction = {x: 0, y: 0};
let food = {
    x: Math.floor(Math.random() * (width / snakeBlock)) * snakeBlock,
    y: Math.floor(Math.random() * (height / snakeBlock)) * snakeBlock
};
let score = 0;
let gameInterval;

function drawSnake() {
    snake.forEach(part => {
        ctx.fillStyle = 'green';
        ctx.fillRect(part.x, part.y, snakeBlock, snakeBlock);
    });
}

function drawFood() {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(food.x, food.y, snakeBlock, snakeBlock);
}

function moveSnake() {
    const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * (width / snakeBlock)) * snakeBlock,
            y: Math.floor(Math.random() * (height / snakeBlock)) * snakeBlock
        };
    } else {
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= width || head.y < 0 || head.y >= height || snake.slice(1).some(part => part.x === head.x && part.y === head.y)) {
        clearInterval(gameInterval);
        ctx.fillStyle = 'red';
        ctx.font = '50px Arial';
        ctx.fillText('Game Over', width / 4, height / 2);
        ctx.font = '20px Arial';
        ctx.fillText('Press Space to Restart', width / 4, height / 2 + 30);
        return true;
    }
    return false;
}

function update() {
    ctx.clearRect(0, 0, width, height);
    drawFood();
    moveSnake();
    drawSnake();
    if (!checkCollision()) {
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText('Score: ' + score, 10, 20);
    }
}

document.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            if (direction.y === 0) {
                direction = {x: 0, y: -snakeBlock};
            }
            break;
        case 'ArrowDown':
            if (direction.y === 0) {
                direction = {x: 0, y: snakeBlock};
            }
            break;
        case 'ArrowLeft':
            if (direction.x === 0) {
                direction = {x: -snakeBlock, y: 0};
            }
            break;
        case 'ArrowRight':
            if (direction.x === 0) {
                direction = {x: snakeBlock, y: 0};
            }
            break;
        case ' ':
            if (gameInterval) {
                clearInterval(gameInterval);
            }
            snake = [{x: width / 2, y: height / 2}];
            direction = {x: 0, y: 0};
            food = {
                x: Math.floor(Math.random() * (width / snakeBlock)) * snakeBlock,
                y: Math.floor(Math.random() * (height / snakeBlock)) * snakeBlock
            };
            score = 0;
            gameInterval = setInterval(update, snakeSpeed);
            break;
    }
});

gameInterval = setInterval(update, snakeSpeed);
