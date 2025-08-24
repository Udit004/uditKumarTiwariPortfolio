import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Minimize2, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Phone,
  PhoneOff,
  Bot,
  User
} from "lucide-react";

const ChatWindow = ({
  isMinimized,
  setIsMinimized,
  setIsOpen,
  messages,
  messagesEndRef,
  isTyping,
  inputMessage,
  setInputMessage,
  handleSendMessage,
  handleKeyPress,
  quickQuestions,
  isListening,
  speechSupported,
  isSpeaking,
  speechEnabled,
  setSpeechEnabled,
  toggleListening,
  isVoiceMode,
  voiceModeActive,
  toggleVoiceMode,
  currentTranscript,
  interimTranscript,
  voiceInputComplete,
  toggleSpeech,
  stopSpeaking
}) => {
  const handleQuickQuestion = (question) => {
    setInputMessage(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  // Enhanced Voice Mode Full-Screen UI
  if (isVoiceMode && voiceModeActive) {
    return (
      <motion.div
        key="voice-mode-ui"
        className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 h-[500px] sm:h-[600px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col"
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
                {isListening ? "Listening..." : 
                 isSpeaking ? "Speaking..." : 
                 "Voice Mode Active"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {/* Voice Mode Toggle Button */}
            <button
              onClick={toggleVoiceMode}
              className="text-white bg-green-500/80 hover:bg-green-600 p-1 rounded transition-colors"
              title="Disable voice mode"
            >
              <Phone className="w-4 h-4" />
            </button>
            
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
              title={speechEnabled ? "Disable auto-speech" : "Enable auto-speech"}
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

        {/* Voice Mode Full-Screen Interface */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
          {/* Voice Animation Circle */}
          <div className="relative mb-8">
            <motion.div
              className={`w-32 h-32 rounded-full flex items-center justify-center ${
                isListening 
                  ? 'bg-gradient-to-r from-red-400 to-pink-500' 
                  : isSpeaking 
                  ? 'bg-gradient-to-r from-blue-400 to-purple-500'
                  : 'bg-gradient-to-r from-gray-400 to-gray-500'
              }`}
              animate={
                isListening 
                  ? { scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }
                  : isSpeaking
                  ? { scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }
                  : { scale: 1 }
              }
              transition={{
                duration: isListening ? 1.5 : isSpeaking ? 2 : 0.3,
                repeat: (isListening || isSpeaking) ? Infinity : 0,
                ease: "easeInOut"
              }}
            >
              {isListening ? (
                <Mic className="w-12 h-12 text-white" />
              ) : isSpeaking ? (
                <Volume2 className="w-12 h-12 text-white" />
              ) : (
                <Bot className="w-12 h-12 text-white" />
              )}
            </motion.div>

            {/* Pulse rings for listening */}
            {isListening && (
              <>
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-red-400"
                  animate={{ scale: [1, 1.5, 2], opacity: [0.6, 0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-red-400"
                  animate={{ scale: [1, 1.3, 1.8], opacity: [0.4, 0.2, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                />
              </>
            )}
          </div>

          {/* Status Text */}
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              {isListening ? "I'm listening..." : 
               isSpeaking ? "Speaking..." : 
               "Voice Mode Active"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {isListening ? "Say something to get started" : 
               isSpeaking ? "Let me respond to that" : 
               "Ready for your next question"}
            </p>
          </motion.div>

          {/* Real-time Transcript Display */}
          <AnimatePresence mode="wait">
            {(interimTranscript || currentTranscript || voiceInputComplete) && (
              <motion.div
                key="transcript"
                className="w-full max-w-md mx-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2 mb-3">
                    <User className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      You said:
                    </span>
                  </div>
                  <p className="text-lg text-gray-800 dark:text-gray-200">
                    {currentTranscript && (
                      <span className="font-medium">{currentTranscript}</span>
                    )}
                    {interimTranscript && (
                      <span className="text-gray-500 dark:text-gray-500 italic">
                        {interimTranscript}
                      </span>
                    )}
                    {voiceInputComplete && !isSpeaking && !isTyping && (
                      <span className="text-green-500">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse ml-2"></span>
                      </span>
                    )}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Voice Mode Controls */}
          <motion.div
            className="mt-8 flex space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                className="px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors flex items-center space-x-2 shadow-lg"
              >
                <VolumeX className="w-4 h-4" />
                <span>Stop Speaking</span>
              </button>
            )}
            
            <button
              onClick={toggleVoiceMode}
              className="px-6 py-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors flex items-center space-x-2 shadow-lg"
            >
              <X className="w-4 h-4" />
              <span>Exit Voice Mode</span>
            </button>
          </motion.div>

          {/* Subtle instruction text */}
          <motion.p
            className="text-xs text-gray-500 dark:text-gray-500 mt-6 text-center max-w-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Just speak naturally - I'll listen, respond, and keep the conversation going automatically.
          </motion.p>
        </div>
      </motion.div>
    );
  }

  // Regular Chat UI
  return (
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
          {/* Voice Mode Toggle Button */}
          {speechSupported && (
            <button
              onClick={toggleVoiceMode}
              className={`p-1 rounded transition-colors ${
                isVoiceMode
                  ? "text-white bg-green-500/80 hover:bg-green-600"
                  : "text-white/60 hover:text-white/80 hover:bg-white/10"
              }`}
              title={
                isVoiceMode ? "Disable voice mode" : "Enable voice mode"
              }
            >
              {isVoiceMode ? (
                <Phone className="w-4 h-4" />
              ) : (
                <PhoneOff className="w-4 h-4" />
              )}
            </button>
          )}
          
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
          {/* Voice Mode Indicator */}
          {isVoiceMode && voiceModeActive && (
            <div className="bg-green-50 dark:bg-green-900/20 border-b border-green-200 dark:border-green-800 px-4 py-2">
              <div className="flex items-center justify-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  isListening ? 'bg-red-500 animate-pulse' : 
                  isSpeaking ? 'bg-blue-500 animate-pulse' : 
                  'bg-green-500'
                }`}></div>
                <span className="text-xs font-medium text-green-700 dark:text-green-300">
                  {isListening ? "Listening..." : 
                   isSpeaking ? "Speaking..." : 
                   "Voice Mode - Hands-free conversation"}
                </span>
              </div>
            </div>
          )}

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
                          {message.sender === "ai" && !isVoiceMode && (
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
            {messages.length === 1 && !isVoiceMode && (
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
          {!isVoiceMode && (
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
          )}
        </>
      )}
    </motion.div>
  );
};

export default ChatWindow;