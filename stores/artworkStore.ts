import { create } from 'zustand'
import { Artwork } from '@/lib/types'

interface ArtworkStore {
  artworks: Artwork[]
  filteredArtworks: Artwork[]
  selectedArtwork: Artwork | null
  filter: {
    tags: string[]
    aiModel: string | null
    sortBy: 'recent' | 'popular' | 'downloads'
  }
  setArtworks: (artworks: Artwork[]) => void
  addArtwork: (artwork: Artwork) => void
  selectArtwork: (artwork: Artwork | null) => void
  setFilter: (filter: Partial<ArtworkStore['filter']>) => void
  applyFilters: () => void
}

export const useArtworkStore = create<ArtworkStore>((set, get) => ({
  artworks: [],
  filteredArtworks: [],
  selectedArtwork: null,
  filter: {
    tags: [],
    aiModel: null,
    sortBy: 'recent',
  },

  setArtworks: (artworks) => {
    set({ artworks, filteredArtworks: artworks })
  },

  addArtwork: (artwork) => {
    set((state) => ({
      artworks: [artwork, ...state.artworks],
      filteredArtworks: [artwork, ...state.filteredArtworks],
    }))
  },

  selectArtwork: (artwork) => {
    set({ selectedArtwork: artwork })
  },

  setFilter: (filter) => {
    set((state) => ({
      filter: { ...state.filter, ...filter },
    }))
    get().applyFilters()
  },

  applyFilters: () => {
    const { artworks, filter } = get()
    let filtered = [...artworks]

    // Filter by tags
    if (filter.tags.length > 0) {
      filtered = filtered.filter((artwork) =>
        filter.tags.some((tag) => artwork.tags.includes(tag))
      )
    }

    // Filter by AI model
    if (filter.aiModel) {
      filtered = filtered.filter((artwork) => artwork.aiModel === filter.aiModel)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (filter.sortBy) {
        case 'popular':
          return b.likes - a.likes
        case 'downloads':
          return b.downloads - a.downloads
        case 'recent':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })

    set({ filteredArtworks: filtered })
  },
}))
