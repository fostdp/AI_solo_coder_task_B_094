import { NavLink } from 'react-router-dom'
import { useAppStore } from '../store/appStore'

const menuItems = [
  { path: '/', label: '编磬可视化', icon: '🎵' },
  { path: '/dashboard', label: '实时监测', icon: '📊' },
  { path: '/simulation', label: '仿真调音', icon: '⚙️' },
]

function Sidebar() {
  const { wsConnected } = useAppStore()

  return (
    <aside className="w-60 flex flex-col bg-gradient-to-b from-deep-indigo to-dark-indigo border-r border-bronze/30 shadow-lg">
      <div className="p-6 border-b border-bronze/30">
        <h1 className="text-xl font-serif font-bold text-bronze tracking-wide">
          曾侯乙编磬
        </h1>
        <p className="text-sm text-bronze/70 mt-1">声学系统</p>
      </div>

      <nav className="flex-1 py-6">
        <ul className="space-y-2 px-3">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-bronze/20 text-bronze border border-bronze/50 shadow-bronze-glow'
                      : 'text-gray-300 hover:bg-bronze/10 hover:text-bronze border border-transparent'
                  }`
                }
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-bronze/30">
        <div className="flex items-center gap-3 px-2">
          <div
            className={`w-3 h-3 rounded-full ${
              wsConnected ? 'bg-jade animate-pulse' : 'bg-gray-500'
            }`}
          />
          <span className={`text-sm ${wsConnected ? 'text-jade' : 'text-gray-500'}`}>
            {wsConnected ? '连接正常' : '连接断开'}
          </span>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
