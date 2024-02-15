//  https://www.toptal.com/developers/keycode
const world = document.getElementById('world')
const container = document.getElementById('container')
const infoWindow = document.getElementById('infoWindow')

const deg = Math.PI / 180

document.addEventListener("keydown", onKeyPress)
document.addEventListener("keyup", onKeyRelese)
document.addEventListener("mousemove", onMouseMove)
document.addEventListener("pointerlockchange", () => {lockedPointer = !lockedPointer})

container.onclick = function() {
    container.requestPointerLock()
}

let lockedPointer = false
let isInfoPanelOpen = false

let movementSpeed = 6
let sensitivity = 0.2

let position = vec3(500, 360, 0)
let rotation = vec3(-30, 45, 0)

//Util function
function vec3(x = 0, y = 0, z = 0) {
    return {
        x : x,
        y : y,
        z : z,
    }
}

//Event callbacks
let keymap = {
    KeyA: false,
    KeyD: false,
    KeyW: false,
    KeyS: false,
    KeyQ: false,
    KeyE: false, 
    Space: false,
    ShiftLeft: false,
    KeyZ: false
}

function onKeyPress(event) {
    if (keymap[ event.code ] != null) {
        keymap[ event.code ] = true
    }
}
function onKeyRelese(event) {
    if (event.code == 'KeyI') {
        isInfoPanelOpen = !isInfoPanelOpen
      
        return
    } else if (event.code == 'KeyR') {
        position = vec3(500, 360, 0)
        rotation = vec3(-30, 0, 0)
      
        return
    }

    if (keymap[ event.code ] != null) {
        keymap[ event.code ] = false
    }
}
function onMouseMove(event) {
    if (!lockedPointer) return

    rotation.y += event.movementX * sensitivity
    rotation.x -= event.movementY * sensitivity
}

//Update functions

function updateWorld() {
    world.style.transform = `translateZ(600px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translate3d(${position.x}px, ${position.y}px, ${position.z}px)`
}

function updatePlayerMovement() {
    let facingVector = vec3(
        Math.cos(rotation.y * deg),
        Math.sin(rotation.y * deg),
    )

    if (keymap.ShiftLeft) {
        movementSpeed = 10
    } else {
        movementSpeed = 6
    }

    if (keymap.KeyW) {
        position.z += facingVector.x * movementSpeed
        position.x -= facingVector.y * movementSpeed
    }
    if (keymap.KeyS) {
        position.z -= facingVector.x * movementSpeed
        position.x += facingVector.y * movementSpeed
    }

    if (keymap.KeyA) {
        position.x += facingVector.x * movementSpeed
        position.z += facingVector.y * movementSpeed
    }
    if (keymap.KeyD) {
        position.x -= facingVector.x * movementSpeed
        position.z -= facingVector.y * movementSpeed
    }

    if (rotation.x > 360) {rotation.x -= 360}
    if (rotation.x < -360) {rotation.x += 360}
    
    if (rotation.y > 360) {rotation.y -= 360}
    if (rotation.y < -360) {rotation.y += 360}

    if (rotation.z > 360) {rotation.z -= 360}
    if (rotation.z < -360) {rotation.z += 360}
}

function drawInfoPanel() {
    if (!isInfoPanelOpen) {
        container.style.width = `98%`

        infoWindow.style.width = `0%`
        infoWindow.style.marginRight = `0%`
        infoWindow.style.marginLeft = `0%`
        infoWindow.style.padding = `0%`

        infoWindow.innerHTML = ``
    } else if (isInfoPanelOpen) {
        container.style.width = `84%`

        infoWindow.style.width = `10%`
        infoWindow.style.marginRight = `2%`
        infoWindow.style.marginLeft = `1%`
        infoWindow.style.padding = `1%`

        infoWindow.innerHTML = `
        <h5>The Information Panel</h5>
        <hr>
        <p>Movement speed: ${movementSpeed}px
        Camera sensitivity: ${sensitivity * 100}%
        <hr>
        Players camera coordinates:<br>
        x: ${position.x}<br>
        y: ${position.y}<br>
        z: ${position.z}
        <hr>
        
        Players camera rotation:<br>
        
        x: ${rotation.x}<br>
        y: ${rotation.y}<br>
        z: ${rotation.z}

        <hr>
        </p>
        <p id="finePrint">
        Movement controls:<br>
        w: move forward<br>
        a: move left<br>
        s: move backward<br>
        d: move right<br>
        
        shift: sprint<br>
        <hr>
        <p id="finePrint">Other functions:<br>
        r: reset back to starting position<br>
        i: open & close the information panel<br>
        </p>`
    }
}

// Main game loop
function game() {
    updatePlayerMovement()
    drawInfoPanel()
    updateWorld()

    myReq = requestAnimationFrame(game)
}

// Starting the game
game()