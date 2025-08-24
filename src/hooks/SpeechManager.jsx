import { useCallback } from "react";

const SpeechManager = ({
  isSpeaking,
  setIsSpeaking,
  currentUtteranceRef,
  isVoiceMode,
  voiceModeActive,
  setCurrentTranscript,
  setVoiceInputComplete,
  isProcessingVoiceRef,
  startVoiceModeListening
}) => {

  const speakText = useCallback((text) => {
    if (!text || !window.speechSynthesis) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    currentUtteranceRef.current = utterance;

    // Configure voice settings
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;

    // Try to use a more natural voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Google') || 
      voice.name.includes('Microsoft') || 
      voice.localService === false
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      currentUtteranceRef.current = null;
      
      // In voice mode, reset processing flag and restart listening
      if (isVoiceMode && voiceModeActive) {
        isProcessingVoiceRef.current = false;
        setCurrentTranscript("");
        setVoiceInputComplete(false);
        
        // Start listening again after speech ends
        setTimeout(() => {
          if (isVoiceMode && voiceModeActive && !isProcessingVoiceRef.current) {
            startVoiceModeListening?.();
          }
        }, 1000);
      }
    };

    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      setIsSpeaking(false);
      currentUtteranceRef.current = null;
      
      // In voice mode, reset and continue
      if (isVoiceMode && voiceModeActive) {
        isProcessingVoiceRef.current = false;
        setTimeout(() => {
          if (isVoiceMode && voiceModeActive) {
            startVoiceModeListening?.();
          }
        }, 1000);
      }
    };

    // Speak the text
    window.speechSynthesis.speak(utterance);
  }, [
    setIsSpeaking,
    isVoiceMode,
    voiceModeActive,
    setCurrentTranscript,
    setVoiceInputComplete,
    startVoiceModeListening
  ]);

  const stopSpeaking = useCallback(() => {
    if (window.speechSynthesis && isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      currentUtteranceRef.current = null;
    }
  }, [isSpeaking, setIsSpeaking]);

  const toggleSpeech = useCallback(() => {
    if (isSpeaking) {
      stopSpeaking();
    }
  }, [isSpeaking, stopSpeaking]);

  return {
    speakText,
    stopSpeaking,
    toggleSpeech
  };
};

export default SpeechManager;