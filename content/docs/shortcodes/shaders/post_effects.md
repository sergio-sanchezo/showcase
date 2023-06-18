---
weight: 1
---

{{< hint info >}}
**Exercise**  
Implement some posteffects you find interesting.
{{< /hint >}}
# Introduction

Post effects, in the context of computer graphics, refer to the application of visual filters, transformations, and enhancements to an already rendered image or frame. These effects are typically used to modify the appearance, mood, or style of the image by altering its colors, textures, shapes, or overall visual characteristics. Post effects can include techniques such as blurring, sharpening, color grading, distortion, bloom, motion blur, and many others. They are often employed in areas such as video games, movies, virtual reality, and digital art to add visual appeal, realism, or artistic flair to the final output.

# Previous Work

Post effects have been extensively explored and utilized in the field of computer graphics, contributing to the advancement of visual effects in various mediums such as film, video games, and digital art. Researchers and artists have developed numerous techniques and algorithms to achieve compelling post effects, enhancing the overall visual quality and artistic expression of rendered images and videos.

One notable area of previous work is in the field of film and animation. Post-production studios have employed post effects extensively to create stunning visual sequences and enhance the storytelling experience. Techniques like color grading, which involves manipulating the color palette and tone of the footage, have been widely used to evoke specific moods, establish visual consistency, and enhance the narrative impact.


# Exploring Image Transformations: Grayscale, Sepia, and Inverted Effects

Post effects such as grayscale, sepia, and inverted are commonly used image transformations that alter the visual appearance of an image by manipulating its pixel values. These effects can be implemented through simple algorithms or shaders, providing a quick and straightforward way to modify the colors and tones of an image.

## Implementation


***Note** The lens of the code above was adapted from [shadertoy](https://www.shadertoy.com/results?query=magnifier), and the effects were inspired from this [github repo](https://mdn.github.io/dom-examples/canvas/pixel-manipulation/color-manipulation.html)*

{{< p5-global-iframe id="test" width="525" height="525" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js">}}

let circleEffect;
let filterObject;
let imageLoaded;
let grayscaleCheckbox;
let sepiaCheckbox;
let invertCheckbox;
let filterType = 2;

function preload() {
  imageLoaded = loadImage('https://picsum.photos/id/400/600');
  filterObject = readShader('../../../../sketches/extra/filter.frag', { varyings: Tree.texcoords2 });
}

function setup() {
  createCanvas(500, 500);

  circleEffect = createGraphics(width, height, WEBGL);
  circleEffect.colorMode(RGB, 1);
  circleEffect.textureMode(NORMAL);
  circleEffect.shader(filterObject);

  // Create checkboxes
  grayscaleCheckbox = createCheckbox('GRAYSCALE', false);
  grayscaleCheckbox.changed(updateFilterType);
  grayscaleCheckbox.style('color', 'red');
  grayscaleCheckbox.position(10, 10)
  sepiaCheckbox = createCheckbox('SEPIA', true);
  sepiaCheckbox.changed(updateFilterType);
  sepiaCheckbox.style('color', 'red');
  sepiaCheckbox.position(10, 30)
  invertCheckbox = createCheckbox('INVERTED', false);
  invertCheckbox.changed(updateFilterType);
  invertCheckbox.style('color', 'red');
  invertCheckbox.position(10, 50)
}

function updateFilterType() {
  filterType = 0;
  if (grayscaleCheckbox.checked()) {
    filterType = 1;
  }
  if (sepiaCheckbox.checked()) {
    filterType = 2;
  }
  if (invertCheckbox.checked()) {
    filterType = 3;
  }
}

function draw() {
  circleEffect.background(125);
  circleEffect.emitResolution(filterObject, 'iResolution');
  circleEffect.emitPointerPosition(filterObject, mouseX, mouseY, 'iMouse');
  filterObject.setUniform('filterType', filterType);
  filterObject.setUniform('texture', imageLoaded);
  pg = circleEffect;
  pg.quad(-1, 1, 1, 1, 1, -1, -1, -1);
  image(pg, 0, 0);
}

{{< /p5-global-iframe >}}

# Solution

This solution basically uses a shader to apply the effects in a lens, based of the coordinates of the mouse the different filters are applied, varying the vector that is used to calculate the color of each pixel. This allows us to get a grayscale, sepia and inverted effect.


With the next code we can see how the effects are applied:

```glsl
# Grayscale
float gray = (color.r + color.g + color.b) / 3.0;
gl_FragColor = vec4(gray, gray, gray, color.a);

# Sepia
float gray = (color.r + color.g + color.b) / 3.0;
vec3 sepiaColor = vec3(gray * 1.2, gray * 0.9, gray * 0.6);
gl_FragColor = vec4(sepiaColor, color.a);

# Inverted
vec3 invertedColor = vec3(1.0 - color.r, 1.0 - color.g, 1.0 - color.b);
gl_FragColor = vec4(invertedColor, color.a);
```

In the case of the inverted effect, we just need to substract the color of each pixel to 1.0, this will invert the color of the pixel.

The other main thing in the code, more exactly in the js file is the function that allows us to get the coordinates of the mouse and pass them to the shader:

```js
function draw() {
  circleEffect.background(125);
  circleEffect.emitResolution(filterObject, 'iResolution');
  circleEffect.emitPointerPosition(filterObject, mouseX, mouseY, 'iMouse');
  filterObject.setUniform('filterType', filterType);
  filterObject.setUniform('texture', imageLoaded);
  pg = circleEffect;
  pg.quad(-1, 1, 1, 1, 1, -1, -1, -1);
  image(pg, 0, 0);
}
```

With the circleEffect.emitPointerPosition we pass the coordinates of the mouse to the shader, and with the filterObject.setUniform we pass the type of filter that we want to apply, getting a cool effect.

# Conclusion

The implementation of post effects, also known as image filters or visual effects, serves as a testament to the significance and potential of these techniques in the realm of digital art and interactive graphics. Post effects play a vital role in enhancing and transforming visual content by manipulating colors, tones, and overall aesthetics.

By utilizing shaders, developers can harness the power of GPU acceleration and create intricate and dynamic visual effects that go beyond the capabilities of traditional 2D rendering. Shaders allow for real-time modifications of pixels, opening up a world of possibilities for creating captivating and interactive visual experiences.


# Future Work

Our exploration of post effects using shaders in p5.js has inspired us to further develop our skills and apply these effects in diverse contexts such as videos and games. We aim to gain a deeper understanding of the importance of post effects in our daily lives, their applications across industries, and their adaptability to different contexts. Moving forward, we will continue to explore advanced techniques, stay updated with the latest developments, and unleash the creative potential of post effects.

# References

- Shadertoy. https://www.shadertoy.com/results?query=magnifier
- Custom-posteffect. https://developer.playcanvas.com/en/tutorials/custom-posteffect/