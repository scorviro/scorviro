'use client'

import { useMemo, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

const PARTICLE_COUNT = 2500

function ParticleField() {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = 2.5 + Math.random() * 7
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.015
      ref.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#C9A84C"
        size={0.008}
        sizeAttenuation
        depthWrite={false}
        opacity={0.5}
      />
    </Points>
  )
}

function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null)
  const torusGeom = useMemo(() => new THREE.TorusGeometry(0.9, 0.25, 8, 32), [])

  useEffect(() => {
    return () => {
      torusGeom.dispose()
    }
  }, [torusGeom])

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime
      meshRef.current.rotation.x = t * 0.05
      meshRef.current.rotation.y = t * 0.08
      meshRef.current.position.y = Math.sin(t * 0.3) * 0.2
    }
  })

  return (
    <mesh ref={meshRef} position={[2.2, 0.2, -1.5]} geometry={torusGeom}>
      <meshStandardMaterial
        color="#C9A84C"
        metalness={0.9}
        roughness={0.1}
        wireframe
      />
    </mesh>
  )
}

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight
          position={[2, 3, 4]}
          intensity={2.5}
          color="#C9A84C"
          distance={10}
        />
        <pointLight
          position={[-3, -2, -3]}
          intensity={1.0}
          color="#ffffff"
          distance={8}
        />
        <ParticleField />
        <FloatingGeometry />
      </Canvas>
    </div>
  )
}
