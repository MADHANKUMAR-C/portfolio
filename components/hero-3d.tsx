"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Edges } from "@react-three/drei"
import { Suspense, useRef, useState } from "react"
import type { Mesh } from "three"

function NeonTorus() {
  const ref = useRef<Mesh>(null)
  const [down, setDown] = useState(false)
  const [hovered, setHovered] = useState(false)
  const target = useRef({ rx: 0, ry: 0 })
  const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b

  const onPointerMove = (e: any) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1
    const y = (e.clientY / window.innerHeight) * 2 - 1
    target.current.ry = x * 0.35
    target.current.rx = -y * 0.25
  }

  useFrame((_, delta) => {
    const m = ref.current
    if (!m) return
    // idle rotation, speed up slightly on hover/drag
    const base = 0.35
    const boost = down ? 1.2 : hovered ? 0.8 : 0
    m.rotation.y += delta * (base + boost)
    m.rotation.x += delta * 0.06
    // tilt towards cursor
    m.rotation.x = lerp(m.rotation.x, target.current.rx, 0.08)
    m.rotation.y = lerp(m.rotation.y, target.current.ry + m.rotation.y, 0.04)
  })

  return (
    <group
      onPointerMove={onPointerMove}
      onPointerDown={() => setDown(true)}
      onPointerUp={() => setDown(false)}
      onPointerLeave={() => {
        setDown(false)
        setHovered(false)
      }}
      onPointerOver={() => setHovered(true)}
    >
      <mesh ref={ref} castShadow receiveShadow>
        <torusKnotGeometry args={[1.25, 0.38, 220, 32]} />
        <meshStandardMaterial
          color={"#171425"}
          metalness={0.55}
          roughness={0.25}
          emissive={"#7C3AED"}
          emissiveIntensity={0.28}
        />
        <Edges threshold={40} color="#22D3EE" />
      </mesh>
    </group>
  )
}

export default function Hero3D() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0.2, 5], fov: 50 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      className="h-full w-full"
    >
      <Suspense fallback={null}>
        {/* No background color => truly transparent over your dark hero panel */}
        <ambientLight intensity={0.6} />
        <pointLight position={[4, 4, 6]} intensity={18} color={"#7C3AED"} />
        <pointLight position={[-6, -2, 4]} intensity={12} color={"#22D3EE"} />
        <NeonTorus />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  )
}
