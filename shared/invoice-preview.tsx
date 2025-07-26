"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DownloadIcon, ArrowLeftIcon, PrinterIcon, ShareIcon } from "lucide-react"
import { useInvoice } from "@/context/invoice-context"

interface InvoicePreviewProps {
  onBackToEdit?: () => void;
}

const InvoicePreview = ({ onBackToEdit }: InvoicePreviewProps) => {
  const { invoice } = useInvoice()

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
    window.print();
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-8">
        <div className="w-full max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
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
              
              <Button>
                <DownloadIcon className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>

          {/* Invoice Document */}
          <div className="bg-white border border-gray-200 rounded-lg">
            <div className="p-10">
              {/* Header Section */}
              <div className="flex justify-between items-start mb-10 gap-8">
                {/* Company Information */}
                <div className="flex-1 flex items-start gap-4">
                  {invoice.companyLogo && (
                    <div className="flex-shrink-0">
                      <img
                        src={invoice.companyLogo}
                        alt="Company Logo"
                        className="h-16 w-auto object-contain rounded"
                        style={{ maxWidth: '120px', background: '#fff', border: '1px solid #eee', padding: '4px' }}
                      />
                    </div>
                  )}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      {invoice.companyName || "Company Name"}
                    </h2>
                    <div className="text-sm text-gray-500 space-y-1">
                      {invoice.companyAddress && <p>{invoice.companyAddress}</p>}
                      {invoice.companyPhone && <p>{invoice.companyPhone}</p>}
                      {invoice.companyEmail && <p>{invoice.companyEmail}</p>}
                      {invoice.companyWebsite && <p>{invoice.companyWebsite}</p>}
                      {invoice.companyTaxId && <p>Tax ID: {invoice.companyTaxId}</p>}
                    </div>
                  </div>
                </div>
                {/* Invoice Details */}
                <div className="text-right min-w-[220px]">
                  <h1 className="text-xl font-bold text-gray-900 mb-4 tracking-wide">INVOICE</h1>
                  <div className="divide-y divide-gray-200 text-sm">
                    <div className="flex justify-between py-1">
                      <span className="font-medium text-gray-700">INV #</span>
                      <span className="text-gray-900">{invoice.invoiceNumber || 'INV-2024-001'}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="font-medium text-gray-700">Date</span>
                      <span className="text-gray-900">{invoice.invoiceDate ? new Date(invoice.invoiceDate).toLocaleDateString() : '1/15/2024'}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="font-medium text-gray-700">Customer ID</span>
                      <span className="text-gray-900">276</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="font-medium text-gray-700">PO Number</span>
                      <span className="text-gray-900">{invoice.poNumber || '-'}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="font-medium text-gray-700">Project</span>
                      <span className="text-gray-900">{invoice.project || '-'}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="font-medium text-gray-700">Due Date</span>
                      <span className="text-gray-900">{invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : '2/15/2024'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bill To Section */}
              <div className="mb-8">
                <div className="bg-gray-900 text-white px-4 py-2 mb-4">
                  <h3 className="font-semibold">BILL TO</h3>
                </div>
                <div className="text-sm text-gray-700 space-y-1 bg-gray-50 rounded p-4">
                  <p className="font-medium">{invoice.clientName || 'Name'}</p>
                  <p>Company Name</p>
                  <p>{invoice.clientAddress?.split('\n')[0] || 'Address'}</p>
                  <p>{invoice.clientAddress?.split('\n')[1] || 'City, ST ZIP'}</p>
                  <p>{invoice.clientPhone || 'Phone'}</p>
                  {invoice.clientEmail && <p>{invoice.clientEmail}</p>}
                </div>
              </div>

              {/* Items Table */}
              <div className="bg-gray-900 text-white px-4 py-2 mb-4">
                <h3 className="font-semibold">ITEMIZED CHARGES</h3>
              </div>
              <div className="mb-8">
                <table className="w-full border-t border-b border-gray-200">
                  <thead>
                    <tr>
                      <th className="text-left py-2 px-4 font-semibold text-xs text-gray-500">DESCRIPTION</th>
                      <th className="text-center py-2 px-4 font-semibold text-xs text-gray-500">QTY</th>
                      <th className="text-center py-2 px-4 font-semibold text-xs text-gray-500">RATE</th>
                      <th className="text-right py-2 px-4 font-semibold text-xs text-gray-500">AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items && invoice.items.length > 0 ? (
                      invoice.items.map((item, index) => (
                        <tr key={item.id} className="border-b last:border-b-0 border-gray-100">
                          <td className="py-2 px-4 text-gray-800 align-top">{item.description}</td>
                          <td className="py-2 px-4 text-gray-700 text-center align-top">{item.quantity || 1}</td>
                          <td className="py-2 px-4 text-gray-700 text-center align-top">{formatCurrency(item.rate || item.amount)}</td>
                          <td className="py-2 px-4 text-gray-900 text-right align-top font-medium">{formatCurrency((item.quantity || 1) * (item.rate || item.amount))}</td>
                        </tr>
                      ))
                    ) : (
                      <tr className="border-b border-gray-100">
                        <td className="py-2 px-4 text-gray-400">Service Fee</td>
                        <td className="py-2 px-4 text-gray-400 text-center">1</td>
                        <td className="py-2 px-4 text-gray-400 text-center">$150.00</td>
                        <td className="py-2 px-4 text-gray-400 text-right">$150.00</td>
                      </tr>
                    )}
                    {[...Array(8)].map((_, index) => (
                      <tr key={`empty-${index}`} className="border-b last:border-b-0 border-gray-100">
                        <td className="py-2 px-4 text-gray-200">&nbsp;</td>
                        <td className="py-2 px-4 text-gray-200 text-center">&nbsp;</td>
                        <td className="py-2 px-4 text-gray-200 text-center">&nbsp;</td>
                        <td className="py-2 px-4 text-gray-200 text-right">&nbsp;</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Summary and Payment Instructions */}
              <div className="flex flex-col md:flex-row md:justify-between gap-8">
                {/* Payment Instructions */}
                <div className="flex-1">
                  <div className="bg-gray-900 text-white px-4 py-2 mb-4">
                    <h3 className="font-semibold">PAYMENT INSTRUCTIONS</h3>
                  </div>
                  <div className="text-sm text-gray-700 space-y-1 bg-gray-50 rounded p-4">
                    <p>1. Total payment due in 30 days.</p>
                    <p>2. Please include the invoice number on your check.</p>
                  </div>
                </div>
                {/* Payment Summary Section Header */}
                <div className="w-full md:w-64 mt-8 md:mt-0">
                  <div className="bg-gray-900 text-white px-4 py-2 mb-4">
                    <h3 className="font-semibold">PAYMENT SUMMARY</h3>
                  </div>
                  <div className="space-y-2 text-sm bg-gray-50 rounded p-4">
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
                    <div className="flex justify-between border-t border-gray-200 pt-2">
                      <span className="font-bold text-gray-900">Balance Due</span>
                      <span className="font-bold text-gray-900">{formatCurrency(invoice.total || 568.31)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Code and Digital Signature */}
              {(invoice.qrCodeImage || invoice.digitalSignature) && (
                <div className="mt-10 pt-8 border-t border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* QR Code */}
                    {invoice.qrCodeImage && (
                      <div className="flex justify-center">
                        <div className="text-center">
                          <img 
                            src={invoice.qrCodeImage}
                            alt="QR Code" 
                            className="w-32 h-32 object-contain mx-auto mb-2"
                          />
                          <p className="text-xs text-gray-400">Scan for payment details</p>
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
                            className="max-w-full max-h-24 object-contain mx-auto mb-2"
                          />
                          <p className="text-xs text-gray-400">Authorized signature</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Legal/Compliance Section */}
              <div className="mt-8">
                <div className="bg-gray-900 text-white px-4 py-2 mb-4">
                  <h3 className="font-semibold">LEGAL / COMPLIANCE</h3>
                </div>
                <div className="text-sm text-gray-700 bg-gray-50 rounded p-4 whitespace-pre-line">
                  {invoice.legalCompliance || 'All services provided are subject to applicable laws and regulations. Please ensure compliance with all relevant legal requirements.'}
                </div>
              </div>
              {/* Terms & Conditions Section */}
              {invoice.termsConditions && (
                <div className="mt-8">
                  <div className="bg-gray-900 text-white px-4 py-2 mb-4">
                    <h3 className="font-semibold">TERMS & CONDITIONS</h3>
                  </div>
                  <div className="text-sm text-gray-700 bg-gray-50 rounded p-4 whitespace-pre-line">
                    {invoice.termsConditions}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="mt-10 pt-8 border-t border-gray-100">
                {/* Company Information Footer Header */}
                <div className="bg-gray-900 text-white px-4 py-2 mb-4">
                  <h3 className="font-semibold">COMPANY INFORMATION</h3>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between items-end gap-4">
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">
                      Make all checks payable to: <span className="font-semibold text-gray-700">{invoice.companyName || 'Your Company Name'}</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      If you have any questions about this invoice, please contact <span className="font-semibold text-gray-700">{invoice.companyName || 'Name, Phone & Email'}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-bold text-gray-900 mb-1">
                      Thank You For Your Business!
                    </p>
                    {invoice.thankYouMessage && invoice.thankYouMessage.trim() !== '' && (
                      <p className="text-xs text-gray-500">{invoice.thankYouMessage}</p>
                    )}
                  </div>
                </div>
                <div className="mt-4 text-xs text-gray-400 text-center">
                  <p>{invoice.companyName || 'Your Company'}</p>
                  <p>© 2024 All rights reserved</p>
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
