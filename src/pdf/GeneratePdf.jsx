
import html2pdf from 'html2pdf.js';
 const GeneratePdf = (htmlContent) => {
    const options = {
      margin: 1.2,
      filename: 'Facture.pdf',
      image: {
        type: 'png',
        quality: 0.98,
      },
      html2canvas: {
        scale: 2,
      },
      jsPDF: {
        unit: 'in',
        format: 'a4',
        orientation: 'portrait',
      },
    };
  
    const pdfContent = '<html><head><title>Facture</title></head><body>' + htmlContent + '</body></html>';
    console.log("ito e");
    console.log(pdfContent);
    html2pdf().from(pdfContent).set(options).save();
  };
  export default GeneratePdf;
  