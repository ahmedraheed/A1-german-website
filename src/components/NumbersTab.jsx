import React, { useState } from 'react';
import { Volume2, Sparkles, Hash, AlertTriangle, CheckCircle2, ArrowRight, BookOpen, Lightbulb, Clock } from 'lucide-react';
import { speakGerman, useSpeakingText } from '../utils/speech';

// Data extracted from German Counting Guide for Beginners
const numbers0to20 = [
  { num: 0, german: 'null', pron: 'nool' },
  { num: 1, german: 'eins', pron: 'ayns' },
  { num: 2, german: 'zwei', pron: 'tsvy' },
  { num: 3, german: 'drei', pron: 'dry' },
  { num: 4, german: 'vier', pron: 'feer' },
  { num: 5, german: 'fünf', pron: 'fuunf' },
  { num: 6, german: 'sechs', pron: 'zeks' },
  { num: 7, german: 'sieben', pron: 'zee-ben' },
  { num: 8, german: 'acht', pron: 'akht' },
  { num: 9, german: 'neun', pron: 'noyn' },
  { num: 10, german: 'zehn', pron: 'tsayn' },
  { num: 11, german: 'elf', pron: 'elf' },
  { num: 12, german: 'zwölf', pron: 'tsvelf' },
  { num: 13, german: 'dreizehn', pron: 'dry-tsayn' },
  { num: 14, german: 'vierzehn', pron: 'feer-tsayn' },
  { num: 15, german: 'fünfzehn', pron: 'fuunf-tsayn' },
  { num: 16, german: 'sechzehn', pron: 'zek-tsayn' },
  { num: 17, german: 'siebzehn', pron: 'zeep-tsayn' },
  { num: 18, german: 'achtzehn', pron: 'akht-tsayn' },
  { num: 19, german: 'neunzehn', pron: 'noyn-tsayn' },
  { num: 20, german: 'zwanzig', pron: 'tsvan-tsikh' },
];

const tensNumbers = [
  { num: 20, german: 'zwanzig', pron: 'tsvan-tsikh' },
  { num: 30, german: 'dreißig', pron: 'dry-sikh' },
  { num: 40, german: 'vierzig', pron: 'feer-tsikh' },
  { num: 50, german: 'fünfzig', pron: 'fuunf-tsikh' },
  { num: 60, german: 'sechzig', pron: 'zek-tsikh' },
  { num: 70, german: 'siebzig', pron: 'zeep-tsikh' },
  { num: 80, german: 'achtzig', pron: 'akht-tsikh' },
  { num: 90, german: 'neunzig', pron: 'noyn-tsikh' },
  { num: 100, german: 'hundert', pron: 'hoon-dert' },
  { num: 1000, german: 'tausend', pron: 'tow-zent' },
];

const compoundExamples = [
  { num: 21, german: 'einundzwanzig', pron: 'ayn-oont-tsvan-tsikh', meaning: 'one-and-twenty' },
  { num: 24, german: 'vierundzwanzig', pron: 'feer-oont-tsvan-tsikh', meaning: 'four-and-twenty' },
  { num: 32, german: 'zweiunddreißig', pron: 'tsvy-oont-dry-sikh', meaning: 'two-and-thirty' },
  { num: 45, german: 'fünfundvierzig', pron: 'fuunf-oont-feer-tsikh', meaning: 'five-and-forty' },
  { num: 57, german: 'siebenundfünfzig', pron: 'zee-ben-oont-fuunf-tsikh', meaning: 'seven-and-fifty' },
  { num: 63, german: 'dreiundsechzig', pron: 'dry-oont-zek-tsikh', meaning: 'three-and-sixty' },
  { num: 78, german: 'achtundsiebzig', pron: 'akht-oont-zeep-tsikh', meaning: 'eight-and-seventy' },
  { num: 86, german: 'sechsundachtzig', pron: 'zeks-oont-akht-tsikh', meaning: 'six-and-eighty' },
  { num: 94, german: 'vierundneunzig', pron: 'feer-oont-noyn-tsikh', meaning: 'four-and-ninety' },
];

const irregularNumbers = [
  { num: 16, correct: 'sechzehn', note: 'not sechszehn (drop the s)' },
  { num: 17, correct: 'siebzehn', note: 'not siebenzehn (drop the en)' },
  { num: 30, correct: 'dreißig', note: 'not dreizig (uses ß instead of z)' },
  { num: 60, correct: 'sechzig', note: 'shortened form (drop the s)' },
  { num: 70, correct: 'siebzig', note: 'shortened form (drop the en)' },
];

const practiceSentences = [
  { german: 'Ich bin fünfundzwanzig Jahre alt.', pron: 'Ish bin fuunf-oont-tsvan-tsikh yah-reh alt.', english: 'I am 25 years old.' },
  { german: 'Das kostet zwölf Euro.', pron: 'Das kos-tet tsvelf oy-roh.', english: 'That costs 12 euros.' },
  { german: 'Ich brauche zwei Tickets.', pron: 'Ish brow-kheh tsvy tik-kets.', english: 'I need two tickets.' },
  { german: 'Der Bus kommt in zehn Minuten.', pron: 'Dair boos komt in tsayn mee-noo-ten.', english: 'The bus comes in ten minutes.' },
  { german: 'Meine Wohnung kostet achthundert Euro.', pron: 'My-neh voh-noong kos-tet akht-hoon dert oy-roh.', english: 'My apartment costs 800 euros.' },
];

const dailyRoutine = [
  { time: '1 minute', task: 'Count aloud from 1 to 20.' },
  { time: '1 minute', task: 'Say the tens from 20 to 100.' },
  { time: '2 minutes', task: 'Convert random numbers such as 23, 46, 71, 85, and 99 into German.' },
  { time: '1 minute', task: 'Say real information aloud: your age, a price, a year, a phone number, or a time.' },
];

// Helper to convert any number 0-9999 to German text dynamically
function convertNumberToGerman(n) {
  if (n < 0 || n > 9999 || isNaN(n)) return '';
  if (n === 0) return 'null';

  const units = ['', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn', 'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn'];
  const tens = ['', '', 'zwanzig', 'dreißig', 'vierzig', 'fünfzig', 'sechzig', 'siebzig', 'achtzig', 'neunzig'];

  if (n < 20) return units[n];

  let result = '';

  // Thousands
  const th = Math.floor(n / 1000);
  if (th > 0) {
    result += (th === 1 ? 'eintausend' : units[th] + 'tausend');
  }

  // Hundreds
  const rem1000 = n % 1000;
  const hu = Math.floor(rem1000 / 100);
  if (hu > 0) {
    result += (hu === 1 ? 'einhundert' : units[hu] + 'hundert');
  }

  // Tens and Ones
  const rem100 = rem1000 % 100;
  if (rem100 > 0) {
    if (rem100 < 20) {
      result += units[rem100];
    } else {
      const u = rem100 % 10;
      const t = Math.floor(rem100 / 10);
      if (u === 0) {
        result += tens[t];
      } else if (u === 1) {
        result += 'einund' + tens[t];
      } else {
        result += units[u] + 'und' + tens[t];
      }
    }
  }

  return result;
}

export default function NumbersTab() {
  const speakingText = useSpeakingText();
  const [customNum, setCustomNum] = useState(42);

  const convertedText = convertNumberToGerman(customNum);

  return (
    <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 16px 50px 16px' }}>
      
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '28px', borderRadius: '24px', marginBottom: '32px', background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(59, 130, 246, 0.08))', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '10px' }}>
          <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.2)', color: 'var(--color-gold)' }}>
            <Hash style={{ width: '28px', height: '28px' }} />
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>
              German Counting Guide for Beginners
            </h2>
            <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.95rem' }}>
              Numbers 0-1000+, pronunciation guides, the "Backwards" rule, irregulars & daily practice
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Number Converter & Audio Player */}
      <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px', marginBottom: '36px', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#60a5fa', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles style={{ width: '20px', height: '20px' }} />
          Interactive German Number Converter & Audio Trainer
        </h3>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600' }}>Enter any number (0-9999):</label>
            <input
              type="number"
              min="0"
              max="9999"
              value={customNum}
              onChange={(e) => setCustomNum(parseInt(e.target.value, 10) || 0)}
              style={{
                padding: '8px 14px',
                borderRadius: '10px',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid var(--border-color)',
                color: '#fff',
                fontSize: '1.1rem',
                fontWeight: '700',
                width: '110px'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[7, 16, 21, 42, 125, 342, 2526].map((n) => (
              <button
                key={n}
                onClick={() => setCustomNum(n)}
                className="btn btn-secondary"
                style={{ padding: '4px 10px', borderRadius: '8px', fontSize: '0.8rem' }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Output Banner */}
        <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '16px 20px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Number {customNum} in German:
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--color-gold)', margin: '4px 0' }}>
              {convertedText || 'Enter a valid number'}
            </div>
          </div>

          {convertedText && (
            <button
              onClick={() => speakGerman(convertedText)}
              className={`btn btn-secondary ${speakingText === convertedText ? 'speaker-btn-active' : ''}`}
              style={{ padding: '10px 18px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: speakingText === convertedText ? '#ef4444' : '#60a5fa' }}
            >
              <Volume2 style={{ width: '20px', height: '20px' }} />
              <span>{speakingText === convertedText ? 'Stop Repeating' : 'Listen Pronunciation'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Section 1: Numbers 0-20 */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: 'var(--color-gold)' }}>1.</span> German Numbers 0-20
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
          {numbers0to20.map((item) => {
            const isSpeaking = speakingText === item.german;
            return (
              <div
                key={item.num}
                className="glass-panel"
                style={{ padding: '14px 16px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: '700' }}>#{item.num}</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-main)' }}>{item.german}</div>
                  <div style={{ fontSize: '0.82rem', color: '#60a5fa' }}>🗣️ {item.pron}</div>
                </div>

                <button
                  onClick={() => speakGerman(item.german)}
                  className={`btn btn-secondary ${isSpeaking ? 'speaker-btn-active' : ''}`}
                  style={{ padding: '8px', borderRadius: '10px', color: isSpeaking ? '#ef4444' : 'var(--color-gold)' }}
                  title="Listen"
                >
                  <Volume2 style={{ width: '16px', height: '16px' }} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 2: The Tens */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: 'var(--color-gold)' }}>2.</span> The Tens & Milestones
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
          {tensNumbers.map((item) => {
            const isSpeaking = speakingText === item.german;
            return (
              <div
                key={item.num}
                className="glass-panel"
                style={{ padding: '14px 16px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: '700' }}>#{item.num}</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--color-gold)' }}>{item.german}</div>
                  <div style={{ fontSize: '0.82rem', color: '#60a5fa' }}>🗣️ {item.pron}</div>
                </div>

                <button
                  onClick={() => speakGerman(item.german)}
                  className={`btn btn-secondary ${isSpeaking ? 'speaker-btn-active' : ''}`}
                  style={{ padding: '8px', borderRadius: '10px', color: isSpeaking ? '#ef4444' : 'var(--color-gold)' }}
                  title="Listen"
                >
                  <Volume2 style={{ width: '16px', height: '16px' }} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 3: Ones + und + Tens Rule & Examples */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: 'var(--color-gold)' }}>3.</span> The Most Important Rule: German Says Numbers Backwards
        </h3>

        <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px', marginBottom: '20px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
          <div style={{ fontSize: '1.05rem', fontWeight: '700', color: '#34d399', marginBottom: '6px' }}>
            Formula for Numbers 21–99: <span style={{ color: '#fff' }}>ones + und + tens</span>
          </div>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Example: <strong>21</strong> = <em>einundzwanzig</em> (one-and-twenty) • <strong>31</strong> = <em>einunddreißig</em> (one-and-thirty)
          </p>
        </div>

        {/* Memory Trick Box */}
        <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px', marginBottom: '20px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--color-gold)', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Lightbulb style={{ width: '18px', height: '18px' }} />
            Easy Memory Trick:
          </h4>
          <p style={{ margin: 0, color: 'var(--text-main)', fontSize: '0.95rem' }}>
            When you see <strong>42</strong>, do not think "forty-two". Think <strong>"two and forty"</strong>: <span style={{ color: '#60a5fa', fontWeight: '700' }}>zwei + und + vierzig = zweiundvierzig</span>.
          </p>
        </div>

        {/* Compound Examples Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
          {compoundExamples.map((item) => {
            const isSpeaking = speakingText === item.german;
            return (
              <div
                key={item.num}
                className="glass-panel"
                style={{ padding: '16px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: '700' }}>#{item.num} ({item.meaning})</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-main)' }}>{item.german}</div>
                  <div style={{ fontSize: '0.82rem', color: '#60a5fa' }}>🗣️ {item.pron}</div>
                </div>

                <button
                  onClick={() => speakGerman(item.german)}
                  className={`btn btn-secondary ${isSpeaking ? 'speaker-btn-active' : ''}`}
                  style={{ padding: '8px', borderRadius: '10px', color: isSpeaking ? '#ef4444' : 'var(--color-gold)' }}
                  title="Listen"
                >
                  <Volume2 style={{ width: '16px', height: '16px' }} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 4 & 5: Hundreds, Thousands & Irregular Numbers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        
        {/* Hundreds & Thousands */}
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '18px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#60a5fa', marginBottom: '14px' }}>
            4 & 5. Hundreds & Thousands
          </h3>
          
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { num: 100, german: 'einhundert' },
              { num: 200, german: 'zweihundert' },
              { num: 500, german: 'fünfhundert' },
              { num: 125, german: 'einhundertfünfundzwanzig' },
              { num: 342, german: 'dreihundertzweiundvierzig' },
              { num: 1000, german: 'eintausend' },
              { num: 2526, german: 'zweitausendfünfhundertsechsundzwanzig' },
            ].map((item) => {
              const isSpeaking = speakingText === item.german;
              return (
                <li key={item.num} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '8px 12px', borderRadius: '10px' }}>
                  <div>
                    <span style={{ fontWeight: '700', color: 'var(--color-gold)', marginRight: '8px' }}>{item.num}:</span>
                    <span style={{ fontWeight: '600', color: '#fff' }}>{item.german}</span>
                  </div>
                  <button
                    onClick={() => speakGerman(item.german)}
                    className={`btn btn-secondary ${isSpeaking ? 'speaker-btn-active' : ''}`}
                    style={{ padding: '4px 8px', borderRadius: '6px' }}
                  >
                    <Volume2 style={{ width: '14px', height: '14px', color: isSpeaking ? '#ef4444' : undefined }} />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Irregular Numbers */}
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '18px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#f87171', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertTriangle style={{ width: '20px', height: '20px' }} />
            6. Important Irregular Numbers
          </h3>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {irregularNumbers.map((item) => {
              const isSpeaking = speakingText === item.correct;
              return (
                <li key={item.num} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(239, 68, 68, 0.08)', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(239, 68, 68, 0.15)' }}>
                  <div>
                    <span style={{ fontWeight: '800', color: '#f87171', marginRight: '8px' }}>#{item.num}:</span>
                    <span style={{ fontWeight: '700', color: '#fff', fontSize: '1.05rem' }}>{item.correct}</span>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>⚠️ {item.note}</div>
                  </div>

                  <button
                    onClick={() => speakGerman(item.correct)}
                    className={`btn btn-secondary ${isSpeaking ? 'speaker-btn-active' : ''}`}
                    style={{ padding: '6px', borderRadius: '8px' }}
                  >
                    <Volume2 style={{ width: '15px', height: '15px', color: isSpeaking ? '#ef4444' : undefined }} />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Section 8: Everyday Practice Sentences */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: 'var(--color-gold)' }}>8.</span> Everyday Practice Sentences with Numbers
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {practiceSentences.map((item, idx) => {
            const isSpeaking = speakingText === item.german;
            return (
              <div
                key={idx}
                className="glass-panel"
                style={{ padding: '16px 20px', borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}
              >
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-main)' }}>{item.german}</div>
                  <div style={{ fontSize: '0.85rem', color: '#60a5fa', margin: '2px 0' }}>🗣️ {item.pron}</div>
                  <div style={{ fontSize: '0.85rem', color: '#34d399', fontWeight: '600' }}>🇬🇧 {item.english}</div>
                </div>

                <button
                  onClick={() => speakGerman(item.german)}
                  className={`btn btn-secondary ${isSpeaking ? 'speaker-btn-active' : ''}`}
                  style={{ padding: '8px 14px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '6px', color: isSpeaking ? '#ef4444' : 'var(--color-gold)' }}
                >
                  <Volume2 style={{ width: '16px', height: '16px' }} />
                  <span>Listen</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 9: 5-Minute Daily Routine */}
      <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.08))', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#60a5fa', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock style={{ width: '22px', height: '22px' }} />
          9. Five-Minute Daily Practice Routine
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
          {dailyRoutine.map((step, index) => (
            <div key={index} style={{ background: 'rgba(0,0,0,0.25)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--color-gold)', textTransform: 'uppercase', marginBottom: '4px' }}>
                ⏱️ {step.time}
              </div>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
                {step.task}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
