---
weight: 1
---

{{< hint info >}}
**Exercise**  
Take advantage of monocular cues to implement a 2D sketch to trick the eye into perceiving a 3D scene.
{{< /hint >}}

# Parallax Illusion

The parallax illusion is a monocular cue that occurs when an observer's viewpoint changes. It is the apparent shift in the relative positions of objects caused by the motion of the observer. When the observer moves, the position of nearby objects changes more than that of distant objects, creating a relative motion between the objects in the foreground and the background. This relative motion is known as the parallax effect, and our brains use it to estimate the depth and distance of objects in our visual field.

## Example

{{< p5-global-iframe id="breath" width="625" height="625" >}}

let drops = [];
let stopped = false;

function setup() {
createCanvas(555, 555);
for (let i = 0; i < 50; i++) {
let sizeDrop = random(2, 20);
let x = random(width);
let y = random(height, 0);
let xSpeed = map(sizeDrop, 2, 20, 1, 6);
let drop = {x: x, y: y, sizeDrop: sizeDrop, xSpeed: xSpeed};
drops.push(drop);
}

// create a stop button
let button = createButton('Stop/Resume');
button.class('btn');
button.mousePressed(stopAnimation);
}

function draw() {
background(0, 0, 0);

// Only update and draw if not stopped
if (!stopped) {
// Move and draw the raindrops with a parallax effect
for (let i = 0; i < drops.length; i++) {
let drop = drops[i];
drop.x += drop.xSpeed;
if (drop.y > height) {
drop.y = random(-height, 0);
}
if (drop.x > width) {
drop.x = 0;
}
fill(16, 88, 255);
ellipse(drop.x, drop.y, drop.sizeDrop, drop.sizeDrop);
fill(255, 255, 255, 100);
}
} else {
// Draw raindrops without updating positions
for (let i = 0; i < drops.length; i++) {
let drop = drops[i];
fill(16, 88, 255);
ellipse(drop.x, drop.y, drop.sizeDrop, drop.sizeDrop);
fill(255, 255, 255, 100);
}
}
}

function stopAnimation() {
stopped = !stopped; // toggle the flag
}

// Add CSS styling for the button
function style() {
const css = `  .btn {
      padding: 10px 20px;
      font-size: 16px;
    }`;
const head = document.head || document.getElementsByTagName('head')[0];
const style = document.createElement('style');
style.type = 'text/css';
style.appendChild(document.createTextNode(css));
head.appendChild(style);
}
style();

{{< /p5-global-iframe >}}
