import React, { useState, useEffect } from 'react';
import { Volume2, RotateCw, CheckCircle2, ArrowRight, ArrowLeft, Shuffle, Sparkles, Eye } from 'lucide-react';
import { speakGerman } from '../utils/speech';
import confetti from 'canvas-confetti';

export default function FlashcardsTab({ verbs, sentencesMap, masteredSet, toggleMastered }) {
  const [deck, setDeck] = useState(verbs);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setDeck(verbs);
  }, [verbs]);

  const currentVerb = deck[currentIndex] || verbs[0];
  const isMastered = currentVerb ? masteredSet.has(currentVerb.id) : false;
  const example = currentVerb ? sentencesMap[currentVerb.german] : null;

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % deck.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + deck.length) % deck.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
  };

  const handleToggleMastered = () => {
    if (!currentVerb) return;
    const nowMastered = !isMastered;
    toggleMastered(currentVerb.id);

    if (nowMastered) {
      confetti({
        particleCount: 30,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        handleNext();
      }, 400);
    }
  };

  if (!currentVerb) return null;

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 16px 40px 16px' }}>
      {/* Controls Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '600' }}>
          Card {currentIndex + 1} of {deck.length}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={handleShuffle} className="btn btn-secondary" style={{ padding: '8px 12px', fontSize: '0.85rem' }}>
            <Shuffle style={{ width: '14px', height: '14px' }} />
            Shuffle Deck
          </button>
        </div>
      </div>

      {/* 3D Flip Card Container */}
      <div 
        className="perspective-1000"
        style={{ width: '100%', height: '360px', cursor: 'pointer', marginBottom: '24px' }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div 
          className="transform-style-3d"
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          {/* FRONT SIDE */}
          <div 
            className="glass-panel backface-hidden"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between',
              padding: '32px',
              borderRadius: '24px',
              border: isMastered ? '2px solid #10b981' : '1px solid var(--border-color)',
              background: 'linear-gradient(145deg, rgba(22, 29, 45, 0.9), rgba(15, 23, 42, 0.95))'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className={`badge ${isMastered ? 'badge-emerald' : 'badge-gold'}`}>
                {isMastered ? '✓ Mastered' : 'German Verb'}
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); speakGerman(currentVerb.german); }}
                className="btn btn-secondary"
                style={{ padding: '8px 12px', color: 'var(--color-gold)' }}
                title="Listen to German Audio"
              >
                <Volume2 style={{ width: '18px', height: '18px' }} />
              </button>
            </div>

            <div style={{ textAlign: 'center', margin: 'auto 0' }}>
              <h2 style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--text-main)', letterSpacing: '-0.5px', marginBottom: '12px' }}>
                {currentVerb.german}
              </h2>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <Eye style={{ width: '16px', height: '16px', color: 'var(--color-gold)' }} />
                Click card to flip for English meaning & sound
              </div>
            </div>

            <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
              Tip: Press Space to flip • Arrow keys to navigate
            </div>
          </div>

          {/* BACK SIDE */}
          <div 
            className="glass-panel backface-hidden rotate-y-180"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between',
              padding: '32px',
              borderRadius: '24px',
              border: '1px solid var(--border-color)',
              background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="badge badge-blue">Meaning & Sound</span>
              <button
                onClick={(e) => { e.stopPropagation(); speakGerman(currentVerb.german); }}
                className="btn btn-secondary"
                style={{ padding: '8px 12px', color: '#60a5fa' }}
              >
                <Volume2 style={{ width: '18px', height: '18px' }} />
              </button>
            </div>

            <div style={{ textAlign: 'center', margin: 'auto 0' }}>
              <div style={{ fontSize: '1.2rem', color: '#60a5fa', fontWeight: '700', marginBottom: '12px' }}>
                🗣️ Pronunciation: {currentVerb.roman}
              </div>
              <h3 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '16px' }}>
                🇬🇧 {currentVerb.english}
              </h3>
              {example && (
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '12px', borderLeft: '3px solid #3b82f6', textAlign: 'left' }}>
                  <div style={{ color: '#93c5fd', fontWeight: '600', fontSize: '0.9rem' }}>{example.example}</div>
                  <div style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>{example.english}</div>
                </div>
              )}
            </div>

            <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
              Click to flip back
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Controls */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={handlePrev} className="btn btn-secondary" style={{ padding: '12px 20px', borderRadius: '14px' }}>
          <ArrowLeft style={{ width: '18px', height: '18px' }} />
          Previous
        </button>

        <button 
          onClick={handleToggleMastered}
          className={`btn ${isMastered ? 'btn-success' : 'btn-primary'}`}
          style={{ padding: '12px 24px', borderRadius: '14px', flex: '1', maxWidth: '280px' }}
        >
          <CheckCircle2 style={{ width: '18px', height: '18px' }} />
          {isMastered ? 'Mastered ✓' : 'Mark as Mastered'}
        </button>

        <button onClick={handleNext} className="btn btn-secondary" style={{ padding: '12px 20px', borderRadius: '14px' }}>
          Next
          <ArrowRight style={{ width: '18px', height: '18px' }} />
        </button>
      </div>
    </div>
  );
}
