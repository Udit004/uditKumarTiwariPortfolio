// components/BlogSearch.jsx
'use client'

import { useState, useEffect, useMemo } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { BlogCard } from './ui/BlogCard'

export function BlogSearch({ initialPosts }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return []
    
    const query = searchQuery.toLowerCase().trim()
    return initialPosts.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.author.name.toLowerCase().includes(query) ||
      post.tags?.some(tag => tag.toLowerCase().includes(query)) ||
      post.categories?.some(category => 
        category.title.toLowerCase().includes(query)
      )
    )
  }, [searchQuery, initialPosts])

  // Handle search input changes
  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    setIsSearching(true)
    setShowResults(value.trim().length > 0)
    
    // Simulate search delay for better UX
    setTimeout(() => setIsSearching(false), 300)
  }

  // Clear search
  const clearSearch = () => {
    setSearchQuery('')
    setShowResults(false)
    setIsSearching(false)
  }

  // Handle escape key to clear search
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        clearSearch()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="search"
          placeholder="Search posts by title, content, author, or tags..."
          className="pl-10 pr-12 h-12 text-base bg-slate-800/50 border-slate-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 backdrop-blur-sm"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-white hover:bg-purple-500/20"
            onClick={clearSearch}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>

      {/* Search Results */}
      {showResults && (
        <div className="mt-6">
          {/* Search Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
              {isSearching ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  Searching...
                </span>
              ) : (
                `Found ${filteredPosts.length} ${filteredPosts.length === 1 ? 'post' : 'posts'} for "${searchQuery}"`
              )}
            </h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearSearch}
              className="border-purple-500/30 text-purple-300 hover:bg-purple-500/20"
            >
              Clear
            </Button>
          </div>

          {/* Results Grid */}
          {!isSearching && (
            <>
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPosts.map((post) => (
                    <BlogCard key={post._id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-slate-800/30 rounded-lg border border-slate-700/50 backdrop-blur-sm">
                  <div className="text-4xl mb-4">🔍</div>
                  <h4 className="text-lg font-semibold mb-2 text-white">No posts found</h4>
                  <p className="text-gray-400 mb-4">
                    We couldn't find any posts matching "{searchQuery}"
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={clearSearch}
                    className="border-purple-500/30 text-purple-300 hover:bg-purple-500/20"
                  >
                    Clear search
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Loading skeleton */}
          {isSearching && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-slate-800/50 rounded-lg h-48 mb-4"></div>
                  <div className="space-y-2">
                    <div className="bg-slate-800/50 rounded h-4 w-3/4"></div>
                    <div className="bg-slate-800/50 rounded h-4 w-1/2"></div>
                    <div className="bg-slate-800/50 rounded h-4 w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Search Tips */}
      {!showResults && (
        <div className="mt-4 text-sm text-gray-400 text-center">
          <p>Try searching for topics, author names, or specific keywords</p>
        </div>
      )}
    </div>
  )
}