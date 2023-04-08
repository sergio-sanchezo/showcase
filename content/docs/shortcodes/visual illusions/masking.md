---
weight: 4
---

{{< hint info >}}
**Exercise**  
Implement in software an image processing web app supporting different image kernels and supporting:

- Image histogram visualization.
- Different lightness (coloring brightness) tools.

{{< /hint >}}

# Introduction

In image processing, a kernel, convolution matrix, or mask is a small matrix used for blurring, sharpening, embossing, edge detection, and more. This is accomplished by doing a convolution between the kernel and an image. Or more simply, when each pixel in the output image is a function of the nearby pixels (including itself) in the input image, the kernel is that function. Wikipedia, 2023

An image histogram is a type of histogram that acts as a graphical representation of the tonal distribution in a digital image. It plots the number of pixels for each tonal value. The horizontal axis of the graph represents the tonal variations, while the vertical axis represents the total number of pixels in that particular tone. Wikipedia, 2023

# Previous Work
The process of convolution has been widely studied not only in the field of image processing, in mathematics and signal processing, convolution is a mathematical operation that combines two functions (e.g. two signals) to produce a third function that represents how the two input functions overlap. This operation is performed by multiplying and summing the values of the two functions over their overlapping intervals.

In the case of image processing there are multiple examples of this transformation, the p5 official website has a great example of this transformation, the autor **Dan Shiffman** provides an example applying an edge detection filter.

[Dann shiffman - p5 website](https://p5js.org/es/examples/image-convolution.html)

## Example - Previous Work
**Note:** A random image is being taken from *https://picsum.photos* feel free to reload this page and see a new image.

{{< p5-global-iframe id="breath" width="440" height="440" >}}
let img;
let w = 80;

// It's possible to convolve the image with many different 
// matrices to produce different effects. This is a high-pass 
// filter; it accentuates the edges. 
const matrix = [ [ -1, -1, -1 ],
                 [ -1,  9, -1 ],
                 [ -1, -1, -1 ] ]; 

function preload() {
  img = loadImage("https://picsum.photos/400");
}

function setup() {
  createCanvas(400, 400);
  img.loadPixels();

  // pixelDensity(1) for not scaling pixel density to display density
  // for more information, check the reference of pixelDensity()
  pixelDensity(1);
}

function draw() {
  // We're only going to process a portion of the image
  // so let's set the whole image as the background first
  background(img);

  // Calculate the small rectangle we will process
  const xstart = constrain(mouseX - w/2, 0, img.width);
  const ystart = constrain(mouseY - w/2, 0, img.height);
  const xend = constrain(mouseX + w/2, 0, img.width);
  const yend = constrain(mouseY + w/2, 0, img.height);
  const matrixsize = 3;

  loadPixels();
  // Begin our loop for every pixel in the smaller image
  for (let x = xstart; x < xend; x++) {
    for (let y = ystart; y < yend; y++ ) {
      let c = convolution(x, y, matrix, matrixsize, img);
      
      // retrieve the RGBA values from c and update pixels()
      let loc = (x + y*img.width) * 4;
      pixels[loc] = red(c);
      pixels[loc + 1] = green(c);
      pixels[loc + 2] = blue(c);
      pixels[loc + 3] = alpha(c);
    }
  }
  updatePixels();
}

function convolution(x, y, matrix, matrixsize, img) {
  let rtotal = 0.0;
  let gtotal = 0.0;
  let btotal = 0.0;
  const offset = Math.floor(matrixsize / 2);
  for (let i = 0; i < matrixsize; i++){
    for (let j = 0; j < matrixsize; j++){
      
      // What pixel are we testing
      const xloc = (x + i - offset);
      const yloc = (y + j - offset);
      let loc = (xloc + img.width * yloc) * 4;

      // Make sure we haven't walked off our image, we could do better here
      loc = constrain(loc, 0 , img.pixels.length - 1);

      // Calculate the convolution
      // retrieve RGB values
      rtotal += (img.pixels[loc]) * matrix[i][j];
      gtotal += (img.pixels[loc + 1]) * matrix[i][j];
      btotal += (img.pixels[loc + 2]) * matrix[i][j];
    }
  }
  // Make sure RGB is within range
  rtotal = constrain(rtotal, 0, 255);
  gtotal = constrain(gtotal, 0, 255);
  btotal = constrain(btotal, 0, 255);
  
  // Return the resulting color
  return color(rtotal, gtotal, btotal);
} 
{{< /p5-global-iframe >}}

# Kernel transformations

## Convolution
In the context of computer vision, convolution refers to a mathematical operation that is used for image processing and analysis. It involves applying a filter, also known as a kernel, to an input image in order to produce an output image that emphasizes certain features of the original image, such as edges or textures.

During convolution, the kernel is "slid" or moved over the input image, with each position of the kernel producing a single output pixel. The value of the output pixel is determined by multiplying the corresponding values of the kernel with the input image pixels in that location and then summing the results.

<div align="center"><img src="https://raw.githubusercontent.com/sergio-sanchezo/showcase/main/content/sketches/convolutionGif.gif"/></div>


Kernel transformation with convolution is a technique used in image processing to apply a filter or transformation to an image. In this technique, a small matrix, called a kernel or filter, is moved over the image, and for each pixel, the values of neighboring pixels are multiplied by the corresponding values in the kernel, and the results are summed up. The resulting value is then assigned to the central pixel. This process is repeated for all pixels in the image, resulting in a transformed image.


## Solution

In this solution we implemented 3 different filters based on 3 kernels, the first one is a kernel for edge detection, the second one is a kernel for sharpen filter and the third one is a kernel for blur filter, they can be used by simply pressing the keys listed below. 

If you want to check how each kernel is composed check the following link: [Kernels](https://en.wikipedia.org/wiki/Kernel_(image_processing)#Details).


### Edges handling
In the convolution of the code, the concept of "edges" is used to deal with pixels at the image boundaries. In particular, the `constrain()` function is used to make sure that the position of the pixels does not go outside the allowed range of the image.

### Brightness

In this solution we also applied a brightness filter to the image, you can change the brightness by using the slider below the first image.

### Binds

| **Key** |           **Action**           |
|:-------:|:------------------------------:|
|    r    | Show kernel for edge detection |
|    s    | Show kernel for sharpen filter |
|    b    |   Show kernel for blur filter  |
|    o    |      Show original image       |

### Result

**Note:** A random image is being taken from *https://picsum.photos* feel free to reload this page and see a new image.

{{< p5-global-iframe id="breath" width="720" height="390" >}}

let filteredImg;
let originalPixels;
let img;
const matrixsize = 3;
let brightnessValue = 0;

function preload() {
  img = loadImage("https://picsum.photos/340");
}

function setup() {
  createCanvas(img.width*2, img.height);
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
  image(img, img.width, 0, img.width, img.height);
  if (filteredImg) {
    image(filteredImg, 0, 0)
  } else {
    image(img, 0, 0)
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

### Code explanation

The key of the filter process in the solution provided is using the `convolution()` function. This function takes the following parameters:

* **x and y:** These represent the x and y coordinates of the pixel in the image that we want to apply convolution to.

* **matrix:** This is the kernel that we want to use for convolution. It is a two-dimensional array of numbers of size matrixsize x matrixsize.

* **matrixsize:** This parameter specifies the size of the kernel matrix. It is an odd number (3, 5, 7, etc.) because it allows for a central pixel in the kernel.

* **img:** This is the image that we want to apply convolution to.

The function loops through each element in the kernel matrix, and for each element, it calculates the corresponding pixel location in the image based on the current x and y position and the current kernel element's position. The loc variable is used to store the index of the pixel's color channel (RGB) value in the img.pixels array.

The `offset` variable is calculated as half of the matrixsize. This is used later to ensure that the kernel is centered over the pixel we are working on.

{{< details "Code">}}
```js
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
```
{{< /details >}}


For example, the edge detection kernel is a 3x3 matrix with the following values:


| -1 | -1 | -1 |
|----|----|----|
| -1 |  8 | -1 |
| -1 | -1 | -1 |


With this kernel the center pixel has a weight of 8, while the surrounding pixels have a weight of -1. This means that the center pixel has a stronger influence on the final result than the surrounding pixels.

If the region of the image under the kernel contains an edge or other sharp feature, then the central pixel will be much different from the surrounding pixels, resulting in a high value in the convolution.



{{< details "Code">}}
```js
function keyPressed() {
  if (key === "r") {
    const matrix = [
      [-1, -1, -1],
      [-1, 8, -1],
      [-1, -1, -1],
    ];
    // Calculate the convolution result
    getFilteredImage(img, matrix, matrixsize);
  }

  // ...
  // More kernel options
  // ...
}
```
{{< /details >}}

Finally for the brightness slider, we use the `changeBrightness()` and `applyBrightness()` functions to change the brightness of the image. These functions update all the three channels for each pixel of the image by adding or subtracting 10 units depending on the move of the slider.


{{< details "Code">}}
```js
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



```
{{< /details >}}


# Image histogram

The RGB histograms show the distribution of color values in the image. The x-axis of the histograms represents the different color values (from 0 to 255), and the y-axis represents the frequency of occurrence of each color value in the image. The red, green, and blue histograms are shown in different colors, and they allow us to visualize the amount of red, green, and blue in the image.

## Solution 

{{< p5-global-iframe id="breath" width="650" height="330" >}}

let img;
let rhisto, ghisto, bhisto;
const histogramWidth = 256;
const histogramHeight = 100;

function preload() {
  img = loadImage("https://picsum.photos/300");
}

function setup() {
  createCanvas(img.width*2, img.height);
  pixelDensity(1);

  img.loadPixels();
  rhisto = new Array(histogramWidth).fill(0);
  ghisto = new Array(histogramWidth).fill(0);
  bhisto = new Array(histogramWidth).fill(0);
  for (let i = 0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i];
    let g = img.pixels[i + 1];
    let b = img.pixels[i + 2];
    rhisto[r]++;
    ghisto[g]++;
    bhisto[b]++;
  }

}

function draw() {
  background(0);
  image(img, 0, 0);

  // draw the histograms
  stroke(0);
  noFill();
  drawHistogram(rhisto, img.width, img.height/1.5, color(255, 0, 0, 140));
  drawHistogram(ghisto, img.width, img.height/1.5, color(0, 255, 0, 140));
  drawHistogram(bhisto, img.width, img.height/1.5, color(0, 0, 255, 140));
}

function drawHistogram(histogram, x, y, c) {
  const histogramMax = max(histogram);
  stroke(c);
  for (let i = 0; i < histogram.length; i++) {
    let h = map(histogram[i], 0, histogramMax, 0, histogramHeight);
    line(x + i, y, x + i, y - h);
  }
}

{{< /p5-global-iframe >}}

### Code explanation

Basically here we make three arrays to store the values of each color channel histogram. Then we iterate over the pixels of the image and increment the corresponding array value for each color channel. Finally, we draw the histograms in the `draw()` function.

{{< details "Code">}}
```js
let img;
let rhisto, ghisto, bhisto;
const histogramWidth = 256;
const histogramHeight = 100;

function setup() {
  createCanvas(img.width*2, img.height);
  pixelDensity(1);

  img.loadPixels();
  rhisto = new Array(histogramWidth).fill(0);
  ghisto = new Array(histogramWidth).fill(0);
  bhisto = new Array(histogramWidth).fill(0);
  for (let i = 0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i];
    let g = img.pixels[i + 1];
    let b = img.pixels[i + 2];
    rhisto[r]++;
    ghisto[g]++;
    bhisto[b]++;
  }

}
```
{{< /details >}}

In the `drawHistogram()` function, we draw the histogram for each color channel. The `histogramMax` variable stores the maximum value of the histogram. This is used to scale the histogram to the height of the canvas. The `map()` function is used to map the histogram values to the height of the canvas (that's why we got the histogramMax value in order to scale everything) and that's all, we finally draw the lines representing the frequencies of each color.

{{< details "Code">}}
```js
function drawHistogram(histogram, x, y, c) {
  const histogramMax = max(histogram);
  stroke(c);
  for (let i = 0; i < histogram.length; i++) {
    let h = map(histogram[i], 0, histogramMax, 0, histogramHeight);
    line(x + i, y, x + i, y - h);
  }
}
```
{{< /details >}}

# Conclusion
The implementation of kernel transformations filter for image processing, image histograms, and brightness transformations have shown to be effective in enhancing and analyzing digital images.

As group we noticed that we were used to think about *processing* limited by the field of parsing data but with this exercise we were able to see how we can use the same concepts to process images in order to give better outputs for the users.

# Future Work
It is really clear that the applications of this techniques are endless, this image processing methods can be used in multiple applications like medical imaging, image compression, image restoration, image enhancement, image segmentation, and many more.

It would be really challenging to implement some of these techniques in order to solve real-world problems, but it would be a great experience for our profesional career.

# References

Convolución (2023) Wikipedia. Wikimedia Foundation. Available at: https://es.wikipedia.org/wiki/Convoluci%C3%B3n (Accessed: April 6, 2023). 

T. S. Huang, W. F. Schreiber and O. J. Tretiak, "Image processing," in Proceedings of the IEEE, vol. 59, no. 11, pp. 1586-1609, Nov. 1971, doi: 10.1109/PROC.1971.8491.

Vicapow (no date) Image kernels explained visually, Explained Visually. Available at: https://setosa.io/ev/image-kernels/ (Accessed: April 6, 2023). 

