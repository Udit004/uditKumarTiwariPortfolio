'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Plus, X, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import Navbar from '@/components/helperComponents/Navbar'
import Footer from '@/components/helperComponents/Footer'

export default function WritePage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: [],
    featured: false
  })
  const [newTag, setNewTag] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Simple authentication check
  useEffect(() => {
    // Check if user is authenticated (you can customize this)
    const checkAuth = () => {
      // For now, using a simple localStorage check
      // In production, you'd want proper authentication
      const isAuth = localStorage.getItem('blog-auth') === 'udit-tiwari-2024'
      setIsAuthenticated(isAuth)
      setIsLoading(false)
    }
    
    checkAuth()
  }, [])

  const handleLogin = () => {
    const password = prompt('Enter admin password:')
    if (password === 'udit2024') { // Change this to your preferred password
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Send the data to our API route
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create post')
      }

      const result = await response.json()
      console.log('Post created successfully:', result)
      
      // Redirect to blog page after successful submission
      router.push('/blog')
    } catch (error) {
      console.error('Error creating post:', error)
      alert('Failed to create post: ' + error.message)
    } finally {
      setIsSubmitting(false)
    }
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
                <Lock className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h1 className="text-2xl font-bold mb-2 text-white">Authentication Required</h1>
                <p className="text-gray-300 mb-6">
                  Only authorized users can create blog posts.
                </p>
              </div>
              
              <Button onClick={handleLogin} className="w-full mb-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Login to Write Posts
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                 <main className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/blog">
              <Button variant="ghost" className="pl-0">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
            <Button variant="outline" onClick={handleLogout} size="sm">
              Logout
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-white">Write a New Post</h1>
          <p className="text-gray-300 mt-2">
            Share your thoughts and insights with the community
          </p>
          <div className="mt-2 text-sm text-green-400">
            ✓ Logged in as Udit Kumar Tiwari
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2 text-white">
              Title *
            </label>
            <Input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter your post title..."
              required
              className="text-lg bg-slate-800/50 border-slate-700/50 text-white placeholder-gray-400 focus:ring-purple-500/50"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium mb-2 text-white">
              Excerpt *
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              placeholder="Write a brief summary of your post..."
              required
              rows={3}
              className="w-full px-3 py-2 border border-slate-700/50 rounded-md bg-slate-800/50 text-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 placeholder-gray-400"
            />
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-2 text-white">
              Content *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Write your post content here..."
              required
              rows={15}
              className="w-full px-3 py-2 border border-slate-700/50 rounded-md bg-slate-800/50 text-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 placeholder-gray-400"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-2 text-white">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1 bg-purple-600/80 text-white">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:text-red-400"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="bg-slate-800/50 border-slate-700/50 text-white placeholder-gray-400 focus:ring-purple-500/50"
              />
              <Button
                type="button"
                variant="outline"
                onClick={addTag}
                disabled={!newTag.trim()}
                className="border-purple-500/30 text-purple-300 hover:bg-purple-500/20"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Featured Post */}
          <div className="flex items-center space-x-2">
            <input
              id="featured"
              name="featured"
              type="checkbox"
              checked={formData.featured}
              onChange={handleInputChange}
              className="rounded border-slate-700/50 bg-slate-800/50 text-purple-500 focus:ring-purple-500/50"
            />
            <label htmlFor="featured" className="text-sm font-medium text-white">
              Mark as featured post
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-6">
            <Button
              type="submit"
              disabled={isSubmitting || !formData.title || !formData.excerpt || !formData.content}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Save className="h-4 w-4" />
              {isSubmitting ? 'Publishing...' : 'Publish Post'}
            </Button>
            <Link href="/blog">
              <Button variant="outline" type="button" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/20">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
        </main>
      </div>
      <Footer />
    </>
  )
}
