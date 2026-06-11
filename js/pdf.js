/* js/pdf.js - PDF Generation Pipeline */

import { state } from './utils.js';

export async function exportToPdf(exportBtn) {
  if (!exportBtn) return;

  const originalText = exportBtn.textContent;
  exportBtn.textContent = 'Generating PDF...';
  exportBtn.disabled = true;

  const page1 = document.getElementById('page1');
  const page2 = document.getElementById('page2');

  const originalTransform1 = page1 ? page1.style.transform : '';
  const originalTransform2 = page2 ? page2.style.transform : '';

  try {
    if (!page1 || !page2) {
      throw new Error('Preview pages not found in the DOM.');
    }

    // Force 100% scale (disable scaling transforms) during capture
    page1.style.transform = 'none';
    page2.style.transform = 'none';

    const { jsPDF } = window.jspdf;
    
    // A4 dimensions in pt: 595.28 x 841.89
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4'
    });

    // 1. Render Page 1
    const canvas1 = await html2canvas(page1, {
      scale: 2.5, // High resolution scaling
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });
    const imgData1 = canvas1.toDataURL('image/png');
    pdf.addImage(imgData1, 'PNG', 0, 0, 595.28, 841.89);

    // 2. Render Page 2
    pdf.addPage();
    const canvas2 = await html2canvas(page2, {
      scale: 2.5,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });
    const imgData2 = canvas2.toDataURL('image/png');
    pdf.addImage(imgData2, 'PNG', 0, 0, 595.28, 841.89);

    // Save Output
    const clientNameCleaned = (state.client.name || 'Client')
      .replace(/[^a-z0-9]/gi, '_')
      .replace(/_{2,}/g, '_');
    pdf.save(`${clientNameCleaned}_Quotation.pdf`);

  } catch (error) {
    console.error('Error during PDF generation:', error);
    alert('Failed to generate PDF. Check console logs for detail.');
  } finally {
    // Restore original scaling transforms
    if (page1) page1.style.transform = originalTransform1;
    if (page2) page2.style.transform = originalTransform2;

    exportBtn.textContent = originalText;
    exportBtn.disabled = false;
  }
}
