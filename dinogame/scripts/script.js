const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;
let points = 0;

function handleKeyUp(event) {
    if (event.keyCode === 32) {
        if(!isJumping) {
            jump();
        }
    }
}

function jump() {
    isJumping = true;
    

    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);

            // jump down
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -=20
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        } else {
            // jump up
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 5000;
    
        if (isGameOver) return;
    
    cactus.classList.add('cactus');
    background.appendChild(cactus);
    cactus.style.left = cactusPosition + 'px';

    let leftInterval = setInterval(() => {
        // remove cactus 
        if (cactusPosition < -30) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
            points = points + 10;
            document.getElementById("points").innerHTML = points;
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) { 
            // Game 0ver
            clearInterval(leftInterval);
            isGameOver = true;
            document.getElementById("game-over").innerHTML = '<div id="game-over"><h2 class="subtitle is-size-1 is-bold has-text-centered mb-0"">Game Over<p id="newfont" class="subtitle is-size-6 is-bold has-text-centered">Your Score was: ' + points + ' points</p><button class="play" onClick="window.location.reload();">Play Again</button></h2></div>';
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20)

    setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);
