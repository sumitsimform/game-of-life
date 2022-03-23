
const canvas = document.querySelector("#gamefield");
const ctx = canvas.getContext("2d");

// Defaults  
const DEFAULT_ZOOM = .5;
const MAX_ZOOM = 3;
const MIN_ZOOM = .2;
const ZOOM_STEP = .1;
let mouseDown = false;
let mousePos = [0, 0];
let DRAW_POS = [canvas.width / 2, canvas.height / 2];
let drawPos = DRAW_POS;
let scale = DEFAULT_ZOOM;

const game = new GameOfLife()
game.gameSetUp()

// Draw the canvas    
let drawCanvas = () => {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawPattern();
}

// Draw the pattern      
let drawPattern = () => {
    game.arrayRandomize();
    game.fillArray();
    window.setInterval(() => {
        game.runGame();
    }, 3000)
}

// Set the zoom with the mouse wheel      
let zoom = (e) => {
    if (e.wheelDelta > 0) {
        zoomIn();
    }
    else {
        zoomOut();
    }
}

// Zoom in     
let zoomIn = () => {
    if (scale < MAX_ZOOM) {
        scale += ZOOM_STEP;
        drawCanvas();
    }
}

// Zoom out      
let zoomOut = () => {
    if (scale > MIN_ZOOM) {
        scale -= ZOOM_STEP;
        drawCanvas();
    }
}

// Reset the zoom           
let resetZoom = () => {
    scale = DEFAULT_ZOOM;
    drawCanvas();
}

// Reset the position          
let resetPos = () => {
    drawPos = DRAW_POS;
    drawCanvas();
}

// Toggle mouse status            
let setMouseDown = (e) => {
    mouseDown = true;
    mousePos = [e.x, e.y];
}

let setMouseUp = () => {
    mouseDown = false;
}

// Move        
let move = (e) => {
    if (mouseDown) {
        const delta = [e.x - mousePos[0], e.y - mousePos[1]];
        drawPos = [drawPos[0] + delta[0], drawPos[1] + delta[1]];
        mousePos = [e.x, e.y];
        drawCanvas();
    }
}

canvas.addEventListener("mousewheel", zoom, false);
canvas.addEventListener("mousedown", setMouseDown, false);
canvas.addEventListener("mouseup", setMouseUp, false);
canvas.addEventListener("mousemove", move, false);

window.onload = () => {

    document.querySelector("#stop").addEventListener("click", () => {
        game.gameSetUp();
    })

    document.querySelector("#start-random").addEventListener("click", () => {
        document.location.reload();
    })
    drawCanvas();
}