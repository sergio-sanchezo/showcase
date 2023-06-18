---
weight: 2
---

{{< hint info >}} **Exercise**
Implement other coloring brightness tools such as HSV value V, HSL lightness L or Component average.{{< /hint >}}

# Introduction

The goal in this exercise is to apply different color models to analyze better the characteristics of an image. Models such as HSV or HSL. 

# Previous Work

The HSL representation models the way different paints mix together to create color in the real world, with the lightness dimension resembling the varying amounts of black or white paint in the mixture (e.g. to create "light red", a red pigment can be mixed with white paint; this white paint corresponds to a high "lightness" value in the HSL representation). Fully saturated colors are placed around a circle at a lightness value of ½, with a lightness value of 0 or 1 corresponding to fully black or white, respectively.

![HSL and HSV](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Hsl-hsv_models.svg/435px-Hsl-hsv_models.svg.png)


## Implementation


{{< p5-global-iframe id="test" width="700" height="500" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js">}}
let lumaShader;
let hsvShader;
let src;
let img_src;
let video_src;
let video_on;
let lightness;
let uv;
let hsv;
let hsl;

function preload() {
  lumaShader = readShader('../../../../sketches/extra/luma.frag',
    { varyings: Tree.texcoords2 });
  //hsvShader = readShader('../../../../sketches/extra/hsv.frag',
  //  { varyings: Tree.texcoords2 });

  video_src = createVideo(['../../../../sketches/shaders/wagon.webm']);
  video_src.hide(); // by default video shows up in separate dom
  // image source: https://t.ly/Dz8W
  img_src = loadImage('https://picsum.photos/id/401/600');
  src = img_src;
}

function setup() {
  createCanvas(700, 500, WEBGL);
  noStroke();
  textureMode(NORMAL);
  shader(lumaShader);

  video_on = createCheckbox('video', false);
  video_on.position(10,90)
  video_on.style('color', 'white');
  video_on.changed(() => {
  src = video_on.checked() ? video_src : img_src;
  video_on.checked() ? video_src.loop() : video_src.pause();
  });
  video_on.position(10, 10);
  
  hsv = createCheckbox('hsv', false);
  hsv.position(10, 10);
  hsv.style('color', 'white');

  hsv.input(() => lumaShader.setUniform('v_value', hsv.checked()));

  hsl = createCheckbox('hsl', false);
  hsl.position(10, 30);
  hsl.style('color', 'white');
  
  hsl.input(() => lumaShader.setUniform('l_value', hsl.checked()));
  
  lightness = createCheckbox('luma', false);
  lightness.position(10, 50);
  lightness.style('color', 'white');
  lightness.input(() => lumaShader.setUniform('lightness', lightness.checked()));
  uv = createCheckbox('uv visualization', false);
  uv.style('color', 'white');
  uv.changed(() => lumaShader.setUniform('uv', uv.checked()));
  uv.position(10, 70);
}

function draw() {
  /*
  NDC quad shape, i.e., x, y and z vertex coordinates ∈ [-1..1]
  since textureMode is NORMAL u, v texture coordinates ∈ [-1..1]
  see: https://p5js.org/reference/#/p5/beginShape
       https://p5js.org/reference/#/p5/vertex
          y                  v
          |                  |
  (-1,1,0)|   (1,1,0)        (0,1)     (1,1)
    *_____|_____*            *__________*   
    |     |     |            |          |        
    |____NDC____|__x         | texture  |        
    |     |     |            |  space   |
    *_____|_____*            *__________*___ u
  (-1,-1,0)   (1,-1,0)       (0,0)    (1,0) 
  */
  lumaShader.setUniform('texture', src);
  //hsvShader.setUniform('texture', src);
  beginShape();
  // format is: vertex(x, y, z, u, v)
  vertex(-1, -1, 0, 0, 1);
  vertex(1, -1, 0, 1, 1);
  vertex(1, 1, 0, 1, 0);
  vertex(-1, 1, 0, 0, 0);
  endShape();
}
{{< /p5-global-iframe >}}


# References

-  HSL and HSV. Wikipedia. https://en.wikipedia.org/wiki/HSL_and_HSV