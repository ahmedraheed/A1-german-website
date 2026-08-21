import React, { useState, useMemo } from 'react';
import { Search, Volume2, CheckCircle2, Circle, Sparkles, Filter } from 'lucide-react';
import { speakGerman, useSpeakingText } from '../utils/speech';
import confetti from 'canvas-confetti';

export default function VocabularyTab({ verbs, sentencesMap, masteredSet, toggleMastered }) {
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
      // Trigger subtle celebratory confetti burst from button origin
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
              background: 'rgba(0, 0, 0, 0.25)',
              color: '#fff',
              fontSize: '0.95rem',
              outline: 'none'
            }}
          />
        </div>

        {/* Status Filter Tabs */}
        <div style={{ display: 'flex', gap: '8px', background: 'rgba(0,0,0,0.2)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <button
            onClick={() => setStatusFilter('all')}
            className={`btn ${statusFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '0.85rem', borderRadius: '8px' }}
          >
            All ({verbs.length})
          </button>
          <button
            onClick={() => setStatusFilter('learning')}
            className={`btn ${statusFilter === 'learning' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '0.85rem', borderRadius: '8px' }}
          >
            To Learn ({verbs.length - masteredSet.size})
          </button>
          <button
            onClick={() => setStatusFilter('mastered')}
            className={`btn ${statusFilter === 'mastered' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '0.85rem', borderRadius: '8px' }}
          >
            Mastered ({masteredSet.size})
          </button>
        </div>
      </div>

      {/* Grid of Verb Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {filteredVerbs.map((item) => {
          const isMastered = masteredSet.has(item.id);
          const example = sentencesMap[item.german];

          return (
            <div
              key={item.id}
              className="glass-panel"
              style={{
                padding: '20px',
                borderRadius: '16px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                border: isMastered ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-color)',
                background: isMastered ? 'rgba(16, 185, 129, 0.05)' : 'var(--bg-card)',
                transition: 'transform 0.2s ease, border-color 0.2s ease'
              }}
            >
              <div>
                {/* Top Card Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span className={`badge ${isMastered ? 'badge-emerald' : 'badge-gold'}`}>
                    {isMastered ? 'Mastered' : 'A1 Verb'}
                  </span>

                  <button
                    onClick={() => speakGerman(item.german)}
                    className={`btn btn-secondary ${speakingText === item.german ? 'speaker-btn-active' : ''}`}
                    style={{ padding: '6px 10px', borderRadius: '8px', color: speakingText === item.german ? '#ef4444' : 'var(--color-gold)' }}
                    title="Pronounce German Audio"
                  >
                    <Volume2 style={{ width: '16px', height: '16px' }} />
                  </button>
                </div>

                {/* German Word */}
                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '4px', letterSpacing: '-0.3px' }}>
                  {item.german}
                </h3>

                {/* Romanized Phonetic */}
                <div style={{ fontSize: '0.9rem', color: '#60a5fa', fontWeight: '600', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🗣️ {item.roman}</span>
                </div>

                {/* English Definition */}
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: '500', marginBottom: '14px' }}>
                  🇬🇧 {item.english}
                </p>

                {/* Example sentence if available */}
                {example && (
                  <div style={{ padding: '10px 12px', background: 'rgba(0,0,0,0.25)', borderRadius: '10px', borderLeft: '3px solid var(--color-gold)', marginBottom: '16px' }}>
                    <div style={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: '700' }}>{example.example}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{example.english}</div>
                  </div>
                )}
              </div>

              {/* Bottom Toggle Action */}
              <button
                onClick={(e) => handleToggle(item.id, e)}
                className={`btn ${isMastered ? 'btn-success' : 'btn-secondary'}`}
                style={{ width: '100%', marginTop: '8px', padding: '10px', fontSize: '0.9rem', borderRadius: '10px' }}
              >
                {isMastered ? (
                  <>
                    <CheckCircle2 style={{ width: '18px', height: '18px' }} />
                    Mastered (Click to Undo)
                  </>
                ) : (
                  <>
                    <Circle style={{ width: '18px', height: '18px' }} />
                    Mark as Done
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {filteredVerbs.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          <Sparkles style={{ width: '48px', height: '48px', color: 'var(--color-gold)', margin: '0 auto 16px auto', display: 'block' }} />
          <h3>No German words found</h3>
          <p>Try clearing your search or changing status filters.</p>
        </div>
      )}
    </div>
  );
}
