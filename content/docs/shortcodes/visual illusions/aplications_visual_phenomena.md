---
weight: 2
---

{{< hint info >}} **Exercise**
Study, implement and discuss possible applications of some known visual phenomena and optical illusions.{{< /hint >}}

# Introduction

In visual perception, an optical illusion (also called a visual illusion) is an illusion caused by the visual system and characterized by a visual percept that arguably appears to differ from reality. Illusions come in a wide variety; their categorization is difficult because the underlying cause is often not clear but a classification proposed by Richard Gregory is useful as an orientation. According to that, there are three main classes: physical, physiological, and cognitive illusions, and in each class there are four kinds: Ambiguities, distortions, paradoxes, and fictions. A classical example for a physical distortion would be the apparent bending of a stick half immerged in water; an example for a physiological paradox is the motion aftereffect (where, despite movement, position remains unchanged). An example for a physiological fiction is an afterimage.Three typical cognitive distortions are the Ponzo, Poggendorff, and Müller-Lyer illusion. Wikipedia, 2023

# Previous Work

Looking around on the internet, some examples of optical illusions built on top of p5 can be found. For example in this Medium article the author presents
the Kanizsa illusion, where illusory contorns give the perception of shape. The author gives a step by step approach to implement the illusion, and a neurological
explanation.

![Ilussion](https://miro.medium.com/v2/resize:fit:640/format:webp/1*b9pai70Ql9-9TXdvsmrLlg.jpeg)

Medium. Creating Illusions in p5.js -Dynamic Kanizsa Illusion. Nazia Fakhruddin, 2019. https://naziafakhruddin.medium.com/creating-illusions-in-p5-js-dynamic-kanizsa-illusion-part-4-af9fe72c5ec7

# Scintillating grid illusion

The scintillating grid illusion is an optical illusion, discovered by E. and B. Lingelbach and M. Schrauf in 1994. It is often considered a variation of the Hermann grid illusion but possesses different properties.

It is constructed by superimposing white discs on the intersections of orthogonal gray bars on a black background. **Dark dots seem to appear and disappear rapidly at random intersections, hence the label "scintillating"**. When a person keeps his or her eyes directly on a single intersection, the dark dot does not appear. The dark dots disappear if one is too close to or too far from the image.

## Example

{{< p5-global-iframe id="breath" width="600" height="600" >}}


let sliderValue = 1;
let side = 3000;
let separation = 60;
let numberOfLines = side/separation;
let minStroke = 5;
function setup() {
  createCanvas(500, 500);
  slider = createSlider(0.1, 5, sliderValue, 0.1);
  slider.position(10, 10);
  slider.style('width', '80px');
  
  slider_width = createSlider(0.1, 5, sliderValue, 0.1);
  slider_width.position(10, 30);
  slider_width.style('width', '80px');
}

function draw() { 
  let zoom = slider.value();  
  scale(zoom);
  strokeVal = max(minStroke, 30/slider_width.value());
  background(0);
  stroke(215);
  strokeWeight(strokeVal);
  for (i=0;i< numberOfLines;i++) {
  stroke(200);
  line(0, i*separation, side, i*separation);
  line(i*separation, 0, i*separation, side);
  }
  for (j=0;j<numberOfLines;j++) {
  for (k=0; k<numberOfLines; k++) {
  stroke(255);
  circle(j*separation,k*separation,5);
}
}

}
{{< /p5-global-iframe >}}

# Solution

So basically to implement the grid illusions, we have to put a black background, then draw a gray grid, with white points that cover the intersection of rows and columns.

To do so, we implemented the following code 

---

{{< details "Code">}}
```js
let sliderValue = 1;
let side = 3000;
let separation = 60;
let numberOfLines = side/separation;
let minStroke = 5;
function setup() {
  createCanvas(500, 500);
  slider = createSlider(0.1, 5, sliderValue, 0.1);
  slider.position(10, 10);
  slider.style('width', '80px');
  
  slider_width = createSlider(0.1, 5, sliderValue, 0.1);
  slider_width.position(10, 30);
  slider_width.style('width', '80px');
}

function draw() { 
  let zoom = slider.value();  
  scale(zoom);
  strokeVal = max(minStroke, 30/slider_width.value());
  background(0);
  stroke(215);
  strokeWeight(strokeVal);
  for (i=0;i< numberOfLines;i++) {
  stroke(200);
  line(0, i*separation, side, i*separation);
  line(i*separation, 0, i*separation, side);
  }
  for (j=0;j<numberOfLines;j++) {
  for (k=0; k<numberOfLines; k++) {
  stroke(255);
  circle(j*separation,k*separation,5);
}
}

}
```
{{< /details >}}

Here we set up a couple of sliders that will help to make the illusion interactive and more interesting
```js
function setup() {
  createCanvas(500, 500);
  slider = createSlider(0.1, 5, sliderValue, 0.1);
  slider.position(10, 10);
  slider.style('width', '80px');
  
  slider_width = createSlider(0.1, 5, sliderValue, 0.1);
  slider_width.position(10, 30);
  slider_width.style('width', '80px');
}
```

Here is the loop to help as create the grid an its points, everything its modular, being influenced by some variables like the separation or number of lines that at the same time are controlled by the sliders.

```js


  for (i=0;i< numberOfLines;i++) {
  stroke(200);
  line(0, i*separation, side, i*separation);
  line(i*separation, 0, i*separation, side);
  }
  for (j=0;j<numberOfLines;j++) {
  for (k=0; k<numberOfLines; k++) {
  stroke(255);
  circle(j*separation,k*separation,5);
}
}
```
# Müller-Lyer Illusion

This illusion shows how our perception of line length is affected by the presence of arrowheads on the ends of the lines.

# The Depth Cue Explanation

Depth plays an important role in our ability to judge distance. One explanation of the Muller-Lyer illusion is that our brains perceive the depths of the two shafts based upon depth cues. When the fins are pointing in toward the shaft of the line, we perceive it as sloping away much like the corner of a building. This depth cue leads us to see that line as further away and therefore shorter.

## Example

{{< p5-global-iframe id="breath" width="400" height="400" >}}

function setup() {
createCanvas(400, 400);
}

function draw() {
background(220);
// primera linea
line(100, 140, 300, 140);
//flecha 1
line(100, 140, 80, 120);
line(100, 140, 80, 160);
//flecha 2
line(300, 140, 320, 120);
line(300, 140, 320, 160);

//segunda linea
line(100, 200, 300, 200);
//flecha 1
line(100, 200, 120, 220);
line(100, 200, 120, 180);
//flecha 2
line(300, 200, 280, 220);
line(300, 200, 280, 180);
}
{{< /p5-global-iframe >}}


# References

- How the Muller-Lyer Illusion Is Used in Psychology. (2020, 10 mayo). Verywell Mind. https://www.verywellmind.com/how-the-muller-lyer-illusion-works-4111110
- Wikipedia contributors. (2022, 20 diciembre). Grid illusion. Wikipedia. https://en.wikipedia.org/wiki/Grid_illusion
- Wikipedia contributors. (2023, March 21). Optical illusion. In Wikipedia, The Free Encyclopedia. Retrieved March 30, 2023, from https://en.wikipedia.org/wiki/Optical_illusion
