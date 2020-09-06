// including SCSS
import '../css/main.scss';

const canvasNode = document.getElementById('game-viewport');
const ctx = canvasNode.getContext('2d');
const gridBoxSize = 40;
const height = 600; // TODO: get this dynamically later
const width = 800; // TODO: get this dynamically later
const rowCount = Math.floor(height / gridBoxSize);
const colCount = Math.floor(width / gridBoxSize);

ctx.strokeStyle = '#ccc';
let count = 0;

for (let xIndex = 0; xIndex < colCount; xIndex += 1) {
    for (let yIndex = 0; yIndex < rowCount; yIndex += 1) {
        count++;
        ctx.strokeRect(
            xIndex * gridBoxSize,
            yIndex * gridBoxSize,
            gridBoxSize,
            gridBoxSize
        );
    }
}

console.log(count);
