import React, { useId } from 'react'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useInvoice } from '@/context/invoice-context'

const InvoiceDetails = () => {
  const poNumberId = useId()
  const projectNameId = useId()
  const thankYouMessageId = useId()
  const termsConditionsId = useId()

  const { invoice, updateInvoice } = useInvoice()

  const handleInputChange = (field: string, value: string) => {
    updateInvoice({ [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice Details</CardTitle>
        <CardDescription>
          Additional information for this specific invoice
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Purchase Order Number */}
          <div className="group relative">
            <label
              htmlFor={poNumberId}
              className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
            >
              PO Number (Optional)
            </label>
            <Input 
              id={poNumberId} 
              className="h-10 w-full" 
              placeholder="PO-2024-001"
              value={invoice.poNumber || ''}
              onChange={(e) => handleInputChange('poNumber', e.target.value)}
            />
          </div>

          {/* Project Name */}
          <div className="group relative">
            <label
              htmlFor={projectNameId}
              className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
            >
              Project Name
            </label>
            <Input 
              id={projectNameId} 
              className="h-10 w-full" 
              placeholder="Website Redesign Project"
              value={invoice.project || ''}
              onChange={(e) => handleInputChange('project', e.target.value)}
            />
          </div>
        </div>

        {/* Thank You Message */}
        <div className="space-y-2">
          <Label htmlFor={thankYouMessageId} className="text-xs font-medium">Thank You Message</Label>
          <textarea 
            id={thankYouMessageId}
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Thank you for choosing our services! We appreciate your business and look forward to working with you again."
            value={invoice.thankYouMessage || ''}
            onChange={e => handleInputChange('thankYouMessage', e.target.value)}
          />
        </div>

        {/* Terms & Conditions */}
        <div className="space-y-2">
          <Label htmlFor={termsConditionsId} className="text-xs font-medium">Terms & Conditions</Label>
          <textarea 
            id={termsConditionsId}
            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Payment is due within 30 days of invoice date. Late payments may incur additional fees. All work is guaranteed for 90 days from completion date."
            value={invoice.termsConditions || ''}
            onChange={e => handleInputChange('termsConditions', e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default InvoiceDetails 