import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const HeroShaderMaterial = {
  uniforms: {
    u_time: { value: 0 },
    u_resolution: { value: new THREE.Vector2() },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float u_time;
    uniform vec2 u_resolution;
    varying vec2 vUv;

    void main() {
      vec2 st = gl_FragCoord.xy / u_resolution.xy;
      vec3 color = vec3(0.0);
      color = vec3(0.2 + 0.2 * sin(u_time + st.xyx * 40.0));
      gl_FragColor = vec4(color, 1.0);
    }
  `
}

export default function HeroShader() {
  const materialRef = useRef()

  useFrame(({ clock, size }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = clock.elapsedTime
      materialRef.current.uniforms.u_resolution.value.set(size.width, size.height)
    }
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial ref={materialRef} attach="material" args={[HeroShaderMaterial]} />
    </mesh>
  )
}
