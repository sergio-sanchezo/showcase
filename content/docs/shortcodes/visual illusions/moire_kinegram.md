---
weight: 3
---
{{< hint info >}}
**Exercise**  
Implement a kinegram and some moiré patterns which are close related visual phenomena to masking.
  {{< /hint >}}


# Introduction

In visual perception, an optical illusion (also called a visual illusion) is an illusion caused by the visual system and characterized by a visual percept that arguably appears to differ from reality. Illusions come in a wide variety; their categorization is difficult because the underlying cause is often not clear but a classification proposed by Richard Gregory is useful as an orientation. According to that, there are three main classes: physical, physiological, and cognitive illusions, and in each class there are four kinds: Ambiguities, distortions, paradoxes, and fictions. A classical example for a physical distortion would be the apparent bending of a stick half immerged in water; an example for a physiological paradox is the motion aftereffect (where, despite movement, position remains unchanged). An example for a physiological fiction is an afterimage.Three typical cognitive distortions are the Ponzo, Poggendorff, and Müller-Lyer illusion. Wikipedia, 2023

# Previous Work

Looking around on the internet, some examples of optical illusions built on top of p5 can be found. For example in this Medium article the author presents
the Kanizsa illusion, where illusory contorns give the perception of shape. The author gives a step by step approach to implement the illusion, and a neurological
explanation.

![Ilussion](https://miro.medium.com/v2/resize:fit:640/format:webp/1*b9pai70Ql9-9TXdvsmrLlg.jpeg)

Medium. Creating Illusions in p5.js -Dynamic Kanizsa Illusion. Nazia Fakhruddin, 2019. https://naziafakhruddin.medium.com/creating-illusions-in-p5-js-dynamic-kanizsa-illusion-part-4-af9fe72c5ec7


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

So basically to implement the grid illusions, we have to put a black background, then draw a gray grid, with white points that cover the intersection of rows and columns.

To do so, we implemented the following code 

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


# Conclusion

As humans we have evolved into certain environment and to survive we acquired certain neurological features that would make us more likely to not die, that is why
we do not see the world as it is, but we see it through perceptions, that are processed by our brain. And or brain tries to give us the most  of this perceptions
applying patterns that we would generally see.

![Cilinder Illusion](https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Checker_shadow_illusion.svg/200px-Checker_shadow_illusion.svg.png)
Wikipedia, Optical Illusion

In this image for example, our brain recognise that there might be a pattern of white blocks and black blocks alternating, and may be the brain recognises too that the
cilinder might be producing shadow behind it, therefore the A and B blocks look the same to us(or at least to me), however the blocks are the same color, you can confirm
it by placing your finger in the middle of them. This is a clear example of our brain trying to jump to fast conclusions but failing to show the reality. But this
is not necesarilly bad, optical illusions can be a wonderful tool to us in order to create cool art, optical illusions are pretty eye catching and a very entretaining.

# Future Work

With practice we hope to be able to gain more skills in order to implement more and more complex visual illusions. In this area there is also a lot of work to do in the
understanding of how our brains process the vision, there are a lot of theories of different illusions that we hope are resolved and give us more enlightment.

# References

- How the Muller-Lyer Illusion Is Used in Psychology. (2020, 10 mayo). Verywell Mind. https://www.verywellmind.com/how-the-muller-lyer-illusion-works-4111110
- Wikipedia contributors. (2022, 20 diciembre). Grid illusion. Wikipedia. https://en.wikipedia.org/wiki/Grid_illusion
- Wikipedia contributors. (2023, March 21). Optical illusion. In Wikipedia, The Free Encyclopedia. Retrieved March 30, 2023, from https://en.wikipedia.org/wiki/Optical_illusion
