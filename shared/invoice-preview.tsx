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
          <div className="bg-white border border-gray-200">
            <div className="p-12">
              {/* Header Section */}
              <div className="flex justify-between items-start mb-8">
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
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      {invoice.companyName || "Company Name"}
                    </h2>
                    <div className="text-sm text-gray-600 space-y-1">
                      {invoice.companyAddress && (
                        <p>{invoice.companyAddress}</p>
                      )}
                      {invoice.companyPhone && (
                        <p>{invoice.companyPhone}</p>
                      )}
                      {invoice.companyEmail && (
                        <p>{invoice.companyEmail}</p>
                      )}
                      {invoice.companyWebsite && (
                        <p>{invoice.companyWebsite}</p>
                      )}
                      {invoice.companyTaxId && (
                        <p>Tax ID: {invoice.companyTaxId}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Invoice Details */}
                <div className="text-right">
                  <h1 className="text-2xl font-bold text-gray-900 mb-6">INVOICE</h1>
                  <div className="space-y-1">
                    <div className="flex justify-between border-b border-gray-200 pb-1">
                      <span className="font-medium text-gray-900">INV #:</span>
                      <span className="text-gray-900">INV-2024-001</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-1">
                      <span className="font-medium text-gray-900">DATE:</span>
                      <span className="text-gray-900">1/15/2024</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-1">
                      <span className="font-medium text-gray-900">CUSTOMER ID:</span>
                      <span className="text-gray-900">276</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-900">DUE DATE:</span>
                      <span className="text-gray-900">2/15/2024</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bill To Section */}
              <div className="mb-8">
                <div className="bg-gray-900 text-white px-4 py-2 mb-4">
                  <h3 className="font-semibold">BILL TO</h3>
                </div>
                <div className="text-sm text-gray-700 space-y-1">
                  <p className="font-medium">{invoice.clientName || 'Name'}</p>
                  <p>Company Name</p>
                  <p>{invoice.clientAddress?.split('\n')[0] || 'Address'}</p>
                  <p>{invoice.clientAddress?.split('\n')[1] || 'City, ST ZIP'}</p>
                  <p>{invoice.clientPhone || 'Phone'}</p>
                </div>
              </div>

              {/* Items Table */}
              <div className="mb-8">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-900 text-white">
                      <th className="text-left py-3 px-4 font-semibold">DESCRIPTION</th>
                      <th className="text-center py-3 px-4 font-semibold">TAXES</th>
                      <th className="text-right py-3 px-4 font-semibold">AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items && invoice.items.length > 0 ? (
                      invoice.items.map((item, index) => (
                        <tr key={item.id} className="border-b border-gray-200">
                          <td className="py-3 px-4 text-gray-700">{item.description}</td>
                          <td className="py-3 px-4 text-gray-700 text-center">1</td>
                          <td className="py-3 px-4 text-gray-700 text-right font-medium">{formatCurrency(item.amount)}</td>
                        </tr>
                      ))
                    ) : (
                      <>
                        <tr className="border-b border-gray-200">
                          <td className="py-3 px-4 text-gray-700">Service Fee</td>
                          <td className="py-3 px-4 text-gray-700 text-center">1</td>
                          <td className="py-3 px-4 text-gray-700 text-right font-medium">$150.00</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-3 px-4 text-gray-700">Station 5 Hours @ $75/Hr</td>
                          <td className="py-3 px-4 text-gray-700 text-center">0</td>
                          <td className="py-3 px-4 text-gray-700 text-right font-medium">$375.00</td>
                        </tr>
                      </>
                    )}
                    {/* Empty rows for additional items */}
                    {[...Array(8)].map((_, index) => (
                      <tr key={`empty-${index}`} className="border-b border-gray-200">
                        <td className="py-3 px-4 text-gray-300"></td>
                        <td className="py-3 px-4 text-gray-300 text-center"></td>
                        <td className="py-3 px-4 text-gray-300 text-right"></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Summary and Payment Instructions */}
              <div className="flex justify-between">
                {/* Payment Instructions */}
                <div className="flex-1 mr-8">
                  <div className="bg-gray-900 text-white px-4 py-2 mb-4">
                    <h3 className="font-semibold">PAYMENT INSTRUCTIONS</h3>
                  </div>
                  <div className="text-sm text-gray-700 space-y-2">
                    <p>1. Total payment due in 30 days.</p>
                    <p>2. Please include the invoice number on your check.</p>
                  </div>
                </div>

                {/* Summary Section */}
                <div className="w-64">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">{formatCurrency(invoice.subtotal || 525)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax rate:</span>
                      <span className="font-medium">8.25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Taxes:</span>
                      <span className="font-medium">{formatCurrency(invoice.tax || 43.31)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total:</span>
                      <span className="font-medium">{formatCurrency(invoice.total || 568.31)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Paid:</span>
                      <span className="font-medium">$0.00</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-300 pt-2">
                      <span className="font-bold text-gray-900">Balance Due:</span>
                      <span className="font-bold text-gray-900">{formatCurrency(invoice.total || 568.31)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex justify-between items-end">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-2">
                      Make all checks payable to: <span className="bg-gray-100 px-2 py-1 rounded">{invoice.companyName || 'Your Company Name'}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      If you have any questions about this invoice, please contact <span className="bg-gray-100 px-2 py-1 rounded">{invoice.companyName || 'Name, Phone & Email'}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-900 mb-2">
                      Thank You For Your Business!
                    </p>
                    {invoice.thankYouMessage && invoice.thankYouMessage.trim() !== '' && (
                      <p className="text-sm text-gray-600">{invoice.thankYouMessage}</p>
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
