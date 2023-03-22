---
weight: 4
---

{{< hint info >}}
**Exercise**  
Implement in software an image processing web app supporting different image kernels and supporting:

- Image histogram visualization.
- Different lightness (coloring brightness) tools.
  {{< /hint >}}

# Kernel transformations

Kernel transformation with convolution is a technique used in image processing to apply a filter or transformation to an image. In this technique, a small matrix, called a kernel or filter, is moved over the image, and for each pixel, the values of neighboring pixels are multiplied by the corresponding values in the kernel, and the results are summed up. The resulting value is then assigned to the central pixel. This process is repeated for all pixels in the image, resulting in a transformed image.

| **Key** |           **Action**           |
|:-------:|:------------------------------:|
|    r    | Show kernel for edge detection |
|    s    | Show kernel for sharpen filter |
|    b    |   Show kernel for blur filter  |
|    o    |      Show original image     |

## Example

{{< p5-global-iframe id="breath" width="625" height="625" >}}

let filteredImg;
let originalPixels;
let img;
const matrixsize = 3;
let brightnessValue = 0;

function preload() {
  img = loadImage("https://picsum.photos/550");
}

function setup() {
  createCanvas(img.width, img.height);
  pixelDensity(1);
  img.loadPixels();
  originalPixels = img.pixels.slice();

  // Create a slider for brightness
  brightnessSlider = createSlider(-15, 15, 0, 2);
  brightnessSlider.position(10, height + 10);
  brightnessSlider.style("width", "300px");
  brightnessSlider.input(() => {
    brightnessValue = brightnessSlider.value();
    applyBrightness();
  });
}

function getFilteredImage(img, matrix, matrixsize) {
  // create a filtered image by convolving the original image
  filteredImg = createImage(img.width, img.height);
  filteredImg.loadPixels();
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let c = convolution(x, y, matrix, matrixsize, img);
      let loc = (x + y * img.width) * 4;
      filteredImg.pixels[loc] = red(c);
      filteredImg.pixels[loc + 1] = green(c);
      filteredImg.pixels[loc + 2] = blue(c);
      filteredImg.pixels[loc + 3] = alpha(c);
    }
  }
  filteredImg.updatePixels();
}

function changeBrightness(img, key) {
  if (key === 1) {
    brightnessValue += 10;
  } else if (key === 2) {
    brightnessValue -= 10;
  }
  applyBrightness();
}

function applyBrightness() {
  img.loadPixels();
  for (let i = 0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i] + brightnessValue;
    let g = img.pixels[i + 1] + brightnessValue;
    let b = img.pixels[i + 2] + brightnessValue;
    img.pixels[i] = constrain(r, 0, 255);
    img.pixels[i + 1] = constrain(g, 0, 255);
    img.pixels[i + 2] = constrain(b, 0, 255);
  }
  img.updatePixels();
}

function keyPressed() {
  if (key === "r") {
    const matrix = [
      [-1, -1, -1],
      [-1, 8, -1],
      [-1, -1, -1],
    ];
    getFilteredImage(img, matrix, matrixsize);
  } else if (key === "s") {
    const matrix = [
      [0, -1, 0],
      [-1, 5, -1],
      [0, -1, 0],
    ];
    getFilteredImage(img, matrix, matrixsize);
  } else if (key === "b") {
    const matrix = [
      [1 / 9, 1 / 9, 1 / 9],
      [1 / 9, 1 / 9, 1 / 9],
      [1 / 9, 1 / 9, 1 / 9],
    ];
    getFilteredImage(img, matrix, matrixsize);
  } else if (key === "1") {
    changeBrightness(img, 1);
  } else if (key === "2") {
    changeBrightness(img, 2);
  } else if (key === "o") {
    // reset the image to the original pixels
    img.pixels.set(originalPixels);
    img.updatePixels();
    brightnessSlider.value(0);
    filteredImg = null;
  }
}

function draw() {
  if (filteredImg) {
    background(filteredImg);
  } else {
    background(img);
  }
}

function convolution(x, y, matrix, matrixsize, img) {
  let rtotal = 0.0;
  let gtotal = 0.0;
  let btotal = 0.0;
  const offset = Math.floor(matrixsize / 2);
  for (let i = 0; i < matrixsize; i++) {
    for (let j = 0; j < matrixsize; j++) {
      const xloc = x + i - offset;
      const yloc = y + j - offset;
      let loc = (xloc + img.width * yloc) * 4;
      loc = constrain(loc, 0, img.pixels.length - 1);
      rtotal += img.pixels[loc] * matrix[i][j];
      gtotal += img.pixels[loc + 1] * matrix[i][j];
      btotal += img.pixels[loc + 2] * matrix[i][j];
    }
  }
  rtotal = constrain(rtotal, 0, 255);
  gtotal = constrain(gtotal, 0, 255);
  btotal = constrain(btotal, 0, 255);
  return color(rtotal, gtotal, btotal);
}

{{< /p5-global-iframe >}}

## Convolution
In the context of computer vision, convolution refers to a mathematical operation that is used for image processing and analysis. It involves applying a filter, also known as a kernel, to an input image in order to produce an output image that emphasizes certain features of the original image, such as edges or textures.

During convolution, the kernel is "slid" or moved over the input image, with each position of the kernel producing a single output pixel. The value of the output pixel is determined by multiplying the corresponding values of the kernel with the input image pixels in that location and then summing the results.

<div align="center"><img src="https://raw.githubusercontent.com/sergio-sanchezo/showcase/main/content/sketches/convolutionGif.gif"/></div>


## Edges handling
In the convolution of the code, the concept of "edges" is used to deal with pixels at the image boundaries. In particular, the constrain() function is used to make sure that the position of the pixels does not go outside the allowed range of the image.


