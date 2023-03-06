---
weight: 1
---

# Ponzo Illusion

The Ponzo illusion is a geometrical-optical illusion that was first demonstrated by the Italian psychologist Mario Ponzo (1882–1960) in 1911. He suggested that the human mind judges an object's size based on its background.

## Example

{{< p5-global-iframe id="breath" width="625" height="625" >}}
let railDist = 110;
let railThickness = 6;
let dist = 15;
let showRedLines = false;

function setup() {
createCanvas(625, 6256);
}

function draw() {
background(220);
stroke(0, 0, 0);
// Draw rails
let railY = 400;
let railX1 = 75;
let railX2 = 325;
strokeWeight(railThickness);
// stroke(0, 0, 0); // blue rails
line(railX1, railY, railX1 + railDist, 0);
line(railX2, railY, railX2 - railDist, 0);

let startX = 65;
let endX = 335;
let startY = 360;
let dy = 39;
// stroke(0, 0, 0); // green lines
for (let i = 0; i < 10; i++) {
let y = startY - (i _ dy);
let scalingFactor = y / height _ dist;
let x1 = startX + (i _ 12) - scalingFactor;
let x2 = endX - (i _ 12) + scalingFactor;
line(x1, y, x2, y);
dy -= 0.07;
}

stroke(255, 255, 0);
// Up line
line(115, 70, 285, 70);

// Down line
line(115, 340, 285, 340);

// if (showRedLines) {
// stroke(255, 0, 0);
// line(115, 0, 115, 400);
// line(285, 0, 285, 400);
// }
}

function mouseClicked() {
showRedLines = !showRedLines;
}

{{< /p5-global-iframe >}}
