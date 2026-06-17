import { useState, useEffect } from 'react'
import type { Alert } from '../types'

export interface AlertBannerProps {
  alerts: Alert[]
}

function AlertBanner({ alerts }: AlertBannerProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (alerts.length > 0) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        if (!isExpanded) {
          setIsVisible(false)
        }
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [alerts.length, isExpanded])

  if (alerts.length === 0) return null

  if (!isVisible && !isExpanded) {
    return (
      <button
        onClick={() => {
          setIsVisible(true)
          setIsExpanded(true)
        }}
        className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full bg-vermilion text-white flex items-center justify-center alert-pulse hover:scale-110 transition-transform"
      >
        <span className="text-lg font-bold">{alerts.length}</span>
      </button>
    )
  }

  return (
    <div
      className={`bg-vermilion/90 backdrop-blur-sm border-b border-vermilion/50 alert-pulse transition-all duration-300 ${
        isExpanded ? 'py-2' : 'py-3'
      }`}
    >
      <div
        className="px-6 flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <span className="font-bold text-white">
              {alerts.length} 个音准偏差警报
            </span>
            <span className="text-white/80 text-sm ml-3">
              偏差超过 10 音分
            </span>
          </div>
        </div>
        <span className="text-white/80 text-sm">
          {isExpanded ? '收起 ▲' : '展开 ▼'}
        </span>
      </div>

      {isExpanded && (
        <div className="px-6 pb-3 pt-2 max-h-48 overflow-y-auto">
          <ul className="space-y-2">
            {alerts.slice(0, 10).map((alert) => (
              <li
                key={alert.id}
                className="bg-black/20 rounded px-3 py-2 flex justify-between items-center"
              >
                <span className="text-white/90">{alert.message}</span>
                <span className="text-white font-mono">
                  {alert.cents_deviation.toFixed(1)} 音分
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default AlertBanner
