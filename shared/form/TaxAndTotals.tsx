import React, { useId, useState } from 'react'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PlusIcon, Trash2Icon } from "lucide-react"
import { useInvoice } from '@/context/invoice-context'

interface TaxRate {
  id: string
  name: string
  rate: string
}

const TaxAndTotals = () => {
  const discountPercentageId = useId()
  const discountAmountId = useId()
  const [taxRates, setTaxRates] = useState<TaxRate[]>([
    { id: 'tax-1', name: 'Sales Tax', rate: '' }
  ])

  const { invoice } = useInvoice()

  const addTaxRate = () => {
    const newId = `tax-${Date.now()}`
    setTaxRates([...taxRates, { id: newId, name: '', rate: '' }])
  }

  const deleteTaxRate = (id: string) => {
    if (taxRates.length > 1) {
      setTaxRates(taxRates.filter(tax => tax.id !== id))
    }
  }

  const updateTaxRate = (id: string, field: keyof TaxRate, value: string) => {
    setTaxRates(taxRates.map(tax => 
      tax.id === id ? { ...tax, [field]: value } : tax
    ))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tax & Totals</CardTitle>
        <CardDescription>
          Calculate discounts, tax rates, and final totals
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="group relative">
            <label
              htmlFor={discountPercentageId}
              className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
            >
              Discount Percentage (%)
            </label>
            <Input 
              id={discountPercentageId} 
              type="number"
              step="0.01"
              className="h-10 w-full" 
              placeholder="10.00"
              value="10.00"
              disabled
            />
          </div>


          <div className="group relative">
            <label
              htmlFor={discountAmountId}
              className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
            >
              Discount Amount
            </label>
            <Input 
              id={discountAmountId} 
              type="number"
              step="0.01"
              className="h-10 w-full" 
              placeholder="50.00"
              value={invoice.discount.toFixed(2)}
              disabled
            />
          </div>
        </div>


        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-muted-foreground">Tax Rates</h4>
            <Button variant="outline" size="sm" onClick={addTaxRate}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Tax Rate
            </Button>
          </div>
          
          {taxRates.map((tax, index) => (
            <div key={tax.id} className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div className="group relative">
                <label
                  htmlFor={`tax-name-${tax.id}`}
                  className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
                >
                  Tax Name
                </label>
                <Input 
                  id={`tax-name-${tax.id}`}
                  value={tax.name}
                  onChange={(e) => updateTaxRate(tax.id, 'name', e.target.value)}
                  className="h-10 w-full" 
                  placeholder="Sales Tax, VAT, GST"
                />
              </div>


              <div className="group relative">
                <label
                  htmlFor={`tax-rate-${tax.id}`}
                  className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
                >
                  Rate (%)
                </label>
                <Input 
                  id={`tax-rate-${tax.id}`}
                  type="number"
                  step="0.01"
                  value={tax.rate}
                  onChange={(e) => updateTaxRate(tax.id, 'rate', e.target.value)}
                  className="h-10 w-full" 
                  placeholder="8.5"
                />
              </div>


              <div className="flex items-center">
                {taxRates.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteTaxRate(tax.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Trash2Icon className="h-4 w-4" />
                    <span className="sr-only">Delete tax rate</span>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>


        <div className="space-y-2">

          <div className="flex items-center justify-between border-t pt-4">
            <span className="text-lg font-semibold">Subtotal</span>
            <span className="text-lg font-semibold">{formatCurrency(invoice.subtotal)}</span>
          </div>


          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Discount (10%)</span>
            <span className="text-sm text-muted-foreground">-{formatCurrency(invoice.discount)}</span>
          </div>


          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Tax</span>
            <span className="text-sm text-muted-foreground">{formatCurrency(invoice.tax)}</span>
          </div>


          <div className="flex items-center justify-between border-t pt-4">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-lg font-semibold">{formatCurrency(invoice.total)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default TaxAndTotals