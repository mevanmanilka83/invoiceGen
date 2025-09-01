"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DownloadIcon, ArrowLeftIcon, PrinterIcon, ShareIcon, LinkedinIcon, FacebookIcon, TwitterIcon, InstagramIcon } from "lucide-react"
import { useInvoice } from "@/context/invoice-context"


interface InvoicePreviewProps {
  onBackToEdit?: () => void;
}

const InvoicePreview = ({ onBackToEdit }: InvoicePreviewProps) => {
  const { invoice } = useInvoice()

  const brandColor = invoice.brandColor || '#1a73e8';

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const handleBackToEdit = () => {
    if (onBackToEdit) {
      onBackToEdit();
    }
  };

  const handlePrint = () => {
    // Add print-specific styles to hide browser headers and maximize space
    const style = document.createElement('style');
    style.id = 'print-hide-headers';
    style.innerHTML = `
      @media print {
        @page {
          margin: 0 !important;
          size: A4;
        }
        body {
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          overflow-x: hidden !important;
        }
        html {
          width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        [data-invoice-content] > div {
          padding: 0 !important;
          margin: 0 !important;
        }
        /* Hide any browser-generated content */
        *::before, *::after {
          content: none !important;
        }
        /* Force full page width usage - override all width restrictions */
        .max-w-4xl,
        .w-full,
        .mx-auto {
          max-width: none !important;
          width: 100% !important;
          margin: 0 !important;
        }
        /* Force invoice to use full page - minimal top spacing */
        [data-invoice-content],
        [data-invoice-content] > div,
        [data-invoice-content] .container,
        [data-invoice-content] .max-w-4xl {
          width: 100% !important;
          max-width: none !important;
          margin: 0 !important;
          padding: 0.125in 0.125in 0.125in 0.125in !important;
          left: 0 !important;
          right: 0 !important;
        }
        /* Override any remaining spacing - minimal top padding */
        .p-8, .mx-auto {
          padding: 0.125in 0.125in 0.125in 0.125in !important;
          margin: 0 !important;
        }
        /* Add minimal content padding for readability */
        [data-invoice-content] > div {
          padding: 0.125in 0.125in 0.125in 0.125in !important;
          margin: 0 !important;
          width: 100% !important;
        }
        /* Maximize space usage - balanced spacing */
        .mb-12, .mb-10, .mb-8, .mb-6 {
          margin-bottom: 0.75rem !important;
        }
        .mt-10, .mt-8 {
          margin-top: 0.75rem !important;
        }
        .p-12, .p-8, .p-4 {
          padding: 0.25rem !important;
        }
        /* Balanced section spacing for better readability */
        [data-invoice-content] > div {
          padding: 0.25in !important;
          margin: 0 auto !important;
          width: 100% !important;
        }
        /* Increased spacing between sections */
        .mb-12, .mb-10, .mb-8 {
          margin-bottom: 0.75rem !important;
        }
        .mb-6 {
          margin-bottom: 0.5rem !important;
        }
        .mt-10, .mt-8 {
          margin-top: 0.75rem !important;
        }
        /* Force full width usage */
        .container, [data-invoice-content], [data-invoice-content] > div {
          width: 100% !important;
          max-width: none !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        /* Force bottom sections to end of page */
        [data-invoice-content] {
          display: flex !important;
          flex-direction: column !important;
          min-height: 100vh !important;
        }
        [data-invoice-content] > div:last-child {
          margin-top: auto !important;
          padding-top: 2rem !important;
        }
        /* Force payment and legal sections to bottom - using simple selectors */
        [data-invoice-content] .flex.flex-col {
          margin-top: auto !important;
          padding-top: 2rem !important;
          position: relative !important;
        }
        
        /* Force bottom sections using simpler selectors */
        [data-invoice-content] .flex.flex-col.md\\:flex-row.md\\:justify-between.gap-8 {
          margin-top: auto !important;
          padding-top: 2rem !important;
        }
        
        /* Target sections by their position in the document */
        [data-invoice-content] > div:nth-last-child(4),
        [data-invoice-content] > div:nth-last-child(3),
        [data-invoice-content] > div:nth-last-child(2),
        [data-invoice-content] > div:nth-last-child(1) {
          margin-top: auto !important;
          padding-top: 1rem !important;
        }
        
        /* Ensure QR code and signature maintain column layout in print */
        [data-invoice-content] .mt-10.pt-8.border-t.border-gray-100 .grid {
          display: grid !important;
          grid-template-columns: 1fr 1fr !important;
          gap: 1rem !important;
        }
        
        /* Remove all top spacing that causes huge gaps at beginning */
        [data-invoice-content] > div:first-child {
          margin-top: 0 !important;
          padding-top: 0 !important;
        }
        
        [data-invoice-content] > div:first-child > *:first-child {
          margin-top: 0 !important;
          padding-top: 0 !important;
        }
        
        /* Remove top spacing from invoice header */
        [data-invoice-content] .flex.justify-between.items-start {
          margin-top: 0 !important;
          padding-top: 0 !important;
        }
      }
    `;
    document.head.appendChild(style);
    
    // Print the current page
    window.print();
    
    // Remove the temporary style after printing
    setTimeout(() => {
      const tempStyle = document.getElementById('print-hide-headers');
      if (tempStyle) {
        tempStyle.remove();
      }
    }, 1000);
  };





  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-8">
        <div className="w-full max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 print-hidden">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={handleBackToEdit} 
                className="flex items-center gap-2"
              >
                <ArrowLeftIcon size={16} />
                Back to Edit
              </Button>
              <h1 className="text-2xl font-semibold text-gray-900">Invoice Preview</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={handlePrint} variant="outline">
                <PrinterIcon className="w-4 h-4 mr-2" />
                Print
              </Button>
            </div>
          </div>

          {/* Invoice Document */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg print:border-none print:shadow-none" data-invoice-content>
            <div className="p-12 print:p-0">
              {/* Header Section */}
              <div className="flex justify-between items-start mb-12 gap-12 print:mb-4 print:gap-6">
                {/* Company Information */}
                <div className="flex-1 flex items-start gap-6 print:gap-4">
                  {invoice.companyLogo && (
                    <div className="flex-shrink-0 print:w-16">
                      <img
                        src={invoice.companyLogo}
                        alt="Company Logo"
                        className="h-20 w-auto object-contain rounded-lg shadow-sm print:h-16 print:shadow-none"
                        style={{ maxWidth: '140px', background: '#fff', border: '2px solid #f3f4f6', padding: '8px' }}
                      />
                    </div>
                  )}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 print:text-lg print:mb-2" style={{ color: brandColor }}>
                      {invoice.companyName || "Your Company Name"}
                    </h2>
                    <div className="text-sm text-gray-600 space-y-2 print:text-xs print:space-y-1">
                      {invoice.companyAddress && <p className="leading-relaxed">{invoice.companyAddress}</p>}
                      {invoice.companyPhone && <p className="flex items-center gap-2">
                        <span className="font-medium">Phone:</span> {invoice.companyPhone}
                      </p>}
                      {invoice.companyEmail && <p className="flex items-center gap-2">
                        <span className="font-medium">Email:</span> {invoice.companyEmail}
                      </p>}
                      {invoice.companyWebsite && <p className="flex items-center gap-2">
                        <span className="font-medium">Web:</span> {invoice.companyWebsite}
                      </p>}
                      {invoice.companyTaxId && <p className="flex items-center gap-2">
                        <span className="font-medium">Tax ID:</span> {invoice.companyTaxId}
                      </p>}
                    </div>
                    {/* Social Media Links */}
                    {invoice.socialMedia && (
                      <div className="flex items-center gap-4 mt-4 print:hidden">
                        {invoice.socialMedia.linkedin && (
                          <a 
                            href={invoice.socialMedia.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-blue-50"
                          >
                            <LinkedinIcon size={18} />
                          </a>
                        )}
                        {invoice.socialMedia.facebook && (
                          <a 
                            href={invoice.socialMedia.facebook} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-blue-50"
                          >
                            <FacebookIcon size={18} />
                          </a>
                        )}
                        {invoice.socialMedia.twitter && (
                          <a 
                            href={invoice.socialMedia.twitter} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-blue-50"
                          >
                            <TwitterIcon size={18} />
                          </a>
                        )}
                        {invoice.socialMedia.instagram && (
                          <a 
                            href={invoice.socialMedia.instagram} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-pink-600 transition-colors p-2 rounded-full hover:bg-blue-50"
                          >
                            <InstagramIcon size={18} />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {/* Invoice Details */}
                <div className="text-right min-w-[280px] print:min-w-[200px]">
                  <h1 className="text-3xl font-bold mb-6 tracking-wide uppercase print:text-xl print:mb-3" style={{ color: brandColor }}>Invoice</h1>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3 print:p-2 print:space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700 print:text-xs">Invoice #</span>
                      <span className="text-lg font-bold text-gray-900 print:text-sm">{invoice.invoiceNumber || 'INV-2024-001'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700 print:text-xs">Issue Date</span>
                      <span className="text-gray-900 print:text-xs">{invoice.invoiceDate ? new Date(invoice.invoiceDate).toLocaleDateString() : '1/15/2024'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700 print:text-xs">Due Date</span>
                      <span className="text-gray-900 print:text-xs">{invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : '2/15/2024'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700 print:text-xs">Customer ID</span>
                      <span className="text-gray-900 print:text-xs">{invoice.customerId || 'CUST-001'}</span>
                    </div>
                    {invoice.poNumber && (
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700 print:text-xs">PO Number</span>
                        <span className="text-gray-900 print:text-xs">{invoice.poNumber}</span>
                      </div>
                    )}
                    {invoice.project && (
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700 print:text-xs">Project</span>
                        <span className="text-gray-900 print:text-xs">{invoice.project}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bill To Section */}
              <div className="mb-10 print:mb-4">
                <div className="px-6 py-3 mb-6 rounded-t-lg print:px-3 print:py-2 print:mb-3" style={{ background: brandColor, color: '#fff' }}>
                  <h3 className="font-bold text-lg print:text-base">Bill To</h3>
                </div>
                <div className="bg-gray-50 rounded-b-lg p-8 border-l-4 print:p-4 print:border-l-2" style={{ borderLeftColor: brandColor }}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 print:gap-4">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-4 text-lg print:text-base print:mb-2">Client Information</h4>
                      <div className="space-y-3 text-gray-700 print:space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold min-w-[80px] print:min-w-[60px] print:text-xs">Name:</span>
                          <span className="text-lg print:text-sm">{invoice.clientName || 'Client Name'}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold min-w-[80px] print:min-w-[60px] print:text-xs">Email:</span>
                          <span className="print:text-xs">{invoice.clientEmail || 'client@email.com'}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold min-w-[80px] print:min-w-[60px] print:text-xs">Phone:</span>
                          <span className="print:text-xs">{invoice.clientPhone || 'Client Phone'}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-4 text-lg print:text-base print:mb-2">Billing Address</h4>
                      <div className="text-gray-700 leading-relaxed">
                        {invoice.clientAddress ? (
                          <p className="whitespace-pre-line text-lg print:text-sm">{invoice.clientAddress}</p>
                        ) : (
                          <div className="text-lg print:text-sm">
                            <p>123 Client Street</p>
                            <p>City, State 12345</p>
                            <p>Country</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div className="px-6 py-3 mb-6 rounded-t-lg print:px-3 print:py-2 print:mb-3" style={{ background: brandColor, color: '#fff' }}>
                <h3 className="font-bold text-lg print:text-base">Itemized Charges</h3>
              </div>
              <div className="mb-10 print:mb-4">
                <div className="overflow-hidden rounded-b-lg border border-gray-200 print:border-gray-300">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left py-4 px-6 font-bold text-gray-700 text-sm uppercase tracking-wide print:py-2 print:px-3 print:text-xs">Description</th>
                        <th className="text-center py-4 px-6 font-bold text-gray-700 text-sm uppercase tracking-wide print:py-2 print:px-3 print:text-xs">Qty</th>
                        <th className="text-center py-4 px-6 font-bold text-gray-700 text-sm uppercase tracking-wide print:py-2 print:px-3 print:text-xs">Rate</th>
                        <th className="text-right py-4 px-6 font-bold text-gray-700 text-sm uppercase tracking-wide print:py-2 print:px-3 print:text-xs">Amount</th>
                      </tr>
                    </thead>
                  <tbody>
                    {invoice.items && invoice.items.length > 0 ? (
                      invoice.items.map((item, index) => (
                        <tr key={item.id} className="border-b last:border-b-0 border-gray-100">
                          <td className="py-2 px-4 text-gray-800 align-top print:py-1 print:px-2 print:text-xs">{item.description}</td>
                          <td className="py-2 px-4 text-gray-700 text-center align-top print:py-1 print:px-2 print:text-xs">{item.quantity || 1}</td>
                          <td className="py-2 px-4 text-gray-700 text-center align-top print:py-1 print:px-2 print:text-xs">{formatCurrency(item.rate || item.amount)}</td>
                          <td className="py-2 px-4 text-gray-900 text-right align-top font-medium print:py-1 print:px-2 print:text-xs">{formatCurrency((item.quantity || 1) * (item.rate || item.amount))}</td>
                        </tr>
                      ))
                    ) : (
                      <tr className="border-b border-gray-100">
                        <td className="py-2 px-4 text-gray-400 print:py-1 print:px-2 print:text-xs">Service Fee</td>
                        <td className="py-2 px-4 text-gray-400 text-center print:py-1 print:px-2 print:text-xs">1</td>
                        <td className="py-2 px-4 text-gray-400 text-center print:py-1 print:px-2 print:text-xs">$150.00</td>
                        <td className="py-2 px-4 text-gray-400 text-right print:py-1 print:px-2 print:text-xs">$150.00</td>
                      </tr>
                    )}
                    {[...Array(8)].map((_, index) => (
                      <tr key={`empty-${index}`} className="border-b last:border-b-0 border-gray-100">
                        <td className="py-2 px-4 text-gray-200 print:py-1 print:px-2 print:text-xs">&nbsp;</td>
                        <td className="py-2 px-4 text-gray-200 text-center print:py-1 print:px-2 print:text-xs">&nbsp;</td>
                        <td className="py-2 px-4 text-gray-200 text-center print:py-1 print:px-2 print:text-xs">&nbsp;</td>
                        <td className="py-2 px-4 text-gray-200 text-right print:py-1 print:px-2 print:text-xs">&nbsp;</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </div>

              {/* Summary and Payment Instructions */}
              <div className="flex flex-col md:flex-row md:justify-between gap-8 print:gap-4">
                {/* Payment Instructions */}
                <div className="flex-1">
                  <div className="px-4 py-2 mb-4 print:px-2 print:py-1 print:mb-2" style={{ background: brandColor, color: '#fff' }}>
                    <h3 className="font-semibold print:text-sm">PAYMENT INSTRUCTIONS</h3>
                  </div>
                  <div className="text-sm text-gray-700 space-y-1 bg-gray-50 rounded p-4 print:text-xs print:p-2 print:space-y-0">
                    <p>1. Total payment due in 30 days.</p>
                    <p>2. Please include the invoice number on your check.</p>
                  </div>
                </div>
                {/* Payment Summary Section Header */}
                <div className="w-full md:w-64 mt-8 md:mt-0 print:mt-0 print:w-full">
                  <div className="px-4 py-2 mb-4 print:px-2 print:py-1 print:mb-2" style={{ background: brandColor, color: '#fff' }}>
                    <h3 className="font-semibold print:text-sm">PAYMENT SUMMARY</h3>
                  </div>
                  <div className="space-y-2 text-sm bg-gray-50 rounded p-4 print:text-xs print:p-2 print:space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">{formatCurrency(invoice.subtotal || 525)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">{formatCurrency(invoice.tax || 43.31)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total</span>
                      <span className="font-medium">{formatCurrency(invoice.total || 568.31)}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-2 print:pt-1">
                      <span className="font-bold text-gray-900">Balance Due</span>
                      <span className="font-bold text-gray-900">{formatCurrency(invoice.total || 568.31)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Code and Digital Signature */}
              {(invoice.qrCodeImage || invoice.digitalSignature) && (
                <div className="mt-10 pt-8 border-t border-gray-100 print:mt-4 print:pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:gap-4">
                    {/* QR Code */}
                    {invoice.qrCodeImage && (
                      <div className="flex justify-center">
                        <div className="text-center">
                          <img 
                            src={invoice.qrCodeImage}
                            alt="QR Code" 
                            className="w-32 h-32 object-contain mx-auto mb-2 print:w-24 print:h-24 print:mb-1"
                          />
                          <p className="text-xs text-gray-400 print:text-[10px]">Scan for payment details</p>
                        </div>
                      </div>
                    )}
                    {/* Digital Signature */}
                    {invoice.digitalSignature && (
                      <div className="flex justify-center">
                        <div className="text-center">
                          <img 
                            src={invoice.digitalSignature}
                            alt="Digital Signature" 
                            className="max-w-full max-h-24 object-contain mx-auto mb-2 print:max-h-16 print:mb-1"
                          />
                          <p className="text-xs text-gray-400 print:text-[10px]">Authorized signature</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Legal/Compliance Section */}
              <div className="mt-8 print:mt-4">
                <div className="px-4 py-2 mb-4 print:px-2 print:py-1 print:mb-2" style={{ background: brandColor, color: '#fff' }}>
                  <h3 className="font-semibold print:text-sm">LEGAL / COMPLIANCE</h3>
                </div>
                <div className="text-sm text-gray-700 bg-gray-50 rounded p-4 print:text-xs print:p-2 whitespace-pre-line">
                  {invoice.legalCompliance || 'All services provided are subject to applicable laws and regulations. Please ensure compliance with all relevant legal requirements.'}
                </div>
              </div>
              {/* Terms & Conditions Section */}
              {invoice.termsConditions && (
                <div className="mt-8 print:mt-4">
                  <div className="px-4 py-2 mb-4 print:px-2 print:py-1 print:mb-2" style={{ background: brandColor, color: '#fff' }}>
                    <h3 className="font-semibold print:text-sm">TERMS & CONDITIONS</h3>
                  </div>
                  <div className="text-sm text-gray-700 bg-gray-50 rounded p-4 print:text-xs print:p-2 whitespace-pre-line">
                    {invoice.termsConditions}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="mt-10 pt-8 border-t border-gray-100 print:mt-4 print:pt-4">
                {/* Company Information Footer Header */}
                <div className="px-4 py-2 mb-4 print:px-2 print:py-1 print:mb-2" style={{ background: brandColor, color: '#fff' }}>
                  <h3 className="font-semibold print:text-sm">COMPANY INFORMATION</h3>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between items-end gap-4 print:gap-2">
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1 print:text-[10px]">
                      Make all checks payable to: <span className="font-semibold text-gray-700">{invoice.companyName || 'Your Company Name'}</span>
                    </p>
                    <p className="text-xs text-gray-500 print:text-[10px]">
                      If you have any questions about this invoice, please contact <span className="font-semibold text-gray-700">{invoice.companyName || 'Name, Phone & Email'}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-bold text-gray-900 mb-1 print:text-sm print:mb-0">
                      Thank You For Your Business!
                    </p>
                    {invoice.thankYouMessage && invoice.thankYouMessage.trim() !== '' && (
                      <p className="text-xs text-gray-500 print:text-[10px]">{invoice.thankYouMessage}</p>
                    )}
                  </div>
                </div>
                <div className="mt-4 text-xs text-gray-400 text-center print:mt-2 print:text-[10px]">
                  <p>{invoice.companyName || 'Your Company'}</p>
                  <p>© {new Date().getFullYear()} All rights reserved</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvoicePreview
