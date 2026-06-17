import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import type { Stone } from '../types'

export interface Bianqing3DProps {
  stone: Stone | null
  modeShape?: number[][]
  modeIndex?: number
  showModeShape?: boolean
  showContourLines?: boolean
}

function Bianqing3D({
  stone,
  modeShape = [],
  modeIndex = 0,
  showModeShape = false,
  showContourLines = false,
}: Bianqing3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const stoneMeshRef = useRef<THREE.Mesh | null>(null)
  const animationRef = useRef<number>(0)
  const contourLinesRef = useRef<THREE.LineSegments | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x1a1a2e)
    scene.fog = new THREE.Fog(0x1a1a2e, 10, 30)
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      100
    )
    camera.position.set(3, 2, 4)
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.minDistance = 2
    controls.maxDistance = 15
    controls.maxPolarAngle = Math.PI / 1.5
    controlsRef.current = controls

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    const mainLight = new THREE.DirectionalLight(0xffffff, 1)
    mainLight.position.set(5, 10, 5)
    mainLight.castShadow = true
    mainLight.shadow.mapSize.width = 2048
    mainLight.shadow.mapSize.height = 2048
    mainLight.shadow.camera.near = 0.5
    mainLight.shadow.camera.far = 50
    scene.add(mainLight)

    const fillLight = new THREE.DirectionalLight(0xc9a96e, 0.5)
    fillLight.position.set(-5, 3, -5)
    scene.add(fillLight)

    const rimLight = new THREE.DirectionalLight(0xa68b52, 0.3)
    rimLight.position.set(0, 5, -10)
    scene.add(rimLight)

    const pointLight = new THREE.PointLight(0xc9a96e, 0.8, 20)
    pointLight.position.set(0, 5, 3)
    scene.add(pointLight)

    const gridHelper = new THREE.GridHelper(10, 20, 0xc9a96e, 0x2d2d4a)
    gridHelper.position.y = -1
    scene.add(gridHelper)

    const axesHelper = new THREE.AxesHelper(0.5)
    axesHelper.position.set(-4, -0.9, -4)
    scene.add(axesHelper)

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      if (!containerRef.current) return
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationRef.current)
      renderer.dispose()
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  useEffect(() => {
    if (!sceneRef.current || !stone) return

    if (stoneMeshRef.current) {
      sceneRef.current.remove(stoneMeshRef.current)
      stoneMeshRef.current.geometry.dispose()
      if (Array.isArray(stoneMeshRef.current.material)) {
        stoneMeshRef.current.material.forEach(m => m.dispose())
      } else {
        stoneMeshRef.current.material.dispose()
      }
    }

    if (contourLinesRef.current) {
      sceneRef.current.remove(contourLinesRef.current)
      contourLinesRef.current.geometry.dispose()
      if (Array.isArray(contourLinesRef.current.material)) {
        contourLinesRef.current.material.forEach(m => m.dispose())
      } else {
        contourLinesRef.current.material.dispose()
      }
    }

    const length = stone.length / 100
    const width = stone.width / 100
    const thickness = (stone.thickness_profile?.[0] || 0.05) / 10

    const nx = modeShape?.length || 20
    const ny = modeShape[0]?.length || 10

    const geometry = new THREE.PlaneGeometry(length, width, nx - 1, ny - 1)
    geometry.rotateX(-Math.PI / 2)

    const positions = geometry.attributes.position

    if (showModeShape && modeShape && modeShape.length > 0) {
      const displacementScale = 0.15 * (modeIndex + 1) * 0.5

      for (let i = 0; i < positions.count; i++) {
        const ix = i % nx
        const iy = Math.floor(i / nx)

        if (modeShape[iy] && modeShape[iy][ix] !== undefined) {
          const z = modeShape[iy][ix] * displacementScale
          positions.setZ(i, z + thickness / 2)
        }
      }

      positions.needsUpdate = true
      geometry.computeVertexNormals()

      const colors = new Float32Array(positions.count * 3)
      const color = new THREE.Color()

      for (let i = 0; i < positions.count; i++) {
        const z = positions.getZ(i) - thickness / 2
        const normalizedZ = (z / (0.3 * (modeIndex + 1)) + 1) / 2
        const clampedZ = Math.max(0, Math.min(1, normalizedZ))

        const r = 0.5 + 0.5 * clampedZ
        const g = 0.4 + 0.3 * clampedZ
        const b = 0.2 + 0.1 * clampedZ

        color.setRGB(r, g, b)
        colors[i * 3] = color.r
        colors[i * 3 + 1] = color.g
        colors[i * 3 + 2] = color.b
      }

      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    } else {
      for (let i = 0; i < positions.count; i++) {
        positions.setZ(i, thickness / 2)
      }
      positions.needsUpdate = true
      geometry.computeVertexNormals()
    }

    const material = new THREE.MeshPhysicalMaterial({
      color: showModeShape ? undefined : 0xc9a96e,
      metalness: 0.6,
      roughness: 0.3,
      vertexColors: showModeShape,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95,
      clearcoat: 0.3,
      clearcoatRoughness: 0.2,
    })

    const mesh = new THREE.Mesh(geometry, material)
    mesh.receiveShadow = true
    mesh.castShadow = true
    sceneRef.current.add(mesh)
    stoneMeshRef.current = mesh

    if (showContourLines && modeShape && modeShape.length > 0) {
      const contourGeometry = new THREE.BufferGeometry()
      const contourPositions: number[] = []

      const levels = 10
      const minVal = -0.3
      const maxVal = 0.3

      for (let level = 0; level < levels; level++) {
        const threshold = minVal + (maxVal - minVal) * (level / (levels - 1))

        for (let i = 0; i < nx - 1; i++) {
          for (let j = 0; j < ny - 1; j++) {
            const v00 = modeShape[j]?.[i] || 0
            const v10 = modeShape[j]?.[i + 1] || 0
            const v01 = modeShape[j + 1]?.[i] || 0
            const v11 = modeShape[j + 1]?.[i + 1] || 0

            const x0 = (i / (nx - 1) - 0.5) * length
            const x1 = ((i + 1) / (nx - 1) - 0.5) * length
            const y0 = (j / (ny - 1) - 0.5) * width
            const y1 = ((j + 1) / (ny - 1) - 0.5) * width

            const crossings: [number, number][] = []

            if ((v00 - threshold) * (v10 - threshold) < 0) {
              const t = (threshold - v00) / (v10 - v00)
              crossings.push([x0 + (x1 - x0) * t, y0])
            }
            if ((v01 - threshold) * (v11 - threshold) < 0) {
              const t = (threshold - v01) / (v11 - v01)
              crossings.push([x0 + (x1 - x0) * t, y1])
            }
            if ((v00 - threshold) * (v01 - threshold) < 0) {
              const t = (threshold - v00) / (v01 - v00)
              crossings.push([x0, y0 + (y1 - y0) * t])
            }
            if ((v10 - threshold) * (v11 - threshold) < 0) {
              const t = (threshold - v10) / (v11 - v10)
              crossings.push([x1, y0 + (y1 - y0) * t])
            }

            if (crossings.length >= 2) {
              const zOffset = 0.02 + level * 0.005
              contourPositions.push(
                crossings[0][0], zOffset, crossings[0][1],
                crossings[1][0], zOffset, crossings[1][1]
              )
            }
          }
        }
      }

      contourGeometry.setAttribute('position', new THREE.Float32BufferAttribute(contourPositions, 3))

      const contourMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.6,
        linewidth: 1,
      })

      const contourLines = new THREE.LineSegments(contourGeometry, contourMaterial)
      contourLines.rotation.x = -Math.PI / 2
      sceneRef.current.add(contourLines)
      contourLinesRef.current = contourLines
    }

  }, [stone, modeShape, modeIndex, showModeShape, showContourLines])

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative"
    />
  )
}

export default Bianqing3D
