import React, { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform vec2 u_resolution;

  varying vec2 vUv;

  float random(vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
  }

  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f*f*(3.0-2.0*f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x += sin(u_time * 0.1 + st.y * 10.0) * 0.03;
    st.y += cos(u_time * 0.1 + st.x * 10.0) * 0.03;

    vec3 color = vec3(0.0);
    float n = noise(st * 3.0);
    color = mix(vec3(0.1, 0.2, 0.6), vec3(0.8, 0.3, 0.5), n);

    gl_FragColor = vec4(color, 1.0);
  }
`;

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export default function HeroShaderLiquid() {
  const shaderRef = useRef();
  const { size, mouse } = useThree();

  useFrame(({ clock }) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.u_time.value = clock.elapsedTime;
      shaderRef.current.uniforms.u_mouse.value.set(mouse.x, mouse.y);
      shaderRef.current.uniforms.u_resolution.value.set(size.width, size.height);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={shaderRef}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={{
          u_time: { value: 0 },
          u_mouse: { value: new THREE.Vector2() },
          u_resolution: { value: new THREE.Vector2(size.width, size.height) },
        }}
      />
    </mesh>
  );
}