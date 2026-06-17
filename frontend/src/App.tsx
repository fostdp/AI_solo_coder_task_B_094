import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useWebSocket } from './hooks/useWebSocket'
import { useAppStore } from './store/appStore'
import { fetchStones, fetchActiveAlerts } from './utils/api'
import Sidebar from './components/Sidebar'
import AlertBanner from './components/AlertBanner'
import VisualizationPage from './pages/VisualizationPage'
import DashboardPage from './pages/DashboardPage'
import SimulationPage from './pages/SimulationPage'

function App() {
  useWebSocket()
  const { setStones, setActiveAlerts, activeAlerts } = useAppStore()

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const stonesData = await fetchStones()
        setStones(stonesData)
      } catch (e) {
        console.error('Failed to load stones:', e)
      }

      try {
        const alerts = await fetchActiveAlerts()
        setActiveAlerts(alerts)
      } catch (e) {
        console.error('Failed to load alerts:', e)
      }
    }

    loadInitialData()
  }, [setStones, setActiveAlerts])

  const importantAlerts = activeAlerts.filter(a => a.cents_deviation > 10)

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gradient-to-br from-deep-indigo via-dark-indigo to-deep-indigo">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {importantAlerts.length > 0 && (
          <AlertBanner alerts={importantAlerts} />
        )}
        
        <main className="flex-1 overflow-auto p-6">
          <Routes>
            <Route path="/" element={<VisualizationPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/simulation" element={<SimulationPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
