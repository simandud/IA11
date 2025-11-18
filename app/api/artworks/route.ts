import { NextRequest, NextResponse } from 'next/server'
import { Artwork } from '@/lib/types'

// Mock database - replace with actual database connection
let artworks: Artwork[] = []

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const aiModel = searchParams.get('aiModel')
    const sortBy = searchParams.get('sortBy') || 'recent'
    const limit = parseInt(searchParams.get('limit') || '50')

    let filtered = [...artworks]

    // Filter by AI model
    if (aiModel) {
      filtered = filtered.filter((artwork) => artwork.aiModel === aiModel)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.likes - a.likes
        case 'downloads':
          return b.downloads - a.downloads
        case 'recent':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })

    // Limit results
    filtered = filtered.slice(0, limit)

    return NextResponse.json({
      success: true,
      data: filtered,
      total: artworks.length,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch artworks' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const { title, description, imageUrl, artist, aiModel } = body
    if (!title || !description || !imageUrl || !artist || !aiModel) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create new artwork
    const newArtwork: Artwork = {
      id: Date.now().toString(),
      title,
      description,
      imageUrl,
      artist,
      aiModel,
      prompt: body.prompt || '',
      createdAt: new Date(),
      likes: 0,
      downloads: 0,
      tags: body.tags || [],
      resolution: body.resolution || { width: 1024, height: 1024 },
    }

    artworks.push(newArtwork)

    return NextResponse.json({
      success: true,
      data: newArtwork,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create artwork' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Artwork ID required' },
        { status: 400 }
      )
    }

    const index = artworks.findIndex((artwork) => artwork.id === id)
    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Artwork not found' },
        { status: 404 }
      )
    }

    artworks.splice(index, 1)

    return NextResponse.json({
      success: true,
      message: 'Artwork deleted successfully',
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete artwork' },
      { status: 500 }
    )
  }
}
