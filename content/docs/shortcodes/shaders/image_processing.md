---
weight: 2
---

{{< hint info >}}
**Exercise**  
Implement an image / video processing app supporting different masks, including other kernel sizes different than `3x3`
{{< /hint >}}
# Introduction


Image processing with WebGL in the context of p5.js brings a powerful toolset for manipulating and transforming images in creative coding. With p5.js, a JavaScript library designed for visual arts and interactive graphics, and the integration of WebGL, developers and artists can tap into the capabilities of the GPU to perform real-time image processing tasks.

# Previous Work

The field of image processing with WebGL has seen remarkable contributions from researchers, artists, and developers, revolutionizing the way images are manipulated and transformed. These notable works have expanded the boundaries of real-time image processing and inspired new avenues of exploration.

* **"WebGL Image Filters"** by Evan Wallace: Evan Wallace, a pioneer in WebGL development, has created a collection of image filters implemented with WebGL shaders. These filters cover a wide range of effects, including edge detection, noise generation, and pixel manipulation. By exploring these filters, developers can gain insights into the implementation details and unleash their creativity in applying WebGL-powered image effects.

* **"Real-time WebGL Image Processing"** by Jonas Wagner: Jonas Wagner's work focuses on real-time image processing using WebGL shaders. His experiments showcase the capabilities of WebGL for dynamic effects, interactive filters, and real-time camera effects. By studying Wagner's work, developers can gain insights into the optimization techniques and algorithms used to achieve efficient and responsive WebGL image processing.

# Implementation

***Note** The implementation of the shader to implement a 5x5 convolution matrix is based from [Visual Computing](https://visualcomputing.github.io/docs/shaders/image_processing/)*

{{< p5-global-iframe id="test" width="525" height="525" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js">}}

let shaderTransform;
let imageLoaded;
let mask;

function preload() {
  shaderTransform = readShader("../../../../sketches/extra/mask.frag", { varyings: Tree.texcoords2 });
  imageLoaded = loadImage("https://picsum.photos/id/400/600");
}

function setup() {
  createCanvas(500, 500, WEBGL);
  textureMode(NORMAL);

  setupMask(
    "RIDGES",
    [
      -1, -1, -1, -1, -1, -1, 1, 2, 1, -1, -1, 2, 4, 2, -1, -1, 1, 2, 1, -1, -1,
      -1, -1, -1, -1,
    ],
    10
  );

  setupMask(
    "TOP SOBEL",
    [
      -1, -2, -2, -2, -1, 0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0,
    ],
    30
  );

  setupMask(
    "DOWN SOBEL",
    [
      0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 0, 0, 0, 0, 0, -1, -2, -2, -2, -1, 0, 0, 0,
      0, 0,
    ],
    50
  );

  setupMask(
    "BLUR",
    [
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
    ],
    70
  );

  shader(shaderTransform);
  shaderTransform.setUniform(
    "mask",
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  );
}

function draw() {
  background(0);
  shaderTransform.setUniform("texture", imageLoaded);
  emitTexOffset(shaderTransform, imageLoaded, "texOffset");

  beginShape();
  vertex(-1, -1, 0, 0, 1);
  vertex(1, -1, 0, 1, 1);
  vertex(1, 1, 0, 1, 0);
  vertex(-1, 1, 0, 0, 0);
  endShape();
}

function setupMask(label, maskValues, posY) {
  const checkbox = createCheckbox(label, false);
  checkbox.changed(() => {
    const maskUniform = checkbox.checked()
      ? maskValues
      : [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0,
        ];
    shaderTransform.setUniform("mask", maskUniform);
  });
  checkbox.style("color", "red");
  checkbox.position(10, posY);
}



{{< /p5-global-iframe >}}

# Solution

The key behind this implementation is related to the offset from the shader. In the original implementation the offset for a `3x3` matrix is computed as follows:

```glsl
vec2 tc0 = texcoords2 + vec2(-texOffset.s, -texOffset.t);
vec2 tc1 = texcoords2 + vec2(         0.0, -texOffset.t);
vec2 tc2 = texcoords2 + vec2(+texOffset.s, -texOffset.t);
vec2 tc3 = texcoords2 + vec2(-texOffset.s,          0.0);
// And so on..

vec4 rgba[9];
rgba[0] = texture2D(texture, tc0);
rgba[1] = texture2D(texture, tc1);
rgba[2] = texture2D(texture, tc2);
rgba[3] = texture2D(texture, tc3);
// And so on..
```

So the trick is just establishing the offset for a `5x5` matrix. The following code shows the offset for the first pixels:

```glsl
vec2 tc0 = texcoords2 + vec2(-2.0 * texOffset.s, -2.0 * texOffset.t);
vec2 tc1 = texcoords2 + vec2(-1.0 * texOffset.s, -2.0 * texOffset.t);
vec2 tc2 = texcoords2 + vec2(         0.0, -2.0 * texOffset.t);
vec2 tc3 = texcoords2 + vec2(+1.0 * texOffset.s, -2.0 * texOffset.t);
vec2 tc4 = texcoords2 + vec2(+2.0 * texOffset.s, -2.0 * texOffset.t);
vec2 tc5 = texcoords2 + vec2(-2.0 * texOffset.s, -1.0 * texOffset.t);
vec2 tc6 = texcoords2 + vec2(-1.0 * texOffset.s, -1.0 * texOffset.t);
// And so on..


// Also remember to change the size of the array
vec4 rgba[25];
rgba[0] = texture2D(texture, tc0);
rgba[1] = texture2D(texture, tc1);
rgba[2] = texture2D(texture, tc2);
// And so on..
```

In terms of js we made functions to have a good looking interface:

The following function is used to emit the offset for the texture:
```js
function emitTexOffset(shader, texture, uniformName) {
  const texOffset = {
    s: 1.0 / texture.width,
    t: 1.0 / texture.height,
  };
  shader.setUniform(uniformName, [texOffset.s, texOffset.t]);
}
```

The function above is used to setup the mask, in case that the mask is not checked, the mask is set to the identity matrix (the original image):
```js
function setupMask(label, maskValues, posY) {
  const checkbox = createCheckbox(label, false);
  checkbox.changed(() => {
    const maskUniform = checkbox.checked()
      ? maskValues
      : [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0,
        ];
    shaderTransform.setUniform("mask", maskUniform);
  });
  checkbox.style("color", "red");
  checkbox.position(10, posY);
}
```

# Conclusion

This is a very simple implementation of a convolution matrix, but it is very useful to understand the basics of image processing with shaders.

Shaders are very powerful and important in visual computing, they are used to create amazing effects and to accelerate the rendering process. In this case we used a fragment shader to process an image. The fragment shader is executed for each pixel of the image, so it is a very good place to apply image processing algorithms.

# Future work
We would like to implement a convolution matrix with a bigger size, for example `7x7` or `9x9`. Also it would be interesting to apply more advanced image processing algorithms, may be calculating the gradient of the image or displaying its histogram based on a region of interest. 

# References
- Convolution matrix explanation [Convolution Matrix](https://en.wikipedia.org/wiki/Kernel_(image_processing))
- Jonas Wagner work on [Image Processing](https://29a.ch/experiments)
- WebGL implementations by Evan Wallace [WebGL Image Processing](https://madebyevan.com/)