import React, { useId } from 'react'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useInvoice } from '@/context/invoice-context'

const BasicDetails = () => {
  const invoiceNumberId = useId()
  const invoiceDateId = useId()
  const dueDateId = useId()

  const { invoice, updateInvoice } = useInvoice()

  const handleInputChange = (field: string, value: string) => {
    updateInvoice({ [field]: value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice Details</CardTitle>
        <CardDescription>
          Enter the invoice details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor={invoiceNumberId}>Invoice Number</Label>
            <Input 
              id={invoiceNumberId} 
              className="h-10 w-full" 
              placeholder="INV-2024-001"
              value={invoice.invoiceNumber}
              onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={invoiceDateId}>Invoice Date</Label>
            <Input 
              id={invoiceDateId} 
              type="date"
              className="h-10 w-full" 
              value={invoice.invoiceDate}
              onChange={(e) => handleInputChange('invoiceDate', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={dueDateId}>Due Date</Label>
            <Input 
              id={dueDateId} 
              type="date"
              className="h-10 w-full" 
              value={invoice.dueDate}
              onChange={(e) => handleInputChange('dueDate', e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default BasicDetails 