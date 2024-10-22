const gameArea = document.getElementById('game-area')
// We use the syntax of # to select an element with id 
const player = document.querySelector('#player')
const beyonce = document.getElementById('beyonce')

let playerPosition = {
    x: 0,
    y: 0
}

let beyoncePosition = {
    x: 300,
    y: 300
}

const playerSpeed = 50
const beyonceSpeed = 1

function restartPosition() {
    playerPosition.x = 0
    playerPosition.y = 0

    beyoncePosition.x = 300
    beyoncePosition.y = 300
}

function updatePosition() {
    player.style.transform = `translate(${playerPosition.x}px, ${playerPosition.y}px)`
    beyonce.style.transform = `translate(${beyoncePosition.x}px, ${beyoncePosition.y}px)`
}

function detectCollision() {
    const deltaX = Math.abs(playerPosition.x - beyoncePosition.x)
    const deltaY = Math.abs(playerPosition.y - beyoncePosition.y)

    if (deltaX <= 50 && deltaY <= 50) {
        alert('Perdiste')
        restartPosition()

        /* if (confirm('Beyonce te atrapó. Rápido, dale las gracias para salvarte!!')) {
            playerPosition.x = 0
            playerPosition.y = 0

            beyoncePosition.x = 300
            beyoncePosition.y = 300
        } else {
            alert('Perdiste')
        } */
    }
}

// TODO: que el juego inicie solo cuando se presione alguna tecla del cursor
// Al inicio, cuando no se ha presionado una tecla, el juego está estático

function gameLoop() {
    moveBeyonce() 
    updatePosition()
    detectCollision()
    requestAnimationFrame(gameLoop)
}

function moveBeyonce() {
    if (beyoncePosition.x < playerPosition.x) {
        beyoncePosition.x += beyonceSpeed
    } else if (beyoncePosition.x > playerPosition.x) {
        beyoncePosition.x -= beyonceSpeed
    }

    if (beyoncePosition.y < playerPosition.y) {
        beyoncePosition.y += beyonceSpeed
    } else if (beyoncePosition.y > playerPosition.y) {
        beyoncePosition.y -= beyonceSpeed
    }
}

function movePlayer(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (playerPosition.y > 0)
                playerPosition.y -= playerSpeed
            break
        case 'ArrowDown':
            if (playerPosition.y < gameArea.clientHeight - playerSpeed)
                playerPosition.y += playerSpeed
            break
        case 'ArrowLeft':
            if (playerPosition.x > 0)
                playerPosition.x -= playerSpeed
            break
        case 'ArrowRight':
            if (playerPosition.x < gameArea.clientWidth - playerSpeed)
                playerPosition.x += playerSpeed
            break
    }

    // updatePosition()
}

window.addEventListener('keydown', movePlayer)

window.addEventListener('load', () => {
    gameLoop()
})
