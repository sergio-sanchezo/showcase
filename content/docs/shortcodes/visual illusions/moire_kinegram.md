---
weight: 3
---
{{< hint info >}}
**Exercise**  
Implement a kinegram and some moiré patterns which are close related visual phenomena to masking.
  {{< /hint >}}


# Moire Pattern

{{< p5-global-iframe id="breath" width="600" height="600" >}}
let angle = 0
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
triangle(0+(i*28), 20+(j*20), 14+(i*28), 0+(j*20), 28+(i*28), 20+ (j*20));

    }

}

// Incrementar el ángulo de rotación
angle += 0.04;

// Trasladar al centro del objeto
translate(250, 250);

// Rotar el objeto en sentido de las manecillas del reloj
rotate(angle);

// Trasladar de regreso al lugar original del objeto

translate(-400, -400);

stroke(0);
strokeWeight(3);
for(k=0;k<=500;k++){

    //line((frameCount * 20) % width-5*k, 0, (frameCount * 20) % width-5*k, height);
    line(0+5*k,0,0+5*k,2*500);

}
}

{{< /p5-global-iframe >}}
