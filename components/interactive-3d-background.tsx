"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float } from "@react-three/drei"
import { Suspense, useRef, useEffect, useState } from "react"
import { useScroll, useTransform, motion } from "framer-motion"
import { useTheme } from "next-themes"
import type { Mesh, Group, Points } from "three"
import * as THREE from "three"

interface Section3DProps {
  scrollProgress: number
  currentSection: string
}

function TechGeometryScene({ scrollProgress, currentSection }: Section3DProps) {
  const groupRef = useRef<Group>(null)
  const wireframeCubeRef = useRef<Mesh>(null)
  const innerOrbRef = useRef<Mesh>(null)
  const particlesRef = useRef<Points>(null)
  const { theme } = useTheme()

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Create particle positions
  const particleCount = 100
  const particlePositions = new Float32Array(particleCount * 3)
  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * 10
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 10
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 10
  }

  useFrame((state, delta) => {
    if (!groupRef.current) return

    groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1

    groupRef.current.rotation.x += (mousePosition.y * 0.1 - groupRef.current.rotation.x) * 0.02
    groupRef.current.rotation.y += (mousePosition.x * 0.1 - groupRef.current.rotation.y) * 0.02

    const sectionEffects = {
      home: { scale: 1, speed: 1 },
      about: { scale: 1.1, speed: 1.2 },
      skills: { scale: 0.9, speed: 1.5 },
      projects: { scale: 1.2, speed: 0.8 }, // Grows larger in projects section
      github: { scale: 1.05, speed: 1.3 },
      blog: { scale: 0.95, speed: 1.1 }, // Rotates slower in blog area
      timeline: { scale: 1.15, speed: 0.9 },
      certifications: { scale: 1.0, speed: 1.4 },
      heatmap: { scale: 0.85, speed: 1.6 },
      testimonials: { scale: 1.25, speed: 0.7 },
      contact: { scale: 1.1, speed: 1.0 },
    }

    const effect = sectionEffects[currentSection as keyof typeof sectionEffects] || { scale: 1, speed: 1 }
    const targetScale = effect.scale
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.02)

    if (wireframeCubeRef.current) {
      wireframeCubeRef.current.rotation.x += delta * 0.2 * effect.speed
      wireframeCubeRef.current.rotation.y += delta * 0.15 * effect.speed
      wireframeCubeRef.current.rotation.z += delta * 0.1 * effect.speed
    }

    if (innerOrbRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1
      innerOrbRef.current.scale.setScalar(pulse)
      innerOrbRef.current.rotation.y += delta * 0.5 * effect.speed
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.05 * effect.speed
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  const getSectionColors = (section: string) => {
    const colorSchemes = {
      home: { primary: "#7C3AED", secondary: "#8B5CF6", accent: "#A855F7", glow: "#DDD6FE" },
      about: { primary: "#3B82F6", secondary: "#60A5FA", accent: "#93C5FD", glow: "#DBEAFE" },
      skills: { primary: "#10B981", secondary: "#34D399", accent: "#6EE7B7", glow: "#D1FAE5" },
      projects: { primary: "#F59E0B", secondary: "#FBBF24", accent: "#FCD34D", glow: "#FEF3C7" },
      github: { primary: "#6B7280", secondary: "#9CA3AF", accent: "#D1D5DB", glow: "#F3F4F6" },
      blog: { primary: "#EF4444", secondary: "#F87171", accent: "#FCA5A5", glow: "#FEE2E2" },
      timeline: { primary: "#8B5CF6", secondary: "#A78BFA", accent: "#C4B5FD", glow: "#EDE9FE" },
      certifications: { primary: "#06B6D4", secondary: "#22D3EE", accent: "#67E8F9", glow: "#CFFAFE" },
      heatmap: { primary: "#84CC16", secondary: "#A3E635", accent: "#BEF264", glow: "#ECFCCB" },
      testimonials: { primary: "#EC4899", secondary: "#F472B6", accent: "#F9A8D4", glow: "#FCE7F3" },
      contact: { primary: "#7C3AED", secondary: "#8B5CF6", accent: "#A855F7", glow: "#DDD6FE" },
    }
    return colorSchemes[section as keyof typeof colorSchemes] || colorSchemes.home
  }

  const currentColors = getSectionColors(currentSection)

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh ref={wireframeCubeRef}>
          <boxGeometry args={[3, 3, 3]} />
          <meshBasicMaterial color={currentColors.primary} wireframe={true} transparent={true} opacity={0.8} />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <mesh ref={innerOrbRef}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial
            color={currentColors.secondary}
            emissive={currentColors.secondary}
            emissiveIntensity={0.3}
            transparent={true}
            opacity={0.7}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </Float>

      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particleCount} array={particlePositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          color={currentColors.accent}
          size={0.05}
          transparent={true}
          opacity={0.6}
          sizeAttenuation={true}
        />
      </points>

      {[
        [1.8, 1.8, 1.8],
        [-1.8, 1.8, 1.8],
        [1.8, -1.8, 1.8],
        [-1.8, -1.8, 1.8],
      ].map((position, index) => (
        <Float key={index} speed={1.2 + index * 0.1} rotationIntensity={0.3} floatIntensity={0.4}>
          <mesh position={position as [number, number, number]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color={currentColors.glow} emissive={currentColors.primary} emissiveIntensity={0.5} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

function Scene({ scrollProgress, currentSection }: Section3DProps) {
  const { theme } = useTheme()

  return (
    <>
      <ambientLight intensity={theme === "dark" ? 0.3 : 0.5} color="#DDD6FE" />
      <pointLight position={[5, 5, 5]} intensity={theme === "dark" ? 1.5 : 1.2} color="#7C3AED" />
      <pointLight position={[-5, -5, -5]} intensity={theme === "dark" ? 1.2 : 1} color="#A855F7" />
      <TechGeometryScene scrollProgress={scrollProgress} currentSection={currentSection} />
      <Environment preset={theme === "dark" ? "night" : "dawn"} />
    </>
  )
}

export default function Interactive3DBackground() {
  const { scrollYProgress } = useScroll()
  const [currentSection, setCurrentSection] = useState("home")

  useEffect(() => {
    const sections = [
      "home",
      "about",
      "skills",
      "projects",
      "github",
      "blog",
      "timeline",
      "certifications",
      "heatmap",
      "testimonials",
      "contact",
    ]

    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      const sectionIndex = Math.floor((scrollPosition / (documentHeight - windowHeight)) * sections.length)
      const clampedIndex = Math.max(0, Math.min(sections.length - 1, sectionIndex))
      setCurrentSection(sections[clampedIndex])
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollProgress = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <motion.div
      className="fixed inset-0 -z-10"
      style={{
        background: `radial-gradient(ellipse at center, rgba(124, 58, 237, 0.08) 0%, rgba(109, 40, 217, 0.12) 50%, rgba(88, 28, 135, 0.15) 100%)`,
      }}
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} gl={{ alpha: true, antialias: true }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <Scene scrollProgress={scrollProgress.get()} currentSection={currentSection} />
        </Suspense>
      </Canvas>
    </motion.div>
  )
}
