---
weight: 4
---

{{< hint info >}}
**Exercise**  
Implement in software an image processing web app supporting different image kernels and supporting:

- Image histogram visualization.
- Different lightness (coloring brightness) tools.
  {{< /hint >}}

# Kernerl transformations

The parallax illusion is a monocular cue that occurs when an observer's viewpoint changes. It is the apparent shift in the relative positions of objects caused by the motion of the observer. When the observer moves, the position of nearby objects changes more than that of distant objects, creating a relative motion between the objects in the foreground and the background. This relative motion is known as the parallax effect, and our brains use it to estimate the depth and distance of objects in our visual field.

## Example

{{< p5-global-iframe id="breath" width="625" height="625" >}}

let filteredImg;
let originalPixels;

const matrixsize = 3;

function preload() {
img = loadImage('https://picsum.photos/400');
}

function setup() {
createCanvas(img.width, img.height);
pixelDensity(1);
img.loadPixels();
originalPixels = img.pixels.slice();
}

function getFilteredImage(img, matrix, matrixsize) {
// create a filtered image by convolving the original image
filteredImg = createImage(img.width, img.height);
filteredImg.loadPixels();
for (let x = 0; x < img.width; x++) {
for (let y = 0; y < img.height; y++) {
let c = convolution(x, y, matrix, matrixsize, img);
let loc = (x + y _ img.width) _ 4;
filteredImg.pixels[loc] = red(c);
filteredImg.pixels[loc + 1] = green(c);
filteredImg.pixels[loc + 2] = blue(c);
filteredImg.pixels[loc + 3] = alpha(c);
}
}
filteredImg.updatePixels();
}

function keyPressed() {
if (key === 'r') {

    const matrix = [ [ -1, -1, -1 ],
                 [ -1,  8, -1 ],
                 [ -1, -1, -1 ] ];

    getFilteredImage(img, matrix, matrixsize);

} else if (key === 's') {

    const matrix = [ [ 0, -1, 0 ],
             [ -1,  5, -1 ],
             [ 0, -1, 0 ] ];

    getFilteredImage(img, matrix, matrixsize);

}

else if (key === 'b') {

    const matrix = [ [ 1/9, 1/9, 1/9 ],
             [ 1/9,  1/9, 1/9 ],
             [ 1/9, 1/9, 1/9 ] ];

    getFilteredImage(img, matrix, matrixsize);

}

else if (key === "o") {
// reset the image to the original pixels
img.pixels.set(originalPixels);
img.updatePixels();
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
for (let i = 0; i < matrixsize; i++){
for (let j = 0; j < matrixsize; j++){
const xloc = (x + i - offset);
const yloc = (y + j - offset);
let loc = (xloc + img.width _ yloc) _ 4;
loc = constrain(loc, 0 , img.pixels.length - 1);
rtotal += (img.pixels[loc]) _ matrix[i][j];
gtotal += (img.pixels[loc + 1]) _ matrix[i][j];
btotal += (img.pixels[loc + 2]) \* matrix[i][j];
}
}
rtotal = constrain(rtotal, 0, 255);
gtotal = constrain(gtotal, 0, 255);
btotal = constrain(btotal, 0, 255);
return color(rtotal, gtotal, btotal);
}

{{< /p5-global-iframe >}}

# References

Goldstein, E. B., & Cacciamani, L. (2021). Sensation and perception. Cengage Learning.
