import React, { useState, useMemo } from 'react';
import { Volume2, Search, BookOpen, CheckCircle, Sparkles, AlertCircle, HelpCircle, Layers, ArrowRight, Play } from 'lucide-react';
import { speakGerman, useSpeakingText } from '../utils/speech';
import { pronunciationGuideData } from '../data/pronunciationGuideData';

export default function PronunciationGuideTab() {
  const speakingText = useSpeakingText();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedSections, setExpandedSections] = useState({});

  const categories = [
    'All',
    'Alphabet & Vowels',
    'Umlauts & Diphthongs',
    'Consonants & Combinations',
    'Endings & Word Stress',
    'Summary & Drills',
    'Learning Method & Routines'
  ];

  const toggleSection = (num) => {
    setExpandedSections(prev => ({
      ...prev,
      [num]: !prev[num]
    }));
  };

  const expandAll = () => {
    const all = {};
    pronunciationGuideData.sections.forEach(s => {
      all[s.num] = true;
    });
    setExpandedSections(all);
  };

  const collapseAll = () => {
    setExpandedSections({});
  };

  // Filter sections based on search and category
  const filteredSections = useMemo(() => {
    return pronunciationGuideData.sections.filter(sec => {
      // Category match
      if (selectedCategory !== 'All' && sec.category !== selectedCategory) {
        return false;
      }
      // Search match
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();

      const titleMatch = sec.title.toLowerCase().includes(term);
      const descMatch = sec.desc && sec.desc.toLowerCase().includes(term);
      const numMatch = sec.num.toString() === term;

      let exampleMatch = false;
      if (sec.examples) {
        exampleMatch = sec.examples.some(
          ex => ex.german.toLowerCase().includes(term) || ex.roman.toLowerCase().includes(term) || ex.english.toLowerCase().includes(term)
        );
      }

      let itemsMatch = false;
      if (sec.items) {
        itemsMatch = sec.items.some(
          item => item.subtitle.toLowerCase().includes(term) || item.text.toLowerCase().includes(term) ||
          (item.examples && item.examples.some(ex => ex.german.toLowerCase().includes(term) || ex.roman.toLowerCase().includes(term)))
        );
      }

      return titleMatch || descMatch || numMatch || exampleMatch || itemsMatch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px 40px 16px' }}>
      
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '28px 24px', borderRadius: '24px', marginBottom: '28px', background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.95) 100%)', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
          <span className="badge badge-gold" style={{ fontSize: '0.85rem', padding: '6px 12px' }}>
            A1–A2 Complete Reference
          </span>
          <span style={{ color: '#60a5fa', fontSize: '0.88rem', fontWeight: '600' }}>
            70 Sound & Pronunciation Rules
          </span>
        </div>
        <h2 style={{ fontSize: '2.1rem', fontWeight: '800', margin: '0 0 10px 0', background: 'linear-gradient(90deg, #ffffff 0%, #f59e0b 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: '1.2' }}>
          {pronunciationGuideData.title} 🎧
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', margin: '0 0 16px 0', maxWidth: '900px', lineHeight: '1.6' }}>
          {pronunciationGuideData.intro}
        </p>

        {/* Quick Quick Stat Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginTop: '20px' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '12px 16px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--color-gold)' }}>70</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Pronunciation Rules</div>
          </div>
          <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '12px 16px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#60a5fa' }}>26+</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Letter Names & Umlauts</div>
          </div>
          <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '12px 16px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#34d399' }}>100+</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Interactive Audio Examples</div>
          </div>
          <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '12px 16px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#a78bfa' }}>10 Min</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Daily Practice Routine</div>
          </div>
        </div>
      </div>

      {/* Control Row: Search & Category Pills */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
        
        {/* Search Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
            <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', width: '18px', height: '18px' }} />
            <input
              type="text"
              placeholder="Search rule (e.g. 'sch', 'ei', 'stress', 'zwei', '34')..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass-input"
              style={{
                width: '100%',
                padding: '12px 16px 12px 46px',
                borderRadius: '14px',
                fontSize: '0.95rem',
                border: '1px solid var(--border-color)'
              }}
            />
          </div>

          <button
            onClick={expandAll}
            className="btn btn-secondary"
            style={{ padding: '10px 16px', fontSize: '0.85rem', borderRadius: '12px' }}
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="btn btn-secondary"
            style={{ padding: '10px 16px', fontSize: '0.85rem', borderRadius: '12px' }}
          >
            Collapse All
          </button>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                padding: '8px 16px',
                fontSize: '0.85rem',
                borderRadius: '20px',
                whiteSpace: 'nowrap',
                fontWeight: selectedCategory === cat ? '700' : '500'
              }}
            >
              {cat === 'All' ? '🌟 All 70 Rules' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Rules Count */}
      <div style={{ marginBottom: '16px', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
        Showing {filteredSections.length} of 70 section rules
      </div>

      {/* Sections Grid / List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredSections.map((sec) => {
          const isExpanded = expandedSections[sec.num] !== false; // expanded by default

          return (
            <div
              key={sec.num}
              className="glass-panel"
              style={{
                borderRadius: '18px',
                overflow: 'hidden',
                border: '1px solid var(--border-color)',
                transition: 'all 0.2s ease'
              }}
            >
              {/* Section Header */}
              <div
                onClick={() => toggleSection(sec.num)}
                style={{
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  background: 'rgba(255, 255, 255, 0.02)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '32px',
                    height: '32px',
                    borderRadius: '10px',
                    background: 'var(--color-gold)',
                    color: '#000',
                    fontWeight: '800',
                    fontSize: '0.9rem'
                  }}>
                    {sec.num}
                  </span>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', margin: 0, color: '#fff' }}>
                    {sec.title}
                  </h3>
                  <span className="badge badge-secondary" style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                    {sec.category}
                  </span>
                </div>

                <div style={{ color: 'var(--color-gold)', fontSize: '0.9rem', fontWeight: '600' }}>
                  {isExpanded ? '▲ Hide' : '▼ Show details'}
                </div>
              </div>

              {/* Section Body */}
              {isExpanded && (
                <div style={{ padding: '20px', borderTop: '1px solid var(--border-color)' }}>
                  
                  {/* Description if present */}
                  {sec.desc && (
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', margin: '0 0 16px 0' }}>
                      {sec.desc}
                    </p>
                  )}

                  {/* TYPE: Alphabet Table (Section 1) */}
                  {sec.type === 'alphabet_table' && (
                    <div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '10px', marginBottom: '16px' }}>
                        {pronunciationGuideData.alphabet.map((item) => {
                          const isSpeaking = speakingText === item.example;
                          return (
                            <div
                              key={item.letter}
                              style={{
                                background: 'rgba(255, 255, 255, 0.04)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                padding: '10px 14px',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                              }}
                            >
                              <div>
                                <span style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--color-gold)', marginRight: '10px' }}>
                                  {item.letter}
                                </span>
                                <span style={{ fontSize: '0.9rem', color: '#fff' }}>
                                  {item.name}
                                </span>
                              </div>
                              <button
                                onClick={() => speakGerman(item.example)}
                                className={`btn btn-secondary ${isSpeaking ? 'speaker-btn-active' : ''}`}
                                style={{ padding: '6px 10px', borderRadius: '8px' }}
                                title={`Listen example: ${item.example}`}
                              >
                                <Volume2 style={{ width: '14px', height: '14px', color: isSpeaking ? '#ef4444' : 'var(--color-gold)' }} />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                      <div style={{ fontSize: '0.88rem', color: '#60a5fa', fontStyle: 'italic' }}>
                        💡 {pronunciationGuideData.extraLetters}
                      </div>
                    </div>
                  )}

                  {/* TYPE: Rules Summary Table (Section 62) */}
                  {sec.type === 'rules_table' && (
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.92rem' }}>
                        <thead>
                          <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--color-gold)' }}>
                            <th style={{ padding: '10px 12px' }}>Letter / Combo</th>
                            <th style={{ padding: '10px 12px' }}>Sound Rule / Approximation</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pronunciationGuideData.topRulesSummary.map((r, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                              <td style={{ padding: '10px 12px', fontWeight: '800', color: '#fff' }}>{r.key}</td>
                              <td style={{ padding: '10px 12px', color: '#60a5fa', fontWeight: '600' }}>{r.sound}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* TYPE: Common Mistakes Table (Section 64) */}
                  {sec.type === 'mistakes_table' && (
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.92rem' }}>
                        <thead>
                          <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--color-gold)' }}>
                            <th style={{ padding: '10px 12px' }}>Word</th>
                            <th style={{ padding: '10px 12px' }}>❌ Common Wrong</th>
                            <th style={{ padding: '10px 12px' }}>✅ Better German</th>
                            <th style={{ padding: '10px 12px' }}>Translation</th>
                            <th style={{ padding: '10px 12px', textAlign: 'center' }}>Audio</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pronunciationGuideData.commonMistakes.map((m, i) => {
                            const isSpeaking = speakingText === m.word;
                            return (
                              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                                <td style={{ padding: '10px 12px', fontWeight: '800', color: '#fff' }}>{m.word}</td>
                                <td style={{ padding: '10px 12px', color: '#f87171', textDecoration: 'line-through' }}>{m.wrong}</td>
                                <td style={{ padding: '10px 12px', color: '#34d399', fontWeight: '700' }}>{m.correct}</td>
                                <td style={{ padding: '10px 12px', color: 'var(--text-muted)' }}>{m.translate}</td>
                                <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                                  <button
                                    onClick={() => speakGerman(m.word)}
                                    className={`btn btn-secondary ${isSpeaking ? 'speaker-btn-active' : ''}`}
                                    style={{ padding: '6px 10px', borderRadius: '8px' }}
                                  >
                                    <Volume2 style={{ width: '14px', height: '14px', color: isSpeaking ? '#ef4444' : 'var(--color-gold)' }} />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* TYPE: Memory Sheet (Section 69) */}
                  {sec.type === 'memory_sheet' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
                      {pronunciationGuideData.memorySheet.map((m, i) => (
                        <div key={i} style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                          <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--color-gold)' }}>{m.symbol}</div>
                          <div style={{ fontSize: '0.9rem', color: '#60a5fa', fontWeight: '600' }}>{m.sound}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ITEMS LIST (e.g. German A, E, I, S with Short vs Long vs Weak) */}
                  {sec.items && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {sec.items.map((sub, i) => (
                        <div key={i} style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '14px 16px', borderRadius: '14px', borderLeft: '3px solid var(--color-gold)' }}>
                          <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#60a5fa', margin: '0 0 6px 0' }}>
                            {sub.subtitle}
                          </h4>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0 0 10px 0' }}>
                            {sub.text}
                          </p>
                          
                          {/* Examples */}
                          {sub.examples && (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '10px' }}>
                              {sub.examples.map((ex, j) => {
                                const cleanWord = ex.german.split(' ')[0];
                                const isSpeaking = speakingText === cleanWord;
                                return (
                                  <div key={j} style={{ background: 'rgba(0,0,0,0.25)', padding: '8px 12px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div>
                                      <span style={{ fontWeight: '700', color: '#fff', fontSize: '0.92rem' }}>{ex.german}</span>
                                      <span style={{ fontSize: '0.82rem', color: 'var(--color-gold)', display: 'block' }}>🔊 {ex.roman}</span>
                                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{ex.english}</span>
                                    </div>
                                    <button
                                      onClick={() => speakGerman(cleanWord)}
                                      className={`btn btn-secondary ${isSpeaking ? 'speaker-btn-active' : ''}`}
                                      style={{ padding: '6px 10px', borderRadius: '8px' }}
                                    >
                                      <Volume2 style={{ width: '14px', height: '14px', color: isSpeaking ? '#ef4444' : 'var(--color-gold)' }} />
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Standard Examples List */}
                  {sec.examples && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
                      {sec.examples.map((ex, i) => {
                        const cleanWord = ex.german.split(' ')[0];
                        const isSpeaking = speakingText === cleanWord;
                        return (
                          <div
                            key={i}
                            style={{
                              background: 'rgba(255, 255, 255, 0.04)',
                              border: '1px solid rgba(255, 255, 255, 0.08)',
                              padding: '12px 14px',
                              borderRadius: '14px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '10px'
                            }}
                          >
                            <div>
                              <div style={{ fontSize: '1rem', fontWeight: '800', color: '#fff' }}>
                                {ex.german}
                              </div>
                              <div style={{ fontSize: '0.85rem', color: 'var(--color-gold)', fontWeight: '600' }}>
                                🔊 {ex.roman}
                              </div>
                              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                {ex.english}
                              </div>
                            </div>
                            <button
                              onClick={() => speakGerman(cleanWord)}
                              className={`btn btn-secondary ${isSpeaking ? 'speaker-btn-active' : ''}`}
                              style={{ padding: '8px 12px', borderRadius: '10px' }}
                              title="Play audio"
                            >
                              <Volume2 style={{ width: '16px', height: '16px', color: isSpeaking ? '#ef4444' : 'var(--color-gold)' }} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Steps (Best Learning Method) */}
                  {sec.steps && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {sec.steps.map((st, i) => (
                        <div key={i} style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px 14px', borderRadius: '10px', fontSize: '0.92rem', color: '#fff' }}>
                          {st}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Routine (10-Minute Daily Workout) */}
                  {sec.routine && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {sec.routine.map((rt, i) => (
                        <div key={i} style={{ background: 'rgba(96, 165, 250, 0.1)', borderLeft: '4px solid #60a5fa', padding: '10px 14px', borderRadius: '10px', fontSize: '0.92rem', color: '#fff' }}>
                          {rt}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Daily Sound Drill Sets */}
                  {sec.drills && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
                      {sec.drills.map((drill, i) => (
                        <div key={i} style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '14px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                          <div style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '8px' }}>
                            🎯 {drill.label}
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {drill.words.map((w, j) => {
                              const isSpeaking = speakingText === w;
                              return (
                                <button
                                  key={j}
                                  onClick={() => speakGerman(w)}
                                  className={`btn ${isSpeaking ? 'btn-primary' : 'btn-secondary'}`}
                                  style={{ padding: '6px 12px', fontSize: '0.85rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}
                                >
                                  <Volume2 style={{ width: '13px', height: '13px' }} />
                                  <span>{w}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Advice List (Final Advice) */}
                  {sec.advice && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <ol style={{ paddingLeft: '20px', margin: 0, color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '0.93rem' }}>
                        {sec.advice.map((ad, i) => (
                          <li key={i} style={{ color: '#fff', marginBottom: '4px' }}>{ad}</li>
                        ))}
                      </ol>

                      {sec.quickRef && (
                        <div style={{ marginTop: '10px' }}>
                          <h4 style={{ color: 'var(--color-gold)', fontSize: '0.95rem', fontWeight: '700', marginBottom: '8px' }}>
                            ⚡ Quick Final Reference:
                          </h4>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px' }}>
                            {sec.quickRef.map((qr, i) => (
                              <div key={i} style={{ background: 'rgba(0,0,0,0.25)', padding: '6px 10px', borderRadius: '8px', fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: '700', color: '#fff' }}>{qr.german}</span>
                                <span style={{ color: '#60a5fa' }}>{qr.roman}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {sec.recommendedPractice && (
                        <div style={{ background: 'rgba(52, 211, 153, 0.1)', border: '1px solid rgba(52, 211, 153, 0.3)', padding: '12px 16px', borderRadius: '12px', fontSize: '0.88rem', color: '#34d399' }}>
                          💡 <strong>Recommended Practice:</strong> {sec.recommendedPractice}
                        </div>
                      )}
                    </div>
                  )}

                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
