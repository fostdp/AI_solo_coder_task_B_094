import { useEffect, useRef } from 'react'

export interface SoundRadiationCanvasProps {
  modeShape: number[][]
  frequency: number
}

function SoundRadiationCanvas({ modeShape, frequency }: SoundRadiationCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    ctx.clearRect(0, 0, width, height)

    const bgGradient = ctx.createLinearGradient(0, 0, 0, height)
    bgGradient.addColorStop(0, 'rgba(26, 26, 46, 0.9)')
    bgGradient.addColorStop(1, 'rgba(22, 33, 62, 0.9)')
    ctx.fillStyle = bgGradient
    ctx.fillRect(0, 0, width, height)

    const centerX = width / 2
    const centerY = height / 2
    const maxRadius = Math.min(chartWidth, chartHeight) / 2

    const angleSteps = 180
    const radialSteps = 50

    const nx = modeShape.length
    const ny = modeShape[0]?.length || 0

    for (let r = 0; r < radialSteps; r++) {
      for (let a = 0; a < angleSteps; a++) {
        const angle = (a / angleSteps) * Math.PI * 2
        const radius = ((r + 0.5) / radialSteps) * maxRadius

        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius

        const normalizedR = radius / maxRadius

        const modeX = Math.floor(((Math.cos(angle) + 1) / 2) * (nx - 1))
        const modeY = Math.floor(((Math.sin(angle) + 1) / 2) * (ny - 1))

        const clampedX = Math.max(0, Math.min(nx - 1, modeX))
        const clampedY = Math.max(0, Math.min(ny - 1, modeY))

        const modeValue = modeShape[clampedX]?.[clampedY] || 0
        const radiationIntensity = Math.abs(modeValue) * (1 - normalizedR * 0.5)

        const intensity = Math.max(0, Math.min(1, radiationIntensity))

        const hue = 30 + intensity * 20
        const saturation = 60 + intensity * 30
        const lightness = 20 + intensity * 50

        ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.8)`
        ctx.fillRect(x - 2, y - 2, 5, 5)
      }
    }

    ctx.strokeStyle = 'rgba(201, 169, 110, 0.4)'
    ctx.lineWidth = 1
    for (let r = 1; r <= 4; r++) {
      const radius = (r / 4) * maxRadius
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.stroke()
    }

    for (let a = 0; a < 8; a++) {
      const angle = (a / 8) * Math.PI * 2
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(
        centerX + Math.cos(angle) * maxRadius,
        centerY + Math.sin(angle) * maxRadius
      )
      ctx.stroke()
    }

    ctx.strokeStyle = 'rgba(201, 169, 110, 0.6)'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(centerX, centerY, maxRadius, 0, Math.PI * 2)
    ctx.stroke()

    const legendX = width - padding - 20
    const legendY = padding
    const legendHeight = chartHeight
    const legendWidth = 16

    for (let i = 0; i < legendHeight; i++) {
      const intensity = 1 - i / legendHeight
      const hue = 30 + intensity * 20
      const saturation = 60 + intensity * 30
      const lightness = 20 + intensity * 50
      ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`
      ctx.fillRect(legendX, legendY + i, legendWidth, 1)
    }

    ctx.strokeStyle = 'rgba(201, 169, 110, 0.6)'
    ctx.lineWidth = 1
    ctx.strokeRect(legendX, legendY, legendWidth, legendHeight)

    ctx.fillStyle = 'rgba(201, 169, 110, 0.8)'
    ctx.font = '11px "Noto Sans SC", sans-serif'
    ctx.textAlign = 'left'
    ctx.fillText('强', legendX + legendWidth + 6, legendY + 10)
    ctx.fillText('弱', legendX + legendWidth + 6, legendY + legendHeight - 2)

    ctx.fillStyle = 'rgba(201, 169, 110, 0.9)'
    ctx.font = 'bold 13px "Noto Serif SC", serif'
    ctx.textAlign = 'center'
    ctx.fillText(`声辐射分布图 - ${frequency.toFixed(1)} Hz`, width / 2, 22)

    ctx.fillStyle = 'rgba(201, 169, 110, 0.6)'
    ctx.font = '11px "Noto Sans SC", sans-serif'
    ctx.fillText('极坐标视图', centerX, centerY + maxRadius + 25)
  }, [modeShape, frequency])

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={350}
      className="w-full h-full"
    />
  )
}

export default SoundRadiationCanvas
