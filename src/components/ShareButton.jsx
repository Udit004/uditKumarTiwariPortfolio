// components/ShareButton.jsx
'use client'
import { useState } from 'react'
import { Share2, Copy, Check, Twitter, Facebook, Linkedin } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ShareButton({ post }) {
  const [copied, setCopied] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)

  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''
  const postTitle = post.title
  const postExcerpt = post.excerpt

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const shareOnSocial = (platform) => {
    let url = ''
    const encodedUrl = encodeURIComponent(currentUrl)
    const encodedTitle = encodeURIComponent(postTitle)
    const encodedExcerpt = encodeURIComponent(postExcerpt)

    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`
        break
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        break
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
        break
      default:
        return
    }

    window.open(url, '_blank', 'width=600,height=400')
    setShowShareMenu(false)
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowShareMenu(!showShareMenu)}
        className="flex items-center gap-2"
      >
        <Share2 className="h-4 w-4" />
        Share
      </Button>

      {showShareMenu && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-50">
          <div className="p-2 space-y-1">
            <button
              onClick={() => shareOnSocial('twitter')}
              className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-muted rounded-md transition-colors"
            >
              <Twitter className="h-4 w-4 text-blue-500" />
              Share on Twitter
            </button>
            
            <button
              onClick={() => shareOnSocial('facebook')}
              className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-muted rounded-md transition-colors"
            >
              <Facebook className="h-4 w-4 text-blue-600" />
              Share on Facebook
            </button>
            
            <button
              onClick={() => shareOnSocial('linkedin')}
              className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-muted rounded-md transition-colors"
            >
              <Linkedin className="h-4 w-4 text-blue-700" />
              Share on LinkedIn
            </button>
            
            <div className="border-t border-border my-1" />
            
            <button
              onClick={copyToClipboard}
              className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-muted rounded-md transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-green-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy Link
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {showShareMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowShareMenu(false)}
        />
      )}
    </div>
  )
}
