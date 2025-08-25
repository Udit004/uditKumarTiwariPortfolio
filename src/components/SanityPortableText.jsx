import { PortableText } from '@portabletext/react'
import imageUrlBuilder from '@sanity/image-url'
import { createClient } from 'next-sanity'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-05-03',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

function urlFor(source) {
  return builder.image(source)
}

const components = {
  block: {
    h1: ({ children }) => <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-4 text-white">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl md:text-3xl font-bold mt-6 mb-3 text-white">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-bold mt-5 mb-2 text-white">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg font-semibold mt-4 mb-2 text-white">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-purple-500 pl-4 py-2 my-4 italic bg-slate-800/30 rounded-r">{children}</blockquote>
    ),
    normal: ({ children }) => <p className="mb-4 leading-relaxed text-gray-300">{children}</p>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
    em: ({ children }) => <em className="italic text-white">{children}</em>,
    code: ({ children }) => <code className="bg-slate-700 px-1 py-0.5 rounded text-sm font-mono">{children}</code>,
    link: ({ children, value }) => {
      const href = value?.href || '#'
      const isExternal = href.startsWith('http')
      return (
        <a
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="underline text-purple-400 hover:text-purple-300"
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }) => {
      try {
        const imageUrl = urlFor(value).width(800).url()
        return (
          <div className="my-8">
            <img
              src={imageUrl}
              alt={value?.alt || 'Blog image'}
              className="rounded-lg shadow-lg mx-auto"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
            {value?.alt && (
              <p className="text-sm text-gray-400 text-center mt-2 italic">{value.alt}</p>
            )}
          </div>
        )
      } catch {
        return null
      }
    },
    code: ({ value }) => (
      <div className="my-6">
        <pre className="bg-slate-800 p-4 rounded-lg overflow-x-auto">
          <code className={`language-${value?.language || 'javascript'}`}>
            {value?.code || 'No code content'}
          </code>
        </pre>
        {value?.language && (
          <div className="text-xs text-gray-400 mt-2 text-right">{value.language}</div>
        )}
      </div>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1 text-gray-300">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1 text-gray-300">{children}</ol>,
  },
  listItem: ({ children }) => <li className="mb-1 text-gray-300">{children}</li>,
}

export default function SanityPortableText({ value }) {
  if (!value) {
    return (
      <div className="text-gray-400 text-center py-8">
        <p>No content available for this post.</p>
      </div>
    )
  }

  if (typeof value === 'string') {
    return (
      <div className="text-gray-300 leading-relaxed">
        {value.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4">{paragraph}</p>
        ))}
      </div>
    )
  }

  return <PortableText value={value} components={components} />
}


