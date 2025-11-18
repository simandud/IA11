'use client'

import { useArtworkStore } from '@/stores/artworkStore'
import { SlidersHorizontal, Search } from 'lucide-react'
import { useState } from 'react'

export default function FilterBar() {
  const { filter, setFilter } = useArtworkStore()
  const [searchTerm, setSearchTerm] = useState('')

  const aiModels = ['DALL-E 3', 'Midjourney', 'Stable Diffusion']
  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'downloads', label: 'Most Downloaded' },
  ] as const

  return (
    <div className="mb-8 glass-effect rounded-xl p-6 border border-neon-blue/20">
      <div className="flex items-center gap-4 mb-4">
        <SlidersHorizontal className="w-5 h-5 text-neon-blue" />
        <h3 className="text-lg font-semibold text-neon-blue">Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search artworks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-gray-700 rounded-lg focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20"
          />
        </div>

        {/* AI Model Filter */}
        <select
          value={filter.aiModel || ''}
          onChange={(e) => setFilter({ aiModel: e.target.value || null })}
          className="px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg focus:border-neon-purple focus:outline-none focus:ring-2 focus:ring-neon-purple/20 cursor-pointer"
        >
          <option value="">All AI Models</option>
          {aiModels.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>

        {/* Sort By */}
        <select
          value={filter.sortBy}
          onChange={(e) =>
            setFilter({ sortBy: e.target.value as typeof filter.sortBy })
          }
          className="px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg focus:border-neon-pink focus:outline-none focus:ring-2 focus:ring-neon-pink/20 cursor-pointer"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
