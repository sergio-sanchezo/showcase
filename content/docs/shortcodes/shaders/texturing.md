## Implementation


{{< p5-global-iframe id="test" width="700" height="500" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js">}}
let lumaShader;
let hsvShader;
let src;
let img_src;
let video_src;
let video_on;
let lightness;
let uv;
let hsv;
let hsl;

function preload() {
  lumaShader = readShader('../../../../sketches/extra/luma.frag',
    { varyings: Tree.texcoords2 });
  //hsvShader = readShader('../../../../sketches/extra/hsv.frag',
  //  { varyings: Tree.texcoords2 });

  video_src = createVideo(['../../../../sketches/shaders/wagon.webm']);
  video_src.hide(); // by default video shows up in separate dom
  // image source: https://t.ly/Dz8W
  img_src = loadImage('https://picsum.photos/id/401/600');
  src = img_src;
}

function setup() {
  createCanvas(700, 500, WEBGL);
  noStroke();
  textureMode(NORMAL);
  shader(lumaShader);

  video_on = createCheckbox('video', false);
  video_on.style('color', 'white');
  video_on.changed(() => {
  src = video_on.checked() ? video_src : img_src;
  video_on.checked() ? video_src.loop() : video_src.pause();
  });
  video_on.position(10, 10);
  
  hsv = createCheckbox('hsv', false);
  hsv.position(10, 10);
  hsv.style('color', 'white');

  hsv.input(() => lumaShader.setUniform('v_value', hsv.checked()));

  hsl = createCheckbox('hsl', false);
  hsl.position(10, 30);
  hsl.style('color', 'white');
  
  hsl.input(() => lumaShader.setUniform('l_value', hsl.checked()));
  
  lightness = createCheckbox('luma', false);
  lightness.position(10, 50);
  lightness.style('color', 'white');
  lightness.input(() => lumaShader.setUniform('lightness', lightness.checked()));
  uv = createCheckbox('uv visualization', false);
  uv.style('color', 'white');
  uv.changed(() => lumaShader.setUniform('uv', uv.checked()));
  uv.position(10, 70);
}

function draw() {
  /*
  NDC quad shape, i.e., x, y and z vertex coordinates ∈ [-1..1]
  since textureMode is NORMAL u, v texture coordinates ∈ [-1..1]
  see: https://p5js.org/reference/#/p5/beginShape
       https://p5js.org/reference/#/p5/vertex
          y                  v
          |                  |
  (-1,1,0)|   (1,1,0)        (0,1)     (1,1)
    *_____|_____*            *__________*   
    |     |     |            |          |        
    |____NDC____|__x         | texture  |        
    |     |     |            |  space   |
    *_____|_____*            *__________*___ u
  (-1,-1,0)   (1,-1,0)       (0,0)    (1,0) 
  */
  lumaShader.setUniform('texture', src);
  //hsvShader.setUniform('texture', src);
  beginShape();
  // format is: vertex(x, y, z, u, v)
  vertex(-1, -1, 0, 0, 1);
  vertex(1, -1, 0, 1, 1);
  vertex(1, 1, 0, 1, 0);
  vertex(-1, 1, 0, 0, 0);
  endShape();
}
{{< /p5-global-iframe >}}
