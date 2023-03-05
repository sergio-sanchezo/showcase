

# Ponzo illusion 

This illusion occurs when two identically sized objects appear to be different sizes because of their surrounding context. It has practical applications in product design and advertising to create the illusion of size or depth.


## Widget example

{{< p5-global-iframe id="breath" width="625" height="625" >}}
  let angle = 0;
  let speed = 0.06;

  function setup() {
    createCanvas(600, 600);
  }

  function draw() {
    background(255, 255, 255);
    rotateSquare();
    if (!mouseIsPressed) {
      strokeWeight(0);
      stroke(0);
      fill(255, 140, 0);
      rect(0, 0, 281, 281);
      rect(318, 0, 281, 281);
      rect(0, 318, 281, 281);
      rect(318, 318, 281, 281);
    }
  }

  function rotateSquare() {
    push();
    angle += speed;
    strokeWeight(0);
    stroke(0);
    fill(0, 0, 255);
    translate(width / 2, height / 2);
    rotate(angle);
    rect(-187.5, -187.5, 375, 375);
    pop();
  }
{{< /p5-global-iframe >}}