export interface Artwork {
  id: string
  title: string
  description: string
  imageUrl: string
  artist: string
  aiModel: string
  prompt?: string
  createdAt: Date
  likes: number
  downloads: number
  tags: string[]
  resolution: {
    width: number
    height: number
  }
}

export interface AnalyticsData {
  totalViews: number
  totalDownloads: number
  totalUploads: number
  activeUsers: number
  topArtworks: Artwork[]
  growthRate: number
  engagementRate: number
}

export interface KPI {
  id: string
  name: string
  value: number | string
  change: number
  trend: 'up' | 'down' | 'stable'
  icon: string
}

export interface BusinessAutomation {
  id: string
  name: string
  type: 'task' | 'workflow' | 'crm'
  status: 'active' | 'paused' | 'completed'
  progress: number
  lastRun?: Date
}

export interface ChatMessage {
  id: string
  sender: 'user' | 'ai' | 'support'
  message: string
  timestamp: Date
  avatar?: string
}

export interface UserPreferences {
  theme: 'dark' | 'light'
  notifications: boolean
  autoDownload: boolean
  quality: 'low' | 'medium' | 'high' | 'original'
}
