//  https://www.toptal.com/developers/keycode

document.addEventListener("keydown", whenButtonIsPressed)

var world = document.getElementById('world')

//Kustības ātruma lielumi
var movementSpeed = 10
var setMovementSpeed

//Kustības koordinātes
let x_dir = 500
let z_dir = 0
let y_dir = 250

//Rotācijas grādi
let x_rot = -30
let y_rot = 0
let z_rot = 0


function whenButtonIsPressed() {
    // r taustiņš restartē pozīciju/atrašanās vietu
    if (event.keyCode == 82) {
        x_dir = 500
        z_dir = 0
        y_dir = 250
        x_rot = -30
        y_rot = 0
        z_rot = 0
    }


    //Kustības ātrums
    // p tautsiņš dos lodziņu ātruma maiņai
    if (event.keyCode == 80) {
        setMovementSpeed = Number(prompt("Enter a number to change movement speed.", "10"))
        if (!isNaN(setMovementSpeed)) {
            movementSpeed = setMovementSpeed
        } else {
            alert("Please enter a number!")
        }
        console.log("Movement Speed: " + movementSpeed)
        console.log("Set movement Speed: " + setMovementSpeed)
    }

    
    //Kustība
    // d taustiņš
    if (event.keyCode == 68) {
        x_dir -= movementSpeed
    }
    // a taustiņš
    if (event.keyCode == 65) {
        x_dir += movementSpeed
    }
    // w taustiņš
    if (event.keyCode == 87) {
        z_dir += movementSpeed
    }
    // s taustiņš
    if (event.keyCode == 83) {
        z_dir -= movementSpeed
    }
    // spacebar taustiņš
    if (event.keyCode == 32) {
        y_dir += movementSpeed
    }
    // left_shift taustiņš
    if (event.keyCode == 16) {
        y_dir -= movementSpeed
    }

    //Rotācija
    // up_arrow taustiņš
    if (event.keyCode == 38) {
        x_rot -= movementSpeed
    }
    // down_arrow taustiņš
    if (event.keyCode == 40) {
        x_rot += movementSpeed
    }
    // e taustiņš
    if (event.keyCode == 69) {
        y_rot += movementSpeed
    }
    // q taustiņš
    if (event.keyCode == 81) {
        y_rot -= movementSpeed
    }
    // right_arrow taustiņš
    if (event.keyCode == 39) {
        z_rot += movementSpeed
    }
    // left_arrow taustiņš
    if (event.keyCode == 37) {
        z_rot -= movementSpeed
    }
}

//Lai rādītu vērtības
function settingsValues() {
    document.getElementById("movementSpeed").textContent = "Movement speed: " + movementSpeed + "px"

    document.getElementById("xdir").textContent = "x: " + x_dir
    document.getElementById("ydir").textContent = "y: " + y_dir
    document.getElementById("zdir").textContent = "z: " + z_dir

    document.getElementById("xrot").textContent = "x: " + x_rot
    document.getElementById("yrot").textContent = "y: " + y_rot
    document.getElementById("zrot").textContent = "z: " + z_rot
}

function  game() {
    world.style.transform = `translate3d(${x_dir}px, ${y_dir}px, ${z_dir}px) rotateX(${x_rot}deg) rotateY(${y_rot}deg) rotateZ(${z_rot}deg)`;
}

function render() {
    game()
    settingsValues()

    myReq = requestAnimationFrame(render)
}

render()