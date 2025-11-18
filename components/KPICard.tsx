'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { KPI } from '@/lib/types'

interface KPICardProps {
  kpi: KPI
  index: number
}

export default function KPICard({ kpi, index }: KPICardProps) {
  const getTrendIcon = () => {
    switch (kpi.trend) {
      case 'up':
        return <TrendingUp className="w-5 h-5 text-neon-green" />
      case 'down':
        return <TrendingDown className="w-5 h-5 text-neon-pink" />
      default:
        return <Minus className="w-5 h-5 text-gray-500" />
    }
  }

  const getTrendColor = () => {
    switch (kpi.trend) {
      case 'up':
        return 'text-neon-green'
      case 'down':
        return 'text-neon-pink'
      default:
        return 'text-gray-500'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-effect rounded-xl p-6 neon-border hover:shadow-lg hover:shadow-neon-blue/20 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-lg bg-gradient-to-br from-neon-blue/20 to-neon-purple/20">
          <span className="text-2xl">{kpi.icon}</span>
        </div>
        {getTrendIcon()}
      </div>

      <h3 className="text-sm text-gray-400 mb-2">{kpi.name}</h3>
      <p className="text-3xl font-bold mb-2 gradient-text">{kpi.value}</p>

      <div className="flex items-center gap-2">
        <span className={`text-sm font-semibold ${getTrendColor()}`}>
          {kpi.change > 0 ? '+' : ''}
          {kpi.change}%
        </span>
        <span className="text-xs text-gray-500">vs last month</span>
      </div>
    </motion.div>
  )
}
