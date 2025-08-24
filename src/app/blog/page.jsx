'use client'
// app/blog/page.tsx
import { Suspense } from 'react'
import Link from 'next/link'
import { getAllPosts, getFeaturedPosts } from '@/lib/sanity'
import { BlogCard } from '@/components/ui/BlogCard'
import { BlogSearch } from '@/components/BlogSearch'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
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

// Loading component for Suspense
function BlogCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div 
          key={i} 
          className="animate-pulse"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="bg-slate-800/50 rounded-lg h-64 mb-4"></div>
          <div className="space-y-2">
            <div className="bg-slate-800/50 rounded h-4 w-3/4"></div>
            <div className="bg-slate-800/50 rounded h-4 w-1/2"></div>
            <div className="bg-slate-800/50 rounded h-4 w-full"></div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default function BlogPage() {
  const [allPosts, setAllPosts] = useState([])
  const [featuredPosts, setFeaturedPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch posts and featured posts in parallel
        const [posts, featured] = await Promise.all([
          getAllPosts(),
          getFeaturedPosts()
        ])
        
        setAllPosts(posts)
        setFeaturedPosts(featured)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  // Separate featured posts from regular posts
  const featuredPostIds = new Set(featuredPosts.map(post => post._id))
  const regularPosts = allPosts.filter(post => !featuredPostIds.has(post._id))

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </div>
    )
  }

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

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              top: '10%',
              left: '10%'
            }}
          />
          <motion.div
            className="absolute w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              top: '60%',
              right: '10%'
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 py-24">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Blog
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Exploring technology, development, and everything in between
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <BlogSearch />
          </motion.div>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <motion.section
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-white">
                <span className="h-2 w-2 bg-purple-400 rounded-full"></span>
                Featured Posts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredPosts.map((post, index) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <BlogCard post={post} featured={true} />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* All Posts */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-white">
              <span className="h-2 w-2 bg-blue-400 rounded-full"></span>
              All Posts
            </h2>
            
            <Suspense fallback={<BlogCardsSkeleton />}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularPosts.map((post, index) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <BlogCard post={post} />
                  </motion.div>
                ))}
              </div>
            </Suspense>

            {regularPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No posts found.</p>
              </div>
            )}
          </motion.section>

          {/* Write Post Button */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link href="/blog/write" prefetch={true}>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Write a Post
              </Button>
            </Link>
          </motion.div>
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