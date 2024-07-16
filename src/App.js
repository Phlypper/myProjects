import React, { useState } from 'react';
import FileUploader from './components/FileUploader';
import PDFExtractor from './components/PDFExtractor';
import DownloadButton from './components/DownloadButton';

const App = () => {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [status, setStatus] = useState('');

  const handleFileUpload = (uploadedFile) => {
    setFile(uploadedFile);
    setStatus('Extracting text from the PDF...');
  };

  const handleTextExtracted = (text, fileName) => {
    setExtractedText(text);
    setStatus(`Text extraction ${text === 'Failed to extract text from this PDF.' ? 'failed' : 'completed'} for ${fileName}`);
  };

  return (
    <div>
      <h1>PDF Scraper</h1>
      <FileUploader onFileUpload={handleFileUpload} />
      {file && <PDFExtractor file={file} onTextExtracted={handleTextExtracted} />}
      <p>{status}</p>
      <DownloadButton text={extractedText} fileName={file?.name?.split('.').slice(0, -1).join('.') || 'extracted_text'} />
    </div>
  );
};

export default App;
