import React, { useState, useMemo } from 'react';
import { Search, Volume2, CheckCircle2, Circle, Filter, BookOpen, Grid, List, Sparkles, Layers, RefreshCw } from 'lucide-react';
import { speakGerman } from '../utils/speech';
import confetti from 'canvas-confetti';
import nounsData from '../data/germanNounsData.json';

export default function NounsTab({ masteredNounsSet, toggleMasteredNoun }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState('All');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'learning', 'mastered'
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'table', 'flashcards'
  
  // Flashcard state
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Extract all unique topics
  const topics = useMemo(() => {
    const topicList = Array.from(new Set(nounsData.map(item => item.topic)));
    return ['All', ...topicList];
  }, []);

  // Stats calculation
  const stats = useMemo(() => {
    const total = nounsData.length;
    const derCount = nounsData.filter(n => n.article === 'der').length;
    const dieCount = nounsData.filter(n => n.article === 'die').length;
    const dasCount = nounsData.filter(n => n.article === 'das').length;
    const masteredCount = nounsData.filter(n => masteredNounsSet.has(n.id)).length;
    return { total, derCount, dieCount, dasCount, masteredCount };
  }, [masteredNounsSet]);

  // Filtered nouns list
  const filteredNouns = useMemo(() => {
    return nounsData.filter(item => {
      const matchesSearch =
        item.germanNoun.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.plural.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.pronunciation.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTopic = selectedTopic === 'All' || item.topic === selectedTopic;
      const matchesArticle = selectedArticle === 'All' || item.article === selectedArticle;
      
      const isMastered = masteredNounsSet.has(item.id);
      let matchesStatus = true;
      if (statusFilter === 'learning') matchesStatus = !isMastered;
      if (statusFilter === 'mastered') matchesStatus = isMastered;

      return matchesSearch && matchesTopic && matchesArticle && matchesStatus;
    });
  }, [searchTerm, selectedTopic, selectedArticle, statusFilter, masteredNounsSet]);

  const handleToggleMastered = (id, event) => {
    const isNowMastered = !masteredNounsSet.has(id);
    toggleMasteredNoun(id);

    if (isNowMastered && event) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 28,
        spread: 65,
        origin: { x, y },
        colors: ['#3b82f6', '#ec4899', '#10b981', '#f59e0b']
      });
    }
  };

  const getArticleBadgeStyle = (article) => {
    if (article === 'der') {
      return {
        background: 'rgba(59, 130, 246, 0.18)',
        color: '#60a5fa',
        border: '1px solid rgba(59, 130, 246, 0.4)',
        label: 'der (Masc)'
      };
    }
    if (article === 'die') {
      return {
        background: 'rgba(236, 72, 153, 0.18)',
        color: '#f472b6',
        border: '1px solid rgba(236, 72, 153, 0.4)',
        label: 'die (Fem)'
      };
    }
    if (article === 'das') {
      return {
        background: 'rgba(16, 185, 129, 0.18)',
        color: '#34d399',
        border: '1px solid rgba(16, 185, 129, 0.4)',
        label: 'das (Neut)'
      };
    }
    return {
      background: 'rgba(156, 163, 175, 0.18)',
      color: '#9ca3af',
      border: '1px solid rgba(156, 163, 175, 0.4)',
      label: 'Noun'
    };
  };

  // Current flashcard
  const currentCard = filteredNouns[flashcardIndex % Math.max(1, filteredNouns.length)];

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px 40px 16px' }}>
      
      {/* Overview Stats Banner */}
      <div className="glass-panel" style={{ padding: '20px 24px', marginBottom: '24px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.8rem' }}>📦</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: '800', margin: 0 }}>
                German A1 Core Nouns Reference
              </h2>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
              Master 577 core German nouns across 15 everyday topics with articles, plurals & phonetics
            </p>
          </div>

          {/* Gender Counters */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ padding: '8px 14px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.3)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#3b82f6' }}></span>
              <span style={{ color: '#93c5fd', fontSize: '0.85rem', fontWeight: '700' }}>der: {stats.derCount}</span>
            </div>

            <div style={{ padding: '8px 14px', borderRadius: '10px', background: 'rgba(236, 72, 153, 0.15)', border: '1px solid rgba(236, 72, 153, 0.3)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ec4899' }}></span>
              <span style={{ color: '#f472b6', fontSize: '0.85rem', fontWeight: '700' }}>die: {stats.dieCount}</span>
            </div>

            <div style={{ padding: '8px 14px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></span>
              <span style={{ color: '#6ee7b7', fontSize: '0.85rem', fontWeight: '700' }}>das: {stats.dasCount}</span>
            </div>

            <div style={{ padding: '8px 14px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.3)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 style={{ width: '14px', height: '14px', color: '#f59e0b' }} />
              <span style={{ color: '#fde047', fontSize: '0.85rem', fontWeight: '700' }}>Mastered: {stats.masteredCount} / 577</span>
            </div>
          </div>
        </div>

        {/* Quick Learning Tip */}
        <div style={{ padding: '12px 16px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Sparkles style={{ color: 'var(--color-gold)', width: '18px', height: '18px', flexShrink: 0 }} />
          <span>
            <strong>Grammar Tip:</strong> German nouns are color-coded by gender (<span style={{ color: '#60a5fa', fontWeight: '700' }}>der</span> = Masculine, <span style={{ color: '#f472b6', fontWeight: '700' }}>die</span> = Feminine, <span style={{ color: '#34d399', fontWeight: '700' }}>das</span> = Neuter). In plural form, all German nouns use the article <strong>die</strong>!
          </span>
        </div>
      </div>

      {/* Controls & Search Bar */}
      <div className="glass-panel" style={{ padding: '18px 20px', marginBottom: '24px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Search Input */}
          <div style={{ position: 'relative', flex: '1', minWidth: '260px' }}>
            <Search style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search 577 German nouns, English, plural, or pronunciation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '11px 14px 11px 42px',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                background: 'rgba(0, 0, 0, 0.25)',
                color: '#fff',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8rem' }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Article Filter Buttons */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center', background: 'rgba(0, 0, 0, 0.2)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            {['All', 'der', 'die', 'das'].map(art => (
              <button
                key={art}
                onClick={() => setSelectedArticle(art)}
                className="btn"
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: '700',
                  background: selectedArticle === art 
                    ? (art === 'der' ? '#3b82f6' : art === 'die' ? '#ec4899' : art === 'das' ? '#10b981' : 'var(--color-gold)') 
                    : 'transparent',
                  color: selectedArticle === art ? '#fff' : 'var(--text-muted)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {art === 'All' ? 'All Articles' : art}
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div style={{ display: 'flex', gap: '6px', background: 'rgba(0, 0, 0, 0.2)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <button
              onClick={() => setViewMode('grid')}
              className="btn"
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                background: viewMode === 'grid' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                color: viewMode === 'grid' ? '#fff' : 'var(--text-muted)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Grid style={{ width: '15px', height: '15px' }} />
              Grid
            </button>

            <button
              onClick={() => setViewMode('table')}
              className="btn"
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                background: viewMode === 'table' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                color: viewMode === 'table' ? '#fff' : 'var(--text-muted)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <List style={{ width: '15px', height: '15px' }} />
              Table
            </button>

            <button
              onClick={() => setViewMode('flashcards')}
              className="btn"
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                background: viewMode === 'flashcards' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                color: viewMode === 'flashcards' ? '#fff' : 'var(--text-muted)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Layers style={{ width: '15px', height: '15px' }} />
              Practice Cards
            </button>
          </div>
        </div>

        {/* Topic Pills Bar */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'thin' }}>
          {topics.map(t => {
            const isSelected = selectedTopic === t;
            const count = t === 'All' ? nounsData.length : nounsData.filter(n => n.topic === t).length;
            return (
              <button
                key={t}
                onClick={() => setSelectedTopic(t)}
                style={{
                  flexShrink: 0,
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: isSelected ? '700' : '500',
                  background: isSelected ? 'rgba(245, 158, 11, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                  color: isSelected ? 'var(--color-gold)' : 'var(--text-muted)',
                  border: isSelected ? '1px solid rgba(245, 158, 11, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {t} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header Count */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          Showing <strong>{filteredNouns.length}</strong> of {nounsData.length} German A1 nouns
        </p>

        {/* Mastered filter toggle */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {['all', 'learning', 'mastered'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              style={{
                padding: '4px 10px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                border: 'none',
                background: statusFilter === st ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                color: statusFilter === st ? '#fff' : 'var(--text-dim)',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* FLASHCARD PRACTICE MODE VIEW */}
      {viewMode === 'flashcards' && (
        <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
          {filteredNouns.length === 0 ? (
            <div className="glass-panel" style={{ padding: '40px', borderRadius: '16px' }}>
              <p>No nouns match your current search filters.</p>
            </div>
          ) : (
            <div>
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="glass-panel hover-lift"
                style={{
                  minHeight: '320px',
                  padding: '40px 24px',
                  borderRadius: '24px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px',
                  position: 'relative',
                  border: '2px solid rgba(245, 158, 11, 0.3)',
                  background: 'linear-gradient(145deg, rgba(20, 20, 25, 0.9), rgba(30, 30, 40, 0.9))',
                  userSelect: 'none'
                }}
              >
                <div style={{ position: 'absolute', top: '16px', left: '20px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Card {flashcardIndex + 1} of {filteredNouns.length} • {currentCard?.topic}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speakGerman(currentCard.germanNoun);
                  }}
                  className="btn btn-secondary"
                  style={{ position: 'absolute', top: '16px', right: '20px', padding: '6px 12px', borderRadius: '10px', fontSize: '0.8rem' }}
                >
                  <Volume2 style={{ width: '16px', height: '16px' }} /> Audio
                </button>

                {!isFlipped ? (
                  <>
                    {/* Front of card */}
                    <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                      German Noun
                    </div>
                    {currentCard && (
                      <span
                        style={{
                          padding: '6px 14px',
                          borderRadius: '12px',
                          fontSize: '0.9rem',
                          fontWeight: '800',
                          ...getArticleBadgeStyle(currentCard.article)
                        }}
                      >
                        {getArticleBadgeStyle(currentCard.article).label}
                      </span>
                    )}
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: '800', color: '#fff', margin: '8px 0' }}>
                      {currentCard?.germanNoun}
                    </h3>
                    <p style={{ color: 'var(--color-gold)', fontSize: '1rem' }}>
                      Plural: <strong>{currentCard?.plural}</strong>
                    </p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '16px' }}>
                      💡 Click card to reveal English translation & pronunciation
                    </p>
                  </>
                ) : (
                  <>
                    {/* Back of card */}
                    <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-gold)', marginBottom: '8px' }}>
                      English Meaning & Phonetics
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: '800', color: '#34d399', margin: '8px 0' }}>
                      {currentCard?.english}
                    </h3>
                    <div style={{ padding: '8px 16px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-dim)', fontSize: '0.95rem' }}>
                      🗣️ Easy Pronunciation: <strong>{currentCard?.pronunciation}</strong>
                    </div>
                  </>
                )}
              </div>

              {/* Flashcard Navigation */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '20px', alignItems: 'center' }}>
                <button
                  onClick={() => {
                    setIsFlipped(false);
                    setFlashcardIndex(prev => (prev > 0 ? prev - 1 : filteredNouns.length - 1));
                  }}
                  className="btn btn-secondary"
                  style={{ padding: '10px 20px', borderRadius: '12px' }}
                >
                  ← Previous
                </button>

                <button
                  onClick={(e) => handleToggleMastered(currentCard.id, e)}
                  className={`btn ${masteredNounsSet.has(currentCard.id) ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '10px 20px', borderRadius: '12px' }}
                >
                  <CheckCircle2 style={{ width: '16px', height: '16px' }} />
                  {masteredNounsSet.has(currentCard.id) ? 'Mastered' : 'Mark Mastered'}
                </button>

                <button
                  onClick={() => {
                    setIsFlipped(false);
                    setFlashcardIndex(prev => (prev + 1) % filteredNouns.length);
                  }}
                  className="btn btn-primary"
                  style={{ padding: '10px 20px', borderRadius: '12px' }}
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="glass-panel" style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: 'rgba(0, 0, 0, 0.4)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '14px 16px', width: '50px' }}>#</th>
                  <th style={{ padding: '14px 16px' }}>Article</th>
                  <th style={{ padding: '14px 16px' }}>German Noun</th>
                  <th style={{ padding: '14px 16px' }}>Plural</th>
                  <th style={{ padding: '14px 16px' }}>English Meaning</th>
                  <th style={{ padding: '14px 16px' }}>Easy Pronunciation</th>
                  <th style={{ padding: '14px 16px' }}>Topic</th>
                  <th style={{ padding: '14px 16px', textAlignment: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredNouns.map((item, idx) => {
                  const isMastered = masteredNounsSet.has(item.id);
                  const badgeStyle = getArticleBadgeStyle(item.article);
                  return (
                    <tr
                      key={item.id}
                      style={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                        background: isMastered ? 'rgba(16, 185, 129, 0.05)' : (idx % 2 === 0 ? 'rgba(255, 255, 255, 0.02)' : 'transparent'),
                        transition: 'background 0.2s ease'
                      }}
                    >
                      <td style={{ padding: '12px 16px', color: 'var(--text-dim)', fontSize: '0.8rem' }}>{item.id}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ padding: '3px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '800', ...badgeStyle }}>
                          {item.article || '—'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', fontWeight: '700', color: '#fff', fontSize: '1rem' }}>
                        {item.germanNoun}
                      </td>
                      <td style={{ padding: '12px 16px', color: 'var(--color-gold)', fontWeight: '600' }}>
                        {item.plural}
                      </td>
                      <td style={{ padding: '12px 16px', color: '#34d399' }}>
                        {item.english}
                      </td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
                        {item.pronunciation}
                      </td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                        {item.topic}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', alignItems: 'center' }}>
                          <button
                            onClick={() => speakGerman(item.germanNoun)}
                            className="btn btn-secondary"
                            title="Listen to German Pronunciation"
                            style={{ padding: '6px', borderRadius: '8px' }}
                          >
                            <Volume2 style={{ width: '15px', height: '15px' }} />
                          </button>

                          <button
                            onClick={(e) => handleToggleMastered(item.id, e)}
                            className="btn"
                            style={{
                              padding: '6px',
                              borderRadius: '8px',
                              background: isMastered ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                              color: isMastered ? '#34d399' : 'var(--text-dim)',
                              border: isMastered ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)'
                            }}
                          >
                            <CheckCircle2 style={{ width: '15px', height: '15px' }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* GRID VIEW */}
      {viewMode === 'grid' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '16px' }}>
          {filteredNouns.map(item => {
            const isMastered = masteredNounsSet.has(item.id);
            const badgeStyle = getArticleBadgeStyle(item.article);

            return (
              <div
                key={item.id}
                className="glass-panel hover-lift"
                style={{
                  padding: '18px 20px',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '12px',
                  position: 'relative',
                  border: isMastered ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                  background: isMastered ? 'linear-gradient(145deg, rgba(16, 185, 129, 0.08), rgba(20, 20, 25, 0.8))' : undefined
                }}
              >
                {/* Card Top: Article Badge + ID + Mastered Button */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ padding: '4px 10px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: '800', ...badgeStyle }}>
                    {badgeStyle.label}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>#{item.id}</span>
                    <button
                      onClick={(e) => handleToggleMastered(item.id, e)}
                      className="btn"
                      title={isMastered ? 'Mastered' : 'Mark as Mastered'}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '8px',
                        background: isMastered ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        color: isMastered ? '#34d399' : 'var(--text-dim)',
                        border: isMastered ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
                        cursor: 'pointer'
                      }}
                    >
                      <CheckCircle2 style={{ width: '15px', height: '15px' }} />
                    </button>
                  </div>
                </div>

                {/* Card Center: Noun + Pronunciation Audio */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '8px' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: '800', color: '#fff', margin: 0 }}>
                      {item.germanNoun}
                    </h3>
                    <button
                      onClick={() => speakGerman(item.germanNoun)}
                      className="btn btn-secondary"
                      title="Audio Pronunciation"
                      style={{ padding: '6px', borderRadius: '8px', flexShrink: 0 }}
                    >
                      <Volume2 style={{ width: '15px', height: '15px', color: 'var(--color-gold)' }} />
                    </button>
                  </div>

                  {/* Plural Form */}
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-gold)', marginTop: '4px', fontWeight: '600' }}>
                    Plural: {item.plural}
                  </div>

                  {/* English Meaning */}
                  <div style={{ fontSize: '0.95rem', color: '#34d399', marginTop: '6px', fontWeight: '600' }}>
                    {item.english}
                  </div>
                </div>

                {/* Card Footer: Phonetic Guide + Topic Tag */}
                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  <span style={{ fontStyle: 'italic', color: 'var(--text-dim)' }}>
                    🗣️ {item.pronunciation}
                  </span>
                  <span style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '2px 8px', borderRadius: '6px' }}>
                    {item.topic}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
