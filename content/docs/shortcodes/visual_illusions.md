

# Müller-Lyer Illusion 

This illusion shows how our perception of line length is affected by the presence of arrowheads on the ends of the lines.

# The Depth Cue Explanation

Depth plays an important role in our ability to judge distance. One explanation of the Muller-Lyer illusion is that our brains perceive the depths of the two shafts based upon depth cues. When the fins are pointing in toward the shaft of the line, we perceive it as sloping away much like the corner of a building. This depth cue leads us to see that line as further away and therefore shorter.

## Example

{{< p5-global-iframe id="breath" width="625" height="625" >}}
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