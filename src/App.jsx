import React, { useRef, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Physics, useBox, usePlane } from '@react-three/cannon'
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import fontData from '/public/fonts/KAGE-Freebies-Black.otf' // path to your font

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

function Number2({ delay, size }) {
  const ref = useRef()
  const [loadedFont, setLoadedFont] = useState(null)

  const [boxRef] = useBox(() => ({
    mass: 1,
    position: [Math.random() * 4 - 2, 10, Math.random() * 4 - 2],
  }))

  useEffect(() => {
    const loader = new FontLoader()
    loader.load('/fonts/KAGE-Freebies-Black.otf', font => setLoadedFont(font))
  }, [])

  if (!loadedFont) return null

  return (
    <mesh ref={boxRef} castShadow>
      <textGeometry args={['2', { font: loadedFont, size: size, height: 0.5 }]} />
      <meshStandardMaterial color={new THREE.Color(`hsl(${Math.random() * 360}, 80%, 60%)`)} />
    </mesh>
  )
}

export default function App() {
  const [activeIndices, setActiveIndices] = useState([])

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setActiveIndices(prev => [...prev, i])
      i++
      if (i >= 12) clearInterval(interval)
    }, 300)
    return () => clearInterval(interval)
  }, [])

  return (
    <Canvas shadows camera={{ position: [0, 3, 10], fov: 50 }}>
      <ambientLight intensity={0.4} />
      <directionalLight
        castShadow
        position={[5, 10, 5]}
        intensity={1.2}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <OrbitControls />
      <Physics>
        {activeIndices.map((_, index) => (
          <Number2 key={index} size={Math.random() * 0.8 + 0.4} />
        ))}
        <Ground />
      </Physics>
    </Canvas>
  )
}
