import React, { useState, useMemo } from 'react';
import { Search, Volume2, CheckCircle2, Sparkles, Filter, Grid, List, Layers, BookOpen, ChevronLeft, ChevronRight, Bookmark } from 'lucide-react';
import { speakGerman } from '../utils/speech';
import confetti from 'canvas-confetti';
import sentenceBankData from '../data/germanSentenceBankData.json';

export default function SentenceBankTab({ masteredBankSet, toggleMasteredBankSentence }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'learning', 'mastered'
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'table', 'flashcards'
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  // Flashcard mode state
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Extract all unique sections
  const sections = useMemo(() => {
    const sectionList = Array.from(new Set(sentenceBankData.map(item => item.section)));
    return ['All', ...sectionList];
  }, []);

  // Stats calculation
  const stats = useMemo(() => {
    const total = sentenceBankData.length;
    const masteredCount = sentenceBankData.filter(s => masteredBankSet.has(s.id)).length;
    return { total, masteredCount };
  }, [masteredBankSet]);

  // Filtered sentences list
  const filteredSentences = useMemo(() => {
    return sentenceBankData.filter(item => {
      const query = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.german.toLowerCase().includes(query) ||
        item.english.toLowerCase().includes(query) ||
        item.pron.toLowerCase().includes(query) ||
        item.id.toString() === query;

      const matchesSection = selectedSection === 'All' || item.section === selectedSection;
      const matchesLevel = selectedLevel === 'All' || item.level === selectedLevel;
      
      const isMastered = masteredBankSet.has(item.id);
      let matchesStatus = true;
      if (statusFilter === 'learning') matchesStatus = !isMastered;
      if (statusFilter === 'mastered') matchesStatus = isMastered;

      return matchesSearch && matchesSection && matchesLevel && matchesStatus;
    });
  }, [searchTerm, selectedSection, selectedLevel, statusFilter, masteredBankSet]);

  // Reset pagination on filter change
  const totalPages = Math.ceil(filteredSentences.length / itemsPerPage) || 1;
  const safePage = Math.min(currentPage, totalPages);
  
  const paginatedSentences = useMemo(() => {
    const start = (safePage - 1) * itemsPerPage;
    return filteredSentences.slice(start, start + itemsPerPage);
  }, [filteredSentences, safePage]);

  const handleToggleMastered = (id, event) => {
    const isNowMastered = !masteredBankSet.has(id);
    toggleMasteredBankSentence(id);

    if (isNowMastered && event) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 28,
        spread: 65,
        origin: { x, y },
        colors: ['#3b82f6', '#10b981', '#f59e0b', '#ec4899']
      });
    }
  };

  // Current flashcard
  const currentCard = filteredSentences[flashcardIndex % Math.max(1, filteredSentences.length)];

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px 40px 16px' }}>
      
      {/* Overview Banner */}
      <div className="glass-panel" style={{ padding: '20px 24px', marginBottom: '24px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.8rem' }}>📚</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: '800', margin: 0 }}>
                2,000 Practical German Sentence Bank (A1-A2)
              </h2>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
              Complete 31-Section Validated Sentence Bank • German, Pronunciation, English & CEFR Level
            </p>
          </div>

          {/* Stats Widget */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ padding: '8px 14px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.3)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen style={{ width: '15px', height: '15px', color: '#60a5fa' }} />
              <span style={{ color: '#93c5fd', fontSize: '0.85rem', fontWeight: '700' }}>2,000 Sentences</span>
            </div>

            <div style={{ padding: '8px 14px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bookmark style={{ width: '15px', height: '15px', color: '#34d399' }} />
              <span style={{ color: '#6ee7b7', fontSize: '0.85rem', fontWeight: '700' }}>31 Sections</span>
            </div>

            <div style={{ padding: '8px 14px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.3)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 style={{ width: '15px', height: '15px', color: '#f59e0b' }} />
              <span style={{ color: '#fde047', fontSize: '0.85rem', fontWeight: '700' }}>Mastered: {stats.masteredCount} / 2,000</span>
            </div>
          </div>
        </div>

        {/* Mastered Progress Bar */}
        <div style={{ width: '100%', background: 'rgba(255, 255, 255, 0.06)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
          <div 
            style={{ 
              width: `${Math.round((stats.masteredCount / stats.total) * 100)}%`, 
              height: '100%', 
              background: 'linear-gradient(90deg, #3b82f6 0%, #10b981 50%, #f59e0b 100%)',
              transition: 'width 0.3s ease'
            }} 
          />
        </div>
      </div>

      {/* Filter and View Controls Bar */}
      <div className="glass-panel" style={{ padding: '16px 20px', borderRadius: '16px', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        <div className="filter-controls-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Search Box */}
          <div className="filter-input-wrapper" style={{ position: 'relative', flex: '1 1 240px', minWidth: '200px' }}>
            <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search German, English, Pronunciation or ID..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              style={{
                width: '100%',
                padding: '10px 12px 10px 38px',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                background: 'rgba(0, 0, 0, 0.25)',
                color: '#fff',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Section Filter Dropdown */}
          <div className="filter-dropdown-wrapper" style={{ flex: '1 1 200px', minWidth: '180px' }}>
            <select
              value={selectedSection}
              onChange={(e) => { setSelectedSection(e.target.value); setCurrentPage(1); }}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                background: '#18181b',
                color: '#fff',
                fontSize: '0.85rem',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="All">All 31 Sections ({sentenceBankData.length})</option>
              {sections.filter(s => s !== 'All').map(sec => (
                <option key={sec} value={sec}>{sec}</option>
              ))}
            </select>
          </div>

          {/* CEFR Level Filter */}
          <div className="filter-pills-row">
            {['All', 'A1', 'A2'].map(lvl => (
              <button
                key={lvl}
                onClick={() => { setSelectedLevel(lvl); setCurrentPage(1); }}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: selectedLevel === lvl ? '1px solid #3b82f6' : '1px solid rgba(255,255,255,0.1)',
                  background: selectedLevel === lvl ? 'rgba(59, 130, 246, 0.25)' : 'rgba(255,255,255,0.04)',
                  color: selectedLevel === lvl ? '#60a5fa' : 'var(--text-muted)',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                {lvl === 'All' ? 'All Levels' : lvl}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="filter-pills-row">
            {[
              { id: 'all', label: 'All' },
              { id: 'learning', label: 'Learning' },
              { id: 'mastered', label: 'Mastered' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => { setStatusFilter(f.id); setCurrentPage(1); }}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: statusFilter === f.id ? '1px solid #10b981' : '1px solid rgba(255,255,255,0.1)',
                  background: statusFilter === f.id ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.04)',
                  color: statusFilter === f.id ? '#34d399' : 'var(--text-muted)',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <button
              onClick={() => setViewMode('grid')}
              title="Grid View"
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                border: 'none',
                background: viewMode === 'grid' ? '#3b82f6' : 'transparent',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              <Grid style={{ width: '16px', height: '16px' }} />
            </button>

            <button
              onClick={() => setViewMode('table')}
              title="Table View"
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                border: 'none',
                background: viewMode === 'table' ? '#3b82f6' : 'transparent',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              <List style={{ width: '16px', height: '16px' }} />
            </button>

            <button
              onClick={() => setViewMode('flashcards')}
              title="Flashcards Mode"
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                border: 'none',
                background: viewMode === 'flashcards' ? '#3b82f6' : 'transparent',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              <Layers style={{ width: '16px', height: '16px' }} />
            </button>
          </div>

        </div>

        {/* Results Counter & Pagination Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            Showing <strong style={{ color: '#fff' }}>{filteredSentences.length}</strong> sentences
            {selectedSection !== 'All' && <span> in <strong style={{ color: '#3b82f6' }}>{selectedSection}</strong></span>}
            {selectedLevel !== 'All' && <span> ({selectedLevel})</span>}
          </div>

          {viewMode !== 'flashcards' && totalPages > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                disabled={safePage <= 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="btn"
                style={{ padding: '4px 10px', fontSize: '0.8rem', opacity: safePage <= 1 ? 0.4 : 1 }}
              >
                <ChevronLeft style={{ width: '14px', height: '14px' }} /> Prev
              </button>

              <span>Page <strong style={{ color: '#fff' }}>{safePage}</strong> of {totalPages}</span>

              <button
                disabled={safePage >= totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className="btn"
                style={{ padding: '4px 10px', fontSize: '0.8rem', opacity: safePage >= totalPages ? 0.4 : 1 }}
              >
                Next <ChevronRight style={{ width: '14px', height: '14px' }} />
              </button>
            </div>
          )}
        </div>

      </div>

      {/* VIEW MODE: FLASHCARDS */}
      {viewMode === 'flashcards' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', margin: '30px 0' }}>
          {currentCard ? (
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="glass-panel card-hover flashcard-card"
              style={{
                width: '100%',
                maxWidth: '600px',
                minHeight: '280px',
                borderRadius: '24px',
                padding: '36px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                textAlign: 'center',
                cursor: 'pointer',
                border: '2px solid rgba(59, 130, 246, 0.3)',
                background: isFlipped ? 'rgba(16, 185, 129, 0.08)' : 'rgba(30, 41, 59, 0.7)',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', color: 'var(--text-muted)' }}>
                  #{currentCard.id} • {currentCard.section}
                </span>

                <span style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '12px', background: currentCard.level === 'A1' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(245, 158, 11, 0.2)', color: currentCard.level === 'A1' ? '#60a5fa' : '#fde047', fontWeight: '700' }}>
                  {currentCard.level}
                </span>
              </div>

              {!isFlipped ? (
                <div style={{ margin: '20px 0' }}>
                  <h3 className="flashcard-title" style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '12px', color: 'var(--text-main)' }}>
                    {currentCard.german}
                  </h3>
                  {currentCard.pron && (
                    <p style={{ color: '#60a5fa', fontSize: '1rem', fontStyle: 'italic' }}>
                      [{currentCard.pron}]
                    </p>
                  )}
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '16px' }}>
                    💡 Click card to reveal English translation
                  </p>
                </div>
              ) : (
                <div style={{ margin: '20px 0' }}>
                  <h3 className="flashcard-title" style={{ fontSize: '1.6rem', fontWeight: '700', color: '#34d399', marginBottom: '8px' }}>
                    {currentCard.english}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    German: {currentCard.german}
                  </p>
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <button
                  onClick={(e) => { e.stopPropagation(); speakGerman(currentCard.german); }}
                  className="btn"
                  style={{ padding: '8px 14px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa' }}
                >
                  <Volume2 style={{ width: '16px', height: '16px' }} /> Listen
                </button>

                <button
                  onClick={(e) => { e.stopPropagation(); handleToggleMastered(currentCard.id, e); }}
                  className="btn"
                  style={{
                    padding: '8px 14px',
                    borderRadius: '10px',
                    background: masteredBankSet.has(currentCard.id) ? '#10b981' : 'rgba(255,255,255,0.1)',
                    color: '#fff'
                  }}
                >
                  <CheckCircle2 style={{ width: '16px', height: '16px' }} /> {masteredBankSet.has(currentCard.id) ? 'Mastered' : 'Mark Mastered'}
                </button>
              </div>
            </div>
          ) : (
            <div>No matching sentences found.</div>
          )}

          {/* Flashcard Nav Buttons */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button
              onClick={() => { setFlashcardIndex(prev => Math.max(0, prev - 1)); setIsFlipped(false); }}
              className="btn"
              style={{ padding: '10px 20px', borderRadius: '12px' }}
            >
              <ChevronLeft /> Previous Card
            </button>

            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              {filteredSentences.length > 0 ? (flashcardIndex % filteredSentences.length) + 1 : 0} of {filteredSentences.length}
            </span>

            <button
              onClick={() => { setFlashcardIndex(prev => prev + 1); setIsFlipped(false); }}
              className="btn btn-primary"
              style={{ padding: '10px 20px', borderRadius: '12px' }}
            >
              Next Card <ChevronRight />
            </button>
          </div>
        </div>
      )}

      {/* VIEW MODE: GRID */}
      {viewMode === 'grid' && (
        <div className="sentences-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '18px' }}>
          {paginatedSentences.map((item) => {
            const isMastered = masteredBankSet.has(item.id);
            return (
              <div
                key={item.id}
                className="glass-panel card-hover sentence-card"
                style={{
                  padding: '20px',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '14px',
                  border: isMastered ? '2px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                  background: isMastered ? 'rgba(16, 185, 129, 0.05)' : 'rgba(24, 24, 27, 0.65)'
                }}
              >
                <div>
                  {/* Card Header Tag */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.72rem', padding: '3px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.08)', color: 'var(--text-muted)', fontWeight: '600' }}>
                      #{item.id} • {item.section.split(' — ')[1] || item.section}
                    </span>

                    <span style={{ fontSize: '0.72rem', padding: '3px 8px', borderRadius: '6px', background: item.level === 'A1' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(245, 158, 11, 0.2)', color: item.level === 'A1' ? '#60a5fa' : '#fde047', fontWeight: '700' }}>
                      {item.level}
                    </span>
                  </div>

                  {/* German Sentence */}
                  <h4 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-main)', margin: '0 0 6px 0', lineHeight: '1.35' }}>
                    {item.german}
                  </h4>

                  {/* Pronunciation */}
                  {item.pron && (
                    <p style={{ color: '#60a5fa', fontSize: '0.85rem', margin: '0 0 8px 0', fontStyle: 'italic', opacity: 0.9 }}>
                      [{item.pron}]
                    </p>
                  )}

                  {/* English Translation */}
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0, lineHeight: '1.4' }}>
                    {item.english}
                  </p>
                </div>

                {/* Card Actions Footer */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <button
                    onClick={() => speakGerman(item.german)}
                    className="btn"
                    title="Audio Pronunciation"
                    style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Volume2 style={{ width: '14px', height: '14px' }} /> Speak
                  </button>

                  <button
                    onClick={(e) => handleToggleMastered(item.id, e)}
                    className="btn"
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      background: isMastered ? '#10b981' : 'rgba(255, 255, 255, 0.08)',
                      color: isMastered ? '#ffffff' : 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontWeight: '600'
                    }}
                  >
                    <CheckCircle2 style={{ width: '14px', height: '14px' }} />
                    {isMastered ? 'Mastered' : 'Mark Learned'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW MODE: TABLE */}
      {viewMode === 'table' && (
        <div className="glass-panel" style={{ borderRadius: '16px', overflow: 'hidden' }}>
          <div className="table-responsive-container">
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: 'rgba(30, 41, 59, 0.9)', color: '#93c5fd', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <th style={{ padding: '12px 16px', width: '60px' }}>No.</th>
                  <th style={{ padding: '12px 16px' }}>German</th>
                  <th style={{ padding: '12px 16px' }}>Pronunciation</th>
                  <th style={{ padding: '12px 16px' }}>English</th>
                  <th style={{ padding: '12px 16px', width: '70px' }}>Level</th>
                  <th style={{ padding: '12px 16px', width: '110px', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedSentences.map((item, idx) => {
                  const isMastered = masteredBankSet.has(item.id);
                  return (
                    <tr
                      key={item.id}
                      style={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                        background: isMastered 
                          ? 'rgba(16, 185, 129, 0.06)' 
                          : (idx % 2 === 0 ? 'rgba(255, 255, 255, 0.015)' : 'transparent')
                      }}
                    >
                      <td style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: '600' }}>
                        #{item.id}
                      </td>

                      <td style={{ padding: '12px 16px', fontWeight: '700', color: 'var(--text-main)' }}>
                        {item.german}
                      </td>

                      <td style={{ padding: '12px 16px', color: '#60a5fa', fontStyle: 'italic' }}>
                        {item.pron}
                      </td>

                      <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>
                        {item.english}
                      </td>

                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ fontSize: '0.75rem', padding: '2px 6px', borderRadius: '4px', background: item.level === 'A1' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(245, 158, 11, 0.2)', color: item.level === 'A1' ? '#60a5fa' : '#fde047', fontWeight: '700' }}>
                          {item.level}
                        </span>
                      </td>

                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                          <button
                            onClick={() => speakGerman(item.german)}
                            className="btn"
                            title="Listen"
                            style={{ padding: '4px 8px', borderRadius: '6px', background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa' }}
                          >
                            <Volume2 style={{ width: '14px', height: '14px' }} />
                          </button>

                          <button
                            onClick={(e) => handleToggleMastered(item.id, e)}
                            className="btn"
                            title="Toggle Mastered"
                            style={{
                              padding: '4px 8px',
                              borderRadius: '6px',
                              background: isMastered ? '#10b981' : 'rgba(255,255,255,0.08)',
                              color: '#fff'
                            }}
                          >
                            <CheckCircle2 style={{ width: '14px', height: '14px' }} />
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

      {/* Pagination Footer */}
      {viewMode !== 'flashcards' && totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginTop: '30px' }}>
          <button
            disabled={safePage <= 1}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            className="btn"
            style={{ padding: '8px 16px', opacity: safePage <= 1 ? 0.4 : 1 }}
          >
            <ChevronLeft style={{ width: '16px', height: '16px' }} /> Previous Page
          </button>

          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Page <strong style={{ color: '#fff' }}>{safePage}</strong> of <strong>{totalPages}</strong>
          </span>

          <button
            disabled={safePage >= totalPages}
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            className="btn btn-primary"
            style={{ padding: '8px 16px', opacity: safePage >= totalPages ? 0.4 : 1 }}
          >
            Next Page <ChevronRight style={{ width: '16px', height: '16px' }} />
          </button>
        </div>
      )}

    </div>
  );
}
