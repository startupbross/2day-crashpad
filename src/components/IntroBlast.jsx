import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

export default function IntroBlast({ onComplete }) {
  const meshRef = useRef()
  const dummy = new THREE.Object3D()
  const [hasFired, setHasFired] = useState(false)

  const count = 1000
  const velocities = useRef(
    new Array(count).fill().map(() => {
      const dir = new THREE.Vector3(
        (Math.random() - 0.5),
        (Math.random() - 0.5),
        (Math.random() - 0.5)
      ).normalize()
      const speed = Math.random() * 0.2 + 0.15
      return dir.multiplyScalar(speed)
    })
  )

  const positions = useRef(
    new Array(count).fill().map(() => new THREE.Vector3(0, 0, 0))
  )

  useEffect(() => {
    setHasFired(true)
    setTimeout(onComplete, 1700) // remove after blast finishes
  }, [onComplete])

  useFrame(() => {
    if (!hasFired || !meshRef.current) return

    for (let i = 0; i < count; i++) {
      positions.current[i].add(velocities.current[i])
      dummy.position.copy(positions.current[i])
      dummy.scale.setScalar(0.08)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }

    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshStandardMaterial
        color="#FDF5E6"
        emissive="#ffffff"
        emissiveIntensity={1}
        roughness={0.3}
        metalness={0.3}
        transparent
        opacity={0.85}
      />
    </instancedMesh>
  )
}
