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


{{< p5-global-iframe id="test" width="400" height="400" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js">}}

let pg;
let truchetShader;

function preload() {
  // shader adapted from here: https://thebookofshaders.com/09/
  truchetShader = readShader('../../../../sketches/extra/offset.frag');
}

function setup() {
  createCanvas(400, 400, WEBGL);
  // create frame buffer object to render the procedural texture
  pg = createGraphics(400, 400, WEBGL);
  textureMode(NORMAL);
  noStroke();
  pg.noStroke();
  pg.textureMode(NORMAL);
  // use truchetShader to render onto pg
  pg.shader(truchetShader);
  // emitResolution, see:
  // https://github.com/VisualComputing/p5.treegl#macros
  pg.emitResolution(truchetShader);
  // https://p5js.org/reference/#/p5.Shader/setUniform
  truchetShader.setUniform('u_zoom', 3);
  // pg NDC quad (i.e., x, y and z vertex coordinates ∈ [-1..1])
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  // set pg as texture
  texture(pg);
}

function draw() {
  background(33);
  orbitControl();
  cone(100, 200);
}

function mouseMoved() {
  // https://p5js.org/reference/#/p5.Shader/setUniform
  truchetShader.setUniform('u_zoom', int(map(mouseX, 0, width, 1, 30)));
  // pg NDC quad (i.e., x, y and z vertex coordinates ∈ [-1..1])
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
}
{{< /p5-global-iframe >}}

# Solution

Here we are creating the brick pattern, it is made calculating what row are we into, thhis determines how offset the bricks will be. Odd rows will have 0.5 unit offset.


```glsl
vec2 brickTile(vec2 _st, float _zoom){
    _st *= _zoom;

    // Here is where the offset is happening
    _st.x += step(1., mod(_st.y,2.0)) * 0.5;

    return fract(_st);
}
```


# Code

{{< details "Code">}}
```js
let pg;
let truchetShader;

function preload() {
  // shader adapted from here: https://thebookofshaders.com/09/
  truchetShader = readShader('offset.frag');
}

function setup() {
  createCanvas(400, 400, WEBGL);
  // create frame buffer object to render the procedural texture
  pg = createGraphics(400, 400, WEBGL);
  textureMode(NORMAL);
  noStroke();
  pg.noStroke();
  pg.textureMode(NORMAL);
  // use truchetShader to render onto pg
  pg.shader(truchetShader);
  // emitResolution, see:
  // https://github.com/VisualComputing/p5.treegl#macros
  pg.emitResolution(truchetShader);
  // https://p5js.org/reference/#/p5.Shader/setUniform
  truchetShader.setUniform('u_zoom', 3);
  // pg NDC quad (i.e., x, y and z vertex coordinates ∈ [-1..1])
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  // set pg as texture
  texture(pg);
}

function draw() {
  background(33);
  orbitControl();
  cone(100, 200);
}

function mouseMoved() {
  // https://p5js.org/reference/#/p5.Shader/setUniform
  truchetShader.setUniform('u_zoom', int(map(mouseX, 0, width, 1, 30)));
  // pg NDC quad (i.e., x, y and z vertex coordinates ∈ [-1..1])
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
}
```
{{< /details >}}

# Conclusions 

Procedural texturing is a very powerful way to create textures we want to recreate in our animations, it allows to create a nice level of detail through a generally light algorithmic process. That would probably take a lot more under other circumstances

# References

-  Great book of shaders. Patricio Gonzales and Jen Lowe. https://thebookofshaders.com/09/
- How to create procedural textures for design and engineering. nTop. https://www.ntop.com/resources/blog/how-to-procedural-textures/