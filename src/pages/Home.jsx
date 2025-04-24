import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Center, Text3D, OrbitControls } from '@react-three/drei'
import { Physics, useBox, usePlane } from '@react-three/cannon'

function Cube({ position }) {
  const [ref] = useBox(() => ({
    mass: 1,
    position,
    args: [1, 1, 1],
  }))
  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#FDF5E6" metalness={0.3} roughness={0.6} />
    </mesh>
  )
}

function InvisibleFloor() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -1, 0],
  }))
  return (
    <mesh ref={ref} visible={false} receiveShadow>
      <planeGeometry args={[100, 100]} />
    </mesh>
  )
}

function LogoText() {
  return (
    <group position={[-4, 1, 0]}>
      <Text3D
        font="/fonts/helvetiker_bold.typeface.json"
        size={5}
        height={0.4}
        bevelEnabled
        bevelSize={0.03}
        bevelThickness={0.05}
        curveSegments={12}
        position={[0, -1.2, 0]}
      >
        2
        <meshStandardMaterial color="#FDF5E6" metalness={0.2} roughness={0.4} />
      </Text3D>

      <Text3D
        font="/fonts/helvetiker_bold.typeface.json"
        size={2.5}
        height={0.4}
        bevelEnabled
        bevelSize={0.03}
        bevelThickness={0.05}
        curveSegments={12}
        position={[4, 1.1, 0]}
      >
        DAY
        <meshStandardMaterial color="#FDF5E6" metalness={0.2} roughness={0.4} />
      </Text3D>
    </group>
  )
}

export default function Home() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#111111',
      overflow: 'hidden',
      zIndex: 1 // 👈 stays behind nav
    }}>
      <Canvas
        shadows
        camera={{ position: [0, 5, 15], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={['#111111']} />

        <ambientLight intensity={0.4} />
        <directionalLight
          castShadow
          position={[5, 10, 5]}
          intensity={1.2}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <spotLight
          position={[0, 10, 5]}
          angle={0.3}
          intensity={1.7}
          penumbra={0.4}
          castShadow
          target-position={[0, 2, 0]}
        />

        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2.1}
          minPolarAngle={Math.PI / 2.3}
          maxAzimuthAngle={0.3}
          minAzimuthAngle={-0.3}
        />

        <Physics>
          {Array.from({ length: 150 }).map((_, i) => (
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
    </div>
  )
}
