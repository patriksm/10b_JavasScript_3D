const world = document.getElementById( `world` )

document.addEventListener( 'keydown', keydown );
document.addEventListener( 'keyup', keyup );

let keydownMap = {
    left : false, right : false,
    up : false, down: false,
    forward : false, backward : false,

    tilitUp : false, tiltDown : false,
    tiltLeft : false, tilitRight : false,
}

let cameraPosition = vec3()
let cameraOrientation = vec3() 

let moveSpeed = 500
let rotSpeed = 60

//Utils
function getTransform( position, orientation ) {
    return `translate3d(${ position.x }px, ${ position.y }px, ${ position.z }px) rotateX(${ orientation.x }deg) rotateY(${ orientation.x }deg) rotateZ(${ orientation.x }deg)`
}

function vec3( x = 0, y = 0, z = 0 ) {
    return { x : x , y : y, z : z }
}

//Gameplay
function updateCameraMovement( deltaTime ) {
    if ( keydownMap.left ) {
        cameraPosition.x -= moveSpeed * deltaTime
    }
    if ( keydownMap.right ) {
        cameraPosition.x += moveSpeed * deltaTime
    }

    if ( keydownMap.up ) {
        cameraPosition.y += moveSpeed * deltaTime
    }
    if ( keydownMap.down ) {
        cameraPosition.y -= moveSpeed * deltaTime
    }

    if ( keydownMap.forward ) {
        cameraPosition.z += moveSpeed * deltaTime
    }
    if ( keydownMap.backward ) {
        cameraPosition.z -= moveSpeed * deltaTime
    }

    if ( keydownMap.tilitUp ) {
        cameraOrientation.x += rotSpeed * deltaTime
    }
    if ( keydownMap.tiltDown ) {
        cameraOrientation.x -= rotSpeed * deltaTime
    }
    if ( keydownMap.tiltLeft ) {
        cameraOrientation.y += rotSpeed * deltaTime
    }
    if ( keydownMap.tilitRight ) {
        cameraOrientation.y -= rotSpeed * deltaTime
    }
}

function updateGameWorld() {
    world.style.transform = getTransform( cameraPosition, cameraOrientation )
}

function keydown( event ) {
    console.log( event ) 

    switch ( event.key.toLowerCase() ) {
        case "w": keydownMap.forward = true; break;
        case "s": keydownMap.backward = true; break;
        case "a": keydownMap.right = true; break;
        case "d": keydownMap.left = true; break;
        case "e": keydownMap.up = true; break;
        case "q": keydownMap.down = true; break;

        case "arrowleft": keydownMap.tiltLeft = true; break;
        case "arrowright": keydownMap.tilitRight = true; break;
       
        case "arrowup": keydownMap.tilitUp = true; break;
        case "arrowdown": keydownMap.tiltDown = true; break;
    }

}
function keyup( event ) {
    // console.log( event ) 

    switch ( event.key.toLowerCase() ) {
        case "w": keydownMap.forward = false; break;
        case "s": keydownMap.backward = false; break;
        case "a": keydownMap.right = false; break;
        case "d": keydownMap.left = false; break;
        case "e": keydownMap.up = false; break;
        case "q": keydownMap.down = false; break;

        case "arrowleft": keydownMap.tiltLeft = false; break;
        case "arrowright": keydownMap.tilitRight = false; break;
       
        case "arrowup": keydownMap.tilitUp = false; break;
        case "arrowdown": keydownMap.tiltDown = false; break;
    }

}


let clock = Date.now()
function animationFrame() {
    let deltaTime = Date.now() - clock
    clock = Date.now()

    deltaTime /= 1000

    updateCameraMovement( deltaTime )
    updateGameWorld()

    meyreq = requestAnimationFrame( animationFrame )
}

animationFrame()