// components/PortableTextComponents.jsx
import { urlFor } from '@/lib/sanity'

export const PortableTextComponents = {
  types: {
    image: ({ value }) => {
      return (
        <div className="my-8">
          <img
            src={urlFor(value).width(800).url()}
            alt={value.alt || 'Blog image'}
            className="rounded-lg shadow-lg mx-auto"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          {value.alt && (
            <p className="text-sm text-muted-foreground text-center mt-2 italic">
              {value.alt}
            </p>
          )}
        </div>
      )
    },
    code: ({ value }) => {
      return (
        <div className="my-6">
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code className={`language-${value.language || 'javascript'}`}>
              {value.code}
            </code>
          </pre>
          {value.language && (
            <div className="text-xs text-muted-foreground mt-2 text-right">
              {value.language}
            </div>
          )}
        </div>
      )
    }
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-8 mb-4 text-foreground">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-6 mb-3 text-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold mt-5 mb-2 text-foreground">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-bold mt-4 mb-2 text-foreground">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 py-2 my-4 italic bg-muted/50 rounded-r">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed text-foreground">
        {children}
      </p>
    )
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-1">
        {children}
      </ul>
    )
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-foreground">
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em className="italic text-foreground">
        {children}
      </em>
    ),
    code: ({ children }) => (
      <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-primary hover:underline underline-offset-2"
        >
          {children}
        </a>
      )
    }
  }
}

