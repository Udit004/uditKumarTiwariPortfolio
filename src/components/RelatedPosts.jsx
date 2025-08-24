// components/RelatedPosts.jsx
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { urlFor, formatDate } from '@/lib/sanity'

export function RelatedPosts({ currentPost }) {
  // This would typically fetch related posts from Sanity
  // For now, we'll show a placeholder or you can implement the logic
  const relatedPosts = [] // This should be populated with actual related posts

  if (relatedPosts.length === 0) {
    return null // Don't show anything if no related posts
  }

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white">
        <span className="h-2 w-2 bg-blue-400 rounded-full"></span>
        Related Posts
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Card key={post._id} className="group overflow-hidden transition-all duration-300 hover:shadow-lg bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
            <div className="relative overflow-hidden">
              {post.coverImage && (
                <Link href={`/blog/${post.slug.current}`}>
                  <div className="relative h-48 w-full">
                    <Image
                      src={urlFor(post.coverImage).width(400).height(200).url()}
                      alt={post.coverImage.alt || post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </Link>
              )}
            </div>
            
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <span>{formatDate(post.publishedAt)}</span>
                {post.readingTime && (
                  <>
                    <span>•</span>
                    <span>{post.readingTime} min read</span>
                  </>
                )}
              </div>
              
              <Link href={`/blog/${post.slug.current}`}>
                <h3 className="font-bold leading-tight tracking-tight transition-colors hover:text-purple-400 text-white">
                  {post.title}
                </h3>
              </Link>
            </CardHeader>
            
            <CardContent className="pb-4">
              <p className="text-sm text-gray-300 leading-relaxed">
                {post.excerpt}
              </p>
              
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {post.categories.slice(0, 2).map((category) => (
                    <Badge
                      key={category._id}
                      variant="secondary"
                      className="bg-purple-600/80 text-white border-none text-xs backdrop-blur-sm"
                    >
                      {category.title}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

