import JSZip from 'jszip';

/**
 * Client-side browser .docx and text file parser
 * Parses tables and paragraphs into standard { german, roman, english } word objects
 */
export const parseUploadedFile = async (file) => {
  const fileName = file.name.toLowerCase();

  if (fileName.endsWith('.docx')) {
    return await parseDocxFile(file);
  } else if (fileName.endsWith('.txt') || fileName.endsWith('.csv')) {
    return await parseTextFile(file);
  } else if (fileName.endsWith('.json')) {
    return await parseJsonFile(file);
  } else {
    throw new Error('Unsupported file format. Please upload a .docx, .txt, .csv, or .json file.');
  }
};

const parseDocxFile = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const zip = await JSZip.loadAsync(arrayBuffer);
  const docXmlFile = zip.file('word/document.xml');

  if (!docXmlFile) {
    throw new Error('Invalid .docx file: word/document.xml not found.');
  }

  const xmlText = await docXmlFile.async('string');
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

  const extractedWords = [];
  const rows = xmlDoc.getElementsByTagName('w:tr');

  if (rows && rows.length > 0) {
    // Parse table rows
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const cells = row.getElementsByTagName('w:tc');
      const textCells = [];

      for (let j = 0; j < cells.length; j++) {
        const textNodes = cells[j].getElementsByTagName('w:t');
        let cellText = '';
        for (let k = 0; k < textNodes.length; k++) {
          cellText += textNodes[k].textContent || '';
        }
        textCells.push(cellText.trim());
      }

      // Filter out header rows
      if (textCells.length >= 2) {
        const first = textCells[0].toLowerCase();
        if (first.includes('german') || first.includes('verb') || first.includes('sound')) continue;

        let german = textCells[0];
        let roman = textCells.length >= 3 ? textCells[1] : '';
        let english = textCells.length >= 3 ? textCells[2] : textCells[1];

        if (german && english) {
          extractedWords.push({
            id: 'custom_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
            german: german.trim(),
            roman: roman ? roman.trim() : german.trim(),
            english: english.trim(),
            isCustom: true
          });
        }
      }
    }
  }

  // If no tables found, try parsing paragraphs
  if (extractedWords.length === 0) {
    const paragraphs = xmlDoc.getElementsByTagName('w:p');
    for (let p = 0; p < paragraphs.length; p++) {
      const textNodes = paragraphs[p].getElementsByTagName('w:t');
      let lineText = '';
      for (let k = 0; k < textNodes.length; k++) {
        lineText += textNodes[k].textContent || '';
      }
      lineText = lineText.trim();
      if (!lineText) continue;

      const parsed = parseLineToWord(lineText);
      if (parsed) extractedWords.push(parsed);
    }
  }

  return extractedWords;
};

const parseTextFile = async (file) => {
  const text = await file.text();
  const lines = text.split(/\r?\n/);
  const extractedWords = [];

  for (const line of lines) {
    if (!line.trim()) continue;
    const parsed = parseLineToWord(line.trim());
    if (parsed) extractedWords.push(parsed);
  }

  return extractedWords;
};

const parseJsonFile = async (file) => {
  const text = await file.text();
  const json = JSON.parse(text);
  const arr = Array.isArray(json) ? json : (json.verbs || json.words || []);
  
  return arr.map(item => ({
    id: 'custom_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
    german: (item.german || item.word || '').trim(),
    roman: (item.roman || item.phonetic || item.german || '').trim(),
    english: (item.english || item.meaning || '').trim(),
    isCustom: true
  })).filter(w => w.german && w.english);
};

const parseLineToWord = (line) => {
  // Delimiters: -, :, |, comma, or tab
  const parts = line.split(/[-:|,\t]+/).map(p => p.trim()).filter(Boolean);
  if (parts.length >= 2) {
    return {
      id: 'custom_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      german: parts[0],
      roman: parts.length >= 3 ? parts[1] : parts[0],
      english: parts.length >= 3 ? parts[2] : parts[1],
      isCustom: true
    };
  }
  return null;
};
