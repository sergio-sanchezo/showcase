---
weight: 2
---

{{< hint info >}} **Exercise**
Study, implement and discuss possible applications of some known visual phenomena and optical illusions.{{< /hint >}}


# Grid illusion

The scintillating grid illusion is an optical illusion, discovered by E. and B. Lingelbach and M. Schrauf in 1994. It is often considered a variation of the Hermann grid illusion but possesses different properties.

It is constructed by superimposing white discs on the intersections of orthogonal gray bars on a black background. Dark dots seem to appear and disappear rapidly at random intersections, hence the label "scintillating". When a person keeps his or her eyes directly on a single intersection, the dark dot does not appear. The dark dots disappear if one is too close to or too far from the image.

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
  // Get the current value of the slider
  let zoom = slider.value();
  
  // Set the scale of the canvas based on the value of the slider
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

How the Muller-Lyer Illusion Is Used in Psychology. (2020, 10 mayo). Verywell Mind. https://www.verywellmind.com/how-the-muller-lyer-illusion-works-4111110
Wikipedia contributors. (2022, 20 diciembre). Grid illusion. Wikipedia. https://en.wikipedia.org/wiki/Grid_illusion
