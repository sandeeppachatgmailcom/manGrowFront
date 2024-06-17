import React, { useEffect } from 'react';
import { PDFViewer } from 'react-view-pdf';
import '@react-pdf-viewer/core/lib/styles/index.css'; 
const PdfPreview = ({ fileUrl }) => {

   
  useEffect(() => {
    console.log(fileUrl, 'fileUrlfileUrlfileUrlfileUrl');
  }, [fileUrl]);
   
  return (
    <div style={{ height: '750px' }} className='w-[100%] h-[100%]'>
        <PDFViewer url={fileUrl} />
    </div>
  );
};

export default PdfPreview;
