import { setBeyonceSpeed, setGameState } from './app.js'

// We will show all the settings in a modal 

const modal = new bootstrap.Modal(document.getElementById('modal'))
const modalContent = document.querySelector('.modal-content')
const settingsBtn = document.getElementById('settings-btn')
const navbar = document.querySelector('.navbar')
const difficultySelector = document.getElementById('difficulty-select')
const body = document.body

const originalBodyBackground = '#f0f8ff'
const originalGameBackground = '#fbfbb5'

/*
We change the styles of the body, navbar, settings button, the game area and the modal
*/

function enableDarkMode() {
    body.style.backgroundColor = '#919098'
    navbar.classList.add('nav-dark')
    settingsBtn.classList.add('btn-secondary')
    document.getElementById('game-area').style.backgroundColor = 'darkgray'
    modalContent.classList.add('bg-dark', 'text-light')
}

function restoreLightMode() {
    body.style.backgroundColor = originalBodyBackground
    navbar.classList.remove('nav-dark')
    settingsBtn.classList.remove('btn-secondary')
    document.getElementById('game-area').style.backgroundColor = originalGameBackground
    modalContent.classList.remove('bg-dark', 'text-light')
}

function changeDifficulty(value) {
    const difficultyMap = {
        'easy': 0.5,
        'normal': 1,
        'hard': 2
    }

    // If value doesn't exist as a key in the object, return a string
    return difficultyMap[value] ?? 'Invalid value'
}

// Retrive values and apply settings
function handleAccept() {
    // Dark mode
    const darkModeSwitch = document.getElementById('dark-mode-switch')
    darkModeSwitch.checked ? enableDarkMode() : restoreLightMode()

    // Difficulty
    let newSpeed = changeDifficulty(difficultySelector.value)
    setBeyonceSpeed(newSpeed)

    modal.hide()
    // Resume game 
    setGameState(true)
}

// Add event listeners to buttons

settingsBtn.addEventListener('click', () => {
    modal.show()
    // Pause game 
    setGameState(false)
})

document.getElementById('accept-modal-btn')
    .addEventListener('click', handleAccept)

document.querySelector('#close-modal-btn')
    .addEventListener('click', () => {
        // Resume game
        setGameState(true)
    })
