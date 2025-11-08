"use client"
import dynamic from 'next/dynamic'

const AIPortfolioChatbot = dynamic(() => import('./AIPortfolioChatbot'), {
  ssr: false,
  loading: () => null // Optional: show nothing while loading
})

const ChatbotWrapper = () => {
  return <AIPortfolioChatbot />
}

export default ChatbotWrapper