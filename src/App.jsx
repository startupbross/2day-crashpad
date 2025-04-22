import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Center, Text3D, OrbitControls } from '@react-three/drei'
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

function LogoText() {
  return (
    <group position={[-1.2, 2, 0]}>
      <Text3D
        font="/fonts/helvetiker_bold.typeface.json"
        size={3}
        height={0.4}
        bevelEnabled
        bevelSize={0.03}
        bevelThickness={0.05}
        curveSegments={12}
        position={[0, -1.2, 0]}
      >
        2
        <meshStandardMaterial color="white" />
      </Text3D>

      <Text3D
        font="/fonts/helvetiker_bold.typeface.json"
        size={1.5}
        height={0.4}
        bevelEnabled
        bevelSize={0.03}
        bevelThickness={0.05}
        curveSegments={12}
        position={[2.5, 0, 0]}
      >
        DAY
        <meshStandardMaterial color="white" />
      </Text3D>
    </group>
  )
}

export default function App() {
  return (
    <>
      <div className="nav">
        <div className="nav-logo">2DAY</div>
        <div className="nav-links">
          <a href="#">Work</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
      </div>

      <Canvas
        shadows
        camera={{ position: [0, 5, 15], fov: 50 }}
        style={{ width: '100vw', height: '100vh' }}
      >
        <color attach="background" args={['#111']} />
        <ambientLight intensity={0.4} />
        <directionalLight
          castShadow
          position={[5, 10, 5]}
          intensity={1.2}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <spotLight
          position={[0, 10, 10]}
          angle={0.3}
          penumbra={0.5}
          intensity={1.5}
          castShadow
        />

        {/* 👇 Enable subtle camera rotation, no zoom */}
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2.1}
          minPolarAngle={Math.PI / 2.3}
          maxAzimuthAngle={0.3}
          minAzimuthAngle={-0.3}
        />

        <Physics>
          {Array.from({ length: 100 }).map((_, i) => (
            <Cube
              key={i}
              position={[
                (Math.random() - 0.5) * 10,
                Math.random() * 5 + 5,
                (Math.random() - 0.5) * 4
              ]}
            />
          ))}
          <InvisibleFloor />
        </Physics>

        <LogoText />
      </Canvas>
    </>
  )
}
