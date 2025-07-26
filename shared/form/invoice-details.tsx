import React, { useId } from 'react'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useInvoice } from '@/context/invoice-context'

const InvoiceDetails = () => {
  const poNumberId = useId()
  const projectNameId = useId()
  const customerIdId = useId()

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              Project Name (Optional)
            </label>
            <Input 
              id={projectNameId} 
              className="h-10 w-full" 
              placeholder="Website Redesign"
              value={invoice.project || ''}
              onChange={(e) => handleInputChange('project', e.target.value)}
            />
          </div>

          {/* Customer ID */}
          <div className="group relative">
            <label
              htmlFor={customerIdId}
              className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
            >
              Customer ID (Optional)
            </label>
            <Input 
              id={customerIdId} 
              className="h-10 w-full" 
              placeholder="276"
              value={invoice.customerId || ''}
              onChange={(e) => handleInputChange('customerId', e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default InvoiceDetails 