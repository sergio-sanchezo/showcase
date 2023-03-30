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
  slider = createSlider(50, 200, 100, 0.1);
  slider.position(10, 10);
  slider.style('width', '80px');
}

function draw() {
background(220);
  let sep = slider.value()
// primera linea
line(sep, 140, 400-sep, 140);
//flecha 1
line(sep, 140, sep-20, 120);
line(sep, 140, sep-20, 160);
//flecha 2
line(400-sep, 140, 400-sep+20, 120);
line(400-sep, 140, 400-sep+20, 160);

//segunda linea
line(sep, 200, 400-sep, 200);
//flecha 1
line(sep, 200, sep+20, 220);
line(sep, 200, sep+20, 180);
//flecha 2
line(400-sep, 200, 400-sep-20, 220);
line(400-sep, 200, 400-sep-20, 180);
}

{{< /p5-global-iframe >}}


# Solution

This ilussion is pretty simple to implement. We draw two parallel lines, with some y-separation between them, the lines are as said parallel and the same length as well
in one of them we implement an arrow pointing outwards and the other pointing inward

---

{{< details "Code">}}
```js

function setup() {
  createCanvas(400, 400);
  slider = createSlider(50, 200, 100, 0.1);
  slider.position(10, 10);
  slider.style('width', '80px');
}

function draw() {
background(220);
  let sep = slider.value()
// primera linea
line(sep, 140, 400-sep, 140);
//flecha 1
line(sep, 140, sep-20, 120);
line(sep, 140, sep-20, 160);
//flecha 2
line(400-sep, 140, 400-sep+20, 120);
line(400-sep, 140, 400-sep+20, 160);

//segunda linea
line(sep, 200, 400-sep, 200);
//flecha 1
line(sep, 200, sep+20, 220);
line(sep, 200, sep+20, 180);
//flecha 2
line(400-sep, 200, 400-sep-20, 220);
line(400-sep, 200, 400-sep-20, 180);
}
```
{{< /details >}}

Here we set up a slider that will allow the user to experiment with the length of the lines.
```js
function setup() {
  createCanvas(400, 400);
  slider = createSlider(50, 200, 100, 0.1);
  slider.position(10, 10);
  slider.style('width', '80px');
}

```
# Conclusion

As humans we have evolved into certain environment and to survive we acquired certain neurological features that would make us more likely to not die, that is why
we do not see the world as it is, but we see it through perceptions, that are processed by our brain. And or brain tries to give us the most  of this perceptions
applying patterns that we would generally see.

https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Checker_shadow_illusion.svg/200px-Checker_shadow_illusion.svg.png
Wikipedia, Optical Illusion

In this image for example, our brain recognise that there might be a pattern of white blocks and black blocks alternating, and may be the brain recognises too that the
cilinder might be producing shadow behind it, therefore the A and B blocks look the same to us(or at least to me), however the blocks are the same color, you can confirm
it by placing your finger in the middle of them. This is a clear example of our brain trying to jump to fast conclusions but failing to show the reality. But this
is not necesarilly bad, optical illusions can be a wonderful tool to us in order to create cool art, optical illusions are pretty eye catching and a very entretaining.

# Future Work

With practice we hope to be able to gain more skills in order to implement more and more complex visual illusions. In this area there is also a lot of work to do in the
understanding of how our brains process the vision, there are a lot of theories of different illusions that we hope are resolved and give us more enlightment.

# References

- How the Muller-Lyer Illusion Is Used in Psychology. (2020, 10 mayo). Verywell Mind. https://www.verywellmind.com/how-the-muller-lyer-illusion-works-4111110
- Wikipedia contributors. (2022, 20 diciembre). Grid illusion. Wikipedia. https://en.wikipedia.org/wiki/Grid_illusion
- Wikipedia contributors. (2023, March 21). Optical illusion. In Wikipedia, The Free Encyclopedia. Retrieved March 30, 2023, from https://en.wikipedia.org/wiki/Optical_illusion
