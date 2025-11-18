'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Download, Eye } from 'lucide-react'
import { Artwork } from '@/lib/types'
import Image from 'next/image'

interface ArtworkCardProps {
  artwork: Artwork
  onClick: () => void
}

export default function ArtworkCard({ artwork, onClick }: ArtworkCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [liked, setLiked] = useState(false)

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    setLiked(!liked)
  }

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation()
    // Download functionality
    const link = document.createElement('a')
    link.href = artwork.imageUrl
    link.download = `${artwork.title}.jpg`
    link.click()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10 }}
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative aspect-square rounded-xl overflow-hidden neon-border">
        {/* Artwork Image */}
        <div className="relative w-full h-full bg-dark-800">
          <Image
            src={artwork.imageUrl}
            alt={artwork.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-4"
        >
          <h3 className="text-xl font-bold mb-1 neon-text text-neon-blue">
            {artwork.title}
          </h3>
          <p className="text-sm text-gray-300 mb-2">by {artwork.artist}</p>
          <div className="flex items-center justify-between">
            <div className="flex space-x-3">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-1 px-3 py-1 rounded-full ${
                  liked ? 'bg-neon-pink/20 text-neon-pink' : 'bg-white/10'
                } hover:bg-neon-pink/20 hover:text-neon-pink transition-all`}
              >
                <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                <span className="text-xs">{artwork.likes + (liked ? 1 : 0)}</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center space-x-1 px-3 py-1 rounded-full bg-white/10 hover:bg-neon-blue/20 hover:text-neon-blue transition-all"
              >
                <Download className="w-4 h-4" />
                <span className="text-xs">{artwork.downloads}</span>
              </button>
            </div>
            <div className="flex items-center space-x-1 text-gray-400">
              <Eye className="w-4 h-4" />
              <span className="text-xs">{artwork.aiModel}</span>
            </div>
          </div>
        </motion.div>

        {/* Glow effect */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none animate-glow rounded-xl" />
        )}
      </div>

      {/* Tags */}
      <div className="mt-3 flex flex-wrap gap-2">
        {artwork.tags.slice(0, 3).map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 text-xs rounded-full bg-neon-purple/10 text-neon-purple border border-neon-purple/20"
          >
            #{tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
