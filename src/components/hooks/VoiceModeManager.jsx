import { useCallback } from "react";

const VoiceModeManager = ({
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
}) => {

  
  const startVoiceModeListening = useCallback(() => {
    if (!speechSupported || !recognitionRef.current || isSpeaking || isTyping) {
      return;
    }

    try {
      setIsListening(true);

      // Configure for more responsive listening
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.maxAlternatives = 1;

      recognitionRef.current.start();

      // Reduced timeout for more responsive interaction
      if (voiceModeTimeoutRef.current) {
        clearTimeout(voiceModeTimeoutRef.current);
      }

      voiceModeTimeoutRef.current = setTimeout(() => {
        if (isListening && !isSpeaking) {
          recognitionRef.current?.stop();
          setIsListening(false);

          // Restart listening faster
          setTimeout(() => {
            if (isVoiceMode && voiceModeActive && !isSpeaking) {
              startVoiceModeListening();
            }
          }, 500); // Reduced from 1000ms
        }
      }, 8000); // Reduced from 10 seconds to 8 seconds
    } catch (error) {
      console.error("Error starting voice recognition:", error);
      setIsListening(false);

      // Faster retry after error
      setTimeout(() => {
        if (isVoiceMode && voiceModeActive && !isSpeaking) {
          startVoiceModeListening();
        }
      }, 1000); // Reduced from 2000ms
    }
  }, [
    speechSupported,
    isSpeaking,
    isTyping,
    isListening,
    isVoiceMode,
    voiceModeActive,
    setIsListening,
  ]);

  const toggleVoiceMode = useCallback(() => {
    if (!speechSupported) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }

    if (isVoiceMode) {
      // Exit voice mode
      setIsVoiceMode(false);
      setVoiceModeActive(false);
      setCurrentTranscript("");
      setInterimTranscript("");
      setVoiceInputComplete(false);
      isProcessingVoiceRef.current = false;

      // Stop current recognition
      if (recognitionRef.current && isListening) {
        recognitionRef.current.stop();
        setIsListening(false);
      }

      // Clear timeout
      if (voiceModeTimeoutRef.current) {
        clearTimeout(voiceModeTimeoutRef.current);
        voiceModeTimeoutRef.current = null;
      }

      // Stop speaking if currently speaking
      if (isSpeaking) {
        window.speechSynthesis.cancel();
      }
    } else {
      // Enter voice mode
      setIsVoiceMode(true);
      setVoiceModeActive(true);
      setSpeechEnabled(true); // Auto-enable speech in voice mode
      setCurrentTranscript("");
      setInterimTranscript("");
      setVoiceInputComplete(false);
      isProcessingVoiceRef.current = false;

      // Start listening after a short delay
      setTimeout(() => {
        startVoiceModeListening();
      }, 500);
    }
  }, [
    speechSupported,
    isVoiceMode,
    isListening,
    isSpeaking,
    setIsVoiceMode,
    setVoiceModeActive,
    setCurrentTranscript,
    setInterimTranscript,
    setVoiceInputComplete,
    setSpeechEnabled,
    setIsListening,
    startVoiceModeListening,
  ]);

  const stopVoiceModeListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    if (voiceModeTimeoutRef.current) {
      clearTimeout(voiceModeTimeoutRef.current);
      voiceModeTimeoutRef.current = null;
    }
  }, [isListening, setIsListening]);

  return {
    toggleVoiceMode,
    startVoiceModeListening,
    stopVoiceModeListening,
  };
};

export default VoiceModeManager;
