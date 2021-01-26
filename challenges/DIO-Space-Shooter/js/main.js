const myShip = document.querySelector('.player-shooter');
const playArea = document.querySelector('#main-play-area');
const aliensImg = ['../img/enemy-1.png', '../img/enemy-2.png', '../img/enemy-3.png'];
let alienInterval;

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
    newShoot.src = '../img/shoot.png';
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
                alien.src = '../img/explosion.png';
                alien.classList.remove('alien');
                alien.classList.add('dead-alien');
                shoot.remove();
            }
        })
        if(xPosition >= 1300){
            shoot.remove();
        } else {
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
    newAlien.style.top = `${Math.floor(Math.random() * 380 + 75)}px`;
    playArea.appendChild(newAlien);
    moveAlien(newAlien); 
}

function moveAlien(alien) {
    let moveAlienInterval = setInterval(() => {
        let xPosition = parseInt(window.getComputedStyle(alien).getPropertyValue('left'));
        if(xPosition <= -75) {
            if(Array.from(alien.classList).includes('dead-alien')) {
                alien.remove();
            } else {
                alien.remove();
                // gameOver();
            } 
        } else {
            alien.style.left = `${xPosition -4}px`;
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
    if(shootLeft != 1225 && shootLeft + 75 >= alienLeft) {
        if(shootTop <= alienTop && shootTop >= alienBottom) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

window.addEventListener('keydown', moveShip);

alienInterval = setInterval(() => {
    createAliens();
}, 1000);



