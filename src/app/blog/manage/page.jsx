'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Plus, 
  Edit, 
  Eye, 
  BarChart3, 
  Settings, 
  ExternalLink,
  FileText,
  Users,
  Calendar,
  TrendingUp,
  ArrowRight,
  BookOpen,
  Tag,
  Hash
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

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

export default function BlogManagePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalViews: 0,
    recentPosts: []
  })

  // Simple authentication check
  useEffect(() => {
    const checkAuth = () => {
      const isAuth = localStorage.getItem('blog-auth') === 'udit-tiwari-2024'
      setIsAuthenticated(isAuth)
      setIsLoading(false)
    }
    checkAuth()
  }, [])

  const handleLogin = () => {
    const password = prompt('Enter admin password:')
    if (password === 'udit2024') {
      localStorage.setItem('blog-auth', 'udit-tiwari-2024')
      setIsAuthenticated(true)
    } else {
      alert('Incorrect password!')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('blog-auth')
    setIsAuthenticated(false)
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  // Authentication required
  if (!isAuthenticated) {
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

        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
          <div className="container mx-auto px-6 py-20">
            <div className="max-w-md mx-auto text-center">
              <div className="mb-8">
                <div className="h-16 w-16 mx-auto text-gray-400 mb-4 flex items-center justify-center">
                  <Settings className="h-12 w-12" />
                </div>
                <h1 className="text-2xl font-bold mb-2 text-white">Authentication Required</h1>
                <p className="text-gray-300 mb-6">
                  Only authorized users can access the blog management panel.
                </p>
              </div>
              
              <Button onClick={handleLogin} className="w-full mb-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Login to Manage Blog
              </Button>
              
              <Link href="/blog" prefetch={true}>
                <Button variant="outline" className="w-full border-purple-500/30 text-purple-300 hover:bg-purple-500/20">
                  Back to Blog
                </Button>
              </Link>
            </div>
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

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link href="/blog" prefetch={true}>
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Back to Blog
                </Button>
              </Link>
              <h1 className="text-3xl font-bold text-white">Blog Management</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-slate-600 text-gray-300 hover:text-white hover:border-slate-500"
              >
                Logout
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Posts</p>
                  <p className="text-2xl font-bold text-white">{stats.totalPosts}</p>
                </div>
                <div className="h-12 w-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </div>

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Published</p>
                  <p className="text-2xl font-bold text-white">{stats.publishedPosts}</p>
                </div>
                <div className="h-12 w-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-green-400" />
                </div>
              </div>
            </div>

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Drafts</p>
                  <p className="text-2xl font-bold text-white">{stats.draftPosts}</p>
                </div>
                <div className="h-12 w-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <Edit className="h-6 w-6 text-yellow-400" />
                </div>
              </div>
            </div>

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Views</p>
                  <p className="text-2xl font-bold text-white">{stats.totalViews}</p>
                </div>
                <div className="h-12 w-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-purple-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link href="/blog/write" prefetch={true}>
              <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-lg p-6 backdrop-blur-sm hover:from-purple-600/30 hover:to-blue-600/30 transition-all duration-300 cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                    <Plus className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Write New Post</h3>
                    <p className="text-gray-400 text-sm">Create a new blog post</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/sanity" target="_blank" prefetch={true}>
              <div className="bg-gradient-to-br from-emerald-600/20 to-teal-600/20 border border-emerald-500/30 rounded-lg p-6 backdrop-blur-sm hover:from-emerald-600/30 hover:to-teal-600/30 transition-all duration-300 cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-emerald-500/20 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                    <Settings className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Sanity Studio</h3>
                    <p className="text-gray-400 text-sm">Manage content in Sanity</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/blog" prefetch={true}>
              <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/30 rounded-lg p-6 backdrop-blur-sm hover:from-blue-600/30 hover:to-indigo-600/30 transition-all duration-300 cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                    <Eye className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">View Blog</h3>
                    <p className="text-gray-400 text-sm">See published posts</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Recent Posts */}
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-4">Recent Posts</h2>
            {stats.recentPosts.length > 0 ? (
              <div className="space-y-4">
                {stats.recentPosts.map((post, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div>
                      <h3 className="font-medium text-white">{post.title}</h3>
                      <p className="text-sm text-gray-400">{post.publishedAt}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                        {post.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">No posts yet. Start writing!</p>
                <Link href="/blog/write" prefetch={true}>
                  <Button className="mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Write First Post
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Additional Tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Analytics
              </h3>
              <p className="text-gray-400 mb-4">View detailed analytics and insights about your blog performance.</p>
              <Button variant="outline" className="border-slate-600 text-gray-300 hover:text-white hover:border-slate-500">
                View Analytics
              </Button>
            </div>

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Management
              </h3>
              <p className="text-gray-400 mb-4">Manage user roles and permissions for the blog.</p>
              <Button variant="outline" className="border-slate-600 text-gray-300 hover:text-white hover:border-slate-500">
                Manage Users
              </Button>
            </div>
          </div>
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
