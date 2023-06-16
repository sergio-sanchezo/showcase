precision mediump float;

uniform sampler2D texture;
uniform vec2 iResolution;
uniform vec2 iMouse;
uniform int filterType;

varying vec2 texcoords2;

void main() {
  float pct = distance(gl_FragCoord.xy, iMouse);
  if (pct >= 100.0) {
    gl_FragColor = texture2D(texture, texcoords2);
  }
  else {
    vec2 uv = texcoords2;
    vec2 mouse = iMouse.xy;
    if (mouse == vec2(0.0)) {
      mouse = iResolution.xy / 2.0;
    }
    vec2 mouse_uv = mouse / iResolution.xy;
    mouse_uv.y = 1.0 - mouse_uv.y;

    vec4 color = texture2D(texture, mouse_uv + (uv - mouse_uv));

    if (filterType == 1) {
      float gray = (color.r + color.g + color.b) / 3.0;
      gl_FragColor = vec4(gray, gray, gray, color.a);
    }
    else if (filterType == 2) {
      float gray = (color.r + color.g + color.b) / 3.0;
      vec3 sepiaColor = vec3(gray * 1.2, gray * 0.9, gray * 0.6);
      gl_FragColor = vec4(sepiaColor, color.a);
    }
    else if (filterType == 3) {
      vec3 invertedColor = vec3(1.0 - color.r, 1.0 - color.g, 1.0 - color.b);
      gl_FragColor = vec4(invertedColor, color.a);
    }
    else {
      gl_FragColor = color;
    }
  }
}
