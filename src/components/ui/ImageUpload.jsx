'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, X, Image as ImageIcon, Loader2, AlertCircle } from 'lucide-react'
import { Button } from './button'

export default function ImageUpload({ onImageUpload, className = '' }) {
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const uploadToCloudinary = async (file) => {
    // For now, we'll use a placeholder approach
    // In production, you should set up Cloudinary, AWS S3, or similar
    return new Promise((resolve, reject) => {
      // Simulate upload delay
      setTimeout(() => {
        // Create a temporary URL for demo purposes
        const imageUrl = URL.createObjectURL(file)
        resolve({
          url: imageUrl,
          publicId: `temp_${Date.now()}`,
          fileName: file.name
        })
      }, 2000)
    })
  }

  const handleFile = async (file) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (JPEG, PNG, GIF, etc.)')
      return
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB')
      return
    }

    setError(null)
    setUploading(true)
    
    try {
      // Upload to cloud service
      const result = await uploadToCloudinary(file)
      
      setPreview(result.url)
      onImageUpload(result.url, result.fileName)
      
      // Show success message
      console.log('Image uploaded successfully:', result)
    } catch (error) {
      console.error('Error uploading image:', error)
      setError('Failed to upload image. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const removeImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview)
      setPreview(null)
    }
    setError(null)
    onImageUpload(null, '')
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          {error}
        </div>
      )}
      
      {preview ? (
        <div className="relative">
          <div className="relative h-48 w-full rounded-lg overflow-hidden border border-slate-700/50">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={removeImage}
            className="absolute top-2 right-2 bg-red-600/80 text-white border-none hover:bg-red-700/80"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
            dragActive 
              ? 'border-purple-500 bg-purple-500/10 scale-105' 
              : 'border-slate-600 hover:border-slate-500 hover:bg-slate-800/30'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="space-y-4">
            {uploading ? (
              <>
                <Loader2 className="h-12 w-12 mx-auto text-purple-400 animate-spin" />
                <div>
                  <p className="text-sm font-medium text-white mb-1">Uploading image...</p>
                  <p className="text-xs text-gray-400">Please wait while we process your image</p>
                </div>
              </>
            ) : (
              <>
                <div className="relative">
                  <ImageIcon className="h-12 w-12 mx-auto text-gray-400" />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <Upload className="h-3 w-3 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-2">
                    Drop your image here, or click to browse
                  </p>
                  <p className="text-xs text-gray-400 mb-4">
                    Supports JPG, PNG, GIF up to 5MB
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-slate-600 text-gray-300 hover:bg-slate-700/50 hover:border-slate-500"
                    disabled={uploading}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Image
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
