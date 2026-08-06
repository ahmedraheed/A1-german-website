// Native Web Speech API helper for German Pronunciation
export const speakGerman = (text) => {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return;
  }

  // Cancel active speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'de-DE';
  utterance.rate = 0.88; // Slightly relaxed pace for learning clarity

  // Find German voice if available
  const voices = window.speechSynthesis.getVoices();
  const deVoice = voices.find(v => v.lang.startsWith('de') || v.lang.includes('DE'));
  if (deVoice) {
    utterance.voice = deVoice;
  }

  window.speechSynthesis.speak(utterance);
};
