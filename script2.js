let boardSize = 25;
let rows = 20;
let cols = 20;
let board = [];
let context;
let snakebody = [];

let snakex = 5;
let snakey = 5;

let speedx = 0;
let speedy = 0;

let foodx;
let foody;

let gameover = false;
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
console.log(highScore);

window.onload = () => {
    let reset = document.getElementById('reset');
    reset.addEventListener("click", resetGame);

    initializeBoard();
    board = document.getElementById('board');
    board.height = rows * boardSize;
    board.width = cols * boardSize;
    context = board.getContext('2d');
    placefood();
    document.addEventListener('keyup', change_dir);
    setInterval(update, 1000 / 10);
}

function initializeBoard() {
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            board[i][j] = 0;
        }
    }
}

function update() {

    if (gameover) {

        context.fillStyle = 'white';
        context.font = '30px Arial';
        context.textAlign = 'center';
        console.log(score);
        if (score > highScore) {
            console.log("hi");
            context.fillText('You Created a history .... your score is now highest now !!!Game Over', board.width / 2, board.height / 2);
        }

        else {
            // console.log("hi");
            context.fillText('Game Over', board.width / 2, board.height / 2);
        }

        return;
    }
    context.fillStyle = 'black';
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = 'red';
    context.fillRect(foodx * boardSize, foody * boardSize, boardSize, boardSize);

    if (snakex == foodx && snakey == foody) {
        snakebody.push([foodx, foody]);
        placefood();
        score++;
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('highScore', highScore);
        }
    }
    for (let i = snakebody.length - 1; i > 0; i--) {
        snakebody[i] = snakebody[i - 1];
    }

    if (snakebody.length) {
        snakebody[0] = [snakex, snakey];
    }

    context.fillStyle = 'lime';
    snakex += speedx;
    snakey += speedy;
    context.fillRect(snakex * boardSize, snakey * boardSize, boardSize, boardSize);

    for (let i = 0; i < snakebody.length; i++) {
        context.fillRect(snakebody[i][0] * boardSize, snakebody[i][1] * boardSize, boardSize, boardSize)
    }

    if (snakex < 0 || snakex >= cols || snakey < 0 || snakey >= rows) {
        gameover = true;
    }
    for (let i = 0; i < snakebody.length; i++) {
        if (snakex == snakebody[i][0] && snakey == snakebody[i][1]) {
            gameover = true;
        }
    }


    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('highScore').innerText = `High Score: ${highScore}`;
}

function placefood() {
    foodx = Math.floor(Math.random() * cols);
    foody = Math.floor(Math.random() * rows);

    for (let i = 0; i < snakebody.length; i++) {
        if (foodx === snakebody[i][0] && foody === snakebody[i][1]) {
            placefood();
            return;
        }
    }
}

function resetGame() {

    snakebody = [];
    snakex = 5;
    snakey = 5;
    speedx = 0;
    speedy = 0;
    gameover = false;
    score = 0;

    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('highScore').innerText = `High Score: ${highScore}`;
}

function change_dir(e) {
    if (e.code == 'ArrowUp' && speedy != 1) {
        speedx = 0;
        speedy = -1;
    } else if (e.code == 'ArrowDown' && speedy != -1) {
        speedx = 0;
        speedy = 1;
    } else if (e.code == 'ArrowLeft' && speedx != 1) {
        speedx = -1;
        speedy = 0;
    } else if (e.code == 'ArrowRight' && speedx != -1) {
        speedx = 1;
        speedy = 0;
    }
}


let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
}

function handleTouchMove(event) {
    if (!touchStartX || !touchStartY) {
        return;
    }

    let touchEndX = event.touches[0].clientX;
    let touchEndY = event.touches[0].clientY;

    let swipeX = touchEndX - touchStartX;
    let swipeY = touchEndY - touchStartY;

    if (Math.abs(swipeX) > Math.abs(swipeY)) {
        // Horizontal Swipe
        if (swipeX > 0) {
            // Right Swipe
            changeDirection('ArrowRight');
        } else {
            // Left Swipe
            changeDirection('ArrowLeft');
        }
    } else {
        // Vertical Swipe
        if (swipeY > 0) {
            // Down Swipe
            changeDirection('ArrowDown');
        } else {
            // Up Swipe
            changeDirection('ArrowUp');
        }
    }

    touchStartX = 0;
    touchStartY = 0;
}

function changeDirection(direction) {
    if (direction === 'ArrowUp' && speedy !== 1) {
        speedx = 0;
        speedy = -1;
    } else if (direction === 'ArrowDown' && speedy !== -1) {
        speedx = 0;
        speedy = 1;
    } else if (direction === 'ArrowLeft' && speedx !== 1) {
        speedx = -1;
        speedy = 0;
    } else if (direction === 'ArrowRight' && speedx !== -1) {
        speedx = 1;
        speedy = 0;
    }
}
