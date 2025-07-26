"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import InvoicePreview from "@/shared/invoice-preview"
import InvoiceForm from "@/shared/invoice-form"

export default function Home() {
  const [showPreview, setShowPreview] = useState(false)

  const handleBackToEdit = () => {
    setShowPreview(false);
  };

  if (showPreview) {
    return <InvoicePreview onBackToEdit={handleBackToEdit} />
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">InvoiceGen</h1>
            <p className="text-gray-600 mt-1">Create professional invoices for your business</p>
          </div>
          <div className="divide-primary-foreground/30 inline-flex divide-x rounded-md shadow-xs rtl:space-x-reverse">
            <Button
              className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10"
              size="icon"
              aria-label="eye"
              onClick={() => setShowPreview(true)}
            >
              <Eye size={16} aria-hidden="true" />
            </Button>
            <Button className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10">
              Preview
            </Button>
          </div>
        </div>
        <InvoiceForm />
      </div>
    </div>
  )
}
