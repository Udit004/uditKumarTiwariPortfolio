import { generateAIResponse } from "./geminiService";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

class RAGService {
  constructor() {
    this.isReady = false;
  }

  async initialize() {
    try {
      // Check if backend is available and initialized
      const response = await fetch(`${API_BASE_URL}/api/status`);
      
      if (response.ok) {
        const status = await response.json();
        this.isReady = status.isReady || false;
        console.log("RAG service initialized successfully", status);
      } else {
        console.warn("Backend not available, falling back to basic AI");
        this.isReady = false;
      }

      return this.isReady;
    } catch (error) {
      console.error("Failed to initialize RAG service:", error);
      this.isReady = false;
      return false;
    }
  }



  async generateEnhancedResponse(userMessage) {
    try {
      // If backend is ready, use RAG endpoint
      if (this.isReady) {
        const response = await fetch(`${API_BASE_URL}/api/chat/rag`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: userMessage }),
        });

        if (response.ok) {
          const data = await response.json();
          return {
            response: data.response,
            usedRAG: data.usedRAG || false,
            sources: data.sources || [],
          };
        }
      }

      // Fallback to regular chat endpoint
      const fallbackResponse = await generateAIResponse(userMessage);
      return {
        response: fallbackResponse,
        usedRAG: false,
        sources: [],
      };
    } catch (error) {
      console.error("Error generating enhanced response:", error);

      // Fallback to regular AI response
      const fallbackResponse = await generateAIResponse(userMessage);
      return {
        response: fallbackResponse,
        usedRAG: false,
        sources: [],
      };
    }
  }

  async getStatus() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/status`);
      if (response.ok) {
        const status = await response.json();
        return {
          isReady: this.isReady,
          documentCount: status.documentCount || 0,
          vectorDBInitialized: status.vectorDBInitialized || false,
        };
      }
    } catch (error) {
      console.error("Error fetching status:", error);
    }
    
    return {
      isReady: this.isReady,
      documentCount: 0,
      vectorDBInitialized: false,
    };
  }
}

export const ragService = new RAGService();
