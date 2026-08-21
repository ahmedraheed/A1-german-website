import React, { useState, useMemo } from 'react';
import { Volume2, Search, BookOpen, CheckCircle, Sparkles, AlertCircle, HelpCircle, Layers, Flame, ArrowRight } from 'lucide-react';
import { speakGerman, useSpeakingText } from '../utils/speech';
import { verbsGuideData } from '../data/verbsGuideData';

export default function VerbsGuideTab() {
  const speakingText = useSpeakingText();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (num) => {
    setExpandedSections(prev => ({
      ...prev,
      [num]: !prev[num]
    }));
  };

  const expandAll = () => {
    const all = {};
    verbsGuideData.sections.forEach(s => {
      all[s.num] = true;
    });
    setExpandedSections(all);
  };

  const collapseAll = () => {
    setExpandedSections({});
  };

  // Filter sections based on search and category
  const filteredSections = useMemo(() => {
    return verbsGuideData.sections.filter(sec => {
      if (selectedCategory !== 'All' && sec.category !== selectedCategory) {
        return false;
      }
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();

      const titleMatch = sec.title.toLowerCase().includes(term);
      const descMatch = sec.desc && sec.desc.toLowerCase().includes(term);
      const numMatch = sec.num.toString() === term;

      let exampleMatch = false;
      if (sec.examples) {
        exampleMatch = sec.examples.some(ex => 
          (ex.german && ex.german.toLowerCase().includes(term)) || 
          (ex.english && ex.english.toLowerCase().includes(term))
        );
      }

      let sentenceMatch = false;
      if (sec.sentences) {
        sentenceMatch = sec.sentences.some(s => 
          s.german.toLowerCase().includes(term) || s.english.toLowerCase().includes(term)
        );
      }

      let tableMatch = false;
      if (sec.table) {
        tableMatch = sec.table.some(row => 
          (row.form && row.form.toLowerCase().includes(term)) ||
          (row.pronoun && row.pronoun.toLowerCase().includes(term))
        );
      }

      return titleMatch || descMatch || numMatch || exampleMatch || sentenceMatch || tableMatch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px 40px 16px' }}>
      
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '28px 24px', borderRadius: '24px', marginBottom: '28px', background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
          <span className="badge badge-gold" style={{ fontSize: '0.85rem', padding: '6px 12px' }}>
            Complete A1–A2 Verb Master
          </span>
          <span style={{ color: '#60a5fa', fontSize: '0.88rem', fontWeight: '600' }}>
            88 Rules, Tables & Formulas
          </span>
        </div>
        <h2 style={{ fontSize: '2.1rem', fontWeight: '800', margin: '0 0 10px 0', background: 'linear-gradient(90deg, #ffffff 0%, #34d399 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: '1.2' }}>
          {verbsGuideData.title} ⚡
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', margin: '0 0 16px 0', maxWidth: '900px', lineHeight: '1.6' }}>
          {verbsGuideData.intro}
        </p>

        {/* Stat Highlights */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginTop: '20px' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '12px 16px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#34d399' }}>88</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Verb Sections & Rules</div>
          </div>
          <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '12px 16px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--color-gold)' }}>6</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Modal Verbs Conjugated</div>
          </div>
          <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '12px 16px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#60a5fa' }}>Perfekt</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>haben vs. sein rules</div>
          </div>
          <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '12px 16px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#a78bfa' }}>10 Min</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Daily Verb Practice</div>
          </div>
        </div>
      </div>

      {/* Control Row: Search & Category Pills */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
        
        {/* Search Bar & Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
            <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', width: '18px', height: '18px' }} />
            <input
              type="text"
              placeholder="Search verb rule (e.g., 'können', 'Perfekt', 'sein', 'haben', '37')..."
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
          {verbsGuideData.categories.map(cat => (
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
              {cat === 'All' ? '🌟 All 88 Verb Rules' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Sections Counter */}
      <div style={{ marginBottom: '16px', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
        Showing {filteredSections.length} of 88 verb sections
      </div>

      {/* Sections List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredSections.map((sec) => {
          const isExpanded = expandedSections[sec.num] !== false; // default expanded

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
              {/* Header */}
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
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: '#fff',
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

                <div style={{ color: '#34d399', fontSize: '0.9rem', fontWeight: '600' }}>
                  {isExpanded ? '▲ Hide' : '▼ Show details'}
                </div>
              </div>

              {/* Body */}
              {isExpanded && (
                <div style={{ padding: '20px', borderTop: '1px solid var(--border-color)' }}>
                  
                  {sec.desc && (
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', margin: '0 0 16px 0' }}>
                      {sec.desc}
                    </p>
                  )}

                  {sec.titleDetail && (
                    <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--color-gold)', margin: '0 0 12px 0' }}>
                      📌 {sec.titleDetail}
                    </h4>
                  )}

                  {sec.formula && (
                    <div style={{ background: 'rgba(96, 165, 250, 0.1)', borderLeft: '4px solid #60a5fa', padding: '12px 16px', borderRadius: '12px', margin: '0 0 16px 0', fontSize: '0.95rem', color: '#fff', fontWeight: '600' }}>
                      📐 Formula: {sec.formula}
                    </div>
                  )}

                  {sec.patternRule && (
                    <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '12px 16px', borderRadius: '12px', margin: '0 0 16px 0', fontSize: '0.92rem', color: 'var(--color-gold)', fontWeight: '700' }}>
                      💡 {sec.patternRule}
                    </div>
                  )}

                  {/* Standard Conjugation Table */}
                  {sec.table && (
                    <div style={{ overflowX: 'auto', marginBottom: '16px' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.92rem' }}>
                        <thead>
                          <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--color-gold)' }}>
                            <th style={{ padding: '10px 12px' }}>Pronoun</th>
                            <th style={{ padding: '10px 12px' }}>Conjugated Form</th>
                            {sec.table[0]?.meaning && <th style={{ padding: '10px 12px' }}>Meaning</th>}
                            {sec.table[0]?.ending && <th style={{ padding: '10px 12px' }}>Ending</th>}
                            <th style={{ padding: '10px 12px', textAlign: 'center' }}>Audio</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sec.table.map((row, i) => {
                            const isSpeaking = speakingText === row.form;
                            return (
                              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                                <td style={{ padding: '10px 12px', color: 'var(--text-muted)' }}>{row.pronoun}</td>
                                <td style={{ padding: '10px 12px', fontWeight: '800', color: '#34d399', fontSize: '1rem' }}>{row.form}</td>
                                {row.meaning && <td style={{ padding: '10px 12px', color: '#fff' }}>{row.meaning}</td>}
                                {row.ending && <td style={{ padding: '10px 12px', color: '#60a5fa', fontWeight: '700' }}>{row.ending}</td>}
                                <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                                  <button
                                    onClick={() => speakGerman(row.form)}
                                    className={`btn btn-secondary ${isSpeaking ? 'speaker-btn-active' : ''}`}
                                    style={{ padding: '6px 10px', borderRadius: '8px' }}
                                  >
                                    <Volume2 style={{ width: '14px', height: '14px', color: isSpeaking ? '#ef4444' : '#34d399' }} />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Multiple tables (e.g. Section 5: arbeiten & reden) */}
                  {sec.tables && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                      {sec.tables.map((tbl, idx) => (
                        <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)' }}>
                          <h4 style={{ color: '#60a5fa', margin: '0 0 10px 0', fontSize: '0.95rem' }}>{tbl.title}</h4>
                          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                            <tbody>
                              {tbl.rows.map((r, j) => {
                                const isSpeaking = speakingText === r.form;
                                return (
                                  <tr key={j} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '6px 8px', color: 'var(--text-muted)' }}>{r.pronoun}</td>
                                    <td style={{ padding: '6px 8px', fontWeight: '700', color: '#34d399' }}>{r.form}</td>
                                    <td style={{ padding: '6px 8px', textAlign: 'right' }}>
                                      <button
                                        onClick={() => speakGerman(r.form)}
                                        className="btn btn-secondary"
                                        style={{ padding: '4px 8px', borderRadius: '6px' }}
                                      >
                                        <Volume2 style={{ width: '12px', height: '12px' }} />
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Change list (e.g., a -> ä, e -> i, e -> ie) */}
                  {sec.changeList && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px', marginBottom: '16px' }}>
                      {sec.changeList.map((item, i) => (
                        <div key={i} style={{ background: 'rgba(255,255,255,0.04)', padding: '10px 14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', fontSize: '0.9rem', fontWeight: '600' }}>
                          ⚡ {item}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Examples List */}
                  {sec.examples && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                      {sec.examples.map((ex, i) => {
                        const cleanWord = ex.german ? ex.german.split(' ')[0] : '';
                        const isSpeaking = speakingText === cleanWord;
                        return (
                          <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '12px 14px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                              <div style={{ fontSize: '1rem', fontWeight: '800', color: '#fff' }}>{ex.german}</div>
                              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{ex.english}</div>
                            </div>
                            {cleanWord && (
                              <button
                                onClick={() => speakGerman(cleanWord)}
                                className={`btn btn-secondary ${isSpeaking ? 'speaker-btn-active' : ''}`}
                                style={{ padding: '8px 10px', borderRadius: '10px' }}
                              >
                                <Volume2 style={{ width: '14px', height: '14px', color: isSpeaking ? '#ef4444' : '#34d399' }} />
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Sentences List */}
                  {sec.sentences && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                      {sec.sentences.map((st, i) => {
                        const cleanSent = st.german.replace(/[.?]/g, '');
                        const isSpeaking = speakingText === cleanSent;
                        return (
                          <div key={i} style={{ background: 'rgba(0,0,0,0.25)', padding: '12px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderLeft: '3px solid #34d399' }}>
                            <div>
                              <div style={{ fontSize: '0.98rem', fontWeight: '700', color: '#fff' }}>💬 {st.german}</div>
                              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{st.english}</div>
                            </div>
                            <button
                              onClick={() => speakGerman(st.german)}
                              className={`btn btn-secondary ${isSpeaking ? 'speaker-btn-active' : ''}`}
                              style={{ padding: '8px 12px', borderRadius: '10px' }}
                            >
                              <Volume2 style={{ width: '15px', height: '15px', color: isSpeaking ? '#ef4444' : '#34d399' }} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Contrast comparison (kennen vs wissen, kein vs nicht) */}
                  {sec.contrast && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                      {sec.contrast.map((ct, i) => (
                        <div key={i} style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
                          <span className="badge badge-gold" style={{ marginBottom: '8px' }}>{ct.word}</span>
                          <p style={{ color: '#fff', fontSize: '0.9rem', margin: '6px 0 10px 0' }}>{ct.rule}</p>
                          <div style={{ fontSize: '0.85rem', color: '#60a5fa', background: 'rgba(0,0,0,0.25)', padding: '8px 12px', borderRadius: '8px' }}>
                            💬 {ct.example}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* TYPE: Verb List Table (Section 73 & 74) */}
                  {sec.type === 'verb_list_table' && sec.verbs && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
                      {sec.verbs.map((v, i) => {
                        const isSpeaking = speakingText === v.german;
                        return (
                          <div key={i} style={{ background: 'rgba(255,255,255,0.04)', padding: '10px 14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                              <div style={{ fontWeight: '800', color: '#34d399', fontSize: '0.95rem' }}>{v.german}</div>
                              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{v.english}</div>
                            </div>
                            <button
                              onClick={() => speakGerman(v.german)}
                              className="btn btn-secondary"
                              style={{ padding: '6px 8px', borderRadius: '8px' }}
                            >
                              <Volume2 style={{ width: '13px', height: '13px' }} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* TYPE: Principal Parts Table (Section 76) */}
                  {sec.type === 'principal_parts_table' && sec.rows && (
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                        <thead>
                          <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--color-gold)' }}>
                            <th style={{ padding: '10px' }}>Infinitive</th>
                            <th style={{ padding: '10px' }}>3rd Present (er/sie)</th>
                            <th style={{ padding: '10px' }}>Past (Präteritum)</th>
                            <th style={{ padding: '10px' }}>Perfekt Participle</th>
                            <th style={{ padding: '10px', textAlign: 'center' }}>Audio</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sec.rows.map((r, i) => {
                            const isSpeaking = speakingText === r.inf;
                            return (
                              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                                <td style={{ padding: '10px', fontWeight: '800', color: '#fff' }}>{r.inf}</td>
                                <td style={{ padding: '10px', color: '#60a5fa', fontWeight: '600' }}>{r.present}</td>
                                <td style={{ padding: '10px', color: '#a78bfa', fontWeight: '600' }}>{r.past}</td>
                                <td style={{ padding: '10px', color: '#34d399', fontWeight: '700' }}>{r.perfekt}</td>
                                <td style={{ padding: '10px', textAlign: 'center' }}>
                                  <button
                                    onClick={() => speakGerman(r.inf)}
                                    className="btn btn-secondary"
                                    style={{ padding: '6px 10px', borderRadius: '8px' }}
                                  >
                                    <Volume2 style={{ width: '13px', height: '13px' }} />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* TYPE: Common Mistakes Table (Section 83) */}
                  {sec.type === 'mistakes_table' && sec.rows && (
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                        <thead>
                          <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--color-gold)' }}>
                            <th style={{ padding: '10px' }}>❌ Common Wrong</th>
                            <th style={{ padding: '10px' }}>✅ Correct German</th>
                            <th style={{ padding: '10px' }}>Explanation</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sec.rows.map((r, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                              <td style={{ padding: '10px', color: '#f87171', textDecoration: 'line-through' }}>{r.wrong}</td>
                              <td style={{ padding: '10px', color: '#34d399', fontWeight: '700' }}>{r.correct}</td>
                              <td style={{ padding: '10px', color: 'var(--text-muted)' }}>💡 {r.note}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* TYPE: Memory Chart Table (Section 85) */}
                  {sec.type === 'memory_chart_table' && sec.rows && (
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.92rem' }}>
                        <thead>
                          <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--color-gold)' }}>
                            <th style={{ padding: '10px' }}>Category</th>
                            <th style={{ padding: '10px' }}>Pattern Example (Infinitive – Past – Participle)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sec.rows.map((r, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                              <td style={{ padding: '10px', fontWeight: '700', color: '#60a5fa' }}>{r.cat}</td>
                              <td style={{ padding: '10px', color: '#fff', fontWeight: '600' }}>{r.example}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Checklist (A1 & A2 Mastery) */}
                  {sec.checklist && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
                      {sec.checklist.map((item, i) => (
                        <div key={i} style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '10px', borderLeft: '3px solid #34d399', color: '#fff', fontSize: '0.9rem' }}>
                          {item}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Steps (Section 77) */}
                  {sec.steps && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {sec.steps.map((st, i) => (
                        <div key={i} style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '10px', fontSize: '0.92rem', color: '#fff' }}>
                          {st}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Routine (Section 88) */}
                  {sec.routine && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                      {sec.routine.map((rt, i) => (
                        <div key={i} style={{ background: 'rgba(52, 211, 153, 0.1)', borderLeft: '4px solid #34d399', padding: '10px 14px', borderRadius: '10px', fontSize: '0.92rem', color: '#fff' }}>
                          {rt}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Golden Rule / Note */}
                  {sec.goldenRule && (
                    <div style={{ background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.4)', padding: '14px 16px', borderRadius: '12px', fontSize: '0.92rem', color: 'var(--color-gold)', fontWeight: '700', lineHeight: '1.6' }}>
                      🏆 {sec.goldenRule}
                    </div>
                  )}

                  {sec.note && (
                    <div style={{ fontSize: '0.88rem', color: '#60a5fa', fontStyle: 'italic', marginTop: '10px' }}>
                      💡 {sec.note}
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
