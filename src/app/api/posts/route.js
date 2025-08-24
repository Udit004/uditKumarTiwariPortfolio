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

    // Create the post
    const post = await createPost(body)
    
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
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
