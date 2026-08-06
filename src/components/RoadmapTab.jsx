import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, Circle, Sparkles, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RoadmapTab({ studyPlan, expressions }) {
  const [completedDays, setCompletedDays] = useState(() => {
    const saved = localStorage.getItem('german_completed_days');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleDay = (day) => {
    let updated = [];
    if (completedDays.includes(day)) {
      updated = completedDays.filter(d => d !== day);
    } else {
      updated = [...completedDays, day];
      confetti({ particleCount: 30, spread: 60 });
    }
    setCompletedDays(updated);
    localStorage.setItem('german_completed_days', JSON.stringify(updated));
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 16px 40px 16px' }}>
      {/* Title Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <Calendar style={{ width: '48px', height: '48px', color: 'var(--color-gold)', margin: '0 auto 12px auto', display: 'block' }} />
        <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#fff', marginBottom: '8px' }}>
          7-Day A1 German Action Plan 📅
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
          Follow this daily structured study routine extracted from your guide to achieve Goethe/telc A1 mastery!
        </p>
      </div>

      {/* 7-Day Checklist */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
        {studyPlan.map((item, i) => {
          const isDone = completedDays.includes(item.day);
          return (
            <div
              key={i}
              className="glass-panel"
              style={{
                padding: '20px 24px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                border: isDone ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-color)',
                background: isDone ? 'rgba(16, 185, 129, 0.06)' : 'var(--bg-card)',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: isDone ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.15)',
                  color: isDone ? '#34d399' : 'var(--color-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '800',
                  fontSize: '0.9rem',
                  flexShrink: 0
                }}>
                  {item.day}
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: isDone ? '#34d399' : '#fff', marginBottom: '4px' }}>
                    {item.day}: Goal & Task
                  </h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    {item.task}
                  </p>
                </div>
              </div>

              <button
                onClick={() => toggleDay(item.day)}
                className={`btn ${isDone ? 'btn-success' : 'btn-secondary'}`}
                style={{ padding: '10px 16px', fontSize: '0.85rem', flexShrink: 0 }}
              >
                {isDone ? (
                  <>
                    <CheckCircle2 style={{ width: '16px', height: '16px' }} />
                    Completed ✓
                  </>
                ) : (
                  <>
                    <Circle style={{ width: '16px', height: '16px' }} />
                    Mark Day Complete
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Daily Expressions & Phrases Section */}
      {expressions && expressions.length > 0 && (
        <div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen style={{ color: 'var(--color-gold)', width: '22px', height: '22px' }} />
            Essential A1 Beginner Phrases ({expressions.length})
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
            {expressions.map((exp, idx) => (
              <div key={idx} className="glass-panel" style={{ padding: '16px', borderRadius: '14px' }}>
                <div style={{ fontSize: '1.05rem', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>
                  💬 {exp.german}
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  🇬🇧 {exp.english}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
