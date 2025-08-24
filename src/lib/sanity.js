// lib/sanity.js
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Sanity client configuration
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

if (!projectId) {
  throw new Error(
    'NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Please add it to your .env.local file. ' +
    'You can get your project ID from your Sanity project settings.'
  )
}

// Validate project ID format
if (!/^[a-z0-9-]+$/.test(projectId)) {
  throw new Error(
    `Invalid Sanity project ID: "${projectId}". Project ID can only contain lowercase letters (a-z), numbers (0-9), and dashes.`
  )
}

export const client = createClient({
  projectId: projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production
  apiVersion: '2023-12-01', // Use current date for best performance
  // Add token for write operations (if needed later)
  // token: process.env.SANITY_API_TOKEN,
})

// Create a write client for mutations
export const writeClient = createClient({
  projectId: projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false, // Never use CDN for mutations
  apiVersion: '2023-12-01',
  token: process.env.SANITY_API_TOKEN, // Server-side only token
  perspective: 'published'
})

// Image URL builder
const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

// GROQ Queries
export const postQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    coverImage,
    excerpt,
    publishedAt,
    categories[]->{
      _id,
      title,
      slug,
      color
    },
    tags,
    featured,
    readingTime,
    _createdAt,
    _updatedAt
  }
`

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      bio,
      social
    },
    coverImage,
    excerpt,
    publishedAt,
    content,
    categories[]->{
      _id,
      title,
      slug,
      color
    },
    tags,
    featured,
    readingTime,
    _createdAt,
    _updatedAt
  }
`

export const featuredPostsQuery = `
  *[_type == "post" && featured == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image
    },
    coverImage,
    excerpt,
    publishedAt,
    categories[]->{
      _id,
      title,
      slug,
      color
    },
    tags,
    readingTime
  }
`

export const recentPostsQuery = `
  *[_type == "post"] | order(publishedAt desc)[0...6] {
    _id,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image
    },
    coverImage,
    excerpt,
    publishedAt,
    categories[]->{
      _id,
      title,
      slug,
      color
    },
    tags,
    readingTime
  }
`

export const postSlugsQuery = `
  *[_type == "post" && defined(slug.current)][].slug.current
`

// Helper functions for fetching data
export async function getAllPosts() {
  return await client.fetch(postQuery)
}

export async function getPostBySlug(slug) {
  return await client.fetch(postBySlugQuery, { slug })
}

export async function getFeaturedPosts() {
  return await client.fetch(featuredPostsQuery)
}

export async function getRecentPosts() {
  return await client.fetch(recentPostsQuery)
}

export async function getAllPostSlugs() {
  return await client.fetch(postSlugsQuery)
}

// Search functionality
export async function searchPosts(searchTerm) {
  const searchQuery = `
    *[_type == "post" && (
      title match $searchTerm + "*" ||
      excerpt match $searchTerm + "*" ||
      $searchTerm in tags
    )] | order(publishedAt desc) {
      _id,
      title,
      slug,
      author->{
        _id,
        name,
        slug,
        image
      },
      coverImage,
      excerpt,
      publishedAt,
      categories[]->{
        _id,
        title,
        slug,
        color
      },
      tags,
      readingTime
    }
  `
  return await client.fetch(searchQuery, { searchTerm })
}

// Utility function to format dates
export function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Utility function to calculate reading time if not provided
export function calculateReadingTime(content) {
  if (!content) return 0
  
  const wordsPerMinute = 200
  let wordCount = 0
  
  content.forEach(block => {
    if (block._type === 'block' && block.children) {
      block.children.forEach((child) => {
        if (child.text) {
          wordCount += child.text.split(' ').length
        }
      })
    }
  })
  
  return Math.ceil(wordCount / wordsPerMinute)
}

// Function to create a new blog post
export async function createPost(postData) {
  try {
    // Check if we have a token
    if (!process.env.SANITY_API_TOKEN) {
      throw new Error('SANITY_API_TOKEN is not configured')
    }

    console.log('Creating post with token length:', process.env.SANITY_API_TOKEN?.length)

    // Convert plain text content to Portable Text format
    const portableTextContent = [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: postData.content
          }
        ]
      }
    ]

    // Get or create default author
    const authorId = await getDefaultAuthor()

    // Create the post document with enhanced fields
    const post = await writeClient.create({
      _type: 'post',
      title: postData.title,
      slug: {
        _type: 'slug',
        current: postData.slug || postData.title.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      },
      excerpt: postData.excerpt,
      content: portableTextContent,
      publishedAt: postData.publishedAt || new Date().toISOString(),
      tags: postData.tags || [],
      categories: postData.categories ? postData.categories.map(cat => ({
        _type: 'reference',
        _ref: cat // This assumes categories exist in Sanity, you might need to create them first
      })) : [],
      featured: postData.featured || false,
      readingTime: postData.readingTime || calculateReadingTime(portableTextContent),
      author: { _type: 'reference', _ref: authorId },
      // Add SEO fields if they exist
      ...(postData.seoTitle && { seoTitle: postData.seoTitle }),
      ...(postData.seoDescription && { seoDescription: postData.seoDescription })
    })

    return post
  } catch (error) {
    console.error('Error creating post:', error)
    throw error
  }
}

// Function to get all authors (for author selection)
export async function getAllAuthors() {
  const query = `
    *[_type == "author"] {
      _id,
      name,
      slug,
      image,
      bio
    }
  `
  return await client.fetch(query)
}

// Function to get or create a default author
export async function getDefaultAuthor() {
  try {
    // First, try to find an existing author
    const authors = await getAllAuthors()
    if (authors.length > 0) {
      return authors[0]._id
    }

    // If no authors exist, create a default author
    const defaultAuthor = await writeClient.create({
      _type: 'author',
      name: 'Udit Kumar Tiwari',
      slug: {
        _type: 'slug',
        current: 'udit-kumar-tiwari'
      },
      bio: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Full-stack developer and tech enthusiast. Passionate about creating innovative web solutions and sharing knowledge through writing.'
            }
          ]
        }
      ]
    })

    return defaultAuthor._id
  } catch (error) {
    console.error('Error getting default author:', error)
    throw error
  }
}