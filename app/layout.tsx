import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Museum - Gallery of AI-Generated Art',
  description: 'Explore, upload, and download AI-generated artwork in a modern museum-like experience. Powered by advanced AI business intelligence.',
  keywords: ['AI art', 'museum', 'gallery', 'AI platform', 'business intelligence'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-dark-900">
        {children}
      </body>
    </html>
  )
}
