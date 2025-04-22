import React, { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text3D, Center } from '@react-three/drei'
import { Physics, useBox, usePlane } from '@react-three/cannon'
import * as THREE from 'three'

const font = await new FontLoader().loadAsync('/fonts/helvetiker_regular.typeface.json')

function Ground() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -1, 0],
  }))
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#111" />
    </mesh>
  )
}

function FallingTwo({ index, size }) {
  const [ref] = useBox(() => ({
    mass: 1,
    position: [(Math.random() - 0.5) * 10, 10 + index * 1.5, (Math.random() - 0.5) * 4],
  }))

  return (
    <Center>
      <Text3D
        ref={ref}
        font={FONT_URL}
        size={size}
        height={0.5}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.03}
        bevelSize={0.02}
        castShadow
      >
        2
        <meshStandardMaterial color={new THREE.Color(`hsl(${Math.random() * 360}, 80%, 60%)`)} />
      </Text3D>
    </Center>
  )
}

export default function App() {
  const [visibleIndices, setVisibleIndices] = useState([])

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setVisibleIndices(prev => [...prev, i])
      i++
      if (i >= 12) clearInterval(interval)
    }, 300)
    return () => clearInterval(interval)
  }, [])

  return (
    <Canvas
      shadows
      camera={{ position: [0, 5, 15], fov: 50 }}
      style={{ width: '100vw', height: '100vh', background: '#111' }}
    >
      <color attach="background" args={['#111']} />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <OrbitControls enableZoom minDistance={5} maxDistance={20} />
      <Physics>
        {visibleIndices.map((_, i) => (
          <FallingTwo key={i} index={i} size={Math.random() * 0.6 + 0.5} />
        ))}
        <Ground />
      </Physics>
    </Canvas>
  )
}

