import React from 'react'; 
import { saveAs } from 'file-saver'; 

const DownloadButton = ({ text, fileName }) => {
    const handleDownload = () => {
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, `${fileName}.txt`);
    };
  
return ( 
<button onClick={handleDownload} disabled={!text}> Download Text </button> 
); 
}; 

export default DownloadButton;
