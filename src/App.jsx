import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import SentencesTab from './components/SentencesTab';
import NounsTab from './components/NounsTab';
import VocabularyTab from './components/VocabularyTab';
import FlashcardsTab from './components/FlashcardsTab';
import SpeedMatchGame from './components/SpeedMatchGame';
import QuizTab from './components/QuizTab';
import PhoneticsTab from './components/PhoneticsTab';
import RoadmapTab from './components/RoadmapTab';
import SentenceBankTab from './components/SentenceBankTab';
import DocScannerModal from './components/DocScannerModal';

import germanData from './data/germanData.json';

export default function App() {
  const [activeTab, setActiveTab] = useState(() => {
    try {
      return localStorage.getItem('german_active_tab') || 'sentences';
    } catch {
      return 'sentences';
    }
  });

  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('german_app_theme') || 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('german_app_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const [isScannerOpen, setIsScannerOpen] = useState(false);

  // Custom uploaded verbs stored in localStorage
  const [customVerbs, setCustomVerbs] = useState(() => {
    try {
      const saved = localStorage.getItem('german_custom_verbs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Mastered Verbs State (stored in localStorage)
  const [masteredIds, setMasteredIds] = useState(() => {
    try {
      const saved = localStorage.getItem('german_mastered_verbs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Mastered Nouns State (stored in localStorage)
  const [masteredNounIds, setMasteredNounIds] = useState(() => {
    try {
      const saved = localStorage.getItem('german_mastered_nouns');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Mastered Sentences State (stored in localStorage)
  const [masteredSentenceIds, setMasteredSentenceIds] = useState(() => {
    try {
      const saved = localStorage.getItem('german_mastered_sentences');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Mastered 2,000 Sentence Bank State (stored in localStorage)
  const [masteredBankIds, setMasteredBankIds] = useState(() => {
    try {
      const saved = localStorage.getItem('german_mastered_bank_sentences');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Daily Streak Counter
  const [streak, setStreak] = useState(() => {
    try {
      const savedStreak = localStorage.getItem('german_user_streak');
      const lastVisit = localStorage.getItem('german_last_visit_date');
      const today = new Date().toISOString().split('T')[0];

      if (!lastVisit) {
        localStorage.setItem('german_last_visit_date', today);
        localStorage.setItem('german_user_streak', '1');
        return 1;
      } else if (lastVisit !== today) {
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        const newStreak = lastVisit === yesterday ? (parseInt(savedStreak || '1', 10) + 1) : 1;
        localStorage.setItem('german_last_visit_date', today);
        localStorage.setItem('german_user_streak', newStreak.toString());
        return newStreak;
      }
      return parseInt(savedStreak || '1', 10);
    } catch {
      return 1;
    }
  });

  // Combined built-in verbs + custom imported verbs
  const allVerbs = useMemo(() => {
    return [...germanData.verbs, ...customVerbs];
  }, [customVerbs]);

  const masteredSet = useMemo(() => new Set(masteredIds), [masteredIds]);
  const masteredNounsSet = useMemo(() => new Set(masteredNounIds), [masteredNounIds]);
  const masteredSentencesSet = useMemo(() => new Set(masteredSentenceIds), [masteredSentenceIds]);
  const masteredBankSet = useMemo(() => new Set(masteredBankIds), [masteredBankIds]);

  const toggleMastered = (id) => {
    setMasteredIds(prev => {
      let updated;
      if (prev.includes(id)) {
        updated = prev.filter(item => item !== id);
      } else {
        updated = [...prev, id];
      }
      localStorage.setItem('german_mastered_verbs', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleMasteredNoun = (id) => {
    setMasteredNounIds(prev => {
      let updated;
      if (prev.includes(id)) {
        updated = prev.filter(item => item !== id);
      } else {
        updated = [...prev, id];
      }
      localStorage.setItem('german_mastered_nouns', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleMasteredSentence = (id) => {
    setMasteredSentenceIds(prev => {
      let updated;
      if (prev.includes(id)) {
        updated = prev.filter(item => item !== id);
      } else {
        updated = [...prev, id];
      }
      localStorage.setItem('german_mastered_sentences', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleMasteredBankSentence = (id) => {
    setMasteredBankIds(prev => {
      let updated;
      if (prev.includes(id)) {
        updated = prev.filter(item => item !== id);
      } else {
        updated = [...prev, id];
      }
      localStorage.setItem('german_mastered_bank_sentences', JSON.stringify(updated));
      return updated;
    });
  };

  const handleImportWords = (newWords) => {
    setCustomVerbs(prev => {
      const updated = [...prev, ...newWords];
      localStorage.setItem('german_custom_verbs', JSON.stringify(updated));
      return updated;
    });
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all mastered words, nouns, sentences, and uploaded custom words?')) {
      setMasteredIds([]);
      setMasteredNounIds([]);
      setMasteredSentenceIds([]);
      setMasteredBankIds([]);
      setCustomVerbs([]);
      localStorage.removeItem('german_mastered_verbs');
      localStorage.removeItem('german_mastered_nouns');
      localStorage.removeItem('german_mastered_sentences');
      localStorage.removeItem('german_mastered_bank_sentences');
      localStorage.removeItem('german_custom_verbs');
    }
  };

  // Map sentences for fast lookup
  const sentencesMap = useMemo(() => {
    const map = {};
    (germanData.sentences || []).forEach(s => {
      map[s.verb] = s;
    });
    return map;
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        masteredCount={masteredSet.size + masteredNounsSet.size + masteredSentencesSet.size}
        totalVerbs={allVerbs.length + 577 + 520}
        streak={streak}
        onResetProgress={handleResetProgress}
        onOpenScanner={() => setIsScannerOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main style={{ flex: 1 }}>
        {activeTab === 'bank' && (
          <SentenceBankTab
            masteredBankSet={masteredBankSet}
            toggleMasteredBankSentence={toggleMasteredBankSentence}
          />
        )}

        {activeTab === 'sentences' && (
          <SentencesTab
            masteredSentencesSet={masteredSentencesSet}
            toggleMasteredSentence={toggleMasteredSentence}
          />
        )}

        {activeTab === 'nouns' && (
          <NounsTab
            masteredNounsSet={masteredNounsSet}
            toggleMasteredNoun={toggleMasteredNoun}
          />
        )}

        {activeTab === 'vocab' && (
          <VocabularyTab
            verbs={allVerbs}
            sentencesMap={sentencesMap}
            masteredSet={masteredSet}
            toggleMastered={toggleMastered}
          />
        )}

        {activeTab === 'flashcards' && (
          <FlashcardsTab
            verbs={allVerbs}
            sentencesMap={sentencesMap}
            masteredSet={masteredSet}
            toggleMastered={toggleMastered}
          />
        )}

        {activeTab === 'speedmatch' && (
          <SpeedMatchGame
            verbs={allVerbs}
            masteredSet={masteredSet}
            toggleMastered={toggleMastered}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizTab
            conjugations={germanData.conjugations}
          />
        )}

        {activeTab === 'phonetics' && (
          <PhoneticsTab
            sounds={germanData.sounds}
            mistakes={germanData.mistakes}
            grammar={germanData.grammar}
          />
        )}

        {activeTab === 'roadmap' && (
          <RoadmapTab
            studyPlan={germanData.studyPlan}
            expressions={germanData.expressions}
          />
        )}
      </main>

      <DocScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        existingVerbs={allVerbs}
        onImportWords={handleImportWords}
      />

      <footer style={{ borderTop: '1px solid var(--border-color)', padding: '24px 16px', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
        <p>German A1-A2 Master • 520 Short Sentences + 577 Core Nouns + 237 Verbs & Vocabulary</p>
      </footer>
    </div>
  );
}
