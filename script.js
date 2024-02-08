//  https://www.toptal.com/developers/keycode

document.addEventListener("keydown", whenButtonIsPressed)

var world = document.getElementById('world')
var container = document.getElementById('container')
var infoWindow = document.getElementById('infoWindow')

var isInfoPanelOpen = false

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
    // i taustiņš parādīs informācijas logu
    if (event.keyCode == 73) {
        isInfoPanelOpen = !isInfoPanelOpen
    }
    console.log("Is info panel open: ", isInfoPanelOpen)


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

function  game() {
    world.style.transform = `translate3d(${x_dir}px, ${y_dir}px, ${z_dir}px) rotateX(${x_rot}deg) rotateY(${y_rot}deg) rotateZ(${z_rot}deg)`;
}

//Informācijas logs
function infoPanel() {

    // grādi neiet pāri  360 grādiem
    let x_deg = x_rot % 360;
    let y_deg = y_rot % 360;
    let z_deg = z_rot % 360;

    // grādi neiet negatīvā
    if(x_deg < 0) x_deg = 360 + x_deg;
    if(y_deg < 0) y_deg = 360 + y_deg;
    if(z_deg < 0) z_deg = 360 + z_deg;

    if (!isInfoPanelOpen) {
        container.style.width = `98%`

        infoWindow.style.width = `0%`
        infoWindow.style.marginRight = `0%`
        infoWindow.style.marginLeft = `0%`
        infoWindow.style.padding = `0%`

        infoWindow.innerHTML = ``
    } 
    else if (isInfoPanelOpen) {
        container.style.width = `80%`

        infoWindow.style.width = `15%`
        infoWindow.style.marginRight = `3%`
        infoWindow.style.marginLeft = `2%`
        infoWindow.style.padding = `2%`

        infoWindow.innerHTML = `
        <h5>The Information Panel</h5>
        <hr>
        <p>Movement speed: ${movementSpeed}px
        <hr>
        Camera coordinates:<br>
        x: ${x_dir}<br>
        y: ${y_dir}<br>
        z: ${z_dir}
        <hr>
        Camera rotation:<br>
        x: ${xRot}<br>
        y: ${yRot}<br>
        z: ${zRot}
        <hr>
        </p>
        <p id="finePrint">
        Movement controls:<br>
        w: move forward<br>
        a: move left<br>
        s: move backward<br>
        d: move right<br>
        spacebar: move up<br>
        shift: move down<br>
        q: turn left<br>
        e: turn rigth<br>
        arrow up: tilt forward<br>
        arrow left: tilt left<br>
        arrow down: tilt backward<br>
        arrow right: tilt right</p>
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
    game()
    infoPanel()

    myReq = requestAnimationFrame(render)
}

render()