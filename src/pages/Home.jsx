import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text3D } from '@react-three/drei'
import * as THREE from 'three'

function SpiralField({ count = 3500, floaters = 300 }) {
  const meshRef = useRef()
  const dummy = new THREE.Object3D()
  const colorArray = new Float32Array((count + floaters) * 3)

  useEffect(() => {
    if (!meshRef.current) return

    for (let i = 0; i < count + floaters; i++) {
      let x, y, z

      if (i < count) {
        // Spiral layout, starting at radius 3
        const angle = i * 0.05
        const radius = 3 + i * 0.007
        x = radius * Math.cos(angle) * 1.0
        y = radius * Math.sin(angle) * 0.85
        z = (Math.random() - 0.5) * 6
      } else {
        // Outer random floaters
        const r = Math.random() * 20 + 6
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        x = r * Math.sin(phi) * Math.cos(theta)
        y = r * Math.sin(phi) * Math.sin(theta)
        z = r * Math.cos(phi)
      }

      dummy.position.set(x, y, z)

      const sizeRand = Math.random()
      const scale = sizeRand < 0.33 ? 0.06 : sizeRand < 0.66 ? 0.09 : 0.13
      dummy.scale.set(scale, scale, scale)

      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)

      // Gradient: orange → pink → purple
      const color = new THREE.Color()
      color.setHSL(0.05 + 0.4 * (i / (count + floaters)), 1, 0.6)
      color.toArray(colorArray, i * 3)
    }

    meshRef.current.geometry.setAttribute('color', new THREE.InstancedBufferAttribute(colorArray, 3))
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [count, floaters])

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.001
    }
  })

  return (
    <instancedMesh ref={meshRef} args={[null, null, count + floaters]}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshStandardMaterial
        vertexColors
        emissive="#ffffff"
        emissiveIntensity={0.15}
        roughness={0.3}
        metalness={0.3}
      />
    </instancedMesh>
  )
}

function FloatingLogo() {
  const logoRef = useRef()

  return (
    <group ref={logoRef} position={[0, 0, 0]}>
      <Text3D
        font="/fonts/helvetiker_bold.typeface.json"
        size={3}
        height={0.3}
        bevelEnabled
        bevelSize={0.03}
        bevelThickness={0.05}
        curveSegments={12}
        position={[-3.5, -1.2, 0]}
      >
        2
        <meshStandardMaterial
          color="#FDF5E6"
          emissive="#FDF5E6"
          emissiveIntensity={0.5}
          metalness={0.2}
          roughness={0.4}
        />
      </Text3D>

      <Text3D
        font="/fonts/helvetiker_bold.typeface.json"
        size={1.5}
        height={0.3}
        bevelEnabled
        bevelSize={0.03}
        bevelThickness={0.05}
        curveSegments={12}
        position={[-0.7, 0.1, 0]}
      >
        DAY
        <meshStandardMaterial
          color="#FDF5E6"
          emissive="#FDF5E6"
          emissiveIntensity={0.5}
          metalness={0.2}
          roughness={0.4}
        />
      </Text3D>
    </group>
  )
}

export default function Home() {
  return (
    <div style={{ width: '100vw', minHeight: '100vh', position: 'relative' }}>
      <Canvas
        shadows
        camera={{ position: [0, 0, 20], fov: 50 }}
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 1 }}
      >
        <color attach="background" args={['#111111']} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} />
        <spotLight position={[0, 10, 5]} angle={0.3} intensity={1.7} penumbra={0.4} castShadow />
        <OrbitControls enableZoom enablePan />
        <SpiralField />
        <FloatingLogo />
      </Canvas>

      <div style={{ height: '200vh' }} />
    </div>
  )
}
