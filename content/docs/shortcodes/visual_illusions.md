

# Müller-Lyer Illusion 

This illusion shows how our perception of line length is affected by the presence of arrowheads on the ends of the lines.


## Example

{{< p5-global-iframe id="breath" width="625" height="625" >}}
  lfunction setup() {
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