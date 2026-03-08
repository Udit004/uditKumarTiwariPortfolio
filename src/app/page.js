import React from 'react'
import Navbar from '../components/helperComponents/Navbar'
import Home from '../components/Home'
import About from '../components/About'
import Skills from '../components/Skills'
import Experience from '../feature/experience/Experience'
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
      <Experience />
      <Projects />
      <Contact />
      <ChatbotWrapper />
      <Footer />
    </>
  )
}

export default Page