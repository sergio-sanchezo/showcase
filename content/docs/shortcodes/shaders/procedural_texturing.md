---
weight: 2
---

{{< hint info >}} **Exercise**
Adapt other patterns from the book of shaders (refer also to the shadertoy collection) and map them as textures onto other 3D shapes.{{< /hint >}}

# Introduction

The goal in procedural texturing is to procedurally generate a texture using an algorithm in such a way that the result can be mapped onto a shape as a texture. Procedural texturing requires the use of a frame buffer object which in p5.js is implemented as a p5.Graphics object.

**Note**

All the code developed in this section is based on **Great book of shaders. Patricio Gonzales and Jen Lowe**. Their work
made possible a better understanding about thsi subject.

# Previous Work

Apparently procedural texturing is widely used to generate surface textures, given its low space and time cost. Here we can see
a texture of roughness being applied to a sphere, roughness being one of the most straightforward, procedural texture

![Roughness procedural texture](https://www.ntop.com/_next/image/?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fg5181r9i%2Fproduction%2F181ef11a7d55218e988e5469450b4d455118a21a-2048x1099.jpg%3Fq%3D75%26fit%3Dclip%26auto%3Dformat&w=1920&q=80)

We can see other textures being applied such as Leather, Wood or Marble

nTop. How to create procedural textures for design and engineering

# Offset patterns

What we want to draw here are several rows of a given shape(in this case bricks), and every other row will have a offset in
the X axis giving this view:

![Wall](https://thebookofshaders.com/09/brick.jpg)

Great book of shaders. Patricio Gonzales and Jen Lowe. https://thebookofshaders.com/09/

Then we will map this pattern into a 3D shape, in this case we chose a **cone**

## Implementation

{{< p5-div sketch="./procedural_texturing/offset.js" >}}

{{< p5-global-iframe id="breath" width="600" height="600" >}}
        <!DOCTYPE html>
        <html>
          <head>
            <script src=https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.min.js></script>
            <script src=https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/addons/p5.sound.min.js></script>
             <script src=https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js></script> 
            
            
            
            
            <script src=./procedural_texturing/offset.js></script>
          </head>
          <body>
          </body>
        </html>
      
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

This single line single-handedly carries the offset process, it decides whether or not a row should have offset, and 
takes a "step" if that is the case.

```js
_st.x += step(1., mod(_st.y,2.0)) * 0.5;
```

In this part we create the cone where the texture is going to be mapped in, with its corresponding orbit control
```js

function draw() {
  background(33);
  orbitControl();
  cone(100, 200);
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

![Cilinder Illusion](https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Checker_shadow_illusion.svg/200px-Checker_shadow_illusion.svg.png)
Wikipedia, Optical Illusion

In this image for example, our brain recognise that there might be a pattern of white blocks and black blocks alternating, and may be the brain recognises too that the
cilinder might be producing shadow behind it, therefore the A and B blocks look the same to us(or at least to me), however the blocks are the same color, you can confirm
it by placing your finger in the middle of them. This is a clear example of our brain trying to jump to fast conclusions but failing to show the reality. But this
is not necesarilly bad, optical illusions can be a wonderful tool to us in order to create cool art, optical illusions are pretty eye catching and a very entretaining.

# Future Work

With practice we hope to be able to gain more skills in order to implement more and more complex visual illusions. In this area there is also a lot of work to do in the
understanding of how our brains process the vision, there are a lot of theories of different illusions that we hope are resolved and give us more enlightment.

# References

-  Great book of shaders. Patricio Gonzales and Jen Lowe. https://thebookofshaders.com/09/
- How to create procedural textures for design and engineering. nTop. https://www.ntop.com/resources/blog/how-to-procedural-textures/