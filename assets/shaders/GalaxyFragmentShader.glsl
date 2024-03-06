#define GLSLIFY 1
uniform sampler2D _MainTexture;
uniform vec3 _Color;
smooth in vec2 vUv;
varying vec3 vWPos;

uniform float _Opacity;
uniform float _CameraFadeout;
varying float vDistanceToPlanet;
varying float vDistanceToCamera;
// varying float vDistanceToMouse;

float saturate(float x)
{
  return clamp(x, 0.0, 1.0);
}
vec3 SRGBtoLinear(vec3 srgb) {
    vec3 linOut = pow(srgb.xyz, vec3(2.2));
    return vec3(linOut);
}
vec3 linearToSRGB(vec3 color) {
    return pow(color, vec3(1.0 / 2.2));
}

void main()
{
  vec2 uv = vUv*2.0-vec2(1.0);
  float strength = exp(-5.0*saturate(length(uv)));

  vec3 col = texture2D(_MainTexture, vUv).rgb;
//   col = SRGBtoLinear(col);

  // planet_mask *= 1.0-exp(-(vDistanceToCamera-2.0));

  gl_FragColor = vec4(_Color, col.r);
//   gl_FragColor.a = linearToSRGB(vec3(gl_FragColor.a)).r ;

  // gl_FragColor.rgb = vec3(vDistanceToMouse);
  // gl_FragColor.rgb = vec3(1.0-exp(-(vDistanceToCamera-1.0)));
  // gl_FragColor = vec4(1.);
  // gl_FragColor.a = 1.0;
  // gl_FragColor.rgb *= planet_mask;
  //gl_FragColor.a = 1.0;
  //gl_FragColor.rgb = vec3(vUv, 0.0);

}

