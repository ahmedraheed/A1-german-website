import React, { useState, useMemo } from 'react';
import { Search, Volume2, CheckCircle2, Circle, Sparkles, Filter, BookOpen, Layers } from 'lucide-react';
import { speakGerman, useSpeakingText } from '../utils/speech';
import confetti from 'canvas-confetti';
import VerbsGuideTab from './VerbsGuideTab';

export default function VocabularyTab({ verbs, sentencesMap, masteredSet, toggleMastered }) {
  const [viewMode, setViewMode] = useState('guide'); // 'guide' (88 Verb Rules) or 'list' (Verbs list)
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'learning', 'mastered'
  const speakingText = useSpeakingText();

  const filteredVerbs = useMemo(() => {
    return verbs.filter(item => {
      const matchesSearch = 
        item.german.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.roman.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.english.toLowerCase().includes(searchTerm.toLowerCase());
      
      const isMastered = masteredSet.has(item.id);
      
      if (statusFilter === 'learning') return matchesSearch && !isMastered;
      if (statusFilter === 'mastered') return matchesSearch && isMastered;
      return matchesSearch;
    });
  }, [verbs, searchTerm, statusFilter, masteredSet]);

  const handleToggle = (id, event) => {
    const isNowMastered = !masteredSet.has(id);
    toggleMastered(id);

    if (isNowMastered && event) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { x, y },
        colors: ['#10b981', '#f59e0b', '#3b82f6']
      });
    }
  };

  return (
    <div>
      {/* Top View Mode Switcher */}
      <div style={{ maxWidth: '1280px', margin: '0 auto 20px auto', padding: '0 16px', display: 'flex', justifyContent: 'center' }}>
        <div className="glass-panel" style={{ padding: '6px', borderRadius: '16px', display: 'inline-flex', gap: '6px', background: 'rgba(15, 23, 42, 0.6)' }}>
          <button
            onClick={() => setViewMode('guide')}
            className={`btn ${viewMode === 'guide' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 20px', fontSize: '0.9rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}
          >
            <BookOpen style={{ width: '16px', height: '16px' }} />
            <span>Complete 88 Verb Rules Guide</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 20px', fontSize: '0.9rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Layers style={{ width: '16px', height: '16px' }} />
            <span>All Verbs & Vocabulary ({verbs.length})</span>
          </button>
        </div>
      </div>

      {viewMode === 'guide' ? (
        <VerbsGuideTab />
      ) : (
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px 40px 16px' }}>
          {/* Controls Bar */}
          <div className="glass-panel" style={{ padding: '16px 20px', marginBottom: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Search Input */}
            <div style={{ position: 'relative', flex: '1', minWidth: '260px' }}>
              <Search style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search German verb, Roman sound, or English..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 42px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-card)',
                  color: 'var(--text-main)',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Filter Pills */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => setStatusFilter('all')}
                className={`btn ${statusFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '8px 14px', fontSize: '0.85rem', borderRadius: '10px' }}
              >
                All ({verbs.length})
              </button>
              <button
                onClick={() => setStatusFilter('learning')}
                className={`btn ${statusFilter === 'learning' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '8px 14px', fontSize: '0.85rem', borderRadius: '10px' }}
              >
                Learning ({verbs.length - masteredSet.size})
              </button>
              <button
                onClick={() => setStatusFilter('mastered')}
                className={`btn ${statusFilter === 'mastered' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '8px 14px', fontSize: '0.85rem', borderRadius: '10px', color: '#10b981' }}
              >
                Mastered ({masteredSet.size})
              </button>
            </div>
          </div>

          {/* Verbs List / Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
            {filteredVerbs.map(item => {
              const isMastered = masteredSet.has(item.id);
              const exampleSentence = sentencesMap[item.german];
              const isSpeaking = speakingText === item.german;

              return (
                <div
                  key={item.id}
                  className={`glass-panel card-hover ${isMastered ? 'card-mastered' : ''}`}
                  style={{
                    padding: '20px',
                    borderRadius: '18px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '14px',
                    position: 'relative',
                    transition: 'all 0.25 ease'
                  }}
                >
                  {/* Top Item Row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)', letterSpacing: '-0.3px' }}>
                          {item.german}
                        </span>
                        <button
                          onClick={() => speakGerman(item.german)}
                          className={`btn btn-secondary ${isSpeaking ? 'speaker-btn-active' : ''}`}
                          style={{ padding: '6px 8px', borderRadius: '8px', color: isSpeaking ? '#ef4444' : 'var(--color-gold)' }}
                          title="Listen Pronunciation"
                        >
                          <Volume2 style={{ width: '16px', height: '16px' }} />
                        </button>
                      </div>
                      <div style={{ fontSize: '0.88rem', color: '#60a5fa', fontWeight: '600', marginBottom: '2px' }}>
                        🔊 {item.roman}
                      </div>
                      <div style={{ fontSize: '0.92rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                        {item.english}
                      </div>
                    </div>

                    {/* Master Check Button */}
                    <button
                      onClick={(e) => handleToggle(item.id, e)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '50%',
                        color: isMastered ? '#10b981' : 'var(--text-muted)',
                        transition: 'transform 0.2s ease'
                      }}
                      title={isMastered ? 'Mark as Learning' : 'Mark as Mastered'}
                    >
                      {isMastered ? (
                        <CheckCircle2 style={{ width: '26px', height: '26px', fill: 'rgba(16, 185, 129, 0.2)' }} />
                      ) : (
                        <Circle style={{ width: '26px', height: '26px', opacity: 0.5 }} />
                      )}
                    </button>
                  </div>

                  {/* Context Sentence Example if available */}
                  {exampleSentence && (
                    <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px 12px', borderRadius: '10px', fontSize: '0.85rem', borderLeft: '3px solid var(--color-gold)' }}>
                      <div style={{ fontWeight: '600', color: 'var(--text-main)', marginBottom: '2px' }}>
                        💬 {exampleSentence.german}
                      </div>
                      <div style={{ color: 'var(--text-muted)' }}>
                        {exampleSentence.english}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
