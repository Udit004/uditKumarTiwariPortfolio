import React from 'react'
import Navbar from '../components/helperComponents/Navbar'
import Home from '../components/Home'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Contact from '../components/Contact'
import Footer from '../components/helperComponents/Footer'
import ChatbotWrapper from '../components/helperComponents/ChatbotWrapper'

const Page = () => {
  return (
    <>
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <ChatbotWrapper />
      <Footer />
    </>
  )
}

export default Page