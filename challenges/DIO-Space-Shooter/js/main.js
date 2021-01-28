const myShip = document.querySelector('.spaceship');
const playArea = document.querySelector('#main-play-area');
const aliensImg = ['./img/enemy-1.png', './img/enemy-2.png', './img/enemy-3.png'];
const titleScreen = document.querySelector('.title-screen');
const startBtn = document.querySelector('.start-btn');
let alienInterval;
let spawnAlien = 1000; 
let alienVelocity = 4;
let points = 0;

function moveShip(event) {
    if(event.key === 'ArrowUp'){
        event.preventDefault();
        moveUp();
    } else if(event.key === 'ArrowDown'){
        event.preventDefault();
        moveDown();
    } else if(event.key === " "){
        event.preventDefault();
        fireBall();
    }
}

function myScore(){
    if(points <= 0 && points <= 1000){
        spawnAlien = 1000;
        alienVelocity = 4;
    } else if(points >= 1001 && points <= 2000){
        spawnAlien = spawnAlien - 20;
        alienVelocity = alienVelocity + 0.4;
    } else if(points >= 2001 && points <= 3500){
        spawnAlien = spawnAlien - 10;
        alienVelocity = alienVelocity;
    } else if(points >= 3501 && points <= 5000){
        spawnAlien = spawnAlien - 3;
        alienVelocity = alienVelocity + 0.1;
    } else if(points >= 5001 && points <= 7500){
        spawnAlien = spawnAlien - 3;
        alienVelocity = alienVelocity;
    } else if(points >= 7501 && points <= 10000){
        spawnAlien = spawnAlien - 5;
        alienVelocity = alienVelocity;
    } else if(points >= 7501 && points <= 10400){
        spawnAlien = spawnAlien - 10;
        alienVelocity = 10;
    } else if(points > 10401 && points < 12000){
        spawnAlien = spawnAlien - 10;
        alienVelocity = alienVelocity;
    } else if(points >= 12000 && points < 13000){
        spawnAlien = spawnAlien - 10;
        alienVelocity = alienVelocity;
    } else if(points >= 13000 && points < 14000){
        spawnAlien = spawnAlien - 10;
        alienVelocity = alienVelocity;
    } else if(points >= 14000 && points < 15000){
        spawnAlien = spawnAlien - 10;
        alienVelocity = alienVelocity;
    } else if(points >= 15000 ){
        spawnAlien = spawnAlien - 10;;
        alienVelocity = alienVelocity;
    } 
}

function moveUp() {
    let topPosition = getComputedStyle(myShip).getPropertyValue('top');
    if(topPosition === "66px") {
        return
    } else {
        let position = parseInt(topPosition);
        position -= 52;
        myShip.style.top = `${position}px`;
    }
}

function moveDown() {
    let topPosition = getComputedStyle(myShip).getPropertyValue('top');
    if(topPosition === "534px") {
        return
    } else {
        let position = parseInt(topPosition);
        position += 52;
        myShip.style.top = `${position}px`;
    }
}

function fireBall() {
    let shoot = createShootElement();
    playArea.appendChild(shoot);
    moveShoot(shoot);
}

function createShootElement() {
    let xPosition = parseInt(window.getComputedStyle(myShip).getPropertyValue('left'));
    let yPosition = parseInt(window.getComputedStyle(myShip).getPropertyValue('top'));
    let newShoot = document.createElement('img');
    newShoot.src = './img/shoot.png';
    newShoot.classList.add('shoot');
    newShoot.style.left = `${xPosition +100}px`;
    newShoot.style.top = `${yPosition +6}px`;
    return newShoot;
}

function moveShoot(shoot) {
    let shootInterval = setInterval(() => {
        let xPosition = parseInt(shoot.style.left);
        let aliens = document.querySelectorAll('.alien');
        aliens.forEach((alien) => {
            if(checkCollision(shoot, alien)) {
                points = points + 100;
                score();
                myScore();
                alien.src = './img/explosion.png';
                alien.classList.remove('alien');
                alien.classList.add('dead-alien');
                clearInterval(shootInterval);
                shoot.remove();
            }
        })
        if(xPosition >= 1300){
            clearInterval(shootInterval);
            shoot.remove();
        } 
        else {
            shoot.style.left = `${xPosition + 8}px`;
        }
    }, 15);
}

function createAliens() {
    let newAlien = document.createElement('img');
    let alienSprite = aliensImg[Math.floor(Math.random() * aliensImg.length)];
    newAlien.src =  alienSprite;
    newAlien.classList.add('alien');
    newAlien.classList.add('alien-transition');
    newAlien.style.left = '1350px';
    newAlien.style.top = `${Math.floor(Math.random() * 500 + 75)}px`;
    playArea.appendChild(newAlien);
    moveAlien(newAlien); 
}

function moveAlien(alien) {
    let moveAlienInterval = setInterval(() => {
        let xPosition = parseInt(window.getComputedStyle(alien).getPropertyValue('left'));
        if(xPosition <= -75) {
            if(Array.from(alien.classList).includes('dead-alien')) {
                clearInterval(moveAlienInterval);
                alien.remove();
            } else {
                clearInterval(moveAlienInterval);
                alien.remove();
                gameOver();
            } 
        } else {
            alien.style.left = `${xPosition - alienVelocity}px`;
        }
    }, 30);
}

function checkCollision(shoot, alien) {
    let shootTop = parseInt(shoot.style.top);
    let shootLeft = parseInt(shoot.style.left);
    let shootBottom = shootTop - 30;
    let alienTop = parseInt(alien.style.top);
    let alienLeft = parseInt(alien.style.left);
    let alienBottom = alienTop - 52;
    if(shootLeft != 725 && shootLeft + 75 >= alienLeft) {
        if(shootBottom <= alienTop && shootTop >= alienBottom ) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

let score = () => {
    document.getElementById("points").innerHTML = points;
}

startBtn.addEventListener('click', (event) => {
    playGame();
})

function playGame(){
    let resetScore = () => {
        document.getElementById("points").innerHTML = 0;
    }
    startBtn.style.display = 'none';
    titleScreen.style.display = 'none';
    window.addEventListener('keydown', moveShip);
    alienInterval = setInterval(() => {
        createAliens();
    }, spawnAlien);
        resetScore();
}

function gameOver(){
    
    window.removeEventListener('keydown', moveShip);
    clearInterval(alienInterval);
    let aliens = document.querySelectorAll('.alien');
    aliens.forEach((alien) => alien.remove());
    let shoots = document.querySelectorAll('.shoot');
    shoots.forEach((shoot) => shoot.remove());
    setTimeout(() => {
        alert('game-over');
        myShip.style.top = '274';
        startBtn.style.display = 'block';
        titleScreen.style.display = 'block';
    });
}




