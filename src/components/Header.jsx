import React from 'react';
import { BookOpen, Layers, Zap, HelpCircle, Volume2, Calendar, Flame, RotateCcw, CheckCircle2, Upload, Package, MessageSquare, Sun, Moon, Hash } from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  masteredCount, 
  totalVerbs, 
  streak, 
  onResetProgress,
  onOpenScanner,
  theme = 'dark',
  toggleTheme
}) {
  const percent = totalVerbs > 0 ? Math.round((masteredCount / totalVerbs) * 100) : 0;

  const tabs = [
    { id: 'bank', label: '2,000 Sentence Bank', icon: BookOpen },
    { id: 'sentences', label: '520 Sentences (A1-A2)', icon: MessageSquare },
    { id: 'nouns', label: 'German A1 Nouns (577)', icon: Package },
    { id: 'vocab', label: '88 Verb Rules', icon: BookOpen },
    { id: 'numbers', label: 'Numbers Guide', icon: Hash },
    { id: 'flashcards', label: 'Flashcards', icon: Layers },
    { id: 'speedmatch', label: 'Speed Match', icon: Zap },
    { id: 'quiz', label: 'Conjugations', icon: HelpCircle },
    { id: 'phonetics', label: '70 Sound Rules', icon: Volume2 },
    { id: 'roadmap', label: '7-Day Plan', icon: Calendar },
  ];

  return (
    <header className="glass-panel header-container" style={{ margin: '16px auto', maxWidth: '1280px', padding: '20px 24px', borderRadius: '20px' }}>
      
      {/* Top Header Row: Brand & Quick Actions */}
      <div className="header-top-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '16px' }}>
        
        {/* Brand Logo & Title */}
        <div className="header-brand-group" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="header-logo-icon" style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #000 33%, #dd0000 33% 66%, #ffcc00 66%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(245, 158, 11, 0.25)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            flexShrink: 0
          }}>
            <span style={{ fontSize: '18px', fontWeight: '800', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>DE</span>
          </div>
          <div>
            <h1 className="header-title-text" style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.5px', background: 'linear-gradient(90deg, #ffffff 0%, #60a5fa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0, lineHeight: '1.2' }}>
              German Master
            </h1>
            <p className="header-subtitle-text" style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>
              Interactive Vocab, Sounds & Master Tracker
            </p>
          </div>
        </div>

        {/* Quick Action Badges: Theme Toggle, Upload, Streak, Reset */}
        <div className="header-actions-row" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          
          {/* Theme Toggle Button */}
          {toggleTheme && (
            <button
              onClick={toggleTheme}
              className="btn btn-secondary header-theme-btn"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              style={{
                padding: '7px 11px',
                fontSize: '0.82rem',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              {theme === 'dark' ? (
                <>
                  <Sun style={{ width: '15px', height: '15px', color: '#f59e0b' }} />
                  <span>Light</span>
                </>
              ) : (
                <>
                  <Moon style={{ width: '15px', height: '15px', color: '#3b82f6' }} />
                  <span>Dark</span>
                </>
              )}
            </button>
          )}

          <button
            onClick={onOpenScanner}
            className="btn btn-primary pulse-gold header-action-btn"
            style={{ padding: '7px 12px', fontSize: '0.82rem', borderRadius: '10px' }}
          >
            <Upload style={{ width: '15px', height: '15px' }} />
            <span>Upload Document</span>
          </button>

          <div className="header-streak-badge" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 12px', background: 'rgba(239, 68, 68, 0.12)', borderRadius: '10px', border: '1px solid rgba(239, 68, 68, 0.25)' }}>
            <Flame style={{ color: '#ef4444', width: '16px', height: '16px' }} />
            <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#fff' }}>{streak}d</span>
          </div>

          <button 
            onClick={onResetProgress}
            className="btn btn-secondary header-reset-btn" 
            title="Reset Mastered Progress"
            style={{ padding: '7px 10px', fontSize: '0.78rem', borderRadius: '10px' }}
          >
            <RotateCcw style={{ width: '14px', height: '14px' }} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Full-Width Progress Widget */}
      <div className="header-progress-widget" style={{ width: '100%', marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', fontSize: '0.8rem' }}>
          <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 style={{ width: '14px', height: '14px', color: '#34d399' }} />
            Words Mastered
          </span>
          <span style={{ fontWeight: '700', color: 'var(--color-gold)' }}>
            {masteredCount} / {totalVerbs} ({percent}%)
          </span>
        </div>
        <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
          <div 
            style={{ 
              height: '100%', 
              width: `${percent}%`, 
              background: 'linear-gradient(90deg, #10b981 0%, #f59e0b 100%)',
              borderRadius: '4px',
              transition: 'width 0.4s ease'
            }} 
          />
        </div>
      </div>

      {/* Mobile Category Select Dropdown */}
      <div className="header-mobile-select-wrapper" style={{ display: 'none', marginBottom: '12px' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: '600' }}>
          SELECT SECTION:
        </div>
        <select
          value={activeTab}
          onChange={(e) => {
            setActiveTab(e.target.value);
            localStorage.setItem('german_active_tab', e.target.value);
          }}
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: '12px',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            background: '#18181b',
            color: '#ffffff',
            fontSize: '0.9rem',
            fontWeight: '700',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          {tabs.map((tab) => (
            <option key={tab.id} value={tab.id}>
              {tab.label}
            </option>
          ))}
        </select>
      </div>

      {/* Navigation Tabs */}
      <nav className="nav-tabs-scroll">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); localStorage.setItem('german_active_tab', tab.id); }}
              className={`btn nav-tab-btn ${isActive ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                padding: '9px 15px',
                borderRadius: '12px',
                fontSize: '0.88rem',
                transition: 'all 0.2s ease',
              }}
            >
              <Icon style={{ width: '16px', height: '16px' }} />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
