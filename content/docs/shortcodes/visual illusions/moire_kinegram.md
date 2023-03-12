
---
weight: 3
---
# Moire Kinegram
{{< p5-global-iframe id="breath" width="600" height="600" >}}

function setup() {
  createCanvas(500, 500);
  frameRate(200);
}

// the draw function is run continuously
function draw() {
  background(255);
  for(i=0;i<=100;i++){
    fill(0);
    for(j=0;j<=100;j++){
      triangle(0+(i*28), 20+(j*20), 14+(i*28), 020+(j*20), 28+(i*28), 20+(j*20));
    }
    
  }
  

  stroke(0);
  strokeWeight(3);
  for(k=0;k<=50;k++){
    line((frameCount * 10) % width-5*k, 0, (frameCount * 10) % width-5*k, height);
  }
}

{{< /p5-global-iframe >}}