import { create } from 'zustand'
import { AnalyticsData, KPI } from '@/lib/types'

interface AnalyticsStore {
  analytics: AnalyticsData | null
  kpis: KPI[]
  isLoading: boolean
  setAnalytics: (analytics: AnalyticsData) => void
  setKPIs: (kpis: KPI[]) => void
  setLoading: (loading: boolean) => void
  refreshAnalytics: () => Promise<void>
}

export const useAnalyticsStore = create<AnalyticsStore>((set) => ({
  analytics: null,
  kpis: [],
  isLoading: false,

  setAnalytics: (analytics) => set({ analytics }),
  setKPIs: (kpis) => set({ kpis }),
  setLoading: (loading) => set({ isLoading: loading }),

  refreshAnalytics: async () => {
    set({ isLoading: true })
    try {
      // Simulated API call - replace with actual API
      const response = await fetch('/api/analytics')
      const data = await response.json()
      set({ analytics: data.analytics, kpis: data.kpis })
    } catch (error) {
      console.error('Failed to refresh analytics:', error)
    } finally {
      set({ isLoading: false })
    }
  },
}))
