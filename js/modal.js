// We will show all the settings in a modal 

const modal = new bootstrap.Modal(document.getElementById('modal'))
const modalContent = document.querySelector('.modal-content')
const settingsBtn = document.getElementById('settings-btn')
const acceptBtn = document.getElementById('accept-btn')
const navbar = document.querySelector('.navbar')
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

// Retrive values and apply settings
function handleAccept() {
    const darkModeSwitch = document.getElementById('dark-mode-switch')
    darkModeSwitch.checked ? enableDarkMode() : restoreLightMode()
    modal.hide()
}

settingsBtn.addEventListener('click', () => {
    modal.show()
})

acceptBtn.addEventListener('click', handleAccept)
