//  https://www.toptal.com/developers/keycode
const world = document.getElementById('world')
const container = document.getElementById('container')
const infoWindow = document.getElementById('infoWindow')

document.addEventListener("keydown", onKeyPress)
document.addEventListener("keyup", onKeyRelese)

var isInfoPanelOpen = false

//Kustības ātruma lielumi
var movementSpeed = 10
var rotationSpeed = movementSpeed / 8
var setMovementSpeed

//Kustības koordinātes
let position = vec3( 500, 250, 0 )
let rotation = vec3( -30, 0, 0 )

//Util function
function vec3( x = 0, y = 0, z = 0 ) {
    return {
        x : x,
        y : y,
        z : z,
    }
}

//pressed keys
let keymap = { 
    KeyA : false, KeyD : false, KeyW : false, KeyS : false, KeyQ : false, KeyE : false, 
    Space : false, ShiftLeft : false, 
    ArrowUp : false, ArrowDown : false, ArrowRight : false, ArrowLeft : false, }

function onKeyPress( event ) {
    
    if ( keymap[ event.code ] != null ) {
        keymap[ event.code ] = true
    }
}
function onKeyRelese( event ) {

    if ( event.code == 'KeyI' ) {
        isInfoPanelOpen = !isInfoPanelOpen
        return
    }else if ( event.code == 'KeyR' ) {
        position = vec3( 500, 250, 0 )
        rotation = vec3( -30, 0, 0 )
        return
    }else if( event.code == 'KeyP' ) {
        setMovementSpeed = Number(prompt("Enter a number to change movement speed.", "10"))
        if (!isNaN(setMovementSpeed)) {
            movementSpeed = setMovementSpeed
        } else {
            alert("Please enter a number!")
        }
        return
    }

    if ( keymap[ event.code ] != null ) {
        keymap[ event.code ] = false
    }
}

function updateWorld() {
    world.style.transform = `translate3d(${ position.x }px, ${ position.y }px, ${ position.z }px) rotateX(${ rotation.x }deg) rotateY(${ rotation.y }deg) rotateZ(${ rotation.z }deg)`;
}

function updatePlayerMovement() {
    if ( keymap.KeyA ) {
        position.x += movementSpeed
    }
    if ( keymap.KeyD ) {
        position.x -= movementSpeed
    }

    if ( keymap.KeyW ) {
        position.z += movementSpeed
    }
    if ( keymap.KeyS ) {
        position.z -= movementSpeed
    }

    if ( keymap.KeyE ) {
        position.y += movementSpeed
    }
    if ( keymap.KeyQ ) {
        position.y -= movementSpeed
    }

    if ( keymap.ArrowLeft ) {
        rotation.y -= rotationSpeed
    }
    if ( keymap.ArrowRight ) {
        rotation.y += rotationSpeed
    }

    if ( keymap.ArrowUp ) {
        rotation.x -= rotationSpeed
    }
    if ( keymap.ArrowDown ) {
        rotation.x += rotationSpeed
    }

    if ( rotation.x > 360 ) { rotation.x -= 360 }
    if ( rotation.x < -360 ) { rotation.x += 360 }
    
    if ( rotation.y > 360 ) { rotation.y -= 360 }
    if ( rotation.y < -360 ) { rotation.y += 360 }

    if ( rotation.z > 360 ) { rotation.z -= 360 }
    if ( rotation.z < -360 ) { rotation.z += 360 }
}

//Informācijas logs
function drawInfoPanel() {

    if (!isInfoPanelOpen) {
        container.style.width = `98%`

        infoWindow.style.width = `0%`
        infoWindow.style.marginRight = `0%`
        infoWindow.style.marginLeft = `0%`
        infoWindow.style.padding = `0%`

        infoWindow.innerHTML = ``
    } 
    else if (isInfoPanelOpen) {
        container.style.width = `84%`

        infoWindow.style.width = `10%`
        infoWindow.style.marginRight = `2%`
        infoWindow.style.marginLeft = `1%`
        infoWindow.style.padding = `1%`

        infoWindow.innerHTML = `
        <h5>The Information Panel</h5>
        <hr>
        <p>Movement speed: ${movementSpeed}px
        <hr>
        Camera coordinates:<br>
        x: ${ position.x }<br>
        y: ${ position.y }<br>
        z: ${ position.z }
        <hr>
        Camera rotation:<br>
        
        x: ${ rotation.x }<br>
        y: ${ rotation.y }<br>
        z: ${ rotation.z }

        <hr>
        </p>
        <p id="finePrint">
        Movement controls:<br>
        w: move forward<br>
        a: move left<br>
        s: move backward<br>
        d: move right<br>
        e: move up<br>
        q: move down<br>
        arrow left: turn left<br>
        arrow right: turn rigth<br>
        arrow up: tilt forward<br>
        arrow down: tilt backward<br>
        <hr>
        <p id="finePrint">Other functions:<br>
        r: reset back to starting position<br>
        i: open & close the information panel<br>
        p: change movement speed
        </p>`
    } 
    else {
        alert("Info Panel has FAILED!")
    }
}

function render() {
    
    updatePlayerMovement()
    
    drawInfoPanel()
    updateWorld()

    myReq = requestAnimationFrame(render)
}

render()