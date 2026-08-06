import React from 'react';
import { BookOpen, Layers, Zap, HelpCircle, Volume2, Calendar, Flame, RotateCcw, CheckCircle2 } from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  masteredCount, 
  totalVerbs, 
  streak, 
  onResetProgress 
}) {
  const percent = totalVerbs > 0 ? Math.round((masteredCount / totalVerbs) * 100) : 0;

  const tabs = [
    { id: 'vocab', label: 'Verbs & Words', icon: BookOpen },
    { id: 'flashcards', label: 'Flashcards', icon: Layers },
    { id: 'speedmatch', label: 'Speed Match', icon: Zap },
    { id: 'quiz', label: 'Conjugations', icon: HelpCircle },
    { id: 'phonetics', label: 'Sound Rules', icon: Volume2 },
    { id: 'roadmap', label: '7-Day Plan', icon: Calendar },
  ];

  return (
    <header className="glass-panel" style={{ margin: '16px auto', maxWidth: '1280px', padding: '20px 24px', borderRadius: '20px' }}>
      {/* Top Header Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #000 33%, #dd0000 33% 66%, #ffcc00 66%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(245, 158, 11, 0.25)',
            border: '2px solid rgba(255, 255, 255, 0.2)'
          }}>
            <span style={{ fontSize: '20px', fontWeight: '800', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>DE</span>
          </div>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: '800', letterSpacing: '-0.5px', background: 'linear-gradient(90deg, #ffffff 0%, #f59e0b 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              German A1 Master
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Interactive Vocab, Sounds & Master Tracker
            </p>
          </div>
        </div>

        {/* Progress & Stats Widgets */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          {/* Streak Counter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 14px', background: 'rgba(239, 68, 68, 0.12)', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.25)' }}>
            <Flame style={{ color: '#ef4444', width: '20px', height: '20px' }} />
            <div>
              <div style={{ fontSize: '0.7rem', color: '#f87171', fontWeight: '700', textTransform: 'uppercase' }}>Streak</div>
              <div style={{ fontSize: '1rem', fontWeight: '800', color: '#fff' }}>{streak} Days</div>
            </div>
          </div>

          {/* Mastered Counter & Progress Bar */}
          <div style={{ minWidth: '220px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 style={{ width: '14px', height: '14px', color: '#34d399' }} />
                Words Mastered
              </span>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-gold)' }}>
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

          {/* Reset Button */}
          <button 
            onClick={onResetProgress}
            className="btn btn-secondary" 
            title="Reset Mastered Words Progress"
            style={{ padding: '8px 12px', fontSize: '0.8rem' }}
          >
            <RotateCcw style={{ width: '14px', height: '14px' }} />
            Reset
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`btn ${isActive ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                flexShrink: 0,
                padding: '10px 16px',
                borderRadius: '12px',
                fontSize: '0.9rem',
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
