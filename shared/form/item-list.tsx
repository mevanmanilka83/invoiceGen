import React, { useId, useRef } from 'react'
import { PlusIcon, Trash2Icon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useInvoice } from '@/context/invoice-context'
import { InvoiceItem } from '@/app/types/invoice'

const ItemList = () => {
  const idCounter = useRef(0)
  const { invoice, addItem, updateItem, removeItem } = useInvoice()

  const handleAddItem = () => {
    const newItem: InvoiceItem = {
      id: `item-${Date.now()}`,
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0
    }
    addItem(newItem)
  }

  const handleUpdateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    updateItem(id, { [field]: value })
  }

  const handleDeleteItem = (id: string) => {
    removeItem(id)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Items</CardTitle>
          <CardDescription>
            Add invoice items with description, quantity, rate, and amount
          </CardDescription>
        </div>
        <Button variant="outline" className="aspect-square max-sm:p-0" onClick={handleAddItem}>
          <PlusIcon className="opacity-60 sm:-ms-1" size={16} aria-hidden="true" />
          <span className="max-sm:sr-only">Add new</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {invoice.items.map((item, index) => (
          <div key={item.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-muted-foreground">Item {index + 1}</h4>
              {invoice.items.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteItem(item.id)}
                  className="h-8 w-8 p-0"
                >
                  <Trash2Icon className="h-4 w-4" />
                  <span className="sr-only">Delete item</span>
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Description */}
              <div className="lg:col-span-2 group relative">
                <label
                  htmlFor={`description-${item.id}`}
                  className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
                >
                  Description
                </label>
                <Input 
                  id={`description-${item.id}`}
                  value={item.description}
                  onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                  className="h-10 w-full" 
                  placeholder="Web development services"
                />
              </div>

              {/* Quantity */}
              <div className="group relative">
                <label
                  htmlFor={`quantity-${item.id}`}
                  className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
                >
                  Quantity
                </label>
                <Input 
                  id={`quantity-${item.id}`}
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleUpdateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                  className="h-10 w-full" 
                  placeholder="1"
                />
              </div>

              {/* Rate */}
              <div className="group relative">
                <label
                  htmlFor={`rate-${item.id}`}
                  className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
                >
                  Rate
                </label>
                <Input 
                  id={`rate-${item.id}`}
                  type="number"
                  step="0.01"
                  value={item.rate}
                  onChange={(e) => handleUpdateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                  className="h-10 w-full" 
                  placeholder="150.00"
                />
              </div>

              {/* Amount */}
              <div className="group relative">
                <label
                  htmlFor={`amount-${item.id}`}
                  className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
                >
                  Amount
                </label>
                <Input 
                  id={`amount-${item.id}`}
                  type="number"
                  step="0.01"
                  value={item.amount}
                  onChange={(e) => handleUpdateItem(item.id, 'amount', parseFloat(e.target.value) || 0)}
                  className="h-10 w-full" 
                  placeholder="150.00"
                />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default ItemList