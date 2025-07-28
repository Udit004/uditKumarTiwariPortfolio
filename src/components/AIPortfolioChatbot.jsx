import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Minimize2,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
} from "lucide-react";

const AIPortfolioChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Udit's AI assistant. I can help you learn about his skills, projects, and experience, or we can have a general conversation. What would you like to know? 😊",
      sender: "ai",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const currentUtteranceRef = useRef(null);

  // Get Gemini API key from environment variables
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  // Initialize speech recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      setSpeechSupported(true);
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    // Monitor speech synthesis events
    if ("speechSynthesis" in window) {
      const handleSpeechEnd = () => {
        setIsSpeaking(false);
        currentUtteranceRef.current = null;
      };

      // Listen for speech synthesis events
      speechSynthesis.addEventListener('voiceschanged', () => {
        // Voices loaded
      });
    }
  }, []);

  // Enhanced portfolio context with instructions for general conversation
  const portfolioContext = `
  You are an intelligent AI assistant for Udit Kumar Tiwari's portfolio. You should behave like ChatGPT or similar advanced AI models.

  IMPORTANT INSTRUCTIONS:
  1. If the user asks specifically about Udit Kumar Tiwari, his work, skills, projects, or contact information, provide detailed information from the portfolio data below.
  2. For general questions, conversations, or topics not related to Udit, respond as a helpful AI assistant would - engage naturally, provide informative answers, and maintain a conversational tone.
  3. Always be helpful, informative, and maintain context throughout the conversation.
  4. You can discuss any topic, not just Udit's portfolio. Be versatile and knowledgeable.

  PORTFOLIO INFORMATION (Use only when relevant to Udit-related questions):
  
  PERSONAL INFORMATION:
  - Name: Udit Kumar Tiwari
  - Role: Web Developer & Tech Enthusiast
  - Specialization: Front-end development with React.js, JavaScript, and modern web technologies
  - Interests: Creating clean, interactive, and high-performance web applications
  - Hobbies: Playing badminton & football, staying fit, exploring new places

  SKILLS:
  Frontend: HTML5, CSS3, JavaScript (ES6+), React, Redux, Tailwind CSS, Framer Motion
  Backend: Node.js, Express, MongoDB, Firebase
  Languages: JavaScript, Python, C, C++, Java
  Tools: Git & GitHub, Vercel, PyInstaller, DOM Manipulation, LocalStorage API

  FEATURED PROJECTS:
  1. Alumni Networking App - Full-stack platform for alumni-student connections with React, Node.js, MongoDB, Firebase
  2. Advanced To-Do List - AI-powered PWA with Machine Learning, Gemini AI integration, Socket.IO
  3. Coachlix AI Fitness Coaching - Smart PWA with Next.js, Gemini AI chatbot, personalized fitness plans
  4. Portfolio Website - Modern responsive showcase with React, Tailwind CSS, Framer Motion
  5. Badminton Academy - Dynamic sports academy website with React, SwiperJS
  6. EU Citizen Wallet Portal - Secure digital wallet with Next.js, TypeScript, Supabase
  7. Task Automation App - Python GUI tool for Windows task automation
  8. Rock Paper Scissors Game - Interactive browser game with HTML5, CSS3, JavaScript
  9. Simple Calculator - Lightweight calculator with responsive design

  CONTACT:
  - Email: rajankumart266@gmail.com
  - LinkedIn: https://www.linkedin.com/in/udit-kumar-tiwari-2b2a15216
  - GitHub: https://github.com/Udit004
  - Instagram: https://www.instagram.com/uditkumar_004/

  Remember: Be conversational and intelligent. Only mention Udit's information when specifically asked about him or his work.
  `;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced AI response generation with better context understanding
  const generateAIResponse = async (userMessage) => {
    try {
      if (!GEMINI_API_KEY) {
        throw new Error("Gemini API key not found");
      }

      // Check if the message is about Udit or general conversation
      const isAboutUdit = /\b(udit|developer|portfolio|skills|projects|experience|contact|hire|work|background|about\s+(him|you))\b/i.test(userMessage);
      
      let contextualPrompt;
      if (isAboutUdit) {
        contextualPrompt = `${portfolioContext}\n\nUser is asking about Udit Kumar Tiwari. Please provide detailed, specific information about him based on the portfolio data provided.`;
      } else {
        contextualPrompt = `You are a helpful AI assistant. The user is having a general conversation with you. Respond naturally and helpfully to their question or comment. Be engaging, informative, and conversational like ChatGPT would be.`;
      }

      const contents = [
        {
          role: "user",
          parts: [{ text: contextualPrompt }],
        },
        {
          role: "model",
          parts: [
            {
              text: "I understand. I'll respond appropriately based on whether the question is about Udit or a general conversation.",
            },
          ],
        },
        {
          role: "user",
          parts: [
            {
              text: `${userMessage}`,
            },
          ],
        },
      ];

      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

      const geminiPayload = {
        contents: contents,
        generationConfig: {
          temperature: 0.8,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 1500,
          stopSequences: [],
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
        ],
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(geminiPayload),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("Gemini API error response:", errorBody);

        if (response.status === 403) {
          throw new Error("API key is invalid or has insufficient permissions");
        } else if (response.status === 404) {
          throw new Error("Invalid API endpoint or model not found");
        } else if (response.status === 429) {
          throw new Error("Rate limit exceeded. Please try again later");
        } else {
          throw new Error(
            `Gemini API request failed: ${response.status} ${response.statusText}`
          );
        }
      }

      const data = await response.json();

      if (data.error) {
        console.error("Gemini API error:", data.error);
        throw new Error(data.error.message || "Unknown API error");
      }

      const aiResponse =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't generate a response. Please try again.";

      if (data.candidates?.[0]?.finishReason === "SAFETY") {
        throw new Error(
          "Response was blocked by safety filters. Please rephrase your message."
        );
      }

      return aiResponse;
    } catch (error) {
      console.error("Error calling Gemini API:", error);

      if (error.message.includes("API key not found")) {
        return "API configuration issue. Please contact the developer to fix the API setup.";
      } else if (error.message.includes("403")) {
        return "API access issue. The API key might need proper permissions or billing setup.";
      } else if (error.message.includes("404")) {
        return "API endpoint issue. The service might be temporarily unavailable.";
      } else {
        return "I'm having trouble connecting right now. Feel free to ask me anything else, or you can reach out to Udit directly at rajankumart266@gmail.com!";
      }
    }
  };

  // Enhanced speech function with stop capability
  const speakText = (text) => {
    if ("speechSynthesis" in window) {
      // Stop any current speech
      if (isSpeaking) {
        stopSpeaking();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onstart = () => {
        setIsSpeaking(true);
      };
      
      utterance.onend = () => {
        setIsSpeaking(false);
        currentUtteranceRef.current = null;
      };
      
      utterance.onerror = () => {
        setIsSpeaking(false);
        currentUtteranceRef.current = null;
      };

      currentUtteranceRef.current = utterance;
      speechSynthesis.speak(utterance);
    }
  };

  // Function to stop current speech
  const stopSpeaking = () => {
    if ("speechSynthesis" in window && isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      currentUtteranceRef.current = null;
    }
  };

  // Enhanced speak/stop toggle function
  const toggleSpeech = (text) => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speakText(text);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage("");
    setIsTyping(true);

    // Generate AI response
    const aiResponse = await generateAIResponse(currentInput);

    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        text: aiResponse,
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);

      // Conditional auto-speak based on user preference
      if (speechEnabled) {
        speakText(aiResponse);
      }
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startListening = () => {
    if (recognitionRef.current && speechSupported) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Updated quick questions to be more versatile
  const quickQuestions = [
    "Tell me about Udit's skills and experience",
    "What projects has he worked on?",
    "How can I contact Udit?",
    "What's the weather like today?",
    "Explain artificial intelligence",
    "What's trending in web development?",
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      <AnimatePresence mode="wait">
        {!isOpen && (
          <motion.button
            key="trigger-button"
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="text-white w-6 h-6 group-hover:scale-110 transition-transform" />

            {/* Pulse Animation */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 animate-ping opacity-20"></div>

            {/* Notification Dot */}
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-2 h-2 text-white" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chatbot Window */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key="chatbot-window"
            className={`fixed bottom-6 right-6 z-50 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col ${
              isMinimized ? "w-80 h-16" : "w-80 sm:w-96 h-[500px] sm:h-[600px]"
            }`}
            initial={{ scale: 0, y: 100, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0, y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500 to-blue-600 p-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">
                    Udit's AI Assistant
                  </h3>
                  <p className="text-white/80 text-xs">
                    {isSpeaking ? "Speaking..." : "Ask me anything!"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {/* Global Speech Stop Button */}
                {isSpeaking && (
                  <button
                    onClick={stopSpeaking}
                    className="p-1 rounded transition-colors text-white bg-red-500/80 hover:bg-red-600"
                    title="Stop speaking"
                  >
                    <VolumeX className="w-4 h-4" />
                  </button>
                )}
                {/* Speech Toggle Button */}
                <button
                  onClick={() => setSpeechEnabled(!speechEnabled)}
                  className={`p-1 rounded transition-colors ${
                    speechEnabled
                      ? "text-white bg-white/20"
                      : "text-white/60 hover:text-white/80"
                  }`}
                  title={
                    speechEnabled ? "Disable auto-speech" : "Enable auto-speech"
                  }
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white/80 hover:text-white p-1 rounded transition-colors"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white p-1 rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Content */}
            {!isMinimized && (
              <>
                {/* Messages Container - Scrollable */}
                <div className="flex-1 overflow-hidden flex flex-col">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
                    <AnimatePresence>
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          className={`flex ${
                            message.sender === "user"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div
                            className={`flex items-start space-x-2 max-w-[85%] ${
                              message.sender === "user"
                                ? "flex-row-reverse space-x-reverse"
                                : ""
                            }`}
                          >
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                                message.sender === "user"
                                  ? "bg-purple-500"
                                  : "bg-gradient-to-r from-blue-500 to-purple-600"
                              }`}
                            >
                              {message.sender === "user" ? (
                                <User className="w-3 h-3 text-white" />
                              ) : (
                                <Bot className="w-3 h-3 text-white" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div
                                className={`p-3 rounded-lg text-sm break-words ${
                                  message.sender === "user"
                                    ? "bg-purple-500 text-white rounded-br-none"
                                    : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none"
                                }`}
                              >
                                {message.text}
                              </div>
                              <div className="flex items-center justify-between mt-1">
                                <p className="text-xs text-gray-500 dark:text-gray-400 px-1">
                                  {message.timestamp}
                                </p>
                                {message.sender === "ai" && (
                                  <button
                                    onClick={() => toggleSpeech(message.text)}
                                    className={`p-1 rounded transition-colors ${
                                      isSpeaking
                                        ? "text-red-500 hover:text-red-600"
                                        : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                    }`}
                                    title={
                                      isSpeaking
                                        ? "Stop speaking"
                                        : "Listen to this message"
                                    }
                                  >
                                    {isSpeaking ? (
                                      <VolumeX className="w-3 h-3" />
                                    ) : (
                                      <Volume2 className="w-3 h-3" />
                                    )}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* Typing Indicator */}
                    <AnimatePresence>
                      {isTyping && (
                        <motion.div
                          key="typing-indicator"
                          className="flex justify-start"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                        >
                          <div className="flex items-start space-x-2">
                            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                              <Bot className="w-3 h-3 text-white" />
                            </div>
                            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg rounded-bl-none">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div
                                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.1s" }}
                                ></div>
                                <div
                                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.2s" }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick Questions */}
                  {messages.length === 1 && (
                    <div className="px-4 pb-2 border-t border-gray-100 dark:border-gray-700 pt-2">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        Try these questions:
                      </p>
                      <div className="grid grid-cols-1 gap-1 max-h-20 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                        {quickQuestions.map((question, index) => (
                          <button
                            key={index}
                            onClick={() => setInputMessage(question)}
                            className="text-left text-xs p-2 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-700 dark:text-gray-300 truncate"
                          >
                            {question}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Section - Fixed at bottom */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                  {/* Voice Input Indicator */}
                  <AnimatePresence>
                    {isListening && (
                      <motion.div
                        key="voice-indicator"
                        className="mb-2 flex items-center justify-center space-x-2 text-red-500"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      >
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-medium">
                          Listening...
                        </span>
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex space-x-2">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask about Udit or chat with me..."
                        className="w-full p-2 pr-10 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm"
                        disabled={isTyping}
                      />

                      {/* Voice Input Button */}
                      {speechSupported && (
                        <button
                          onClick={toggleListening}
                          disabled={isTyping}
                          className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-all duration-200 ${
                            isListening
                              ? "text-red-500 bg-red-50 dark:bg-red-900/20"
                              : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                          title={
                            isListening ? "Stop listening" : "Start voice input"
                          }
                        >
                          {isListening ? (
                            <MicOff className="w-4 h-4" />
                          ) : (
                            <Mic className="w-4 h-4" />
                          )}
                        </button>
                      )}
                    </div>

                    <motion.button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isTyping}
                      className="p-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg hover:from-purple-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Send className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        .scrollbar-thumb-gray-300::-webkit-scrollbar-thumb {
          background-color: #d1d5db;
          border-radius: 0.375rem;
        }
        .scrollbar-thumb-gray-600::-webkit-scrollbar-thumb {
          background-color: #4b5563;
          border-radius: 0.375rem;
        }
        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background-color: #d1d5db;
          border-radius: 0.375rem;
        }
        .dark ::-webkit-scrollbar-thumb {
          background-color: #4b5563;
        }
        ::-webkit-scrollbar-thumb:hover {
          background-color: #9ca3af;
        }
        .dark ::-webkit-scrollbar-thumb:hover {
          background-color: #6b7280;
        }
      `}</style>
    </>
  );
};

export default AIPortfolioChatbot;