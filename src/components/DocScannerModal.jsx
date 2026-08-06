import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, X, Sparkles, Filter } from 'lucide-react';
import { parseUploadedFile } from '../utils/docxParser';
import confetti from 'canvas-confetti';

export default function DocScannerModal({ isOpen, onClose, existingVerbs, onImportWords }) {
  const [isScanning, setIsScanning] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [scanResult, setScanResult] = useState(null);

  if (!isOpen) return null;

  const handleFileUpload = async (file) => {
    if (!file) return;
    setIsScanning(true);
    setErrorMsg('');
    setScanResult(null);

    try {
      const extracted = await parseUploadedFile(file);

      if (!extracted || extracted.length === 0) {
        setErrorMsg('No German words found in the uploaded file. Please ensure your document has tables or lines with German words and English meanings.');
        setIsScanning(false);
        return;
      }

      // Existing German words set (case insensitive)
      const existingSet = new Set(existingVerbs.map(v => v.german.toLowerCase().trim()));

      const newUniqueWords = [];
      const duplicates = [];

      extracted.forEach(item => {
        const key = item.german.toLowerCase().trim();
        if (existingSet.has(key)) {
          duplicates.push(item);
        } else {
          // Avoid duplicate within same upload
          existingSet.add(key);
          newUniqueWords.push(item);
        }
      });

      setScanResult({
        fileName: file.name,
        totalFound: extracted.length,
        duplicateCount: duplicates.length,
        newWords: newUniqueWords,
        duplicates: duplicates
      });
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to parse file. Please try a valid .docx or text file.');
    } finally {
      setIsScanning(false);
    }
  };

  const handleConfirmImport = () => {
    if (scanResult && scanResult.newWords.length > 0) {
      onImportWords(scanResult.newWords);
      confetti({ particleCount: 50, spread: 80 });
      onClose();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '680px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '28px',
        borderRadius: '24px',
        position: 'relative',
        border: '1px solid var(--border-glow)'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="btn btn-secondary"
          style={{ position: 'absolute', right: '20px', top: '20px', padding: '8px' }}
        >
          <X style={{ width: '18px', height: '18px' }} />
        </button>

        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <FileText style={{ width: '28px', height: '28px', color: 'var(--color-gold)' }} />
          <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#fff' }}>
            Upload Document & Smart Scanner
          </h2>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
          Upload your Word file (<code>.docx</code>), text, or CSV file. The scanner automatically ignores existing words and adds new unique German terms!
        </p>

        {/* Upload Zone */}
        {!scanResult && (
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleFileUpload(e.dataTransfer.files[0]);
              }
            }}
            style={{
              border: '2px dashed var(--border-glow)',
              borderRadius: '20px',
              padding: '40px 20px',
              textAlign: 'center',
              background: 'rgba(245, 158, 11, 0.03)',
              cursor: 'pointer',
              marginBottom: '20px',
              transition: 'all 0.2s ease'
            }}
          >
            <Upload style={{ width: '48px', height: '48px', color: 'var(--color-gold)', margin: '0 auto 12px auto', display: 'block' }} className={isScanning ? 'pulse-gold' : ''} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fff', marginBottom: '6px' }}>
              {isScanning ? 'Scanning Document...' : 'Drag & Drop your Word file (.docx)'}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '16px' }}>
              Supports .docx tables, .txt, .csv, and .json
            </p>

            <label className="btn btn-primary" style={{ cursor: 'pointer', display: 'inline-flex' }}>
              Browse File
              <input
                type="file"
                accept=".docx,.txt,.csv,.json"
                style={{ display: 'none' }}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
              />
            </label>
          </div>
        )}

        {/* Error Message */}
        {errorMsg && (
          <div style={{ padding: '14px 18px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '14px', color: '#f87171', fontSize: '0.9rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AlertCircle style={{ width: '20px', height: '20px', flexShrink: 0 }} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Scan Results Overview */}
        {scanResult && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
              <div style={{ background: 'rgba(0,0,0,0.25)', padding: '14px', borderRadius: '14px', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Extracted</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff' }}>{scanResult.totalFound}</div>
              </div>

              <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '14px', borderRadius: '14px', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                <div style={{ fontSize: '0.75rem', color: '#f87171', textTransform: 'uppercase' }}>Duplicates Skipped</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#f87171' }}>{scanResult.duplicateCount}</div>
              </div>

              <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '14px', borderRadius: '14px', textAlign: 'center', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                <div style={{ fontSize: '0.75rem', color: '#34d399', textTransform: 'uppercase' }}>New Unique Words</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#34d399' }}>{scanResult.newWords.length}</div>
              </div>
            </div>

            {scanResult.newWords.length > 0 ? (
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles style={{ width: '16px', height: '16px' }} />
                  Preview New Unique Words ({scanResult.newWords.length}):
                </h4>
                <div style={{ maxHeight: '200px', overflowY: 'auto', background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '14px', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
                  {scanResult.newWords.map((w, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem' }}>
                      <span style={{ fontWeight: '700', color: '#fff' }}>{w.german} <small style={{ color: '#60a5fa', fontWeight: 'normal' }}>({w.roman})</small></span>
                      <span style={{ color: 'var(--text-muted)' }}>{w.english}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => setScanResult(null)} className="btn btn-secondary" style={{ flex: 1 }}>
                    Scan Another File
                  </button>
                  <button onClick={handleConfirmImport} className="btn btn-primary" style={{ flex: 2 }}>
                    <CheckCircle2 style={{ width: '18px', height: '18px' }} />
                    Add {scanResult.newWords.length} New Words to Website
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '24px' }}>
                <CheckCircle2 style={{ width: '48px', height: '48px', color: '#34d399', margin: '0 auto 12px auto', display: 'block' }} />
                <h4 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '8px' }}>All Words Already Exist!</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
                  Every word in <strong>{scanResult.fileName}</strong> is already present in your vocabulary database. No duplicates were added.
                </p>
                <button onClick={() => setScanResult(null)} className="btn btn-primary" style={{ padding: '10px 24px' }}>
                  Scan Another File
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
