import React from 'react'
import dynamic from 'next/dynamic'
import Navbar from '../components/helperComponents/Navbar'

// Static import for Navbar (critical for UX)
// Dynamic imports for below-fold components
const Home = dynamic(() => import('../components/Home'), {
  loading: () => null,
  ssr: true
})

const About = dynamic(() => import('../components/About'), {
  loading: () => null,
  ssr: true
})

const Skills = dynamic(() => import('../components/Skills'), {
  loading: () => null,
  ssr: true
})

const Experience = dynamic(() => import('../feature/experience/Experience'), {
  loading: () => null,
  ssr: true
})

const Projects = dynamic(() => import('../components/Projects'), {
  loading: () => null,
  ssr: true
})

const Contact = dynamic(() => import('../components/Contact'), {
  loading: () => null,
  ssr: true
})

const Footer = dynamic(() => import('../components/helperComponents/Footer'), {
  loading: () => null,
  ssr: true
})

const ChatbotWrapper = dynamic(() => import('../components/helperComponents/ChatbotWrapper'), {
  loading: () => null,
  ssr: true
})

const Page = () => {
  return (
    <>
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <ChatbotWrapper />
      <Footer />
    </>
  )
}

export default Page