import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
export async function exportToPDF(elementId, filename, dispatch) {
  try {
    dispatch({ type: 'START_EXPORT' });
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Portfolio element not found');
    }
    dispatch({ type: 'UPDATE_EXPORT_PROGRESS', payload: 20 });
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 1920,
      windowHeight: element.scrollHeight
    });
    dispatch({ type: 'UPDATE_EXPORT_PROGRESS', payload: 60 });
    const imgData = canvas.toDataURL('image/jpeg', 0.9);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }
    dispatch({ type: 'UPDATE_EXPORT_PROGRESS', payload: 90 });
    pdf.save(filename);
    dispatch({ type: 'UPDATE_EXPORT_PROGRESS', payload: 100 });
    setTimeout(() => {
      dispatch({ type: 'EXPORT_COMPLETE' });
    }, 500);
    return true;
  } catch (error) {
    console.error('PDF export error:', error);
    dispatch({ type: 'EXPORT_COMPLETE' });
    throw new Error('Failed to export PDF. Please try again.');
  }
}
export function generatePDFFilename(name) {
  const cleanName = name.replace(/[^a-zA-Z0-9]/g, '_');
  const year = new Date().getFullYear();
  return `${cleanName}_Portfolio_${year}.pdf`;
}