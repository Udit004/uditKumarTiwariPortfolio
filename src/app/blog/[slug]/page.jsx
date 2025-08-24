'use client'
// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { CalendarDays, Clock, User, ArrowLeft, Share2 } from 'lucide-react'
import { getPostBySlug, getAllPostSlugs, urlFor, formatDate, calculateReadingTime } from '@/lib/sanity'
import Navbar from '@/components/helperComponents/Navbar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShareButton } from '@/components/ShareButton'
import { RelatedPosts } from '@/components/RelatedPosts'
import { PortableTextComponents } from '@/components/PortableTextComponents'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Footer from '@/components/helperComponents/Footer'


export default function BlogPostPage({ params }) {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { slug } = params
        const postData = await getPostBySlug(slug)
        
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
  }, [params])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white text-xl">Post not found</div>
        </div>
      </div>
    )
  }

  const readingTime = post.readingTime || calculateReadingTime(post.content)

  return (
    <>
      <Navbar />
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

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl"
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -50, 30, 0],
              scale: [1, 1.3, 0.8, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ top: "10%", left: "10%" }}
          />
          <motion.div
            className="absolute w-80 h-80 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, -80, 40, 0],
              y: [0, 60, -20, 0],
              scale: [1, 0.7, 1.1, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ bottom: "20%", right: "10%" }}
          />
        </div>

        <main className="relative z-10 container mx-auto px-4 py-20">
        {/* Back Button */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/blog">
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
              {post.author.image && (
                <div className="relative h-8 w-8 rounded-full overflow-hidden border-2 border-purple-500/30">
                  <Image
                    src={urlFor(post.author.image).width(32).height(32).url()}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{post.author.name}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{readingTime} min read</span>
            </div>
            <ShareButton post={post} />
          </div>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden mb-8 border border-slate-700/50">
              <Image
                src={urlFor(post.coverImage).width(1200).height(600).url()}
                alt={post.coverImage.alt || post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>
          )}

          {/* Excerpt */}
          <div className="text-xl text-gray-300 leading-relaxed mb-8 p-4 border-l-4 border-purple-500 bg-slate-800/30 rounded-r-lg backdrop-blur-sm">
            {post.excerpt}
          </div>

          {/* Content */}
          <div className="blog-content mb-12 text-gray-300">
            <PortableText 
              value={post.content} 
              components={PortableTextComponents}
            />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3 text-white">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="border-purple-500/30 text-purple-300 bg-purple-500/10">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio */}
          <div className="border-t border-slate-700/50 pt-8 mb-12">
            <div className="flex items-start gap-4">
              {post.author.image && (
                <div className="relative h-16 w-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-purple-500/30">
                  <Image
                    src={urlFor(post.author.image).width(64).height(64).url()}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2 text-white">{post.author.name}</h3>
                {post.author.bio && (
                  <div className="text-gray-300 mb-3">
                    <PortableText value={post.author.bio} />
                  </div>
                )}
                {post.author.social && (
                  <div className="flex gap-4 text-sm">
                    {post.author.social.twitter && (
                      <a 
                        href={post.author.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 hover:underline transition-colors"
                      >
                        Twitter
                      </a>
                    )}
                    {post.author.social.linkedin && (
                      <a 
                        href={post.author.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 hover:underline transition-colors"
                      >
                        LinkedIn
                      </a>
                    )}
                    {post.author.social.github && (
                      <a 
                        href={post.author.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 hover:underline transition-colors"
                      >
                        GitHub
                      </a>
                    )}
                    {post.author.social.website && (
                      <a 
                        href={post.author.social.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 hover:underline transition-colors"
                      >
                        Website
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.article>

        {/* Related Posts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <RelatedPosts currentPost={post} />
        </motion.div>
        </main>
      </div>
      <Footer />
    </>
  )
}