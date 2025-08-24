'use client'
import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'

// Dynamic imports for all components with loading fallbacks
const Navbar = dynamic(() => import('../components/helperComponents/Navbar'), {
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

const Home = dynamic(() => import('../components/Home'), {
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p>Loading Home...</p>
      </div>
    </div>
  ),
  ssr: true
})

const About = dynamic(() => import('../components/About'), {
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p>Loading About...</p>
      </div>
    </div>
  ),
  ssr: true
})

const Skills = dynamic(() => import('../components/Skills'), {
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p>Loading Skills...</p>
      </div>
    </div>
  ),
  ssr: true
})

const Projects = dynamic(() => import('../components/Projects'), {
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p>Loading Projects...</p>
      </div>
    </div>
  ),
  ssr: true
})

const Contact = dynamic(() => import('../components/Contact'), {
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p>Loading Contact...</p>
      </div>
    </div>
  ),
  ssr: true
})

const AIPortfolioChatbot = dynamic(() => import('../components/helperComponents/AIPortfolioChatbot'), {
  loading: () => null,
  ssr: false
})

const Footer = dynamic(() => import('../components/helperComponents/Footer'), {
  loading: () => (
    <div className="bg-slate-900 py-8">
      <div className="container mx-auto px-6">
        <div className="animate-pulse bg-slate-700 h-4 w-32 rounded mx-auto"></div>
      </div>
    </div>
  ),
  ssr: true
})

const page = () => {
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
        <Navbar/>
      </Suspense>
      
      <Suspense fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p>Loading Home...</p>
          </div>
        </div>
      }>
        <Home/>
      </Suspense>
      
      <Suspense fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p>Loading About...</p>
          </div>
        </div>
      }>
        <About/>
      </Suspense>
      
      <Suspense fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p>Loading Skills...</p>
          </div>
        </div>
      }>
        <Skills/>
      </Suspense>
      
      <Suspense fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p>Loading Projects...</p>
          </div>
        </div>
      }>
        <Projects/>
      </Suspense>
      
      <Suspense fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p>Loading Contact...</p>
          </div>
        </div>
      }>
        <Contact/>
      </Suspense>
      
      <Suspense fallback={null}>
        <AIPortfolioChatbot/>
      </Suspense>
      
      <Suspense fallback={
        <div className="bg-slate-900 py-8">
          <div className="container mx-auto px-6">
            <div className="animate-pulse bg-slate-700 h-4 w-32 rounded mx-auto"></div>
          </div>
        </div>
      }>
        <Footer/>
      </Suspense>
    </>
  )
}

export default page