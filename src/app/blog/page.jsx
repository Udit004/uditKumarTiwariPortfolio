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
import Navbar from '@/components/helperComponents/Navbar'
import Footer from '@/components/helperComponents/Footer'

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
            className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -50, 30, 0],
              scale: [1, 1.3, 0.8, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ top: "10%", left: "10%" }}
          />
          <motion.div
            className="absolute w-80 h-80 bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-full blur-3xl"
            animate={{
              x: [0, -80, 40, 0],
              y: [0, 60, -20, 0],
              scale: [1, 0.7, 1.1, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ bottom: "20%", right: "10%" }}
          />
        </div>
        
        <main className="relative z-10 container mx-auto px-4 py-20">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-white">
            Welcome to My{' '}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Blog
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6 leading-relaxed">
            Discover insights, tutorials, and stories about web development, design, and technology.
          </p>
        </motion.div>

        {/* Search Component */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Suspense fallback={<div className="h-10 bg-slate-800/50 animate-pulse rounded"></div>}>
            <BlogSearch initialPosts={allPosts} />
          </Suspense>
        </motion.div>

        {/* Featured Posts Section */}
        {featuredPosts.length > 0 && (
          <motion.section 
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white">
              <span className="h-2 w-2 bg-purple-400 rounded-full"></span>
              Featured Posts
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {featuredPosts.slice(0, 2).map((post, index) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <BlogCard post={post} featured />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* All Posts Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
              <span className="h-2 w-2 bg-blue-400 rounded-full"></span>
              Latest Posts
            </h2>
            <div className="text-sm text-gray-400">
              {allPosts.length} {allPosts.length === 1 ? 'post' : 'posts'}
            </div>
          </div>

          {allPosts.length === 0 ? (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2 text-white">No posts yet</h3>
              <p className="text-gray-400">
                Check back soon for our latest content!
              </p>
            </motion.div>
          ) : (
            <Suspense fallback={<BlogCardsSkeleton />}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allPosts.map((post, index) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  >
                    <BlogCard post={post} />
                  </motion.div>
                ))}
              </div>
            </Suspense>
          )}
        </motion.section>

        {/* Newsletter Signup CTA */}
        <motion.section 
          className="mt-16 py-12 px-6 rounded-2xl bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-purple-500/20 text-center backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-4 text-white">Stay Updated</h3>
          <p className="text-gray-300 mb-6 max-w-md mx-auto">
            Subscribe to our newsletter to get the latest posts delivered directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md border border-purple-500/30 bg-slate-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
            <motion.button 
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-md hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </div>
        </motion.section>
        </main>
      </div>
      <Footer />
    </>
  )
}