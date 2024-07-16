import * as pdfjsLib from 'pdfjs-dist/build/pdf'; 
console.log('Public URL:', process.env.PUBLIC_URL)
// Set the workerSrc to the local file path in the public directory 

pdfjsLib.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.mjs`; 
