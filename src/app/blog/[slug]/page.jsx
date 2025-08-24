'use client'
// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { CalendarDays, Clock, User, ArrowLeft, Share2 } from 'lucide-react'
import { getPostBySlug, getAllPostSlugs, urlFor, formatDate, calculateReadingTime } from '@/lib/sanity'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShareButton } from '@/components/ShareButton'
import { RelatedPosts } from '@/components/RelatedPosts'
import { PortableTextComponents } from '@/components/PortableTextComponents'
import { motion } from 'framer-motion'
import { useEffect, useState, Suspense } from 'react'
import dynamic from 'next/dynamic'

// Dynamic imports for components
const Navbar = dynamic(() => import('@/components/helperComponents/Navbar'), {
  loading: () => (
    <div className="fixed w-full top-0 z-50 bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-slate-700/50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <div className="animate-pulse bg-slate-700 h-12 w-32 rounded"></div>
        <div className="hidden md:flex space-x-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse bg-slate-700 h-4 w-16 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  ),
  ssr: true
})

const Footer = dynamic(() => import('@/components/helperComponents/Footer'), {
  loading: () => (
    <div className="bg-slate-900 py-8">
      <div className="container mx-auto px-6">
        <div className="animate-pulse bg-slate-700 h-4 w-32 rounded mx-auto"></div>
      </div>
    </div>
  ),
  ssr: true
})

export default function BlogPostPage({ params }) {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getPostBySlug(params.slug)
        if (!postData) {
          setError('Post not found')
          return
        }
        setPost(postData)
      } catch (err) {
        console.error('Error fetching post:', err)
        setError('Failed to load post')
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p>Loading post...</p>
        </div>
      </div>
    )
  }

  if (error || !post) {
    notFound()
  }

  const readingTime = calculateReadingTime(post.body)

  return (
    <>
      <Suspense fallback={
        <div className="fixed w-full top-0 z-50 bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-slate-700/50">
          <div className="container mx-auto flex justify-between items-center px-6 py-4">
            <div className="animate-pulse bg-slate-700 h-12 w-32 rounded"></div>
            <div className="hidden md:flex space-x-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse bg-slate-700 h-4 w-16 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      }>
        <Navbar />
      </Suspense>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
          >
            <source src="/assets/blackBackgroundAnimation.mp4" type="video/mp4" />
          </video>
          {/* Video Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-purple-900/40 to-slate-900/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 py-24">
          {/* Back Button */}
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/blog" prefetch={true}>
              <Button variant="ghost" className="pl-0 text-gray-300 hover:text-white hover:bg-purple-500/20">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </motion.div>

          {/* Article Header */}
          <motion.article 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((category) => (
                  <Badge
                    key={category._id}
                    variant="secondary"
                    className="bg-purple-600/80 text-white border-none backdrop-blur-sm"
                  >
                    {category.title}
                  </Badge>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">
              {post.title}
            </h1>

            {/* Post Meta */}
            <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{readingTime} min read</span>
              </div>

              {post.author && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author.name}</span>
                </div>
              )}
            </div>

            {/* Cover Image */}
            {post.coverImage && (
              <motion.div 
                className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Image
                  src={urlFor(post.coverImage).width(1200).height(600).url()}
                  alt={post.coverImage.alt || post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />
              </motion.div>
            )}

            {/* Excerpt */}
            {post.excerpt && (
              <motion.div 
                className="mb-8 p-6 bg-slate-800/30 rounded-lg border border-slate-700/50 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <p className="text-lg text-gray-300 italic leading-relaxed">
                  {post.excerpt}
                </p>
              </motion.div>
            )}

            {/* Article Content */}
            <motion.div 
              className="prose prose-lg prose-invert max-w-none mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <PortableText 
                value={post.body} 
                components={PortableTextComponents}
              />
            </motion.div>

            {/* Author Section */}
            {post.author && (
              <motion.div 
                className="border-t border-slate-700/50 pt-8 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  {post.author.image && (
                    <Image
                      src={urlFor(post.author.image).width(80).height(80).url()}
                      alt={post.author.name}
                      width={80}
                      height={80}
                      className="rounded-full"
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-semibold text-white">{post.author.name}</h3>
                    {post.author.bio && (
                      <p className="text-gray-400">{post.author.bio}</p>
                    )}
                  </div>
                </div>

                {/* Author Social Links */}
                {post.author.social && (
                  <div className="flex gap-4">
                    {post.author.social.twitter && (
                      <a
                        href={post.author.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </a>
                    )}
                    {post.author.social.linkedin && (
                      <a
                        href={post.author.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    )}
                    {post.author.social.github && (
                      <a
                        href={post.author.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-300 transition-colors"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                    {post.author.social.website && (
                      <a
                        href={post.author.social.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2 16l-4-4 1.414-1.414L10 14.172l7.586-7.586L19 8l-9 9z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* Share Button */}
            <motion.div 
              className="flex justify-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <ShareButton post={post} />
            </motion.div>
          </motion.article>

          {/* Related Posts */}
          <Suspense fallback={
            <div className="mt-16">
              <div className="animate-pulse bg-slate-700 h-8 w-48 rounded mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-slate-800/50 rounded-lg h-48 mb-4"></div>
                    <div className="space-y-2">
                      <div className="bg-slate-800/50 rounded h-4 w-3/4"></div>
                      <div className="bg-slate-800/50 rounded h-4 w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }>
            <RelatedPosts currentPost={post} />
          </Suspense>
        </div>
      </div>

      <Suspense fallback={
        <div className="bg-slate-900 py-8">
          <div className="container mx-auto px-6">
            <div className="animate-pulse bg-slate-700 h-4 w-32 rounded mx-auto"></div>
          </div>
        </div>
      }>
        <Footer />
      </Suspense>
    </>
  )
}