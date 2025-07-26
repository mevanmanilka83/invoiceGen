import React, { useId } from 'react'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const BasicDetails = () => {
  const invoiceNumberId = useId()
  const invoiceDateId = useId()
  const dueDateId = useId()

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
          <div className="group relative">
            <label
              htmlFor={invoiceNumberId}
              className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
            >
              Invoice Number
            </label>
            <Input 
              id={invoiceNumberId} 
              className="h-10 w-full" 
              placeholder="INV-2024-001"
            />
          </div>
          <div className="group relative">
            <label
              htmlFor={invoiceDateId}
              className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
            >
              Invoice Date
            </label>
            <Input 
              id={invoiceDateId} 
              type="date"
              className="h-10 w-full" 
            />
          </div>
          <div className="group relative">
            <label
              htmlFor={dueDateId}
              className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
            >
              Due Date
            </label>
            <Input 
              id={dueDateId} 
              type="date"
              className="h-10 w-full" 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default BasicDetails 