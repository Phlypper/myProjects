import { useEffect } from 'react';
import { getDocument } from 'pdfjs-dist';
import Tesseract from 'tesseract.js';
import '../pdfWorker'; // Import the worker configuration

const PDFExtractor = ({ file, onTextExtracted }) => {
  useEffect(() => {
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = async () => {
        try {
          console.log('File loaded, starting extraction process...');
          const pdf = await getDocument({ data: new Uint8Array(fileReader.result) }).promise;
          console.log('PDF loaded:', pdf);

          const textPromises = [];

          for (let i = 1; i <= pdf.numPages; i++) {
            textPromises.push(
              pdf.getPage(i).then(async (page) => {
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(' ');
                console.log(`Text extracted from page ${i}:`, pageText);
                if (!pageText.trim()) {
                  console.warn(`No text found on page ${i}, using OCR...`);
                  const viewport = page.getViewport({ scale: 2 }); // Increased scale for better OCR accuracy
                  const canvas = document.createElement('canvas');
                  const context = canvas.getContext('2d');
                  canvas.height = viewport.height;
                  canvas.width = viewport.width;

                  await page.render({ canvasContext: context, viewport: viewport }).promise;

                  const ocrResult = await Tesseract.recognize(canvas, 'eng', {
                    logger: (m) => console.log(`[OCR][Page ${i}] Progress: ${m.progress * 100}%`, m)
                  });

                  console.log(`OCR text extracted from page ${i}:`, ocrResult.data.text);
                  return ocrResult.data.text;
                }
                return pageText;
              }).catch((pageError) => {
                console.error(`Error processing page ${i}:`, pageError);
                throw pageError;
              })
            );
          }

          const pageTexts = await Promise.all(textPromises);
          const text = pageTexts.join('\n\n'); // Added new lines between pages for clarity
          console.log('All pages processed, extracted text:', text);
          onTextExtracted(text, file.name);
        } catch (error) {
          console.error('Error extracting text from PDF:', error);
          onTextExtracted('Failed to extract text from this PDF.', file.name);
        }
      };
      fileReader.readAsArrayBuffer(file);
    }
  }, [file, onTextExtracted]);

  return null;
};

export default PDFExtractor;
