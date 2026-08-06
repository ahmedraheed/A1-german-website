import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Volume2, Award } from 'lucide-react';
import { speakGerman } from '../utils/speech';
import confetti from 'canvas-confetti';

export default function QuizTab({ conjugations }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  // Generate question for current conjugation item
  const currentItem = conjugations[currentIndex] || conjugations[0];

  // We test on one of the pronoun forms: ich, du, er/sie/es, wir, ihr, sie/Sie
  const pronouns = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'];
  const testPronounKey = pronouns[currentIndex % pronouns.length];
  const pronounKeyMap = {
    'ich': 'ich',
    'du': 'du',
    'er/sie/es': 'er_sie_es',
    'wir': 'wir',
    'ihr': 'ihr',
    'sie/Sie': 'sie_Sie'
  };

  const correctAnswer = currentItem[pronounKeyMap[testPronounKey]];

  // Generate options (correct + 3 distractors)
  const generateOptions = () => {
    const opts = new Set([correctAnswer]);
    conjugations.forEach(c => {
      pronouns.forEach(p => {
        const val = c[pronounKeyMap[p]];
        if (val && opts.size < 4) opts.add(val);
      });
    });
    return Array.from(opts).sort(() => Math.random() - 0.5);
  };

  const [options, setOptions] = useState(() => generateOptions());

  const handleSelectOption = (opt) => {
    if (isAnswered) return;
    setSelectedOption(opt);
    setIsAnswered(true);

    if (opt === correctAnswer) {
      setScore(prev => prev + 1);
      speakGerman(`${testPronounKey} ${correctAnswer}`);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < conjugations.length) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setIsAnswered(false);
      setSelectedOption(null);
      // Generate options for next
      const nextItem = conjugations[nextIdx];
      const nextPronoun = pronouns[nextIdx % pronouns.length];
      const nextCorrect = nextItem[pronounKeyMap[nextPronoun]];
      const opts = new Set([nextCorrect]);
      conjugations.forEach(c => {
        pronouns.forEach(p => {
          const val = c[pronounKeyMap[p]];
          if (val && opts.size < 4) opts.add(val);
        });
      });
      setOptions(Array.from(opts).sort(() => Math.random() - 0.5));
    } else {
      setQuizFinished(true);
      confetti({ particleCount: 60, spread: 90 });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setIsAnswered(false);
    setSelectedOption(null);
    setQuizFinished(false);
    setOptions(generateOptions());
  };

  if (quizFinished) {
    return (
      <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto', padding: '48px 32px', textAlign: 'center', borderRadius: '24px' }}>
        <Award style={{ width: '64px', height: '64px', color: 'var(--color-gold)', margin: '0 auto 16px auto', display: 'block' }} />
        <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '8px' }}>Conjugation Quiz Complete!</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '24px' }}>
          You scored <strong style={{ color: 'var(--color-gold)' }}>{score} / {conjugations.length}</strong>
        </p>
        <button onClick={handleRestart} className="btn btn-primary" style={{ padding: '12px 28px', borderRadius: '14px' }}>
          <RotateCcw style={{ width: '18px', height: '18px' }} />
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '750px', margin: '0 auto', padding: '0 16px 40px 16px' }}>
      {/* Header Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <span className="badge badge-gold">Verb Conjugation Quiz</span>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '600' }}>
          Question {currentIndex + 1} of {conjugations.length}
        </span>
      </div>

      {/* Question Card */}
      <div className="glass-panel" style={{ padding: '32px', borderRadius: '24px', marginBottom: '24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '0.9rem', color: '#60a5fa', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>
            Verb: {currentItem.verb} ({currentItem.meaning})
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#fff' }}>
            Choose the correct conjugated form for: <span style={{ color: 'var(--color-gold)' }}>"{testPronounKey}"</span>
          </h2>
        </div>

        {/* Options Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '24px' }}>
          {options.map((opt, i) => {
            const isSelected = selectedOption === opt;
            const isCorrect = opt === correctAnswer;

            let bgColor = 'var(--bg-card)';
            let borderColor = 'var(--border-color)';
            let textColor = '#fff';

            if (isAnswered) {
              if (isCorrect) {
                bgColor = 'rgba(16, 185, 129, 0.2)';
                borderColor = '#10b981';
                textColor = '#34d399';
              } else if (isSelected) {
                bgColor = 'rgba(239, 68, 68, 0.2)';
                borderColor = '#ef4444';
                textColor = '#f87171';
              }
            }

            return (
              <button
                key={i}
                onClick={() => handleSelectOption(opt)}
                disabled={isAnswered}
                style={{
                  padding: '18px',
                  borderRadius: '14px',
                  border: `1px solid ${borderColor}`,
                  background: bgColor,
                  color: textColor,
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  cursor: isAnswered ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'space-between',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>{testPronounKey} {opt}</span>
                {isAnswered && isCorrect && <CheckCircle2 style={{ width: '20px', height: '20px', color: '#34d399' }} />}
                {isAnswered && isSelected && !isCorrect && <XCircle style={{ width: '20px', height: '20px', color: '#f87171' }} />}
              </button>
            );
          })}
        </div>

        {/* Feedback & Next Button */}
        {isAnswered && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
            <div>
              <span style={{ fontWeight: '700', color: selectedOption === correctAnswer ? '#34d399' : '#f87171' }}>
                {selectedOption === correctAnswer ? 'Correct! 🎉' : `Incorrect. Correct form: ${testPronounKey} ${correctAnswer}`}
              </span>
            </div>
            <button onClick={handleNext} className="btn btn-primary" style={{ padding: '10px 24px', borderRadius: '12px' }}>
              Next Question →
            </button>
          </div>
        )}
      </div>

      {/* Complete Conjugation Table Preview */}
      <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px' }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Volume2 style={{ width: '16px', height: '16px' }} />
          Full Conjugation Reference: {currentItem.verb}
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '10px' }}>
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '8px 10px', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>ich</div>
            <div style={{ fontWeight: '700', color: '#fff' }}>{currentItem.ich}</div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '8px 10px', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>du</div>
            <div style={{ fontWeight: '700', color: '#fff' }}>{currentItem.du}</div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '8px 10px', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>er/sie/es</div>
            <div style={{ fontWeight: '700', color: '#fff' }}>{currentItem.er_sie_es}</div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '8px 10px', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>wir</div>
            <div style={{ fontWeight: '700', color: '#fff' }}>{currentItem.wir}</div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '8px 10px', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>ihr</div>
            <div style={{ fontWeight: '700', color: '#fff' }}>{currentItem.ihr}</div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '8px 10px', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>sie/Sie</div>
            <div style={{ fontWeight: '700', color: '#fff' }}>{currentItem.sie_Sie}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
