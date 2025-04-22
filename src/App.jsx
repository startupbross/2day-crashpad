import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Physics, useBox, usePlane } from '@react-three/cannon'
import './App.css'

function Cube({ position }) {
  const [ref] = useBox(() => ({
    mass: 1,
    position,
    args: [1, 1, 1],
  }))
  return (
    <mesh ref={ref} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ffcc00" />
    </mesh>
  )
}

function InvisibleFloor() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -1, 0],
  }))
  return (
    <mesh ref={ref} visible={false}>
      <planeGeometry args={[100, 100]} />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 5, 15], fov: 50 }}
      style={{ width: '100vw', height: '100vh' }}
    >
      <color attach="background" args={['#111']} />

      <ambientLight intensity={0.6} />
      <directionalLight
        castShadow
        position={[5, 10, 5]}
        intensity={1.2}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <OrbitControls enableZoom minDistance={5} maxDistance={20} />

      <Physics>
        {/* Spawn 12 cubes at random x positions */}
        {Array.from({ length: 12 }).map((_, i) => (
          <Cube
            key={i}
            position={[
              (Math.random() - 0.5) * 10, // x
              Math.random() * 5 + 5,      // y
              (Math.random() - 0.5) * 2   // z
            ]}
          />
        ))}
        <InvisibleFloor />
      </Physics>
    </Canvas>
  )
}
