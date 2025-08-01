import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Sparkles } from "lucide-react";

// Import components (these will be separate files)
import ChatWindow from "./ChatWindow";
import VoiceModeManager from "./hooks/VoiceModeManager";
import SpeechManager from "./hooks/SpeechManager";
import { generateAIResponse } from "./services/geminiService";

const AIPortfolioChatbot = () => {
  // Main state management
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

  // Voice-related states
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);

  // Voice mode states
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [voiceModeActive, setVoiceModeActive] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [voiceInputComplete, setVoiceInputComplete] = useState(false);

  // Refs
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const currentUtteranceRef = useRef(null);
  const voiceModeTimeoutRef = useRef(null);
  const isProcessingVoiceRef = useRef(false);

  // Custom hooks for voice functionality
  const voiceModeManager = VoiceModeManager({
    isVoiceMode,
    setIsVoiceMode,
    voiceModeActive,
    setVoiceModeActive,
    setCurrentTranscript,
    setInterimTranscript,
    setVoiceInputComplete,
    setSpeechEnabled,
    isListening,
    setIsListening,
    isSpeaking,
    speechSupported,
    recognitionRef,
    voiceModeTimeoutRef,
    isProcessingVoiceRef,
    isTyping,
  });

  const speechManager = SpeechManager({
    isSpeaking,
    setIsSpeaking,
    currentUtteranceRef,
    isVoiceMode,
    voiceModeActive,
    setCurrentTranscript,
    setVoiceInputComplete,
    isProcessingVoiceRef,
    startVoiceModeListening: voiceModeManager.startVoiceModeListening,
  });

  // Initialize speech recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      setSpeechSupported(true);
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";

      // In AIPortfolioChatbot.jsx - Update the speech recognition onresult handler:

      recognitionRef.current.onresult = (event) => {
        let interim = "";
        let final = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            final += transcript;
          } else {
            interim += transcript;
          }
        }

        if (isVoiceMode) {
          setInterimTranscript(interim);
          if (final) {
            setCurrentTranscript(final);
            setInterimTranscript("");
            setVoiceInputComplete(true);
            setIsListening(false);

            // Auto-send in voice mode with minimal delay for faster interaction
            if (!isProcessingVoiceRef.current) {
              isProcessingVoiceRef.current = true;
              setTimeout(() => {
                handleSendMessage(final);
              }, 50); // Reduced from 100ms to 50ms
            }
          }
        } else {
          // Regular mode - use final result only
          if (final) {
            setInputMessage(final);
            setIsListening(false);
          }
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);

        // Restart listening in voice mode if there's an error
        if (isVoiceMode && voiceModeActive && !isSpeaking) {
          setTimeout(() => {
            voiceModeManager.startVoiceModeListening();
          }, 1000);
        }
      };

      // Enhanced onend to handle voice mode continuation
      recognitionRef.current.onend = () => {
        setIsListening(false);
        setInterimTranscript("");

        // Continue listening in voice mode if not processing
        if (
          isVoiceMode &&
          voiceModeActive &&
          !isSpeaking &&
          !isProcessingVoiceRef.current
        ) {
          setTimeout(() => {
            voiceModeManager.startVoiceModeListening();
          }, 500);
        }
      };
    }
  }, [isVoiceMode, voiceModeActive, isSpeaking]);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced handleSendMessage to support voice mode auto-send
  // In AIPortfolioChatbot.jsx - Replace the handleSendMessage function:

  const handleSendMessage = async (messageText = null) => {
    const textToSend = messageText || inputMessage;
    if (!textToSend.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: textToSend,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!messageText) setInputMessage(""); // Only clear if not auto-sent
    setIsTyping(true);

    // Generate AI response with faster processing
    try {
      const aiResponse = await generateAIResponse(textToSend);

      // Reduced delay for faster response - especially in voice mode
      const responseDelay = isVoiceMode ? 300 : 800; // Much faster in voice mode

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

        // Enhanced auto-speak logic for voice mode with immediate speech
        if (speechEnabled || isVoiceMode) {
          // Start speaking immediately without additional delay
          speechManager.speakText(aiResponse);
        }
      }, responseDelay);
    } catch (error) {
      console.error("Error generating response:", error);
      setIsTyping(false);

      // Fallback response
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm having trouble processing that right now. Could you try rephrasing your question?",
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (voiceModeTimeoutRef.current) {
        clearTimeout(voiceModeTimeoutRef.current);
      }
      if (isSpeaking) {
        speechManager.stopSpeaking();
      }
      if (isListening) {
        stopListening();
      }
    };
  }, []);

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

      {/* Chat Window Component */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <ChatWindow
            isMinimized={isMinimized}
            setIsMinimized={setIsMinimized}
            setIsOpen={setIsOpen}
            messages={messages}
            messagesEndRef={messagesEndRef}
            isTyping={isTyping}
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            handleSendMessage={handleSendMessage}
            handleKeyPress={handleKeyPress}
            quickQuestions={quickQuestions}
            // Voice related props
            isListening={isListening}
            speechSupported={speechSupported}
            isSpeaking={isSpeaking}
            speechEnabled={speechEnabled}
            setSpeechEnabled={setSpeechEnabled}
            toggleListening={toggleListening}
            // Voice mode props
            isVoiceMode={isVoiceMode}
            voiceModeActive={voiceModeActive}
            toggleVoiceMode={voiceModeManager.toggleVoiceMode}
            currentTranscript={currentTranscript}
            interimTranscript={interimTranscript}
            voiceInputComplete={voiceInputComplete}
            // Speech functions
            toggleSpeech={speechManager.toggleSpeech}
            stopSpeaking={speechManager.stopSpeaking}
          />
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
