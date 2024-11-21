const gameArea = document.getElementById('game-area')
// We use the syntax of # to select an element with id 
const player = document.querySelector('#player')
const beyonce = document.getElementById('beyonce')
const audio = document.querySelector('audio')

let playerPosition = {
    x: 0,
    y: 0
}

let beyoncePosition = {
    x: 300,
    y: 300
}

const playerSpeed = 50
let beyonceSpeed = 1
// This is used to pause the game and resume it
let isPlaying = true

export function setGameState(playing) {
    isPlaying = playing

    if (!isPlaying) {
        audio.pause()
    } else {
        audio.play()
    }
}

export function setBeyonceSpeed(newSpeed) {
    beyonceSpeed = newSpeed
}

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
        alert('You lost')
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

function gameLoop() {
    if (isPlaying) {
        moveBeyonce()
        updatePosition()
        detectCollision()
    }

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
}

window.addEventListener('keydown', movePlayer)

// Wait for user interaction to play the audio and start the game 
function handleFirstInteraction() {
    audio.play()
    // Start game
    gameLoop()

    // Remove listener, it's no longer necessary
    window.removeEventListener('keydown', handleFirstInteraction);
}

window.addEventListener('keydown', handleFirstInteraction)

window.addEventListener('load', () => {
    updatePosition()
})
