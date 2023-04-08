---
weight: 1
---

{{< hint info >}}
**Exercise**  
Take advantage of monocular cues to implement a 2D sketch to trick the eye into perceiving a 3D scene.
{{< /hint >}}

# Introduction
Monocular cues provide depth information when viewing a scene with one eye.
There are several effects that are based on this type of illusions, such as:
* Motion parallax
* Kinetic depth effect
* Perspective
* Relative size

In this particular case we will focus on the motion parallax. When an observer moves, the apparent relative motion of several stationary objects against a background gives hints about their relative distance. If information about the direction and velocity of movement is known, motion parallax can provide absolute depth information.
Some animals that lack binocular vision due to their eyes having little common field-of-view employ motion parallax more explicitly than humans for depth cueing (for example, some types of birds, which bob their heads to achieve motion parallax, and squirrels, which move in lines orthogonal to an object of interest to do the same). Wikipedia, 2023
# Previous Work
For decades, researchers in visual perception and psychology have studied the parallax illusion. This illusion is an important cue that our brain uses to estimate depth and distance. Studies have shown that the parallax illusion can be created through various techniques, such as overlapping images, changes in object size, variations in object spacing, and more. In short, the parallax illusion is a fascinating phenomenon that helps us understand how our brain processes visual information to create a 3D representation of the world around us.

Making a research on the internet we found this simple but good example, where the author uses a simple sketch to create the illusion of depth by overlapping images and its relative speed to hte mouse.


{{< p5-global-iframe id="breath" width="600" height="600" >}}


/*
ART210 - Intro to Digital Arts
parallax demo
Study Ref: Abstract Architecture 02 Poster by Marco Gonzalez 
*/

function setup() {
  createCanvas(595, 800);
  imageMode(CENTER);
}

function draw() {
  background('#f2f2f2');

  //architecture
  buildings();
}



let structure_buffer = 20,
  edge_light = '#7a021e';

function buildings() {
  push();
  noStroke();
  layerOne();
  layerTwo();
  layerThree();
  layerFour();
  layerFive();
  layerSix();
  pop();
}

function layerOne() {
  //layer 1
  push();
  translate(map(mouseX, 0, width, 1, -1), 0);

  push();
  fill(edge_light);
  translate(-1, -5);
  beginShape();
  vertex(-structure_buffer, 257);
  vertex(108, 276);
  vertex(159, 337);
  vertex(195, 327);
  vertex(292, 327);
  vertex(295, 434);
  vertex(382, 389);
  vertex(width + structure_buffer, 386);
  vertex(width + structure_buffer, height);
  vertex(-structure_buffer, height);
  endShape(CLOSE);
  pop();


  fill('#8f8f91');
  beginShape();
  vertex(-structure_buffer, 257);
  vertex(108, 276);
  vertex(159, 337);
  vertex(195, 327);
  vertex(292, 327);
  vertex(295, 434);
  vertex(382, 389);
  vertex(width + structure_buffer, 386);
  vertex(width + structure_buffer, height);
  vertex(-structure_buffer, height);
  endShape(CLOSE);
  pop();
}

function layerTwo() {
  //layer 2
  push();
  translate(map(mouseX, 0, width, 2, -2), 0);
  push();
  translate(-2, -3);
  fill(edge_light);
  beginShape();
  vertex(468, 218);
  vertex(width + structure_buffer, 245);
  vertex(width + structure_buffer, height);
  vertex(468, height);
  endShape(CLOSE);
  pop();

  fill('#5f5f61');
  beginShape();
  vertex(468, 218);
  vertex(width + structure_buffer, 245);
  vertex(width + structure_buffer, height);
  vertex(468, height);
  endShape(CLOSE);

  fill('#070709')
  beginShape();
  vertex(486, 260);
  vertex(498, 265);
  vertex(499, 464);
  vertex(493, 475);
  vertex(487, 485);
  endShape(CLOSE);

  beginShape();
  vertex(511, 272);
  vertex(520, 273);
  vertex(521, 314);
  vertex(509, 320);
  endShape(CLOSE);
  pop();
}

function layerThree() {
  //layer 3
  push();
  translate(map(mouseX, 0, width, 4, -4), 0);
  push();
  translate(8, -3);
  fill(edge_light);
  beginShape();
  vertex(-structure_buffer, 400);
  vertex(26, 440);
  vertex(90, 453);
  vertex(124, 401);
  vertex(275, 368);
  vertex(275, height);
  vertex(-structure_buffer, height);
  endShape(CLOSE);
  pop();

  fill('#3d3d3f');
  beginShape();
  vertex(-structure_buffer, 400);
  vertex(26, 440);
  vertex(90, 453);
  vertex(124, 401);
  vertex(275, 368);
  vertex(275, height);
  vertex(-structure_buffer, height);
  endShape(CLOSE);

  fill('#070709');
  beginShape();
  vertex(176, 412);
  vertex(176, 453);
  vertex(184, 458);
  vertex(184, 410);
  endShape(CLOSE);

  beginShape();
  vertex(194, 411);
  vertex(205, 405);
  vertex(202, 518);
  vertex(192, 505);
  endShape(CLOSE);
  pop();
}

function layerFour() {
  //layer 4
  push();
  translate(map(mouseX, 0, width, 5, -5), 0);
  push();
  translate(-3, -5);
  fill(edge_light);
  beginShape();
  vertex(231, 538);
  vertex(397, 459);
  vertex(581, 562);
  vertex(width + structure_buffer, 555);
  vertex(width + structure_buffer, height);
  vertex(237, height);
  endShape(CLOSE);
  pop();

  fill('#3d3d3f');
  beginShape();
  vertex(231, 538);
  vertex(397, 459);
  vertex(581, 562);
  vertex(width + structure_buffer, 555);
  vertex(width + structure_buffer, height);
  vertex(237, height);
  endShape(CLOSE);


}

function layerFive() {
  //layer 5
  push();
  translate(map(mouseX, 0, width, 6, -6), 0);
  push();
  translate(7, -2);
  fill(edge_light);
  beginShape();
  vertex(-structure_buffer, 544);
  vertex(26, 544);
  vertex(96, 603);
  vertex(width + structure_buffer, 597);
  vertex(width + structure_buffer, height);
  vertex(-structure_buffer, height);
  endShape(CLOSE);
  pop();


  fill('#1c1c1c');
  beginShape();
  vertex(-structure_buffer, 544);
  vertex(26, 544);
  vertex(96, 603);
  vertex(width + structure_buffer, 597);
  vertex(width + structure_buffer, height);
  vertex(-structure_buffer, height);
  endShape(CLOSE);
  pop();
}

function layerSix() {
  //layer 6
  push();
  translate(map(mouseX, 0, width, 10, -10), 0);
  push();
  translate(-2, -2);
  fill(edge_light);
  beginShape();
  vertex(-structure_buffer, 671);
  vertex(312, 668);
  vertex(313, 610);
  vertex(372, 572);
  vertex(551, 569);
  vertex(width + structure_buffer, 591);
  vertex(width + structure_buffer, height);
  vertex(-structure_buffer, height);
  endShape(CLOSE);
  pop();

  fill('#0b0b0b');
  beginShape();
  vertex(-structure_buffer, 671);
  vertex(312, 668);
  vertex(313, 610);
  vertex(372, 572);
  vertex(551, 569);
  vertex(width + structure_buffer, 591);
  vertex(width + structure_buffer, height);
  vertex(-structure_buffer, height);
  endShape(CLOSE);
  pop();
}

{{< /p5-global-iframe >}}


# Parallax Illusion - Solution

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

# Solution
The idea behind the code is to create a depth perception with basis on the "drops" size and speed, to do so we generate randomly 50 drops with random sizes, then we calculate each drop speed based on a scaling of its size.

So lets breakdown the code:

First we create an array to store the drops, and we generate 50 of them with random sizes in a range from 2 to 20, based on that size we re-scale it from 1 to 6 that is going to be the speed of the drop, there we are making the bigger drops move faster.

{{< details "Code">}}
```js
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
}

```
{{< /details >}}

Now with all the 50 drops generated we can start drawing them, we are going to draw them in a loop, so we can update their position and draw them again.

{{< details "Code">}}
```js
function draw() {
  background(0, 0, 0);

  // Redraw the canvas only if not stopped
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
    for (let i = 0; i < drops.length; i++) {
      let drop = drops[i];
      fill(16, 88, 255);
      ellipse(drop.x, drop.y, drop.sizeDrop, drop.sizeDrop);
      fill(255, 255, 255, 100);
    }
  }
}
```
{{< /details >}}


Finally in the same setup function we create a button to stop the animation, and we add a style for it.

{{< details "Code">}}
```js
function setup() {
  // Drops logic
  // ...
  // ...
  // End drops logic

  // create a stop button
  let button = createButton('Stop/Resume');
  button.class('btn');
  button.mousePressed(stopAnimation);
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

// Add styling
style();
```
{{< /details >}}

# Conclusion
* Monocular cues are essential visual cues that our brain uses to interpret depth and distance in a scene, even when viewing a two-dimensional image.

* We often think that both eyes are indispensable for a good exercise of the visual sense, but we ignore that each eye carries complex individual processes that result in image processing useful for our life.

# Future work
With more practice (or even creativity) would be really interesting to create a more complex scene with more objects and more depth perception. For example add blur effects to the background and make the drops move in a parallax effect. Another good approach would be using the mouse position to move the camera and create a 3D effect.

As group we are looking forward the development of this field, to see how the new technologies will help us to create more realistic and immersive experiences with monocular cues produced by the biology of our eyes and nervous system.

# References

Goldstein, E. B., & Cacciamani, L. (2021). Sensation and perception. Cengage Learning.

Swain, C. T. (1997, April). Integration of monocular cues to create depth effect. In 1997 IEEE International Conference on Acoustics, Speech, and Signal Processing (Vol. 4, pp. 2745-2748). IEEE.
