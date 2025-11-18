'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useArtworkStore } from '@/stores/artworkStore'
import ArtworkCard from './ArtworkCard'
import ArtworkDetailModal from './ArtworkDetailModal'
import FilterBar from './FilterBar'
import { Artwork } from '@/lib/types'

export default function Gallery() {
  const { filteredArtworks, setArtworks, selectArtwork, selectedArtwork } = useArtworkStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading artworks - replace with actual API call
    const loadArtworks = async () => {
      setIsLoading(true)

      // Mock data - replace with API call
      const mockArtworks: Artwork[] = Array.from({ length: 12 }, (_, i) => ({
        id: `artwork-${i}`,
        title: `AI Masterpiece ${i + 1}`,
        description: `An incredible AI-generated artwork exploring themes of digital consciousness and synthetic beauty.`,
        imageUrl: `https://picsum.photos/seed/${i}/800/800`,
        artist: `AI Artist ${i % 3 + 1}`,
        aiModel: ['DALL-E 3', 'Midjourney', 'Stable Diffusion'][i % 3],
        prompt: 'A stunning digital artwork with vibrant colors and abstract shapes',
        createdAt: new Date(Date.now() - i * 86400000),
        likes: Math.floor(Math.random() * 1000),
        downloads: Math.floor(Math.random() * 500),
        tags: ['digital art', 'AI generated', 'abstract', 'colorful'].slice(0, Math.floor(Math.random() * 4) + 1),
        resolution: {
          width: 1024,
          height: 1024,
        },
      }))

      setArtworks(mockArtworks)
      setIsLoading(false)
    }

    loadArtworks()
  }, [setArtworks])

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="gradient-text">AI Art Museum</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore an infinite gallery of AI-generated masterpieces.
            Upload, download, and discover the future of digital art.
          </p>
        </motion.div>

        {/* Filter Bar */}
        <FilterBar />

        {/* Gallery Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl glass-effect animate-pulse"
              />
            ))}
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredArtworks.map((artwork) => (
                <ArtworkCard
                  key={artwork.id}
                  artwork={artwork}
                  onClick={() => selectArtwork(artwork)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && filteredArtworks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-2xl text-gray-400">No artworks found</p>
            <p className="text-gray-500 mt-2">Try adjusting your filters</p>
          </motion.div>
        )}
      </div>

      {/* Artwork Detail Modal */}
      {selectedArtwork && (
        <ArtworkDetailModal
          artwork={selectedArtwork}
          onClose={() => selectArtwork(null)}
        />
      )}
    </div>
  )
}
