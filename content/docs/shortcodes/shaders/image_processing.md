---
weight: 2
---

{{< hint info >}}
**Exercise**  
Implement some posteffects you find interesting.
{{< /hint >}}
# Introduction

{{< p5-global-iframe id="test" width="525" height="525" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js">}}

let shaderTransform;
let imageLoaded;
let mask;

function preload() {
  shaderTransform = readShader("../../../../sketches/extra/mask.frag", { varyings: Tree.texcoords2 });
  imageLoaded = loadImage("https://picsum.photos/id/400/600");
}

function setup() {
  createCanvas(500, 500, WEBGL);
  textureMode(NORMAL);

  setupMask(
    "RIDGES",
    [
      -1, -1, -1, -1, -1, -1, 1, 2, 1, -1, -1, 2, 4, 2, -1, -1, 1, 2, 1, -1, -1,
      -1, -1, -1, -1,
    ],
    10
  );

  setupMask(
    "TOP SOBEL",
    [
      -1, -2, -2, -2, -1, 0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0,
    ],
    30
  );

  setupMask(
    "DOWN SOBEL",
    [
      0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 0, 0, 0, 0, 0, -1, -2, -2, -2, -1, 0, 0, 0,
      0, 0,
    ],
    50
  );

  setupMask(
    "BLUR",
    [
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
      1 / 25,
    ],
    70
  );

  shader(shaderTransform);
  shaderTransform.setUniform(
    "mask",
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  );
}

function draw() {
  background(0);
  shaderTransform.setUniform("texture", imageLoaded);
  emitTexOffset(shaderTransform, imageLoaded, "texOffset");

  beginShape();
  vertex(-1, -1, 0, 0, 1);
  vertex(1, -1, 0, 1, 1);
  vertex(1, 1, 0, 1, 0);
  vertex(-1, 1, 0, 0, 0);
  endShape();
}

function setupMask(label, maskValues, posY) {
  const checkbox = createCheckbox(label, false);
  checkbox.changed(() => {
    const maskUniform = checkbox.checked()
      ? maskValues
      : [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0,
        ];
    shaderTransform.setUniform("mask", maskUniform);
  });
  checkbox.style("color", "red");
  checkbox.position(10, posY);
}



{{< /p5-global-iframe >}}


