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

// Rich Text Editor Component
function RichTextEditor({ value, onChange, placeholder }) {
  const [showToolbar, setShowToolbar] = useState(false)
  const editorRef = useRef(null)

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
  }

  const insertText = (text) => {
    const selection = window.getSelection()
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      range.deleteContents()
      range.insertNode(document.createTextNode(text))
    }
  }

  return (
    <div className="relative">
      {/* Toolbar */}
      <div className={`absolute top-0 left-0 right-0 z-10 bg-slate-800 border border-slate-700 rounded-t-lg p-2 transition-all duration-300 ${showToolbar ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
        <div className="flex flex-wrap gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('bold')}
            className="h-8 w-8 p-0 text-gray-300 hover:text-white hover:bg-slate-700"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('italic')}
            className="h-8 w-8 p-0 text-gray-300 hover:text-white hover:bg-slate-700"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-slate-600 mx-1"></div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('insertUnorderedList')}
            className="h-8 w-8 p-0 text-gray-300 hover:text-white hover:bg-slate-700"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('insertOrderedList')}
            className="h-8 w-8 p-0 text-gray-300 hover:text-white hover:bg-slate-700"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('formatBlock', '<blockquote>')}
            className="h-8 w-8 p-0 text-gray-300 hover:text-white hover:bg-slate-700"
          >
            <Quote className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => insertText('```\n\n```')}
            className="h-8 w-8 p-0 text-gray-300 hover:text-white hover:bg-slate-700"
          >
            <Code className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className="min-h-96 p-4 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent prose prose-invert max-w-none"
        onInput={(e) => onChange(e.target.innerHTML)}
        onFocus={() => setShowToolbar(true)}
        onBlur={() => setShowToolbar(false)}
        dangerouslySetInnerHTML={{ __html: value }}
        placeholder={placeholder}
      />
    </div>
  )
}

export default function BlogWritePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    coverImage: null,
    categories: [],
    tags: [],
    isPublished: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleImageUpload = (imageUrl) => {
    setFormData(prev => ({
      ...prev,
      coverImage: imageUrl
    }))
  }

  const addCategory = () => {
    const category = prompt('Enter category name:')
    if (category && !formData.categories.includes(category)) {
      setFormData(prev => ({
        ...prev,
        categories: [...prev.categories, category]
      }))
    }
  }

  const removeCategory = (index) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter((_, i) => i !== index)
    }))
  }

  const addTag = () => {
    const tag = prompt('Enter tag:')
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }))
    }
  }

  const removeTag = (index) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      // Here you would typically send the data to your API
      console.log('Submitting post:', formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSuccess('Post saved successfully!')
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        coverImage: null,
        categories: [],
        tags: [],
        isPublished: false
      })
    } catch (err) {
      setError('Failed to save post. Please try again.')
    } finally {
      setLoading(false)
    }
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
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Blog
                </Button>
              </Link>
              <h1 className="text-3xl font-bold text-white">Write a New Post</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="border-slate-600 text-gray-300 hover:text-white hover:border-slate-500"
                onClick={() => handleInputChange('isPublished', !formData.isPublished)}
              >
                {formData.isPublished ? (
                  <>
                    <Globe className="h-4 w-4 mr-2" />
                    Published
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    Draft
                  </>
                )}
              </Button>
              
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Post
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Alerts */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400">
              <AlertCircle className="h-5 w-5" />
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-2 text-green-400">
              <CheckCircle className="h-5 w-5" />
              {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Title
              </label>
              <Input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter post title..."
                className="bg-slate-800 border-slate-700 text-white placeholder-gray-400 focus:border-purple-500"
                required
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Excerpt
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => handleInputChange('excerpt', e.target.value)}
                placeholder="Enter a brief excerpt..."
                rows={3}
                className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent resize-none"
              />
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Cover Image
              </label>
              <ImageUpload onUpload={handleImageUpload} />
              {formData.coverImage && (
                <div className="mt-4 relative w-48 h-32 rounded-lg overflow-hidden">
                  <Image
                    src={formData.coverImage}
                    alt="Cover"
                    fill
                    className="object-cover"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleInputChange('coverImage', null)}
                    className="absolute top-2 right-2 h-6 w-6 p-0 bg-red-500 hover:bg-red-600 text-white"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>

            {/* Categories */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Categories
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.categories.map((category, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-purple-600/80 text-white"
                  >
                    {category}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCategory(index)}
                      className="h-4 w-4 p-0 ml-1 hover:bg-purple-700"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addCategory}
                className="border-slate-600 text-gray-300 hover:text-white hover:border-slate-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="border-slate-600 text-gray-300"
                  >
                    #{tag}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTag(index)}
                      className="h-4 w-4 p-0 ml-1 hover:bg-slate-700"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addTag}
                className="border-slate-600 text-gray-300 hover:text-white hover:border-slate-500"
              >
                <Hash className="h-4 w-4 mr-2" />
                Add Tag
              </Button>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Content
              </label>
              <RichTextEditor
                value={formData.content}
                onChange={(value) => handleInputChange('content', value)}
                placeholder="Start writing your post..."
              />
            </div>
          </form>
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
