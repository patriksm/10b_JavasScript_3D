//  https://www.toptal.com/developers/keycode
const world = document.getElementById('world')

//asset box
const square1 = document.getElementById('square1')
const square2 = document.getElementById('square2')
const square3 = document.getElementById('square3')
const square4 = document.getElementById('square4')
const square5 = document.getElementById('square5')
const square6 = document.getElementById('square6')

const container = document.getElementById('container')
const infoWindow = document.getElementById('infoWindow')

document.addEventListener("keydown", onKeyPress)
document.addEventListener("keyup", onKeyRelese)

var isInfoPanelOpen = false

var canMoveObject = false

//Kustības ātruma lielumi
var movementSpeed = 10
var setMovementSpeed

let assetBoxPosition = vec3( 0, 0, 0 )
let assetBoxRotation = vec3( 0, 0, 0 )

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
    ArrowUp : false, ArrowDown : false, ArrowRight : false, ArrowLeft : false,
    KeyO : false, }

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
    if ( event.code == 'KeyO' ) {
        canMoveObject = !canMoveObject
        console.log("Can move object: ",canMoveObject)
    }

    if ( keymap[ event.code ] != null ) {
        keymap[ event.code ] = false
    }
}

function updateWorld() {
    world.style.transform = `translate3d(${ position.x }px, ${ position.y }px, ${ position.z }px) rotateX(${ rotation.x }deg) rotateY(${ rotation.y }deg) rotateZ(${ rotation.z }deg)`;
    asset_Box()
    console.log(assetBoxPosition.x)
}

function asset_Box() {
    square1.style.transform = `translate3d(${ assetBoxPosition.x }px, ${ assetBoxPosition.y }px, ${ assetBoxPosition.z }px) rotateX(${ assetBoxRotation.x }deg) rotateY(${ assetBoxRotation.y }deg) rotateZ(${ assetBoxRotation.z }deg)`
    square2.style.transform = `translate3d(${ assetBoxPosition.x }px, ${ assetBoxPosition.y + 100 }px, ${ assetBoxPosition.z - 100 }px) rotateX(${ assetBoxRotation.x + 90 }deg) rotateY(${ assetBoxRotation.y }deg) rotateZ(${ assetBoxRotation.z }deg)`
    square3.style.transform = `translate3d(${ assetBoxPosition.x }px, ${ assetBoxPosition.y }px, ${ assetBoxPosition.z - 200 }px) rotateX(${ assetBoxRotation.x }deg) rotateY(${ assetBoxRotation.y }deg) rotateZ(${ assetBoxRotation.z }deg)`
    square4.style.transform = `translate3d(${ assetBoxPosition.x }px, ${ assetBoxPosition.y - 100 }px, ${ assetBoxPosition.z - 100 }px) rotateX(${ assetBoxRotation.x + 90 }deg) rotateY(${ assetBoxRotation.y }deg) rotateZ(${ assetBoxRotation.z }deg)`
    square5.style.transform = `translate3d(${ assetBoxPosition.x - 100 }px, ${ assetBoxPosition.y }px, ${ assetBoxPosition.z - 100 }px) rotateX(${ assetBoxRotation.x }deg) rotateY(${ assetBoxRotation.y + 90 }deg) rotateZ(${ assetBoxRotation.z }deg)`
    square6.style.transform = `translate3d(${ assetBoxPosition.x + 100 }px, ${ assetBoxPosition.y }px, ${ assetBoxPosition.z -100 }px) rotateX(${ assetBoxRotation.x }deg) rotateY(${ assetBoxRotation.y +90 }deg) rotateZ(${ assetBoxRotation.z }deg)`
}

function updatePlayerMovement() {
    if ( keymap.KeyA && !canMoveObject ) {
        position.x += movementSpeed
    }
    else if ( keymap.KeyA && canMoveObject ) {
        assetBoxPosition.x -= movementSpeed
    }
    if ( keymap.KeyD && !canMoveObject ) {
        position.x -= movementSpeed
    }
    else if ( keymap.KeyD && canMoveObject ) {
        assetBoxPosition.x += movementSpeed
    }

    if ( keymap.KeyW && !canMoveObject ) {
        position.z += movementSpeed
    }
    else if ( keymap.KeyW && canMoveObject ) {
        assetBoxPosition.z -= movementSpeed
    }
    if ( keymap.KeyS && !canMoveObject ) {
        position.z -= movementSpeed
    }
    else if ( keymap.KeyS && canMoveObject ) {
        assetBoxPosition.z += movementSpeed
    }

    if ( keymap.KeyE && !canMoveObject ) {
        position.y += movementSpeed
    }
    else if ( keymap.KeyE && canMoveObject ) {
        assetBoxPosition.y -= movementSpeed
    }
    if ( keymap.KeyQ && !canMoveObject ) {
        position.y -= movementSpeed
    }
    else if ( keymap.KeyQ && canMoveObject ) {
        assetBoxPosition.y += movementSpeed
    }


    if ( keymap.ArrowLeft && !canMoveObject ) {
        rotation.y -= movementSpeed
    }
    else if ( keymap.ArrowLeft && canMoveObject ) {
        assetBoxRotation.y += movementSpeed
    }
    if ( keymap.ArrowRight && !canMoveObject ) {
        rotation.y += movementSpeed
    }
    else if ( keymap.ArrowRight && canMoveObject ) {
        assetBoxRotation.y -= movementSpeed
    }

    if ( keymap.ArrowUp && !canMoveObject ) {
        rotation.x -= movementSpeed
    }
    else if ( keymap.ArrowUp && canMoveObject ) {
        assetBoxRotation.x += movementSpeed
    }
    if ( keymap.ArrowDown && !canMoveObject ) {
        rotation.x += movementSpeed
    }
    else if ( keymap.ArrowDown && canMoveObject ) {
        assetBoxRotation.x -= movementSpeed
    }

    if ( rotation.x > 360 ) { rotation.x -= 360 }
    if ( rotation.x < -360 ) { rotation.x += 360 }
    
    if ( rotation.y > 360 ) { rotation.y -= 360 }
    if ( rotation.y < -360 ) { rotation.y += 360 }

    if ( assetBoxRotation.x > 360 ) { assetBoxRotation.x -= 360 }
    if ( assetBoxRotation.x < -360 ) { assetBoxRotation.x += 360 }
    if ( assetBoxRotation.y > 360 ) { assetBoxRotation.y -= 360 }
    if ( assetBoxRotation.y < -360 ) { assetBoxRotation.y += 360 }
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