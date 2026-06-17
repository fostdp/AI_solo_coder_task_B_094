import { useEffect, useRef, useCallback } from 'react'
import { useAppStore } from '../store/appStore'
import type { WSMessage } from '../types'

export function useWebSocket() {
  const wsRef = useRef<WebSocket | null>(null)
  const { setWsConnected, setLatestReading, addAlert, setOptimizationProgress, setIsOptimizing } = useAppStore()

  const connect = useCallback(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
    const wsUrl = `${protocol}//${window.location.host}/ws`

    try {
      const ws = new WebSocket(wsUrl)

      ws.onopen = () => {
        console.log('WebSocket connected')
        setWsConnected(true)
      }

      ws.onmessage = (event) => {
        try {
          const msg: WSMessage = JSON.parse(event.data)

          if (msg.type === 'sensor') {
            const reading = msg.data as any
            setLatestReading(reading.stone_id, reading)
          } else if (msg.type === 'alert') {
            const alert = msg.data as any
            addAlert(alert)
          } else if (msg.type === 'optimization_progress') {
            const progress = msg.data as any
            setOptimizationProgress({
              iteration: progress.iteration,
              freq: progress.freq,
              loss: progress.loss,
            })
          }
        } catch (e) {
          console.error('Failed to parse WS message', e)
        }
      }

      ws.onclose = () => {
        console.log('WebSocket disconnected, reconnecting...')
        setWsConnected(false)
        setIsOptimizing(false)
        setTimeout(connect, 3000)
      }

      ws.onerror = (err) => {
        console.error('WebSocket error', err)
      }

      wsRef.current = ws
    } catch (e) {
      console.error('Failed to connect WS', e)
      setTimeout(connect, 5000)
    }
  }, [setWsConnected, setLatestReading, addAlert, setOptimizationProgress, setIsOptimizing])

  useEffect(() => {
    connect()
    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [connect])

  const send = useCallback((data: unknown) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data))
    }
  }, [])

  return { send, wsRef }
}
