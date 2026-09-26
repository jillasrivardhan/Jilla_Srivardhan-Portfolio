'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const CYAN = new THREE.Color('#22d3ee')
const VIOLET = new THREE.Color('#8b5cf6')

function createDotTexture() {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.3, 'rgba(255,255,255,0.8)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(canvas)
}

function fibonacciSphere(count: number, radius: number) {
  const points: THREE.Vector3[] = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    const jitter = 1 + (Math.sin(i * 12.9898) * 0.5) * 0.12
    points.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(radius * jitter))
  }
  return points
}

function Core({ nodeCount, particleCount }: { nodeCount: number; particleCount: number }) {
  const group = useRef<THREE.Group>(null)
  const inner = useRef<THREE.Mesh>(null)
  const dust = useRef<THREE.Points>(null)
  const texture = useMemo(() => createDotTexture(), [])

  const { nodePositions, nodeColors, linePositions, lineColors } = useMemo(() => {
    const nodes = fibonacciSphere(nodeCount, 1.6)
    const nodePositions = new Float32Array(nodes.length * 3)
    const nodeColors = new Float32Array(nodes.length * 3)
    nodes.forEach((p, i) => {
      p.toArray(nodePositions, i * 3)
      CYAN.clone()
        .lerp(VIOLET, (p.y + 1.6) / 3.2)
        .toArray(nodeColors, i * 3)
    })

    const lines: number[] = []
    const colors: number[] = []
    const threshold = nodeCount > 90 ? 0.62 : 0.85
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < threshold) {
          lines.push(...nodes[i].toArray(), ...nodes[j].toArray())
          const c = CYAN.clone().lerp(VIOLET, (nodes[i].y + 1.6) / 3.2)
          colors.push(c.r, c.g, c.b, c.r, c.g, c.b)
        }
      }
    }
    return {
      nodePositions,
      nodeColors,
      linePositions: new Float32Array(lines),
      lineColors: new Float32Array(colors),
    }
  }, [nodeCount])

  const dustPositions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      const r = 2.2 + Math.random() * 1.6
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.cos(phi)
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }
    return arr
  }, [particleCount])

  useFrame((state, delta) => {
    if (!group.current) return
    const scrollFactor = Math.min(window.scrollY / window.innerHeight, 1)
    const targetX = state.pointer.y * 0.35 + scrollFactor * 0.6
    const targetY = state.pointer.x * 0.5
    group.current.rotation.y += delta * 0.12
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.05)
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetY * 0.25, 0.05)
    const s = 1 - scrollFactor * 0.15
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, s, 0.1))
    if (inner.current) {
      inner.current.rotation.x -= delta * 0.2
      inner.current.rotation.z += delta * 0.15
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.04
      inner.current.scale.setScalar(pulse)
    }
    if (dust.current) dust.current.rotation.y -= delta * 0.03
  })

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[nodeColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.09}
          map={texture}
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[lineColors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.28} depthWrite={false} blending={THREE.AdditiveBlending} />
      </lineSegments>

      <mesh ref={inner}>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.35} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.28, 24, 24]} />
        <meshBasicMaterial color="#a5f3fc" transparent opacity={0.9} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.5, 24, 24]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.08} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>

      <points ref={dust}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dustPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          map={texture}
          color="#a1a1aa"
          transparent
          opacity={0.6}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

export default function NeuralCore({ compact }: { compact: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 45 }}
      dpr={[1, compact ? 1.5 : 2]}
      gl={{ antialias: !compact, alpha: true, powerPreference: 'high-performance' }}
      aria-hidden="true"
    >
      <Core nodeCount={compact ? 70 : 140} particleCount={compact ? 120 : 380} />
    </Canvas>
  )
}
