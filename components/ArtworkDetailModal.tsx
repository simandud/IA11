'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Heart, Share2, Info } from 'lucide-react'
import { Artwork } from '@/lib/types'
import Image from 'next/image'
import { useState } from 'react'

interface ArtworkDetailModalProps {
  artwork: Artwork
  onClose: () => void
}

export default function ArtworkDetailModal({ artwork, onClose }: ArtworkDetailModalProps) {
  const [liked, setLiked] = useState(false)

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = artwork.imageUrl
    link.download = `${artwork.title}.jpg`
    link.click()
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative max-w-6xl w-full max-h-[90vh] overflow-auto glass-effect rounded-2xl neon-border"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-dark-900/80 hover:bg-neon-pink/20 hover:text-neon-pink transition-all"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="grid md:grid-cols-2 gap-6 p-6">
            {/* Image */}
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <Image
                src={artwork.imageUrl}
                alt={artwork.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col">
              <h2 className="text-3xl font-bold mb-2 gradient-text">
                {artwork.title}
              </h2>
              <p className="text-gray-400 mb-4">by {artwork.artist}</p>

              <div className="flex gap-3 mb-6">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    liked ? 'bg-neon-pink/20 text-neon-pink' : 'bg-dark-800'
                  } hover:bg-neon-pink/20 hover:text-neon-pink transition-all`}
                >
                  <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                  <span>{artwork.likes + (liked ? 1 : 0)}</span>
                </button>

                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition-all"
                >
                  <Download className="w-5 h-5" />
                  <span>Download</span>
                </button>

                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-800 hover:bg-neon-purple/20 hover:text-neon-purple transition-all">
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>

              <div className="space-y-4 flex-grow">
                <div>
                  <h3 className="text-sm font-semibold text-neon-blue mb-2 flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    Description
                  </h3>
                  <p className="text-gray-300">{artwork.description}</p>
                </div>

                {artwork.prompt && (
                  <div>
                    <h3 className="text-sm font-semibold text-neon-purple mb-2">
                      AI Prompt
                    </h3>
                    <p className="text-gray-400 italic text-sm bg-dark-800 p-3 rounded-lg">
                      "{artwork.prompt}"
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-neon-green mb-1">
                      AI Model
                    </h3>
                    <p className="text-gray-300">{artwork.aiModel}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-neon-yellow mb-1">
                      Resolution
                    </h3>
                    <p className="text-gray-300">
                      {artwork.resolution.width} x {artwork.resolution.height}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-neon-pink mb-1">
                      Created
                    </h3>
                    <p className="text-gray-300">
                      {new Date(artwork.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-neon-blue mb-1">
                      Downloads
                    </h3>
                    <p className="text-gray-300">{artwork.downloads}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-neon-purple mb-2">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {artwork.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm rounded-full bg-neon-purple/10 text-neon-purple border border-neon-purple/20"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
