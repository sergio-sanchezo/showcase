precision mediump float;

// uniforms are defined and sent by the sketch
uniform bool lightness;
uniform sampler2D texture;
uniform bool uv; // uv visualization

// interpolated texcoord (same name and type as in vertex shader)
varying vec2 texcoords2;

// returns luma of given texel
float luma(vec4 texel) {
  // alpha channel (texel.a) is just discarded
  return max(texel.r,texel.g);
}

void main() {
  // texture2D(texture, texcoords2) samples texture at texcoords2 
  // and returns the normalized texel color
  vec4 texel = texture2D(texture, texcoords2);
  gl_FragColor = uv ? vec4(texcoords2.xy, 0.0, 1.0) :
                 lightness ? vec4(vec3(luma(texel)), 1.0) : texel;
}