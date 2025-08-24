import { NextResponse } from 'next/server'
import { createPost } from '@/lib/sanity'

export async function POST(request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.title || !body.excerpt || !body.content) {
      return NextResponse.json(
        { error: 'Title, excerpt, and content are required' },
        { status: 400 }
      )
    }

    // Validate title length
    if (body.title.length < 5 || body.title.length > 100) {
      return NextResponse.json(
        { error: 'Title must be between 5 and 100 characters' },
        { status: 400 }
      )
    }

    // Validate excerpt length
    if (body.excerpt.length < 50 || body.excerpt.length > 300) {
      return NextResponse.json(
        { error: 'Excerpt must be between 50 and 300 characters' },
        { status: 400 }
      )
    }

    // Create the post with enhanced data
    const postData = {
      ...body,
      // Generate slug from title if not provided
      slug: body.slug || body.title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, ''),
      // Set publish date
      publishedAt: body.publishDate || new Date().toISOString(),
      // Calculate reading time if not provided
      readingTime: body.readingTime || Math.ceil(body.content.split(' ').length / 200)
    }

    const post = await createPost(postData)
    
    return NextResponse.json(
      { 
        message: 'Post created successfully', 
        post 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'Failed to create post: ' + error.message },
      { status: 500 }
    )
  }
}
