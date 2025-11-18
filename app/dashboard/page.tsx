'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import KPICard from '@/components/KPICard'
import AnalyticsChart from '@/components/AnalyticsChart'
import { KPI } from '@/lib/types'
import { BarChart3, Users, Upload, Download, Eye, TrendingUp } from 'lucide-react'

export default function DashboardPage() {
  const [kpis, setKPIs] = useState<KPI[]>([])

  useEffect(() => {
    // Mock KPI data - replace with API call
    const mockKPIs: KPI[] = [
      {
        id: '1',
        name: 'Total Views',
        value: '2.4M',
        change: 12.5,
        trend: 'up',
        icon: '👁️',
      },
      {
        id: '2',
        name: 'Downloads',
        value: '145K',
        change: 8.2,
        trend: 'up',
        icon: '⬇️',
      },
      {
        id: '3',
        name: 'Uploads',
        value: '3.2K',
        change: -2.4,
        trend: 'down',
        icon: '⬆️',
      },
      {
        id: '4',
        name: 'Active Users',
        value: '89K',
        change: 15.7,
        trend: 'up',
        icon: '👥',
      },
      {
        id: '5',
        name: 'Engagement Rate',
        value: '73%',
        change: 5.3,
        trend: 'up',
        icon: '💫',
      },
      {
        id: '6',
        name: 'Growth Rate',
        value: '24%',
        change: 3.1,
        trend: 'up',
        icon: '📈',
      },
    ]
    setKPIs(mockKPIs)
  }, [])

  // Mock chart data
  const viewsData = [
    { name: 'Jan', value: 400000 },
    { name: 'Feb', value: 500000 },
    { name: 'Mar', value: 650000 },
    { name: 'Apr', value: 800000 },
    { name: 'May', value: 1200000 },
    { name: 'Jun', value: 1800000 },
    { name: 'Jul', value: 2400000 },
  ]

  const downloadsData = [
    { name: 'Jan', value: 20000 },
    { name: 'Feb', value: 35000 },
    { name: 'Mar', value: 45000 },
    { name: 'Apr', value: 60000 },
    { name: 'May', value: 85000 },
    { name: 'Jun', value: 110000 },
    { name: 'Jul', value: 145000 },
  ]

  const uploadsData = [
    { name: 'Jan', value: 500 },
    { name: 'Feb', value: 800 },
    { name: 'Mar', value: 1200 },
    { name: 'Apr', value: 1600 },
    { name: 'May', value: 2200 },
    { name: 'Jun', value: 2800 },
    { name: 'Jul', value: 3200 },
  ]

  const usersData = [
    { name: 'Jan', value: 10000 },
    { name: 'Feb', value: 20000 },
    { name: 'Mar', value: 35000 },
    { name: 'Apr', value: 48000 },
    { name: 'May', value: 62000 },
    { name: 'Jun', value: 75000 },
    { name: 'Jul', value: 89000 },
  ]

  return (
    <main>
      <Navigation />
      <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-5xl font-bold mb-4">
              <span className="gradient-text">Analytics Dashboard</span>
            </h1>
            <p className="text-xl text-gray-400">
              Real-time insights and performance metrics
            </p>
          </motion.div>

          {/* KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {kpis.map((kpi, index) => (
              <KPICard key={kpi.id} kpi={kpi} index={index} />
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            <AnalyticsChart
              title="Total Views Over Time"
              data={viewsData}
              color="#00f0ff"
              type="area"
            />
            <AnalyticsChart
              title="Downloads Trend"
              data={downloadsData}
              color="#bf00ff"
              type="area"
            />
            <AnalyticsChart
              title="Uploads Growth"
              data={uploadsData}
              color="#ff00f7"
              type="line"
            />
            <AnalyticsChart
              title="Active Users"
              data={usersData}
              color="#00ff88"
              type="line"
            />
          </div>

          {/* AI Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-effect rounded-xl p-8 neon-border"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-gradient-to-br from-neon-purple/20 to-neon-pink/20">
                <TrendingUp className="w-6 h-6 text-neon-purple" />
              </div>
              <h2 className="text-2xl font-bold gradient-text">
                AI-Powered Recommendations
              </h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-dark-800 border border-neon-blue/20">
                <h3 className="font-semibold text-neon-blue mb-2">
                  📊 Optimize Upload Schedule
                </h3>
                <p className="text-gray-400 text-sm">
                  Your audience is most active between 2 PM - 6 PM EST. Consider uploading during these peak hours to maximize engagement by up to 35%.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-dark-800 border border-neon-purple/20">
                <h3 className="font-semibold text-neon-purple mb-2">
                  🎨 Trending Art Styles
                </h3>
                <p className="text-gray-400 text-sm">
                  Abstract and cyberpunk themes are trending this week with 45% more engagement. Consider featuring similar artworks in your gallery.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-dark-800 border border-neon-green/20">
                <h3 className="font-semibold text-neon-green mb-2">
                  💡 User Retention Strategy
                </h3>
                <p className="text-gray-400 text-sm">
                  Implement a weekly featured artist program to increase user retention by an estimated 28% based on similar platform analytics.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-dark-800 border border-neon-yellow/20">
                <h3 className="font-semibold text-neon-yellow mb-2">
                  🚀 Performance Optimization
                </h3>
                <p className="text-gray-400 text-sm">
                  Enable image compression and CDN caching to reduce load times by 40% and improve user experience significantly.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
