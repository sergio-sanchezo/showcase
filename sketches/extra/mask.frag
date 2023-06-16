precision mediump float;

uniform sampler2D texture;
uniform vec2 texOffset;
uniform float mask[25];

varying vec2 texcoords2;

void main() {
  vec2 tc00 = texcoords2 + vec2(-texOffset.s * 2.0, -texOffset.t * 2.0);
  vec2 tc01 = texcoords2 + vec2(-texOffset.s, -texOffset.t * 2.0);
  vec2 tc02 = texcoords2 + vec2(0.0, -texOffset.t * 2.0);
  vec2 tc03 = texcoords2 + vec2(texOffset.s, -texOffset.t * 2.0);
  vec2 tc04 = texcoords2 + vec2(texOffset.s * 2.0, -texOffset.t * 2.0);

  vec2 tc10 = texcoords2 + vec2(-texOffset.s * 2.0, -texOffset.t);
  vec2 tc11 = texcoords2 + vec2(-texOffset.s, -texOffset.t);
  vec2 tc12 = texcoords2 + vec2(0.0, -texOffset.t);
  vec2 tc13 = texcoords2 + vec2(texOffset.s, -texOffset.t);
  vec2 tc14 = texcoords2 + vec2(texOffset.s * 2.0, -texOffset.t);

  vec2 tc20 = texcoords2 + vec2(-texOffset.s * 2.0, 0.0);
  vec2 tc21 = texcoords2 + vec2(-texOffset.s, 0.0);
  vec2 tc22 = texcoords2 + vec2(0.0, 0.0);
  vec2 tc23 = texcoords2 + vec2(texOffset.s, 0.0);
  vec2 tc24 = texcoords2 + vec2(texOffset.s * 2.0, 0.0);

  vec2 tc30 = texcoords2 + vec2(-texOffset.s * 2.0, texOffset.t);
  vec2 tc31 = texcoords2 + vec2(-texOffset.s, texOffset.t);
  vec2 tc32 = texcoords2 + vec2(0.0, texOffset.t);
  vec2 tc33 = texcoords2 + vec2(texOffset.s, texOffset.t);
  vec2 tc34 = texcoords2 + vec2(texOffset.s * 2.0, texOffset.t);

  vec2 tc40 = texcoords2 + vec2(-texOffset.s * 2.0, texOffset.t * 2.0);
  vec2 tc41 = texcoords2 + vec2(-texOffset.s, texOffset.t * 2.0);
  vec2 tc42 = texcoords2 + vec2(0.0, texOffset.t * 2.0);
  vec2 tc43 = texcoords2 + vec2(texOffset.s, texOffset.t * 2.0);
  vec2 tc44 = texcoords2 + vec2(texOffset.s * 2.0, texOffset.t * 2.0);

  vec4 rgba[25];
  rgba[0] = texture2D(texture, tc00);
  rgba[1] = texture2D(texture, tc01);
  rgba[2] = texture2D(texture, tc02);
  rgba[3] = texture2D(texture, tc03);
  rgba[4] = texture2D(texture, tc04);

  rgba[5] = texture2D(texture, tc10);
  rgba[6] = texture2D(texture, tc11);
  rgba[7] = texture2D(texture, tc12);
  rgba[8] = texture2D(texture, tc13);
  rgba[9] = texture2D(texture, tc14);

  rgba[10] = texture2D(texture, tc20);
  rgba[11] = texture2D(texture, tc21);
  rgba[12] = texture2D(texture, tc22);
  rgba[13] = texture2D(texture, tc23);
  rgba[14] = texture2D(texture, tc24);

  rgba[15] = texture2D(texture, tc30);
  rgba[16] = texture2D(texture, tc31);
  rgba[17] = texture2D(texture, tc32);
  rgba[18] = texture2D(texture, tc33);
  rgba[19] = texture2D(texture, tc34);

  rgba[20] = texture2D(texture, tc40);
  rgba[21] = texture2D(texture, tc41);
  rgba[22] = texture2D(texture, tc42);
  rgba[23] = texture2D(texture, tc43);
  rgba[24] = texture2D(texture, tc44);

  vec4 convolution;
  for (int i = 0; i < 25; i++) {
    convolution += rgba[i] * mask[i];
  }

  gl_FragColor = vec4(convolution.rgb, 1.0); 
}

