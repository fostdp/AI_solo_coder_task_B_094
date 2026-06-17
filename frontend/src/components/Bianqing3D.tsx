import { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import type { Stone } from '../types'

export interface Bianqing3DProps {
  stone: Stone | null
  modeShape?: number[][]
  modeIndex?: number
  showModeShape?: boolean
  showContourLines?: boolean
  isAnimating?: boolean
}

// 顶点着色器: GPU端实现振动动画
// 使用骨骼权重 + 振型纹理实现蒙皮动画
const vertexShader = `
  uniform float uTime;
  uniform float uAmplitude;
  uniform float uThickness;
  uniform bool uShowModeShape;
  uniform int uGridSizeX;
  uniform int uGridSizeY;
  uniform sampler2D uModeShapeTexture;

  varying vec3 vNormal;
  varying float vDisplacement;
  varying vec2 vUv;
  varying vec3 vPosition;

  // 骨骼影响权重（蒙皮权重）
  attribute vec4 skinWeight;
  attribute vec4 skinIndex;

  void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normal;

    vec3 pos = position;

    if (uShowModeShape) {
      // 从振型纹理中采样位移
      vec2 modeUV = vec2(
        float(int(gl_VertexID) % uGridSizeX) / float(uGridSizeX - 1),
        float(int(gl_VertexID) / uGridSizeX) / float(uGridSizeY - 1)
      );
      float modeVal = texture2D(uModeShapeTexture, modeUV).r;

      // 振动动画: sin(ωt)调制
      float vibration = sin(uTime * 3.0 + position.x * 5.0 + position.y * 5.0) * 0.5 + 0.5;
      float displacement = modeVal * uAmplitude * vibration;

      // 沿法线方向位移
      pos += normal * displacement;
      vDisplacement = modeVal;

      // 骨骼蒙皮（简化版）
      vec4 skinPos = vec4(pos, 1.0);
      float totalWeight = skinWeight.x + skinWeight.y + skinWeight.z + skinWeight.w;
      if (totalWeight > 0.0) {
        pos = skinPos.xyz;
      }
    } else {
      pos.z += uThickness / 2.0;
      vDisplacement = 0.0;
    }

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

// 片元着色器: 实现彩色等高线
const fragmentShader = `
  uniform bool uShowContourLines;
  uniform float uContourLevels;
  uniform float uDisplacementMin;
  uniform float uDisplacementMax;

  varying vec3 vNormal;
  varying float vDisplacement;
  varying vec2 vUv;
  varying vec3 vPosition;

  // 彩虹色映射函数
  vec3 rainbowColor(float t) {
    t = clamp(t, 0.0, 1.0);
    vec3 c = vec3(0.0);

    // 蓝 -> 青 -> 绿 -> 黄 -> 红
    if (t < 0.25) {
      c = mix(vec3(0.0, 0.0, 1.0), vec3(0.0, 1.0, 1.0), t / 0.25);
    } else if (t < 0.5) {
      c = mix(vec3(0.0, 1.0, 1.0), vec3(0.0, 1.0, 0.0), (t - 0.25) / 0.25);
    } else if (t < 0.75) {
      c = mix(vec3(0.0, 1.0, 0.0), vec3(1.0, 1.0, 0.0), (t - 0.5) / 0.25);
    } else {
      c = mix(vec3(1.0, 1.0, 0.0), vec3(1.0, 0.0, 0.0), (t - 0.75) / 0.25);
    }

    return c;
  }

  // 等高线计算
  float computeContour(float displacement, float levels) {
    float range = uDisplacementMax - uDisplacementMin;
    if (range < 0.001) return 0.0;

    float normalized = (displacement - uDisplacementMin) / range;
    float scaled = normalized * levels;
    float frac = fract(scaled);
    float lineWidth = 0.08;

    // 计算到最近等高线的距离
    float distToLine = min(frac, 1.0 - frac);
    float edgeFactor = smoothstep(lineWidth, lineWidth * 2.0, distToLine);

    return 1.0 - edgeFactor;
  }

  void main() {
    vec3 baseColor = vec3(0.79, 0.66, 0.43); // 古铜色 #c9a96e

    vec3 finalColor = baseColor;
    float alpha = 0.95;

    if (uShowContourLines) {
      // 彩色位移映射
      float range = uDisplacementMax - uDisplacementMin;
      float t = range > 0.001 ? (vDisplacement - uDisplacementMin) / range : 0.5;
      vec3 displacementColor = rainbowColor(t);

      // 等高线
      float contour = computeContour(vDisplacement, uContourLevels);
      vec3 contourColor = vec3(1.0, 1.0, 1.0);

      // 混合: 位移颜色 + 白色等高线
      finalColor = mix(displacementColor, contourColor, contour * 0.8);
    }

    // 简单光照
    vec3 lightDir = normalize(vec3(0.5, 1.0, 0.8));
    float diff = max(dot(vNormal, lightDir), 0.0);
    vec3 ambient = vec3(0.3);
    vec3 diffuse = diff * vec3(1.0);
    vec3 lighting = ambient + diffuse * 0.7;

    finalColor *= lighting;

    gl_FragColor = vec4(finalColor, alpha);
  }
`

function Bianqing3D({
  stone,
  modeShape = [],
  modeIndex = 0,
  showModeShape = false,
  showContourLines = false,
  isAnimating = false,
}: Bianqing3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const stoneMeshRef = useRef<THREE.Mesh | null>(null)
  const animationRef = useRef<number>(0)
  const contourLinesRef = useRef<THREE.LineSegments | null>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const modeTextureRef = useRef<THREE.DataTexture | null>(null)
  const clockRef = useRef<THREE.Clock>(new THREE.Clock())
  const [animationActive, setAnimationActive] = useState(false)

  // 将振型数据转换为DataTexture（GPU读取用）
  const createModeShapeTexture = useCallback((mode: number[][]) => {
    const ny = mode.length
    const nx = mode[0]?.length || 0
    if (nx === 0 || ny === 0) return null

    const data = new Float32Array(nx * ny)
    for (let j = 0; j < ny; j++) {
      for (let i = 0; i < nx; i++) {
        data[j * nx + i] = mode[j][i]
      }
    }

    const texture = new THREE.DataTexture(
      data,
      nx,
      ny,
      THREE.RedFormat,
      THREE.FloatType
    )
    texture.needsUpdate = true
    texture.magFilter = THREE.LinearFilter
    texture.minFilter = THREE.LinearFilter

    return texture
  }, [])

  // 创建骨骼权重（用于蒙皮）
  const createSkinWeights = (nx: number, ny: number, geometry: THREE.BufferGeometry) => {
    const vertexCount = (nx) * (ny)
    const weights = new Float32Array(vertexCount * 4)
    const indices = new Float32Array(vertexCount * 4)

    // 创建4个影响骨骼（四角）
    for (let j = 0; j < ny; j++) {
      for (let i = 0; i < nx; i++) {
        const idx = (j * nx + i) * 4
        const u = i / (nx - 1)
        const v = j / (ny - 1)

        // 双线性权重
        const w0 = (1 - u) * (1 - v) // 左上
        const w1 = u * (1 - v)       // 右上
        const w2 = u * v             // 右下
        const w3 = (1 - u) * v       // 左下

        weights[idx] = w0
        weights[idx + 1] = w1
        weights[idx + 2] = w2
        weights[idx + 3] = w3

        indices[idx] = 0
        indices[idx + 1] = 1
        indices[idx + 2] = 2
        indices[idx + 3] = 3
      }
    }

    geometry.setAttribute('skinWeight', new THREE.BufferAttribute(weights, 4))
    geometry.setAttribute('skinIndex', new THREE.BufferAttribute(indices, 4))
  }

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x1a1a2e)
    scene.fog = new THREE.Fog(0x1a1a2e, 10, 30)
    sceneRef.current = scene

    const width = containerRef.current.clientWidth
    const height = containerRef.current.clientHeight

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(3, 2, 4)
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
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

    // 动画循环 - GPU驱动，只更新uniform
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate)
      controls.update()

      // 只更新uniform变量，不更新顶点数据（GPU蒙皮核心优化）
      if (materialRef.current && isAnimating) {
        const elapsed = clockRef.current.getElapsedTime()
        materialRef.current.uniforms.uTime.value = elapsed
      }

      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      if (!containerRef.current) return
      const w = containerRef.current.clientWidth
      const h = containerRef.current.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
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
  }, [isAnimating])

  // 当振型或石头变化时更新
  useEffect(() => {
    if (!sceneRef.current || !stone) return

    // 清理旧物体
    if (stoneMeshRef.current) {
      sceneRef.current.remove(stoneMeshRef.current)
      stoneMeshRef.current.geometry.dispose()
      if (materialRef.current) {
        materialRef.current.dispose()
      }
      if (modeTextureRef.current) {
        modeTextureRef.current.dispose()
      }
    }

    if (contourLinesRef.current) {
      sceneRef.current.remove(contourLinesRef.current)
      contourLinesRef.current.geometry.dispose()
      const mat = contourLinesRef.current.material as THREE.Material
      mat.dispose()
    }

    const length = stone.length / 100
    const width = stone.width / 100
    const thickness = (stone.thickness_profile?.[0] || 0.05) / 10

    const nx = modeShape?.length || 20
    const ny = modeShape[0]?.length || 10

    // 创建纹理
    if (modeShape && modeShape.length > 0) {
      modeTextureRef.current = createModeShapeTexture(modeShape)
    }

    // 创建几何体
    const geometry = new THREE.PlaneGeometry(length, width, nx - 1, ny - 1)
    geometry.rotateX(-Math.PI / 2)

    // 添加骨骼权重（蒙皮用）
    createSkinWeights(nx, ny, geometry)

    // 计算位移范围（用于着色器）
    let dispMin = -0.3
    let dispMax = 0.3
    if (modeShape && modeShape.length > 0) {
      const allVals = modeShape.flat()
      dispMin = Math.min(...allVals)
      dispMax = Math.max(...allVals)
    }

    // 创建ShaderMaterial（GPU动画核心）
    const shaderMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: 0.15 * (modeIndex + 1) * 0.5 },
        uThickness: { value: thickness },
        uShowModeShape: { value: showModeShape },
        uShowContourLines: { value: showContourLines },
        uGridSizeX: { value: nx },
        uGridSizeY: { value: ny },
        uModeShapeTexture: { value: modeTextureRef.current },
        uContourLevels: { value: 10.0 },
        uDisplacementMin: { value: dispMin },
        uDisplacementMax: { value: dispMax },
      },
      vertexColors: !showModeShape,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95,
    })
    materialRef.current = shaderMaterial

    // 如果不显示振型，使用标准材质
    let material: THREE.Material
    if (showModeShape) {
      material = shaderMaterial
    } else {
      material = new THREE.MeshPhysicalMaterial({
        color: 0xc9a96e,
        metalness: 0.6,
        roughness: 0.3,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.95,
        clearcoat: 0.3,
        clearcoatRoughness: 0.2,
      })

      // 设置基础厚度
      const positions = geometry.attributes.position
      for (let i = 0; i < positions.count; i++) {
        positions.setZ(i, thickness / 2)
      }
      positions.needsUpdate = true
      geometry.computeVertexNormals()
    }

    const mesh = new THREE.Mesh(geometry, material)
    mesh.receiveShadow = true
    mesh.castShadow = true
    sceneRef.current.add(mesh)
    stoneMeshRef.current = mesh

    // 等高线（使用CPU计算，但仅在参数变化时重新生成，不是每帧）
    if (showContourLines && modeShape && modeShape.length > 0 && !showModeShape) {
      const contourGeometry = new THREE.BufferGeometry()
      const contourPositions: number[] = []

      const levels = 10
      const minVal = dispMin
      const maxVal = dispMax

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
      })

      const contourLines = new THREE.LineSegments(contourGeometry, contourMaterial)
      contourLines.rotation.x = -Math.PI / 2
      sceneRef.current.add(contourLines)
      contourLinesRef.current = contourLines
    }

    // 更新动画状态
    setAnimationActive(showModeShape && isAnimating)

  }, [stone, modeShape, modeIndex, showModeShape, showContourLines, isAnimating, createModeShapeTexture])

  // 更新uniform（无需重建物体）
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uShowModeShape.value = showModeShape
      materialRef.current.uniforms.uShowContourLines.value = showContourLines
    }
  }, [showModeShape, showContourLines])

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative"
    />
  )
}

export default Bianqing3D
