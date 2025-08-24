'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  X, 
  Lock, 
  Upload, 
  Eye, 
  EyeOff,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  Calendar,
  Tag,
  Hash,
  Settings,
  Globe,
  FileText,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import ImageUpload from '@/components/ui/ImageUpload'
import Navbar from '@/components/helperComponents/Navbar'
import Footer from '@/components/helperComponents/Footer'

// Rich Text Editor Component
function RichTextEditor({ value, onChange, placeholder }) {
  const [selection, setSelection] = useState({ start: 0, end: 0 })
  const textareaRef = useRef(null)

  const formatText = (format) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)

    let formattedText = ''
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`
        break
      case 'italic':
        formattedText = `*${selectedText}*`
        break
      case 'code':
        formattedText = `\`${selectedText}\``
        break
      case 'quote':
        formattedText = `> ${selectedText}`
        break
      case 'link':
        const url = prompt('Enter URL:')
        if (url) formattedText = `[${selectedText}](${url})`
        else formattedText = selectedText
        break
      case 'image':
        const imageUrl = prompt('Enter image URL:')
        const altText = prompt('Enter alt text:')
        if (imageUrl) formattedText = `![${altText || 'image'}](${imageUrl})`
        else formattedText = selectedText
        break
      case 'bullet':
        formattedText = `- ${selectedText}`
        break
      case 'numbered':
        formattedText = `1. ${selectedText}`
        break
      default:
        formattedText = selectedText
    }

    const newValue = value.substring(0, start) + formattedText + value.substring(end)
    onChange(newValue)
    
    // Set cursor position after formatting
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + formattedText.length, start + formattedText.length)
    }, 0)
  }

  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 bg-slate-800/50 rounded-lg border border-slate-700/50">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => formatText('bold')}
          className="h-8 w-8 p-0 hover:bg-slate-700/50"
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => formatText('italic')}
          className="h-8 w-8 p-0 hover:bg-slate-700/50"
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => formatText('code')}
          className="h-8 w-8 p-0 hover:bg-slate-700/50"
          title="Code"
        >
          <Code className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => formatText('quote')}
          className="h-8 w-8 p-0 hover:bg-slate-700/50"
          title="Quote"
        >
          <Quote className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => formatText('link')}
          className="h-8 w-8 p-0 hover:bg-slate-700/50"
          title="Link"
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => formatText('image')}
          className="h-8 w-8 p-0 hover:bg-slate-700/50"
          title="Image"
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-slate-600 mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => formatText('bullet')}
          className="h-8 w-8 p-0 hover:bg-slate-700/50"
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => formatText('numbered')}
          className="h-8 w-8 p-0 hover:bg-slate-700/50"
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-slate-700/50 rounded-lg bg-slate-800/50 text-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 placeholder-gray-400 font-mono"
        rows={20}
        onSelect={(e) => {
          setSelection({
            start: e.target.selectionStart,
            end: e.target.selectionEnd
          })
        }}
      />
    </div>
  )
}

// Image Upload Component - Now using the separate component

// SEO Preview Component
function SEOPreview({ title, excerpt, slug }) {
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
      <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
        <Globe className="h-4 w-4" />
        SEO Preview
      </h4>
      <div className="space-y-2">
        <div className="text-blue-400 text-sm truncate">
          {slug ? `yourdomain.com/blog/${slug}` : 'yourdomain.com/blog/...'}
        </div>
        <div className="text-white font-medium text-lg truncate">
          {title || 'Your blog post title will appear here'}
        </div>
        <div className="text-gray-400 text-sm line-clamp-2">
          {excerpt || 'Your blog post excerpt will appear here in search results...'}
        </div>
      </div>
    </div>
  )
}

export default function WritePage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showPreview, setShowPreview] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: [],
    categories: [],
    featured: false,
    coverImage: null,
    coverImageAlt: '',
    seoTitle: '',
    seoDescription: '',
    publishDate: new Date().toISOString().split('T')[0],
    readingTime: ''
  })
  const [newTag, setNewTag] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [wordCount, setWordCount] = useState(0)

  // Available categories
  const availableCategories = [
    'Technology', 'Web Development', 'Design', 'Tutorial', 
    'Personal', 'Career', 'Programming', 'React', 'Next.js'
  ]

  // Simple authentication check
  useEffect(() => {
    const checkAuth = () => {
      const isAuth = localStorage.getItem('blog-auth') === 'udit-tiwari-2024'
      setIsAuthenticated(isAuth)
      setIsLoading(false)
    }
    checkAuth()
  }, [])

  // Calculate word count
  useEffect(() => {
    const words = formData.content.trim().split(/\s+/).filter(word => word.length > 0)
    setWordCount(words.length)
  }, [formData.content])

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

  const addCategory = () => {
    if (newCategory.trim() && !formData.categories.includes(newCategory.trim())) {
      setFormData(prev => ({
        ...prev,
        categories: [...prev.categories, newCategory.trim()]
      }))
      setNewCategory('')
    }
  }

  const removeCategory = (categoryToRemove) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter(cat => cat !== categoryToRemove)
    }))
  }

  const handleImageUpload = (imageUrl, fileName) => {
    setFormData(prev => ({
      ...prev,
      coverImage: imageUrl,
      coverImageAlt: fileName
    }))
  }

  const generateSlug = () => {
    const slug = formData.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    setFormData(prev => ({ ...prev, slug }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
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
        <main className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <Link href="/blog">
                <Button variant="ghost" className="pl-0 text-gray-300 hover:text-white">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Blog
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowPreview(!showPreview)}
                  className="border-purple-500/30 text-purple-300 hover:bg-purple-500/20"
                >
                  {showPreview ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                  {showPreview ? 'Hide Preview' : 'Show Preview'}
                </Button>
                <Button variant="outline" onClick={handleLogout} size="sm">
                  Logout
                </Button>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white">Write a New Post</h1>
            <p className="text-gray-300 mt-2">
              Create engaging content with our professional editor
            </p>
            <div className="mt-2 text-sm text-green-400 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Logged in as Udit Kumar Tiwari
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
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
                    className="text-xl bg-slate-800/50 border-slate-700/50 text-white placeholder-gray-400 focus:ring-purple-500/50"
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

                {/* Cover Image */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">
                    Cover Image
                  </label>
                  <ImageUpload 
                    onImageUpload={handleImageUpload}
                    className="mb-4"
                  />
                  {formData.coverImage && (
                    <Input
                      name="coverImageAlt"
                      value={formData.coverImageAlt}
                      onChange={handleInputChange}
                      placeholder="Alt text for accessibility..."
                      className="bg-slate-800/50 border-slate-700/50 text-white placeholder-gray-400 focus:ring-purple-500/50"
                    />
                  )}
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-white">
                      Content *
                    </label>
                    <div className="text-xs text-gray-400">
                      {wordCount} words
                    </div>
                  </div>
                  <RichTextEditor
                    value={formData.content}
                    onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                    placeholder="Write your post content here... Use the toolbar above to format your text."
                  />
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* SEO Section */}
                <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    SEO Settings
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-white">
                        SEO Title
                      </label>
                      <Input
                        name="seoTitle"
                        value={formData.seoTitle}
                        onChange={handleInputChange}
                        placeholder="SEO optimized title..."
                        className="bg-slate-800/50 border-slate-700/50 text-white placeholder-gray-400 focus:ring-purple-500/50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1 text-white">
                        SEO Description
                      </label>
                      <textarea
                        name="seoDescription"
                        value={formData.seoDescription}
                        onChange={handleInputChange}
                        placeholder="SEO description..."
                        rows={3}
                        className="w-full px-3 py-2 border border-slate-700/50 rounded-md bg-slate-800/50 text-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 placeholder-gray-400"
                      />
                    </div>

                    <SEOPreview 
                      title={formData.seoTitle || formData.title}
                      excerpt={formData.seoDescription || formData.excerpt}
                      slug={formData.title ? formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : ''}
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
                    <Hash className="h-5 w-5" />
                    Categories
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {formData.categories.map((category, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1 bg-blue-600/80 text-white">
                          {category}
                          <button
                            type="button"
                            onClick={() => removeCategory(category)}
                            className="ml-1 hover:text-red-400"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="flex-1 px-3 py-2 border border-slate-700/50 rounded-md bg-slate-800/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                      >
                        <option value="">Select category...</option>
                        {availableCategories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addCategory}
                        disabled={!newCategory}
                        className="border-purple-500/30 text-purple-300 hover:bg-purple-500/20"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    Tags
                  </h3>
                  
                  <div className="space-y-3">
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
                </div>

                {/* Publishing Options */}
                <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Publishing
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-white">
                        Publish Date
                      </label>
                      <Input
                        type="date"
                        name="publishDate"
                        value={formData.publishDate}
                        onChange={handleInputChange}
                        className="bg-slate-800/50 border-slate-700/50 text-white focus:ring-purple-500/50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1 text-white">
                        Reading Time (minutes)
                      </label>
                      <Input
                        type="number"
                        name="readingTime"
                        value={formData.readingTime}
                        onChange={handleInputChange}
                        placeholder="Auto-calculated"
                        className="bg-slate-800/50 border-slate-700/50 text-white placeholder-gray-400 focus:ring-purple-500/50"
                      />
                    </div>
                    
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
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="space-y-3">
                  <Button
                    type="submit"
                    disabled={isSubmitting || !formData.title || !formData.excerpt || !formData.content}
                    className="w-full flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <Save className="h-4 w-4" />
                    {isSubmitting ? 'Publishing...' : 'Publish Post'}
                  </Button>
                  
                  <Link href="/blog">
                    <Button variant="outline" type="button" className="w-full border-purple-500/30 text-purple-300 hover:bg-purple-500/20">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </main>
      </div>
      <Footer />
    </>
  )
}
