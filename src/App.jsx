import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import VocabularyTab from './components/VocabularyTab';
import FlashcardsTab from './components/FlashcardsTab';
import SpeedMatchGame from './components/SpeedMatchGame';
import QuizTab from './components/QuizTab';
import PhoneticsTab from './components/PhoneticsTab';
import RoadmapTab from './components/RoadmapTab';

import germanData from './data/germanData.json';

export default function App() {
  const [activeTab, setActiveTab] = useState('vocab');

  // Mastered Verbs State (stored in localStorage)
  const [masteredIds, setMasteredIds] = useState(() => {
    try {
      const saved = localStorage.getItem('german_mastered_verbs');
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

  const masteredSet = useMemo(() => new Set(masteredIds), [masteredIds]);

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

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all mastered words progress?')) {
      setMasteredIds([]);
      localStorage.removeItem('german_mastered_verbs');
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
        masteredCount={masteredSet.size}
        totalVerbs={germanData.verbs.length}
        streak={streak}
        onResetProgress={handleResetProgress}
      />

      <main style={{ flex: 1 }}>
        {activeTab === 'vocab' && (
          <VocabularyTab
            verbs={germanData.verbs}
            sentencesMap={sentencesMap}
            masteredSet={masteredSet}
            toggleMastered={toggleMastered}
          />
        )}

        {activeTab === 'flashcards' && (
          <FlashcardsTab
            verbs={germanData.verbs}
            sentencesMap={sentencesMap}
            masteredSet={masteredSet}
            toggleMastered={toggleMastered}
          />
        )}

        {activeTab === 'speedmatch' && (
          <SpeedMatchGame
            verbs={germanData.verbs}
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

      <footer style={{ borderTop: '1px solid var(--border-color)', padding: '24px 16px', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
        <p>German A1 Word & Verb Master • Built with 237 Verbs from your Word document</p>
      </footer>
    </div>
  );
}
