---
weight: 3
---
{{< hint info >}}
**Exercise**  
Implement a kinegram and some moiré patterns which are close related visual phenomena to masking.
  {{< /hint >}}


# Introduction

In mathematics, physics, and art, moiré patterns or moiré fringes are large-scale interference patterns that can be produced when a partially opaque ruled pattern with transparent gaps is overlaid on another similar pattern. For the moiré interference pattern to appear, the two patterns must not be completely identical, but rather displaced, rotated, or have slightly different pitch.

Moiré patterns appear in many situations. In printing, the printed pattern of dots can interfere with the image. In television and digital photography, a pattern on an object being photographed can interfere with the shape of the light sensors to generate unwanted artifacts. They are also sometimes created deliberately – in micrometers they are used to amplify the effects of very small movements.

# Previous Work

In internet you can find plenty of examples of moire projects made on school project or other situations, this gives nice examples and ideas to implement our moire patterns
and kinegrams, two videos particularly helped my get through this task.

**Imprime tu ilusión óptica animada super fácil. https://www.youtube.com/watch?v=EZFk4bilOHw**

This video gives high quality examples about kinegram, this helped me do the squares design and the pacman one.

**Animated Illusion Tutorial -in p5.js https://www.youtube.com/watch?v=AvCpK23-sVQ**

And this video gave an idea on how to even start doing the task beacuase I was a little lost.



# Kinegram

{{< p5-global-iframe id="breath" width="600" height="600" >}}
let side = 400;
let x = 0;
function setup() {
  createCanvas(side, side);
}

function draw() {
  strokeWeight(4);
  background(220);

  
  
  for (let j = 100; j < 200; j += 6) {
    stroke(255, 0, 0)
    line(j, 100, j, 200)
  }
  
  for (let j = 200; j < 300; j += 6) {
    stroke(0, 0,255)
    line(j, 100, j, 200)
  }
  
  for (let j = 300; j < 400; j += 6) {
    stroke(255,255,50)
    line(j, 100, j, 200)
  }
  
  for (let j = 0; j < 100; j += 6) {
    stroke(0)
    line(j, 100, j, 200)
  }
  
  fill(0);
  arc(200, 300, 100,100, 1.2*PI, 0.8*PI, PIE);
  
  
  for (let j = 0; j < 40; j += 7) {
    strokeWeight(2);
    line(160+j, 270, 160+j, 330)
    strokeWeight(4);
    line(160+j,270,160+j,285)
    line(160+j,330,160+j,315)
  }
  
 

  
  
  for(let j=0;j<2000;j+=7){
    stroke(50)
    strokeWeight(6)
    line(j+x,0,j+x,side);
  }
  
  if(x>550){
    x=0
  }else{
    x=x+0.8
  }
}

{{< /p5-global-iframe >}}



# Solution

---

{{< details "Code">}}
```js

let side = 400;
let x = 0;
function setup() {
  createCanvas(side, side);
}

function draw() {
  strokeWeight(4);
  background(220);

  
  
  for (let j = 100; j < 200; j += 6) {
    stroke(255, 0, 0)
    line(j, 100, j, 200)
  }
  
  for (let j = 200; j < 300; j += 6) {
    stroke(0, 0,255)
    line(j, 100, j, 200)
  }
  
  for (let j = 300; j < 400; j += 6) {
    stroke(255,255,50)
    line(j, 100, j, 200)
  }
  
  for (let j = 0; j < 100; j += 6) {
    stroke(0)
    line(j, 100, j, 200)
  }
  
  fill(0);
  arc(200, 300, 100,100, 1.2*PI, 0.8*PI, PIE);
  
  
  for (let j = 0; j < 40; j += 7) {
    strokeWeight(2);
    line(160+j, 270, 160+j, 330)
    strokeWeight(4);
    line(160+j,270,160+j,285)
    line(160+j,330,160+j,315)
  }
  
 

  
  
  for(let j=0;j<2000;j+=7){
    stroke(50)
    strokeWeight(6)
    line(j+x,0,j+x,side);
  }
  
  if(x>550){
    x=0
  }else{
    x=x+0.8
  }
}
```
{{< /details >}}

Drawing squares (red one)

```js
function setup() {
  for (let j = 100; j < 200; j += 6) {
    stroke(255, 0, 0)
    line(j, 100, j, 200)
  }
}
```

Drawing pacman. This part required being more careful, a specific set of lines would make the pacman look like it was opening and shuting his mouth.
There is a set of three lines, one that goes from the upper part to the lower part of the mouth, one that starts from the upper part and goes a little down.
And one tha goes from the lower part a litte up.


```js
fill(0);
  arc(200, 300, 100,100, 1.2*PI, 0.8*PI, PIE);
  
  
  for (let j = 0; j < 40; j += 7) {
    strokeWeight(2);
    line(160+j, 270, 160+j, 330)
    strokeWeight(4);
    line(160+j,270,160+j,285)
    line(160+j,330,160+j,315)
  }
```


# Moire Pattern

Here we cover the whole canvas with triangles alternating from white to black, and we have a bunch of black lines that will rotate, "clasing" with the triangles
and thi is what produces the effect.

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

# Solution

---

{{< details "Code">}}
```js
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

```
{{< /details >}}

# Conclusion

Kinegrams were challenging since you have to be very very careful where you put the lines, otherwise they will not create the effect. 

# Future Work

Create techniques and tricks to acommodate the lines easier

# References

- Wikipedia. (n.d.). Moiré pattern. In Wikipedia. Retrieved March 30, 2023, from https://en.wikipedia.org/wiki/Moiré_pattern
- Pacman Moire: https://www.youtube.com/watch?v=EZFk4bilOHw
- Cuadritos y Lineas pasantes: https://www.youtube.com/watch?v=AvCpK23-sVQ
