import { useEffect, useRef } from 'react'

export interface SpectrumChartProps {
  spectrum: number[]
  maxFreq?: number
}

function SpectrumChart({ spectrum, maxFreq = 2000 }: SpectrumChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const prevSpectrumRef = useRef<number[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const draw = () => {
      const width = canvas.width
      const height = canvas.height
      const padding = { top: 30, right: 20, bottom: 40, left: 50 }
      const chartWidth = width - padding.left - padding.right
      const chartHeight = height - padding.top - padding.bottom

      ctx.clearRect(0, 0, width, height)

      const gradient = ctx.createLinearGradient(0, 0, 0, height)
      gradient.addColorStop(0, 'rgba(26, 26, 46, 0.9)')
      gradient.addColorStop(1, 'rgba(22, 33, 62, 0.9)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      ctx.strokeStyle = 'rgba(201, 169, 110, 0.15)'
      ctx.lineWidth = 1

      for (let i = 0; i <= 5; i++) {
        const y = padding.top + (chartHeight / 5) * i
        ctx.beginPath()
        ctx.moveTo(padding.left, y)
        ctx.lineTo(width - padding.right, y)
        ctx.stroke()

        const dbValue = (1 - i / 5) * 60
        ctx.fillStyle = 'rgba(201, 169, 110, 0.6)'
        ctx.font = '11px "Noto Sans SC", sans-serif'
        ctx.textAlign = 'right'
        ctx.fillText(`${dbValue.toFixed(0)} dB`, padding.left - 8, y + 4)
      }

      for (let i = 0; i <= 5; i++) {
        const x = padding.left + (chartWidth / 5) * i
        const freqValue = (maxFreq / 5) * i
        ctx.fillStyle = 'rgba(201, 169, 110, 0.6)'
        ctx.font = '11px "Noto Sans SC", sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(`${freqValue.toFixed(0)} Hz`, x, height - padding.bottom + 20)
      }

      const barCount = Math.min(spectrum.length, 128)
      const barWidth = chartWidth / barCount - 1

      const currentSpectrum = spectrum.slice(0, barCount)
      const prevSpectrum = prevSpectrumRef.current

      if (prevSpectrum.length !== barCount) {
        prevSpectrumRef.current = new Array(barCount).fill(0)
      }

      const smoothSpectrum = currentSpectrum.map((val, i) => {
        const prev = prevSpectrum[i] || 0
        return prev + (val - prev) * 0.15
      })

      prevSpectrumRef.current = smoothSpectrum

      for (let i = 0; i < barCount; i++) {
        const value = Math.max(0, Math.min(1, smoothSpectrum[i]))
        const barHeight = value * chartHeight
        const x = padding.left + i * (barWidth + 1)
        const y = padding.top + chartHeight - barHeight

        const barGradient = ctx.createLinearGradient(0, y, 0, y + barHeight)
        barGradient.addColorStop(0, '#d4b87a')
        barGradient.addColorStop(0.5, '#c9a96e')
        barGradient.addColorStop(1, '#a68b52')

        ctx.fillStyle = barGradient
        ctx.fillRect(x, y, barWidth, barHeight)

        if (barHeight > 2) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
          ctx.fillRect(x, y, barWidth, 2)
        }
      }

      ctx.strokeStyle = 'rgba(201, 169, 110, 0.5)'
      ctx.lineWidth = 1
      ctx.strokeRect(
        padding.left,
        padding.top,
        chartWidth,
        chartHeight
      )

      ctx.fillStyle = 'rgba(201, 169, 110, 0.8)'
      ctx.font = 'bold 13px "Noto Serif SC", serif'
      ctx.textAlign = 'center'
      ctx.fillText('FFT 频谱图', width / 2, 20)

      animationRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [spectrum, maxFreq])

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={250}
      className="w-full h-full"
    />
  )
}

export default SpectrumChart
