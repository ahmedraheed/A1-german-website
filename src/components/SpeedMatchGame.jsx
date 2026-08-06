import React, { useState, useEffect } from 'react';
import { Zap, Trophy, RotateCcw, Flame, CheckCircle2, Sparkles } from 'lucide-react';
import { speakGerman } from '../utils/speech';
import confetti from 'canvas-confetti';

export default function SpeedMatchGame({ verbs, masteredSet, toggleMastered }) {
  const [gameState, setGameState] = useState('idle'); // 'idle', 'playing', 'finished'
  const [leftItems, setLeftItems] = useState([]);
  const [rightItems, setRightItems] = useState([]);
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [matchedIds, setMatchedIds] = useState(new Set());
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);

  const startGame = () => {
    // Pick 6 random verbs from pool
    const pool = [...verbs].sort(() => Math.random() - 0.5).slice(0, 6);
    
    const left = pool.map(v => ({ id: v.id, german: v.german, targetId: v.id }));
    const right = pool.map(v => ({ id: v.id + '_r', text: `${v.english} (${v.roman})`, targetId: v.id }))
                      .sort(() => Math.random() - 0.5);

    setLeftItems(left);
    setRightItems(right);
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatchedIds(new Set());
    setScore(0);
    setCombo(0);
    setTimeLeft(45);
    setGameState('playing');
  };

  useEffect(() => {
    let timer = null;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('finished');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const handleSelectLeft = (item) => {
    if (matchedIds.has(item.targetId)) return;
    speakGerman(item.german);
    setSelectedLeft(item);

    if (selectedRight) {
      checkMatch(item, selectedRight);
    }
  };

  const handleSelectRight = (item) => {
    if (matchedIds.has(item.targetId)) return;
    setSelectedRight(item);

    if (selectedLeft) {
      checkMatch(selectedLeft, item);
    }
  };

  const checkMatch = (left, right) => {
    if (left.targetId === right.targetId) {
      // Match correct!
      const newMatched = new Set(matchedIds);
      newMatched.add(left.targetId);
      setMatchedIds(newMatched);
      
      const newCombo = combo + 1;
      setCombo(newCombo);
      setScore(prev => prev + (100 * newCombo));
      
      // Auto mark mastered if not already
      if (!masteredSet.has(left.targetId)) {
        toggleMastered(left.targetId);
      }

      setSelectedLeft(null);
      setSelectedRight(null);

      // Check if all 6 matched!
      if (newMatched.size === leftItems.length) {
        confetti({ particleCount: 50, spread: 80 });
        setTimeout(() => {
          // Load next batch if time remaining
          const pool = [...verbs].sort(() => Math.random() - 0.5).slice(0, 6);
          const newLeft = pool.map(v => ({ id: v.id, german: v.german, targetId: v.id }));
          const newRight = pool.map(v => ({ id: v.id + '_r', text: `${v.english} (${v.roman})`, targetId: v.id }))
                              .sort(() => Math.random() - 0.5);
          setLeftItems(newLeft);
          setRightItems(newRight);
          setMatchedIds(newSet => new Set());
        }, 500);
      }
    } else {
      // Incorrect
      setCombo(0);
      setTimeout(() => {
        setSelectedLeft(null);
        setSelectedRight(null);
      }, 400);
    }
  };

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', padding: '0 16px 40px 16px' }}>
      {/* Game State: IDLE */}
      {gameState === 'idle' && (
        <div className="glass-panel" style={{ padding: '48px 32px', textAlign: 'center', borderRadius: '24px' }}>
          <Zap style={{ width: '64px', height: '64px', color: 'var(--color-gold)', margin: '0 auto 16px auto', display: 'block' }} className="pulse-gold" />
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '12px' }}>Speed Match Challenge</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto 28px auto' }}>
            Match German A1 verbs with their English definitions and Roman sounds before the 45-second timer runs out!
          </p>
          <button onClick={startGame} className="btn btn-primary" style={{ padding: '14px 36px', fontSize: '1.1rem', borderRadius: '16px' }}>
            <Zap style={{ width: '20px', height: '20px' }} />
            Start Match Challenge
          </button>
        </div>
      )}

      {/* Game State: PLAYING */}
      {gameState === 'playing' && (
        <div>
          {/* Game Stats Bar */}
          <div className="glass-panel" style={{ padding: '16px 24px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap style={{ color: 'var(--color-gold)', width: '20px', height: '20px' }} />
              <span style={{ fontSize: '1.1rem', fontWeight: '800' }}>Score: {score}</span>
            </div>

            <div style={{ fontSize: '1.2rem', fontWeight: '800', color: timeLeft <= 10 ? '#ef4444' : '#fff' }}>
              ⏱️ {timeLeft}s
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Flame style={{ color: '#f59e0b', width: '20px', height: '20px' }} />
              <span style={{ fontWeight: '700', color: '#f59e0b' }}>Combo: x{combo}</span>
            </div>
          </div>

          {/* Matching Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* Left Column: German Words */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h4 style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '4px' }}>German Verb</h4>
              {leftItems.map(item => {
                const isMatched = matchedIds.has(item.targetId);
                const isSelected = selectedLeft?.id === item.id;
                return (
                  <button
                    key={item.id}
                    disabled={isMatched}
                    onClick={() => handleSelectLeft(item)}
                    className="glass-panel"
                    style={{
                      padding: '18px',
                      borderRadius: '14px',
                      border: isMatched 
                        ? '1px solid rgba(16, 185, 129, 0.4)' 
                        : isSelected 
                        ? '2px solid var(--color-gold)' 
                        : '1px solid var(--border-color)',
                      background: isMatched 
                        ? 'rgba(16, 185, 129, 0.1)' 
                        : isSelected 
                        ? 'rgba(245, 158, 11, 0.15)' 
                        : 'var(--bg-card)',
                      color: isMatched ? '#34d399' : '#fff',
                      fontSize: '1.2rem',
                      fontWeight: '800',
                      cursor: isMatched ? 'default' : 'pointer',
                      opacity: isMatched ? 0.4 : 1,
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {item.german} {isMatched && '✓'}
                  </button>
                );
              })}
            </div>

            {/* Right Column: English / Phonetics */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h4 style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '4px' }}>English & Pronunciation</h4>
              {rightItems.map(item => {
                const isMatched = matchedIds.has(item.targetId);
                const isSelected = selectedRight?.id === item.id;
                return (
                  <button
                    key={item.id}
                    disabled={isMatched}
                    onClick={() => handleSelectRight(item)}
                    className="glass-panel"
                    style={{
                      padding: '18px',
                      borderRadius: '14px',
                      border: isMatched 
                        ? '1px solid rgba(16, 185, 129, 0.4)' 
                        : isSelected 
                        ? '2px solid var(--color-gold)' 
                        : '1px solid var(--border-color)',
                      background: isMatched 
                        ? 'rgba(16, 185, 129, 0.1)' 
                        : isSelected 
                        ? 'rgba(245, 158, 11, 0.15)' 
                        : 'var(--bg-card)',
                      color: isMatched ? '#34d399' : '#94a3b8',
                      fontSize: '0.95rem',
                      fontWeight: '600',
                      cursor: isMatched ? 'default' : 'pointer',
                      opacity: isMatched ? 0.4 : 1,
                      textAlign: 'left',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {item.text} {isMatched && '✓'}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Game State: FINISHED */}
      {gameState === 'finished' && (
        <div className="glass-panel" style={{ padding: '48px 32px', textAlign: 'center', borderRadius: '24px' }}>
          <Trophy style={{ width: '64px', height: '64px', color: 'var(--color-gold)', margin: '0 auto 16px auto', display: 'block' }} />
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '8px' }}>Time's Up!</h2>
          <div style={{ fontSize: '1.4rem', color: 'var(--color-gold)', fontWeight: '800', marginBottom: '24px' }}>
            Final Score: {score} Points
          </div>
          <button onClick={startGame} className="btn btn-primary" style={{ padding: '12px 32px', fontSize: '1rem', borderRadius: '14px' }}>
            <RotateCcw style={{ width: '18px', height: '18px' }} />
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
