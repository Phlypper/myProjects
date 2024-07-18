PDF Scraper

This is a React 18 application that allows the user to upload a .pdf file and the app will extract the text from the file and create a formatted copy of the text in a .txt/plain text file that can be downloaded. Below are instructions on how to set up and run the application locally.

 Table of Contents

- [Installation]
- [Running the App]
- [Building for Production]
- [Contributing]
##create a new folder for the app and open it in your code editor of choice

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Phlypper/pdf_scraper.git
   cd pdf-scraper
   ```

2. Install dependencies:
   ```bash
   npm install tesseract.js
   npm install pdfjs-dist
   npm install file-saver

##Make certain:
Copy ‘pdf.worker.min.mjs’ from node_module/pdefjs-diskt/build and paste it into the public folder

## Running the App

To start the development server, run:
```bash
npm start
```
The application will be available at `http://localhost:3000/`.

## Building for Production

To create a production build, run:
```bash
npm run build
```
The production-ready files will be in the `build` directory.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue if you have any suggestions or find any bugs.
