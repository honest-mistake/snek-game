// including SCSS
import '../css/main.scss';

const timeBetweenTicks = 250;
const gridBoxSize = 40;
const height = 600; // TODO: get this dynamically later
const width = 800; // TODO: get this dynamically later
let canvasNode;
let ctx;
let rowCount;
let colCount;
let snakeX;
let snakeY;

const setCommonVars = () => {
    canvasNode = document.getElementById('game-viewport');
    ctx = canvasNode.getContext('2d');
    rowCount = Math.floor(height / gridBoxSize);
    colCount = Math.floor(width / gridBoxSize);
    snakeX = 10;
    snakeY = 10;
};

const drawDebugGrid = () => {
    const color = '#ccc';

    for (let xIndex = 0; xIndex < colCount; xIndex += 1) {
        for (let yIndex = 0; yIndex < rowCount; yIndex += 1) {
            drawBoxOutline(color, xIndex, yIndex);
        }
    }
};

const drawSnek = () => {
    drawBox('green', snakeX, snakeY);
};

const drawTarget = () => {
    drawBox('red', 3, 3);
};

const drawSomething = (colorType, drawType) => (color, xPos, yPos) => {
    ctx[colorType] = color;
    ctx[drawType](
        xPos * gridBoxSize,
        yPos * gridBoxSize,
        gridBoxSize,
        gridBoxSize
    );
};

const drawBoxOutline = drawSomething('strokeStyle', 'strokeRect');

const drawBox = drawSomething('fillStyle', 'fillRect');

const clearCanvas = () => {
    ctx.fillStyle = 'white';
    ctx.fillRect(
        0,
        0,
        width,
        height
    );
};

const startGameLoop = () => {
    tick();
};

const renderAllTheStuff = () => {
    clearCanvas();
    drawDebugGrid();
    drawTarget();
    drawSnek();
};

// TODO: update snake position
// TODO: update snake length?
// TODO: move snake forward but also trim tail?
const updateSnake = () => {
    if (snakeX < colCount - 1) {
        snakeX += 1;
    } else {
        snakeX = 0;
    }
};

const tick = () => {
    setTimeout(() => {
        updateSnake();
        renderAllTheStuff();
        tick();
    }, timeBetweenTicks);
};

(function initialize () {
    // set game mode select
    // set common variables
    // do first time game setup
    setCommonVars();
    renderAllTheStuff();
    startGameLoop();
})();
