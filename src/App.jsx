import React, { Suspense } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls, Center, Text3D } from '@react-three/drei'
import { Physics, useBox, usePlane } from '@react-three/cannon'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
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

function Logo3D() {
  const font = useLoader(FontLoader, '/fonts/helvetiker_bold.typeface.json')

  return (
    <Center position={[0, 2.5, 0]}>
      <Text3D
        font={font}
        size={1.5}
        height={0.5}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.05}
        bevelSize={0.03}
        bevelSegments={10}
      >
        2DAY
        <meshStandardMaterial color="white" />
      </Text3D>
    </Center>
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

      <Suspense fallback={null}>
        <Logo3D />
      </Suspense>

      <Physics>
        {Array.from({ length: 30 }).map((_, i) => (
          <Cube
            key={i}
            position={[
              (Math.random() - 0.5) * 10,
              Math.random() * 5 + 5,
              (Math.random() - 0.5) * 2
            ]}
          />
        ))}
        <InvisibleFloor />
      </Physics>
    </Canvas>
  )
}
