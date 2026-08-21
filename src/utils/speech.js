import { useState, useEffect } from 'react';

// Native Web Speech API helper for German Pronunciation with Auto-Repeat Loop
let currentText = null;
let isLooping = false;
let loopTimeoutId = null;

const listeners = new Set();

const notifyListeners = () => {
  listeners.forEach(cb => cb(currentText));
};

export const useSpeakingText = () => {
  const [speakingText, setSpeakingText] = useState(currentText);

  useEffect(() => {
    const handleStateChange = (text) => setSpeakingText(text);
    listeners.add(handleStateChange);
    return () => listeners.delete(handleStateChange);
  }, []);

  return speakingText;
};

export const stopGerman = () => {
  isLooping = false;
  currentText = null;
  notifyListeners();
  if (loopTimeoutId) {
    clearTimeout(loopTimeoutId);
    loopTimeoutId = null;
  }
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

export const speakGerman = (text) => {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return;
  }

  // If already repeating this text, press again to stop manually
  if (isLooping && currentText === text) {
    stopGerman();
    return;
  }

  // Clear previous state and cancel active speech
  stopGerman();

  currentText = text;
  isLooping = true;
  notifyListeners();

  const playUtterance = () => {
    if (!isLooping || currentText !== text) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.rate = 0.88; // Slightly relaxed pace for learning clarity

    const voices = window.speechSynthesis.getVoices();
    const deVoice = voices.find(v => v.lang.startsWith('de') || v.lang.includes('DE'));
    if (deVoice) {
      utterance.voice = deVoice;
    }

    utterance.onend = () => {
      if (isLooping && currentText === text) {
        loopTimeoutId = setTimeout(() => {
          playUtterance();
        }, 350); // Natural pause between repetitions
      }
    };

    utterance.onerror = (e) => {
      // Don't restart if explicitly canceled or interrupted
      if (e.error === 'canceled' || e.error === 'interrupted') {
        return;
      }
      if (isLooping && currentText === text) {
        loopTimeoutId = setTimeout(() => {
          playUtterance();
        }, 500);
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  playUtterance();
};


