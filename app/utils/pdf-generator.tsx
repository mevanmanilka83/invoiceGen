import jsPDF from 'jspdf';
import { Invoice } from '@/app/types/invoice';

interface PDFGeneratorOptions {
  filename?: string;
  orientation?: 'portrait' | 'landscape';
  unit?: 'mm' | 'cm' | 'in' | 'pt';
  format?: 'a4' | 'letter' | 'legal';
}

export class InvoicePDFGenerator {
  private pdf: jsPDF;
  private currentY: number = 20;
  private pageWidth: number;
  private pageHeight: number;
  private margin: number = 20;
  private lineHeight: number = 6;

  constructor(options: PDFGeneratorOptions = {}) {
    this.pdf = new jsPDF({
      orientation: options.orientation || 'portrait',
      unit: options.unit || 'mm',
      format: options.format || 'a4'
    });

    this.pageWidth = this.pdf.internal.pageSize.getWidth();
    this.pageHeight = this.pdf.internal.pageSize.getHeight();
    
    // Set document properties
    this.pdf.setProperties({
      title: 'Invoice',
      subject: 'Professional Invoice',
      author: 'Invoice Generator',
      creator: 'Invoice Generator'
    });
  }

  private addText(text: string, x: number, y: number, options: { fontSize?: number; color?: number[]; fontStyle?: string } = {}) {
    this.pdf.setFontSize(options.fontSize || 12);
    this.pdf.setTextColor(options.color?.[0] || 0, options.color?.[1] || 0, options.color?.[2] || 0);
    if (options.fontStyle === 'bold') {
      this.pdf.setFont('helvetica', 'bold');
    } else {
      this.pdf.setFont('helvetica', 'normal');
    }
    this.pdf.text(text, x, y);
  }

  private addHeader(text: string, x: number, y: number, color?: number[]) {
    this.pdf.setFontSize(18);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.setTextColor(color?.[0] || 0, color?.[1] || 0, color?.[2] || 0);
    this.pdf.text(text, x, y);
    this.pdf.setFont('helvetica', 'normal');
    this.pdf.setFontSize(12);
  }

  private addSubHeader(text: string, x: number, y: number, color?: number[]) {
    this.pdf.setFontSize(14);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.setTextColor(color?.[0] || 0, color?.[1] || 0, color?.[2] || 0);
    this.pdf.text(text, x, y);
    this.pdf.setFont('helvetica', 'normal');
    this.pdf.setFontSize(12);
  }

  private drawSectionHeader(text: string, x: number, y: number, width: number, color: number[]) {
    // Draw colored background
    this.pdf.setFillColor(color[0], color[1], color[2]);
    this.pdf.rect(x, y, width, 8, 'F');
    
    // Add white text
    this.pdf.setFontSize(12);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.setTextColor(255, 255, 255);
    this.pdf.text(text, x + 2, y + 6);
    
    // Reset text color
    this.pdf.setTextColor(0, 0, 0);
    this.pdf.setFont('helvetica', 'normal');
  }

  private drawBox(x: number, y: number, width: number, height: number, color: number[] = [0, 0, 0]) {
    this.pdf.setDrawColor(color[0], color[1], color[2]);
    this.pdf.rect(x, y, width, height);
  }

  private formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  private formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  private hexToRgb(hex: string): number[] | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : null;
  }

  public generatePDF(invoice: Invoice): jsPDF {
    // Reset position
    this.currentY = 20;
    const brandColor = invoice.brandColor || '#1a73e8';
    const brandColorRGB = this.hexToRgb(brandColor) || [26, 115, 232];

    // Header Section - Company Information and Invoice Details
    const leftX = this.margin;
    const rightX = this.pageWidth - this.margin - 60;
    
    // Company Information (Left side) - White background with blue text
    if (invoice.companyLogo) {
      try {
        const logoHeight = 12;
        const fontSize = 16;
        this.pdf.addImage(invoice.companyLogo, 'JPEG', leftX, this.currentY, 20, logoHeight);
        // Company name aligned with top of logo
        this.pdf.setFontSize(fontSize);
        this.pdf.setFont('helvetica', 'bold');
        this.pdf.setTextColor(brandColorRGB[0], brandColorRGB[1], brandColorRGB[2]);
        this.pdf.text(invoice.companyName || 'Company Name', leftX + 25, this.currentY + 2);
        this.pdf.setFont('helvetica', 'normal');
        this.pdf.setFontSize(10);
        this.pdf.setTextColor(107, 114, 128);
        this.currentY += 4;
      } catch {
        this.pdf.setFontSize(16);
        this.pdf.setFont('helvetica', 'bold');
        this.pdf.setTextColor(brandColorRGB[0], brandColorRGB[1], brandColorRGB[2]);
        this.pdf.text(invoice.companyName || 'Company Name', leftX, this.currentY + 10);
        this.pdf.setFont('helvetica', 'normal');
        this.pdf.setFontSize(10);
        this.pdf.setTextColor(107, 114, 128);
        this.currentY += 16;
      }
    } else {
      this.pdf.setFontSize(16);
      this.pdf.setFont('helvetica', 'bold');
      this.pdf.setTextColor(brandColorRGB[0], brandColorRGB[1], brandColorRGB[2]);
      this.pdf.text(invoice.companyName || 'Company Name', leftX, this.currentY + 10);
      this.pdf.setFont('helvetica', 'normal');
      this.pdf.setFontSize(10);
      this.pdf.setTextColor(107, 114, 128);
      this.currentY += 16;
    }

    // Company details (gray text on white background) - aligned with company name
    const companyDetailsX = invoice.companyLogo ? leftX + 25 : leftX; // Align with company name
    if (invoice.companyAddress) {
      const addressLines = invoice.companyAddress.split('\n');
      addressLines.forEach(line => {
        this.pdf.text(line, companyDetailsX, this.currentY);
        this.currentY += 3;
      });
    }
    if (invoice.companyPhone) {
      this.pdf.text(invoice.companyPhone, companyDetailsX, this.currentY);
      this.currentY += 3;
    }
    if (invoice.companyEmail) {
      this.pdf.text(invoice.companyEmail, companyDetailsX, this.currentY);
      this.currentY += 3;
    }
    if (invoice.companyWebsite) {
      this.pdf.text(invoice.companyWebsite, companyDetailsX, this.currentY);
      this.currentY += 3;
    }
    if (invoice.companyTaxId) {
      this.pdf.text(`Tax ID: ${invoice.companyTaxId}`, companyDetailsX, this.currentY);
      this.currentY += 3;
    }
    // Social Media Links
    if (invoice.socialMedia) {
      const socialLinks = [];
      if (invoice.socialMedia.linkedin) socialLinks.push('LinkedIn');
      if (invoice.socialMedia.facebook) socialLinks.push('Facebook');
      if (invoice.socialMedia.twitter) socialLinks.push('Twitter');
      if (invoice.socialMedia.instagram) socialLinks.push('Instagram');
      if (socialLinks.length > 0) {
        this.pdf.text(`Social: ${socialLinks.join(', ')}`, companyDetailsX, this.currentY);
        this.currentY += 3;
      }
    }

    // Invoice Details (Right side) - Blue text
    this.addHeader('INVOICE', rightX, 20, brandColorRGB);
    this.currentY = 28;

    const invoiceDetails = [
      { label: 'INV #', value: invoice.invoiceNumber || 'INV-2024-001' },
      { label: 'Date', value: invoice.invoiceDate ? this.formatDate(invoice.invoiceDate) : '1/15/2024' },
      { label: 'Customer ID', value: invoice.customerId || '276' },
      { label: 'PO Number', value: invoice.poNumber || '-' },
      { label: 'Project', value: invoice.project || '-' },
      { label: 'Due Date', value: invoice.dueDate ? this.formatDate(invoice.dueDate) : '2/15/2024' }
    ];

    invoiceDetails.forEach(detail => {
      this.addText(detail.label, rightX, this.currentY, { fontSize: 10, fontStyle: 'bold', color: [107, 114, 128] });
      this.addText(detail.value, rightX + 40, this.currentY, { fontSize: 10, color: [17, 24, 39] });
      this.currentY += 4;
    });

    this.currentY += 15;

    // Bill To Section
    this.drawSectionHeader('BILL TO', leftX, this.currentY, this.pageWidth - 2 * this.margin, brandColorRGB);
    this.currentY += 12;

    // Bill to content with gray background
    this.pdf.setFillColor(249, 250, 251);
    this.pdf.rect(leftX, this.currentY, this.pageWidth - 2 * this.margin, 25, 'F');
    
    this.currentY += 5;
    this.addText(invoice.clientName || 'Name', leftX + 5, this.currentY, { fontSize: 10, fontStyle: 'bold' });
    this.currentY += 4;
    this.addText('Company Name', leftX + 5, this.currentY, { fontSize: 10 });
    this.currentY += 4;
    
    if (invoice.clientAddress) {
      const addressLines = invoice.clientAddress.split('\n');
      addressLines.forEach(line => {
        this.addText(line, leftX + 5, this.currentY, { fontSize: 10 });
        this.currentY += 4;
      });
    } else {
      this.addText('Address', leftX + 5, this.currentY, { fontSize: 10 });
      this.currentY += 4;
      this.addText('City, ST ZIP', leftX + 5, this.currentY, { fontSize: 10 });
      this.currentY += 4;
    }
    
    this.addText(invoice.clientPhone || 'Phone', leftX + 5, this.currentY, { fontSize: 10 });
    this.currentY += 4;
    
    if (invoice.clientEmail) {
      this.addText(invoice.clientEmail, leftX + 5, this.currentY, { fontSize: 10 });
      this.currentY += 8;
    }

    // Items Table Section
    this.drawSectionHeader('ITEMIZED CHARGES', leftX, this.currentY, this.pageWidth - 2 * this.margin, brandColorRGB);
    this.currentY += 20;

    // Table headers
    const tableX = leftX;
    const descWidth = 80;
    const qtyWidth = 20;
    const rateWidth = 30;

    this.pdf.setFont('helvetica', 'bold');
    this.addText('DESCRIPTION', tableX, this.currentY, { fontSize: 10, color: [107, 114, 128] });
    this.addText('QTY', tableX + descWidth, this.currentY, { fontSize: 10, color: [107, 114, 128] });
    this.addText('RATE', tableX + descWidth + qtyWidth, this.currentY, { fontSize: 10, color: [107, 114, 128] });
    this.addText('AMOUNT', tableX + descWidth + qtyWidth + rateWidth, this.currentY, { fontSize: 10, color: [107, 114, 128] });
    this.pdf.setFont('helvetica', 'normal');
    this.currentY += 5;

    // Draw table border
    this.pdf.setDrawColor(229, 231, 235);
    this.pdf.line(tableX, this.currentY - 5, this.pageWidth - this.margin, this.currentY - 5);
    this.pdf.line(tableX, this.currentY - 5, tableX, this.currentY + 60);
    this.pdf.line(this.pageWidth - this.margin, this.currentY - 5, this.pageWidth - this.margin, this.currentY + 60);

    // Table rows
    if (invoice.items && invoice.items.length > 0) {
      invoice.items.forEach((item, index) => {
        this.addText(item.description, tableX + 2, this.currentY, { fontSize: 10 });
        this.addText((item.quantity || 1).toString(), tableX + descWidth + 2, this.currentY, { fontSize: 10 });
        this.addText(this.formatCurrency(item.rate || item.amount), tableX + descWidth + qtyWidth + 2, this.currentY, { fontSize: 10 });
        this.addText(this.formatCurrency((item.quantity || 1) * (item.rate || item.amount)), tableX + descWidth + qtyWidth + rateWidth + 2, this.currentY, { fontSize: 10, fontStyle: 'bold' });
        this.currentY += 6;
        
        // Draw row separator
        if (index < invoice.items.length - 1) {
          this.pdf.setDrawColor(243, 244, 246);
          this.pdf.line(tableX, this.currentY, this.pageWidth - this.margin, this.currentY);
        }
      });
    } else {
      // Default items
      this.addText('Service Fee', tableX + 2, this.currentY, { fontSize: 10, color: [156, 163, 175] });
      this.addText('1', tableX + descWidth + 2, this.currentY, { fontSize: 10, color: [156, 163, 175] });
      this.addText('$150.00', tableX + descWidth + qtyWidth + 2, this.currentY, { fontSize: 10, color: [156, 163, 175] });
      this.addText('$150.00', tableX + descWidth + qtyWidth + rateWidth + 2, this.currentY, { fontSize: 10, color: [156, 163, 175] });
      this.currentY += 6;
    }

    // Add empty rows to match the preview
    for (let i = 0; i < 4; i++) {
      this.addText('', tableX + 2, this.currentY, { fontSize: 10, color: [229, 231, 235] });
      this.currentY += 6;
    }

    this.currentY += 10;

    // Payment Instructions and Summary Section
    const instructionsX = leftX;
    const summaryX = this.pageWidth - this.margin - 60;
    const sectionWidth = 60;

    // Store the starting Y position for both sections
    const paymentSectionY = this.currentY;

    // Payment Instructions (Left)
    this.drawSectionHeader('PAYMENT INSTRUCTIONS', leftX, paymentSectionY, this.pageWidth - 2 * this.margin, brandColorRGB);
    const paymentInstructionsY = paymentSectionY + 12;

    // Calculate height for all instruction lines (3 lines, 6 units each, plus 5 units padding top and bottom)
    const paymentInstructionsLineHeight = 6;
    const paymentInstructionsLines = 3;
    const paymentInstructionsBoxHeight = paymentInstructionsLines * paymentInstructionsLineHeight + 10;

    this.pdf.setFillColor(249, 250, 251);
    this.pdf.rect(instructionsX, paymentInstructionsY, sectionWidth, paymentInstructionsBoxHeight, 'F');

    let textY = paymentInstructionsY + 5;
    this.addText('1. Total payment due in 30 days.', instructionsX + 2, textY, { fontSize: 10 });
    textY += paymentInstructionsLineHeight;
    this.addText('2. Please include the invoice', instructionsX + 2, textY, { fontSize: 10 });
    textY += paymentInstructionsLineHeight;
    this.addText('   number on your check.', instructionsX + 2, textY, { fontSize: 10 });

    // Payment Summary (Right)
    this.drawSectionHeader('PAYMENT SUMMARY', summaryX, paymentSectionY, sectionWidth, brandColorRGB);
    const paymentSummaryY = paymentSectionY + 12;
    this.pdf.setFillColor(249, 250, 251);
    this.pdf.rect(summaryX, paymentSummaryY, sectionWidth, 35, 'F');

    let summaryTextY = paymentSummaryY + 5;
    this.addText('Subtotal', summaryX + 2, summaryTextY, { fontSize: 10, color: [107, 114, 128] });
    this.addText(this.formatCurrency(invoice.subtotal || 525), summaryX + 40, summaryTextY, { fontSize: 10, fontStyle: 'bold' });
    summaryTextY += 4;

    this.addText('Tax', summaryX + 2, summaryTextY, { fontSize: 10, color: [107, 114, 128] });
    this.addText(this.formatCurrency(invoice.tax || 43.31), summaryX + 40, summaryTextY, { fontSize: 10, fontStyle: 'bold' });
    summaryTextY += 4;

    this.addText('Total', summaryX + 2, summaryTextY, { fontSize: 10, color: [107, 114, 128] });
    this.addText(this.formatCurrency(invoice.total || 568.31), summaryX + 40, summaryTextY, { fontSize: 10, fontStyle: 'bold' });
    summaryTextY += 6;

    // Draw separator line
    this.pdf.setDrawColor(229, 231, 235);
    this.pdf.line(summaryX + 2, summaryTextY, summaryX + sectionWidth - 2, summaryTextY);
    summaryTextY += 4;

    this.addText('Balance Due', summaryX + 2, summaryTextY, { fontSize: 10, fontStyle: 'bold', color: [17, 24, 39] });
    this.addText(this.formatCurrency(invoice.total || 568.31), summaryX + 40, summaryTextY, { fontSize: 10, fontStyle: 'bold', color: [17, 24, 39] });

    // Move currentY down for the next section
    this.currentY = Math.max(paymentInstructionsY + 20, paymentSummaryY + 35) + 20;
    // Add a small gap after payment sections
    this.currentY += 20;

    // Add QR code and digital signature below PAYMENT INSTRUCTIONS and PAYMENT SUMMARY
    const availableWidth = this.pageWidth - 2 * this.margin;
    const qrSize = 32; // Match preview size (w-32 = 128px, scaled down for PDF)
    const sigWidth = 60;
    const sigHeight = 24; // Match preview max-h-24 (96px, scaled down)
    const gap = 32; // Match preview gap-8 (32px, scaled down)
    
    // Calculate positions to center them like in the preview
    const totalWidth = qrSize + gap + sigWidth;
    const startX = leftX + (availableWidth - totalWidth) / 2;
    const qrX = startX;
    const sigX = startX + qrSize + gap;
    const qrY = this.currentY;
    const sigY = this.currentY;

    if (invoice.qrCodeImage) {
      try {
        this.pdf.addImage(invoice.qrCodeImage, 'JPEG', qrX, qrY, qrSize, qrSize);
        const qrLabelX = qrX + qrSize / 2; // center of QR code
        this.pdf.setFontSize(8);
        this.pdf.setTextColor(156, 163, 175);
        this.pdf.text('Scan for payment details', qrLabelX, qrY + qrSize + 8, { align: 'center' });
      } catch {
        // QR code failed to load, skip it
      }
    }

    if (invoice.digitalSignature) {
      try {
        this.pdf.addImage(invoice.digitalSignature, 'JPEG', sigX, sigY, sigWidth, sigHeight);
        const sigLabelX = sigX + sigWidth / 2; // center of signature
        this.pdf.setFontSize(8);
        this.pdf.setTextColor(156, 163, 175);
        this.pdf.text('Authorized signature', sigLabelX, sigY + sigHeight + 8, { align: 'center' });
      } catch {
        // Digital signature failed to load, skip it
      }
    }
    // Advance currentY for next section
    this.currentY += Math.max(qrSize, sigHeight) + 16;

    // --- Move the following sections to a new page ---
    this.pdf.addPage();
    this.currentY = this.margin;

    // Legal/Compliance Section
    this.drawSectionHeader('LEGAL / COMPLIANCE', leftX, this.currentY, this.pageWidth - 2 * this.margin, brandColorRGB);
    this.currentY += 12;

    this.pdf.setFillColor(249, 250, 251);
    this.pdf.rect(leftX, this.currentY, this.pageWidth - 2 * this.margin, 20, 'F');
    
    this.currentY += 5;
    const legalText = invoice.legalCompliance || 'All services provided are subject to applicable laws and regulations.\nPlease ensure compliance with all relevant legal requirements.';
    const legalLines = legalText.split(/\r?\n/);
    legalLines.forEach((line, idx) => {
      this.addText(line, leftX + 2, this.currentY, { fontSize: 10 });
      if (idx < legalLines.length - 1) this.currentY += this.lineHeight;
    });

    this.currentY += 15;

    // Terms & Conditions Section (if available)
    if (invoice.termsConditions) {
      this.drawSectionHeader('TERMS & CONDITIONS', leftX, this.currentY, 80, brandColorRGB);
      this.currentY += 12;

      this.pdf.setFillColor(249, 250, 251);
      this.pdf.rect(leftX, this.currentY, this.pageWidth - 2 * this.margin, 20, 'F');
      
      this.currentY += 5;
      this.addText(invoice.termsConditions, leftX + 2, this.currentY, { fontSize: 10 });
      this.currentY += 15;
    }

    // Footer Section
    this.drawSectionHeader('COMPANY INFORMATION', leftX, this.currentY, this.pageWidth - 2 * this.margin, brandColorRGB);
    this.currentY += 12;

    // Footer content
    this.addText(`Make all checks payable to: ${invoice.companyName || 'Your Company Name'}`, leftX, this.currentY, { fontSize: 10, color: [107, 114, 128] });
    this.currentY += 6;
    this.addText(`If you have any questions about this invoice, please contact ${invoice.companyName || 'Name, Phone & Email'}`, leftX, this.currentY, { fontSize: 10, color: [107, 114, 128] });
    this.currentY += 10;

    // Thank you message - positioned in center
    const thankYouX = leftX + (this.pageWidth - 2 * this.margin) / 2;
    this.addText('Thank You For Your Business!', thankYouX, this.currentY, { fontSize: 14, fontStyle: 'bold', color: [17, 24, 39] });
    this.currentY += 6;
    
    if (invoice.thankYouMessage && invoice.thankYouMessage.trim() !== '') {
      this.pdf.setFontSize(10);
      this.pdf.setTextColor(107, 114, 128);
      this.pdf.text(invoice.thankYouMessage, thankYouX, this.currentY, { align: 'center' });
      this.currentY += 8;
    }

    // Centered copyright and company name
    const centerX = leftX + (this.pageWidth - 2 * this.margin) / 2;
    this.pdf.setFontSize(8);
    this.pdf.setTextColor(156, 163, 175);
    this.pdf.text(`${invoice.companyName || 'Your Company'}`, centerX, this.currentY, { align: 'center' });
    this.currentY += 4;
    this.pdf.text(`© ${new Date().getFullYear()} All rights reserved`, centerX, this.currentY, { align: 'center' });

    return this.pdf;
  }

  public downloadPDF(invoice: Invoice, filename?: string): void {
    const pdf = this.generatePDF(invoice);
    const defaultFilename = filename || `invoice-${invoice.invoiceNumber || 'INV-2024-001'}.pdf`;
    pdf.save(defaultFilename);
  }

  public getPDFAsBlob(invoice: Invoice): Blob {
    const pdf = this.generatePDF(invoice);
    return pdf.output('blob');
  }

  public getPDFAsDataURL(invoice: Invoice): string {
    const pdf = this.generatePDF(invoice);
    return pdf.output('datauristring');
  }
}

export const generateInvoicePDF = (invoice: Invoice, options: PDFGeneratorOptions = {}): jsPDF => {
  const generator = new InvoicePDFGenerator(options);
  return generator.generatePDF(invoice);
};

export const downloadInvoicePDF = (invoice: Invoice, filename?: string, options: PDFGeneratorOptions = {}): void => {
  const generator = new InvoicePDFGenerator(options);
  generator.downloadPDF(invoice, filename);
};
