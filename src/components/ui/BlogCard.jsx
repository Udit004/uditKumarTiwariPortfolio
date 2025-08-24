// components/ui/BlogCard.jsx
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } from './card'
import { Badge } from './badge'
import { CalendarDays, Clock, User } from 'lucide-react'
import { urlFor, formatDate } from '@/lib/sanity'

export function BlogCard({ post, featured = false }) {
  const {
    title,
    slug,
    author,
    coverImage,
    excerpt,
    publishedAt,
    categories,
    tags,
    readingTime
  } = post

  return (
    <Card 
      className={`group overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] bg-slate-800/30 border-slate-700/50 backdrop-blur-sm ${
        featured ? 'md:col-span-2 lg:col-span-2' : ''
      }`}
    >
      <div className="relative overflow-hidden">
        {coverImage && (
          <Link href={`/blog/${slug.current}`}>
            <div className={`relative ${featured ? 'h-80' : 'h-48'} w-full`}>
              <Image
                src={urlFor(coverImage).width(800).height(400).url()}
                alt={coverImage.alt || title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Categories overlay */}
              {categories && categories.length > 0 && (
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {categories.slice(0, 2).map((category) => (
                    <Badge
                      key={category._id}
                      variant="secondary"
                      className="bg-purple-600/80 text-white border-none backdrop-blur-sm"
                    >
                      {category.title}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </Link>
        )}
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{author.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              <span>{formatDate(publishedAt)}</span>
            </div>
            {readingTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{readingTime} min read</span>
              </div>
            )}
          </div>
        </div>
        
        <Link href={`/blog/${slug.current}`}>
          <h3 className={`font-bold leading-tight tracking-tight transition-colors hover:text-purple-400 text-white ${
            featured ? 'text-2xl lg:text-3xl' : 'text-xl'
          }`}>
            {title}
          </h3>
        </Link>
      </CardHeader>

      <CardContent className="pb-4">
        <p className={`text-gray-300 leading-relaxed ${
          featured ? 'text-base' : 'text-sm'
        }`}>
          {excerpt}
        </p>
      </CardContent>

      {tags && tags.length > 0 && (
        <CardFooter className="pt-0">
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs border-purple-500/30 text-purple-300 bg-purple-500/10">
                #{tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs border-purple-500/30 text-purple-300 bg-purple-500/10">
                +{tags.length - 3} more
              </Badge>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  )
}