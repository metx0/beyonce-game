// Handle the file input and the replacement of the player image 

const fileInput = document.getElementById('file-input')
const player = document.getElementById('player')

export function handleFileInput() {
    // A file was selected
    if (fileInput.files.length > 0) {
        // Get the first one
        const photo = fileInput.files[0]
        // Create an URL to store the photo temporarily
        const photoURL = URL.createObjectURL(photo)

        player.style.backgroundImage = `url('${photoURL}')`
    }
}
