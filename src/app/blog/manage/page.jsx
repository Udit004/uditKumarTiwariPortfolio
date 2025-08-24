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
import Navbar from '@/components/helperComponents/Navbar'
import Footer from '@/components/helperComponents/Footer'

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
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-md mx-auto text-center">
              <div className="mb-8">
                <Settings className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h1 className="text-2xl font-bold mb-2 text-white">Blog Management</h1>
                <p className="text-gray-300 mb-6">
                  Access your professional blog management dashboard.
                </p>
              </div>
              
              <Button onClick={handleLogin} className="w-full mb-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Login to Manage Blog
              </Button>
              
              <Link href="/blog">
                <Button variant="outline" className="w-full border-purple-500/30 text-purple-300 hover:bg-purple-500/20">
                  Back to Blog
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
        <main className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <Link href="/blog">
                <Button variant="ghost" className="pl-0 text-gray-300 hover:text-white">
                  <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                  Back to Blog
                </Button>
              </Link>
              <Button variant="outline" onClick={handleLogout} size="sm">
                Logout
              </Button>
            </div>
            <h1 className="text-3xl font-bold text-white">Blog Management Dashboard</h1>
            <p className="text-gray-300 mt-2">
              Professional content management for your portfolio blog
            </p>
            <div className="mt-2 text-sm text-green-400 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Logged in as Udit Kumar Tiwari
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Link href="/sanity" target="_blank">
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:bg-slate-800/70 transition-colors cursor-pointer group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Edit className="h-6 w-6 text-purple-400" />
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Sanity Studio</h3>
                <p className="text-gray-400 text-sm">Professional CMS for content management</p>
              </div>
            </Link>

            <Link href="/blog/write">
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:bg-slate-800/70 transition-colors cursor-pointer group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Plus className="h-6 w-6 text-blue-400" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Quick Write</h3>
                <p className="text-gray-400 text-sm">Fast blog post creation</p>
              </div>
            </Link>

            <Link href="/blog">
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:bg-slate-800/70 transition-colors cursor-pointer group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Eye className="h-6 w-6 text-green-400" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-green-400 transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">View Blog</h3>
                <p className="text-gray-400 text-sm">See your published posts</p>
              </div>
            </Link>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-orange-400" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Analytics</h3>
              <p className="text-gray-400 text-sm">Coming soon</p>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Posts</p>
                  <p className="text-2xl font-bold text-white">{stats.totalPosts}</p>
                </div>
                <FileText className="h-8 w-8 text-purple-400" />
              </div>
            </div>

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Published</p>
                  <p className="text-2xl font-bold text-white">{stats.publishedPosts}</p>
                </div>
                <BookOpen className="h-8 w-8 text-green-400" />
              </div>
            </div>

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Drafts</p>
                  <p className="text-2xl font-bold text-white">{stats.draftPosts}</p>
                </div>
                <Edit className="h-8 w-8 text-yellow-400" />
              </div>
            </div>

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Views</p>
                  <p className="text-2xl font-bold text-white">{stats.totalViews}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-400" />
              </div>
            </div>
          </div>

          {/* Professional Features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sanity Studio Benefits */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Why Use Sanity Studio?
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-white font-medium">Professional CMS</p>
                    <p className="text-gray-400 text-sm">Industry-standard content management system</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-white font-medium">Rich Text Editor</p>
                    <p className="text-gray-400 text-sm">Advanced editing with real-time collaboration</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-white font-medium">Media Management</p>
                    <p className="text-gray-400 text-sm">Built-in image upload and optimization</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-white font-medium">SEO Tools</p>
                    <p className="text-gray-400 text-sm">Built-in SEO fields and meta management</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-white font-medium">Version Control</p>
                    <p className="text-gray-400 text-sm">Track changes and revert when needed</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Link href="/sanity" target="_blank">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Sanity Studio
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link href="/blog/write">
                  <Button variant="outline" className="w-full justify-start border-slate-600 text-gray-300 hover:bg-slate-700/50">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Post
                  </Button>
                </Link>
                <Link href="/sanity" target="_blank">
                  <Button variant="outline" className="w-full justify-start border-slate-600 text-gray-300 hover:bg-slate-700/50">
                    <Edit className="h-4 w-4 mr-2" />
                    Manage All Posts
                  </Button>
                </Link>
                <Link href="/blog">
                  <Button variant="outline" className="w-full justify-start border-slate-600 text-gray-300 hover:bg-slate-700/50">
                    <Eye className="h-4 w-4 mr-2" />
                    View Published Blog
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start border-slate-600 text-gray-300 hover:bg-slate-700/50">
                  <Tag className="h-4 w-4 mr-2" />
                  Manage Categories
                </Button>
                <Button variant="outline" className="w-full justify-start border-slate-600 text-gray-300 hover:bg-slate-700/50">
                  <Hash className="h-4 w-4 mr-2" />
                  Manage Tags
                </Button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8 bg-slate-800/30 border border-slate-700/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Activity
            </h3>
            <div className="text-gray-400 text-center py-8">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-600" />
              <p>No recent activity to display</p>
              <p className="text-sm">Your blog activity will appear here</p>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}
