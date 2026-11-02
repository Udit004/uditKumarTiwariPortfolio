"use client";

import React, { Component } from "react";
import dynamic from "next/dynamic";

class ChatbotErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Chatbot Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return null; // Gracefully fail without breaking the portfolio website
    }
    return this.props.children;
  }
}

const AIPortfolioChatbot = dynamic(() => import("./AIPortfolioChatbot"), {
  ssr: false,
  loading: () => null,
});

const ChatbotWrapper = () => {
  return (
    <ChatbotErrorBoundary>
      <AIPortfolioChatbot />
    </ChatbotErrorBoundary>
  );
};

export default ChatbotWrapper;
