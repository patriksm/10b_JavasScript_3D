//  https://www.toptal.com/developers/keycode

document.addEventListener("keydown", movement)

var world = document.getElementById('world')

//Kustības koordinātes
let x_dir = 500
let z_dir = 0
let y_dir = 250

//Rotācijas grādi
let x_rot = -30
let y_rot = 0
let z_rot = 0


function movement() {
    //Kustība
    // d taustiņš
    if (event.keyCode == 68) {
        x_dir -= 10
    }
    // a taustiņš
    if (event.keyCode == 65) {
        x_dir += 10
    }
    // w taustiņš
    if (event.keyCode == 87) {
        z_dir += 10
    }
    // s taustiņš
    if (event.keyCode == 83) {
        z_dir -= 10
    }
    // spacebar taustiņš
    if (event.keyCode == 32) {
        y_dir += 10
    }
    // left_shift taustiņš
    if (event.keyCode == 16) {
        y_dir -= 10
    }

    //Rotācija
    // up_arrow taustiņš
    if (event.keyCode == 38) {
        x_rot -= 10
    }
    // down_arrow taustiņš
    if (event.keyCode == 40) {
        x_rot += 10
    }
    // e taustiņš
    if (event.keyCode == 69) {
        y_rot += 10
    }
    // q taustiņš
    if (event.keyCode == 81) {
        y_rot -= 10
    }
    // right_arrow taustiņš
    if (event.keyCode == 39) {
        z_rot += 10
    }
    // left_arrow taustiņš
    if (event.keyCode == 37) {
        z_rot -= 10
    }
}

function render() {
    world.style.transform = `translate3d(${x_dir}px, ${y_dir}px, ${z_dir}px) rotateX(${x_rot}deg) rotateY(${y_rot}deg) rotateZ(${z_rot}deg)`;

    myReq = requestAnimationFrame(render)
}

render()