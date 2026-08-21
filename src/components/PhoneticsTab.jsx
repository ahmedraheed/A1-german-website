import React from 'react';
import { Volume2, Sparkles, AlertCircle } from 'lucide-react';
import { speakGerman, useSpeakingText } from '../utils/speech';

export default function PhoneticsTab({ sounds, mistakes, grammar }) {
  const speakingText = useSpeakingText();
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 16px 40px 16px' }}>
      {/* Title */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#fff', marginBottom: '8px' }}>
          German Pronunciation & Sound Rules 🎧
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>
          Master essential German letter sounds extracted from your A1 guide. Click any card to hear the native pronunciation!
        </p>
      </div>

      {/* Sound Rules Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px', marginBottom: '40px' }}>
        {sounds.map((s, i) => {
          const exampleWord = s.example.split('=')[0].trim();
          const isSpeaking = speakingText === exampleWord;

          return (
            <div
              key={i}
              className="glass-panel"
              style={{
                padding: '20px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px'
              }}
            >
              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--color-gold)', marginBottom: '4px' }}>
                  {s.sound}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#60a5fa', fontWeight: '600', marginBottom: '6px' }}>
                  🔊 {s.easySound}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Example: <strong>{s.example}</strong>
                </div>
              </div>

              <button
                onClick={() => speakGerman(exampleWord)}
                className={`btn btn-secondary ${isSpeaking ? 'speaker-btn-active' : ''}`}
                style={{ padding: '10px 14px', borderRadius: '12px', color: isSpeaking ? '#ef4444' : 'var(--color-gold)' }}
                title="Play Audio"
              >
                <Volume2 style={{ width: '18px', height: '18px' }} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Common Mistakes & Pitfalls */}
      {mistakes && mistakes.length > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle style={{ color: '#ef4444', width: '22px', height: '22px' }} />
            Common Beginner Mistakes to Avoid
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {mistakes.map((m, idx) => (
              <div key={idx} className="glass-panel" style={{ padding: '20px', borderRadius: '16px', borderLeft: '4px solid #ef4444' }}>
                <div style={{ color: '#f87171', fontSize: '0.9rem', textDecoration: 'line-through', marginBottom: '6px' }}>
                  ❌ {m.incorrect}
                </div>
                <div style={{ color: '#34d399', fontSize: '1.05rem', fontWeight: '700', marginBottom: '8px' }}>
                  ✅ {m.correct}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  💡 {m.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sentence Rules */}
      {grammar && grammar.length > 0 && (
        <div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles style={{ color: 'var(--color-gold)', width: '22px', height: '22px' }} />
            German Sentence Structure & Rules
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {grammar.map((g, idx) => (
              <div key={idx} className="glass-panel" style={{ padding: '20px', borderRadius: '16px' }}>
                <span className="badge badge-gold" style={{ marginBottom: '8px' }}>{g.form}</span>
                <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#60a5fa', marginBottom: '6px' }}>
                  Pattern: {g.pattern}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#fff', background: 'rgba(0,0,0,0.25)', padding: '8px 12px', borderRadius: '8px' }}>
                  💬 {g.example}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
