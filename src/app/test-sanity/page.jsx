import { getAllPosts, getAllAuthors } from '@/lib/sanity'
import Navbar from '@/components/helperComponents/Navbar'
import Footer from '@/components/helperComponents/Footer'

export default async function TestSanityPage() {
  try {
    const [posts, authors] = await Promise.all([
      getAllPosts(),
      getAllAuthors()
    ])

    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <div className="container mx-auto p-8 py-20">
        <h1 className="text-3xl font-bold mb-8 text-white">Sanity Connection Test</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Posts Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-white">Posts ({posts.length})</h2>
            {posts.length === 0 ? (
              <div className="bg-yellow-500/20 border border-yellow-400/50 text-yellow-300 px-4 py-3 rounded">
                No posts found. Create your first post using the write page!
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div key={post._id} className="border border-slate-700/50 p-4 rounded bg-slate-800/30">
                    <h3 className="font-semibold text-white">{post.title}</h3>
                    <p className="text-sm text-gray-300">{post.excerpt}</p>
                    <p className="text-xs text-gray-400">Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Authors Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-white">Authors ({authors.length})</h2>
            {authors.length === 0 ? (
              <div className="bg-yellow-500/20 border border-yellow-400/50 text-yellow-300 px-4 py-3 rounded">
                No authors found. A default author will be created when you write your first post.
              </div>
            ) : (
              <div className="space-y-4">
                {authors.map((author) => (
                  <div key={author._id} className="border border-slate-700/50 p-4 rounded bg-slate-800/30">
                    <h3 className="font-semibold text-white">{author.name}</h3>
                    <p className="text-sm text-gray-300">Slug: {author.slug?.current}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8">
          <a 
            href="/blog/write" 
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
          >
            Write Your First Post
          </a>
        </div>
          </div>
        </div>
        <Footer />
      </>
    )
  } catch (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                     <div className="container mx-auto p-8 py-20">
            <h1 className="text-3xl font-bold mb-8 text-white">Sanity Connection Error</h1>
            <div className="bg-red-500/20 border border-red-400/50 text-red-300 px-4 py-3 rounded">
              <p className="font-bold">Error connecting to Sanity:</p>
              <p>{error.message}</p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}
