import About from '@/components/About'
import Navbar from '@/components/helperComponents/Navbar'
import Home from '@/components/Home'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import React from 'react'
import AIPortfolioChatbot from '@/components/helperComponents/AIPortfolioChatbot'
import Footer from '@/components/helperComponents/Footer'

const page = () => {
  return (
    <>
    <Navbar/>
    <Home/>
    <About/>
    <Skills/>
    <Projects/>
    <Contact/>
    <AIPortfolioChatbot/>
    <Footer/>
    </>
  )
}

export default page