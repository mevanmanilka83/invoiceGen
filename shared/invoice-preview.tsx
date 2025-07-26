"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { DownloadIcon, ArrowLeftIcon } from "lucide-react"
import { Card } from "@/components/ui/card"

const InvoicePreview = () => {
  const router = useRouter()
  const [showPreview, setShowPreview] = useState(false)

  return (
    <div className="container mx-auto p-6">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.push("/")} className="group flex items-center gap-2">
              <ArrowLeftIcon
                className="-ms-1 opacity-60 transition-transform group-hover:-translate-x-0.5"
                size={16}
                aria-hidden="true"
              />
              Back to Edit Invoice
            </Button>
            <h1 className="text-2xl font-bold">Invoice Preview</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="default"  className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white">
              Download Invoice
              <DownloadIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Complete Invoice */}
        <Card>
          <div className="p-8">
            {/* Invoice Header */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">INVOICE</h1>
                <div className="text-sm text-gray-600">
                  <p className="font-medium">Acme Corporation</p>
                  <p>123 Business Street, Suite 100</p>
                  <p>New York, NY 10001</p>
                  <p>Phone: (555) 123-4567</p>
                  <p>Email: contact@acmecorp.com</p>
                  <p>Website: www.acmecorp.com</p>
                  <p>Tax ID: 12-3456789</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600 mb-2">
                  <p><span className="font-medium">Invoice #:</span> INV-2024-001</p>
                  <p><span className="font-medium">Date:</span> January 15, 2024</p>
                  <p><span className="font-medium">Due Date:</span> February 15, 2024</p>
                  <p><span className="font-medium">PO Number:</span> PO-2024-001</p>
                  <p><span className="font-medium">Project:</span> Website Redesign</p>
                </div>
              </div>
            </div>

            {/* Bill To Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Bill To:</h3>
              <div className="text-sm text-gray-600">
                <p className="font-medium">Jane Doe</p>
                <p>Client Company Inc.</p>
                <p>456 Client Avenue, Suite 200</p>
                <p>Los Angeles, CA 90210</p>
                <p>Phone: (555) 987-6543</p>
                <p>Email: jane.doe@clientcompany.com</p>
              </div>
            </div>

            {/* Invoice Items Table */}
            <div className="mb-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Description</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-900">Quantity</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-900">Rate</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-900">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-4 text-sm text-gray-700">Website Design & Development</td>
                      <td className="py-4 px-4 text-sm text-gray-700 text-right">1</td>
                      <td className="py-4 px-4 text-sm text-gray-700 text-right">$5,000.00</td>
                      <td className="py-4 px-4 text-sm text-gray-700 text-right">$5,000.00</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-4 text-sm text-gray-700">SEO Optimization</td>
                      <td className="py-4 px-4 text-sm text-gray-700 text-right">1</td>
                      <td className="py-4 px-4 text-sm text-gray-700 text-right">$1,500.00</td>
                      <td className="py-4 px-4 text-sm text-gray-700 text-right">$1,500.00</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-4 text-sm text-gray-700">Content Creation</td>
                      <td className="py-4 px-4 text-sm text-gray-700 text-right">10</td>
                      <td className="py-4 px-4 text-sm text-gray-700 text-right">$150.00</td>
                      <td className="py-4 px-4 text-sm text-gray-700 text-right">$1,500.00</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-4 text-sm text-gray-700">Monthly Maintenance</td>
                      <td className="py-4 px-4 text-sm text-gray-700 text-right">3</td>
                      <td className="py-4 px-4 text-sm text-gray-700 text-right">$500.00</td>
                      <td className="py-4 px-4 text-sm text-gray-700 text-right">$1,500.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Totals Section */}
            <div className="mb-8">
              <div className="flex justify-end">
                <div className="w-64">
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-gray-600">Subtotal:</span>
                    <span className="text-sm font-medium">$9,500.00</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-gray-600">Discount (10%):</span>
                    <span className="text-sm font-medium text-green-600">-$950.00</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-gray-600">Sales Tax (8.5%):</span>
                    <span className="text-sm font-medium">$726.75</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-gray-600">State Tax (2%):</span>
                    <span className="text-sm font-medium">$171.00</span>
                  </div>
                  <div className="flex justify-between py-3 border-t border-gray-200">
                    <span className="text-lg font-semibold text-gray-900">Total:</span>
                    <span className="text-lg font-semibold text-gray-900">$9,447.75</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Instructions */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Instructions</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Bank Transfer */}
                <div className="border rounded-lg p-4 bg-gray-50">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Bank Transfer</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><span className="font-medium">Bank:</span> Chase Bank</p>
                    <p><span className="font-medium">Account:</span> 1234567890</p>
                    <p><span className="font-medium">Routing:</span> 021000021</p>
                  </div>
                </div>

                {/* PayPal */}
                <div className="border rounded-lg p-4 bg-gray-50">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">PayPal</h4>
                  <div className="text-sm text-gray-600">
                    <p><span className="font-medium">Email:</span> payments@acmecorp.com</p>
                  </div>
                </div>

                {/* Venmo */}
                <div className="border rounded-lg p-4 bg-gray-50">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Venmo</h4>
                  <div className="text-sm text-gray-600">
                    <p><span className="font-medium">Username:</span> @acmecorp</p>
                  </div>
                </div>

                {/* Cash App */}
                <div className="border rounded-lg p-4 bg-gray-50">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Cash App</h4>
                  <div className="text-sm text-gray-600">
                    <p><span className="font-medium">$Cashtag:</span> $acmecorp</p>
                  </div>
                </div>

                {/* Zelle */}
                <div className="border rounded-lg p-4 bg-gray-50">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Zelle</h4>
                  <div className="text-sm text-gray-600">
                    <p><span className="font-medium">Email:</span> payments@acmecorp.com</p>
                  </div>
                </div>

                {/* Check Payment */}
                <div className="border rounded-lg p-4 bg-gray-50">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Check Payment</h4>
                  <div className="text-sm text-gray-600">
                    <p><span className="font-medium">Mail to:</span></p>
                    <p>Acme Corporation</p>
                    <p>123 Business Street, Suite 100</p>
                    <p>New York, NY 10001</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Sections */}
            <div className="space-y-4">
              {/* Terms and Conditions */}
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Terms & Conditions</h4>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>• This invoice is generated using InvoiceGen free invoice generator</p>
                  <p>• Customize all details to match your business requirements</p>
                  <p>• Ensure accuracy of all information before sending to clients</p>
                  <p>• Review payment terms and conditions for your business</p>
                  <p>• Save a copy of this invoice for your records</p>
                </div>
              </div>

              {/* Thank You Message */}
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  <span className="font-medium">Thank you for using InvoiceGen!</span> We hope this free invoice generator helps streamline your business processes.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default InvoicePreview
