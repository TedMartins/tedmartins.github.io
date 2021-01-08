const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;

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
    let randomTime = Math.random() * 6000;
    
        if (isGameOver) return;
    
    cactus.classList.add('cactus');
    background.appendChild(cactus);
    cactus.style.left = cactusPosition + 'px';

    let leftInterval = setInterval(() => {
        // remove cactus 
        if (cactusPosition < -30) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) { 
            // Game 0ver
            clearInterval(leftInterval);
            isGameOver = true;
            document.getElementById("game-over").innerHTML = '<div id="game-over"><h2 class="subtitle is-size-1 is-bold has-text-centered"">Game Over<br><button class="play" onClick="window.location.reload();">Play Again</button></h2></div>';
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20)

    setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}
