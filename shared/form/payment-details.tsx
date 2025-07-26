import React, { useId, useState } from 'react'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const PaymentDetails = () => {
  const bankNameId = useId()
  const accountNumberId = useId()
  const routingNumberId = useId()
  const qrCodeId = useId()
  const digitalSignatureId = useId()

  // Payment method states
  const [selectedMethods, setSelectedMethods] = useState({
    bankTransfer: false,
    creditCard: false,
    paypal: false,
    stripe: false
  })

  const handleMethodChange = (method: keyof typeof selectedMethods) => {
    setSelectedMethods(prev => ({
      ...prev,
      [method]: !prev[method]
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
        <CardDescription>
          Add your payment information and digital elements
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bank Name */}
          <div className="group relative">
            <label
              htmlFor={bankNameId}
              className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
            >
              Bank Name
            </label>
            <Input 
              id={bankNameId} 
              className="h-10 w-full" 
              placeholder="Chase Bank"
            />
          </div>

          {/* Account Number */}
          <div className="group relative">
            <label
              htmlFor={accountNumberId}
              className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
            >
              Account Number
            </label>
            <Input 
              id={accountNumberId} 
              className="h-10 w-full" 
              placeholder="1234567890"
            />
          </div>

          {/* Routing Number */}
          <div className="group relative">
            <label
              htmlFor={routingNumberId}
              className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
            >
              Routing Number
            </label>
            <Input 
              id={routingNumberId} 
              className="h-10 w-full" 
              placeholder="021000021"
            />
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-4">
          <Label className="text-xs font-medium">Payment Methods</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50">
              <input 
                type="checkbox" 
                className="rounded"
                checked={selectedMethods.bankTransfer}
                onChange={() => handleMethodChange('bankTransfer')}
              />
              <span className="text-sm font-medium">Bank Transfer</span>
            </label>
            <label className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50">
              <input 
                type="checkbox" 
                className="rounded"
                checked={selectedMethods.creditCard}
                onChange={() => handleMethodChange('creditCard')}
              />
              <span className="text-sm font-medium">Credit Card</span>
            </label>
            <label className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50">
              <input 
                type="checkbox" 
                className="rounded"
                checked={selectedMethods.paypal}
                onChange={() => handleMethodChange('paypal')}
              />
              <span className="text-sm font-medium">PayPal</span>
            </label>
            <label className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50">
              <input 
                type="checkbox" 
                className="rounded"
                checked={selectedMethods.stripe}
                onChange={() => handleMethodChange('stripe')}
              />
              <span className="text-sm font-medium">Stripe</span>
            </label>
          </div>
        </div>

        {/* Payment Method Details */}
        {selectedMethods.bankTransfer && (
          <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
            <h4 className="text-sm font-medium">Bank Transfer Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="group relative">
                <label className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium">
                  Account Holder Name
                </label>
                <Input 
                  className="h-10 w-full" 
                  placeholder="John Smith"
                />
              </div>
              <div className="group relative">
                <label className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium">
                  Account Type
                </label>
                <Input 
                  className="h-10 w-full" 
                  placeholder="Checking, Savings"
                />
              </div>
            </div>
          </div>
        )}

        {selectedMethods.paypal && (
          <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
            <h4 className="text-sm font-medium">PayPal Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="group relative">
                <label className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium">
                  PayPal Email
                </label>
                <Input 
                  className="h-10 w-full" 
                  placeholder="payments@yourcompany.com"
                />
              </div>
              <div className="group relative">
                <label className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium">
                  Business Name
                </label>
                <Input 
                  className="h-10 w-full" 
                  placeholder="Your Company Name"
                />
              </div>
            </div>
          </div>
        )}

        {selectedMethods.stripe && (
          <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
            <h4 className="text-sm font-medium">Stripe Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="group relative">
                <label className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium">
                  Account ID
                </label>
                <Input 
                  className="h-10 w-full" 
                  placeholder="acct_1234567890"
                />
              </div>
              <div className="group relative">
                <label className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium">
                  Publishable Key
                </label>
                <Input 
                  className="h-10 w-full" 
                  placeholder="pk_test_..."
                />
              </div>
            </div>
          </div>
        )}

        {selectedMethods.creditCard && (
          <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
            <h4 className="text-sm font-medium">Credit Card Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="group relative">
                <label className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium">
                  Payment Gateway
                </label>
                <Input 
                  className="h-10 w-full" 
                  placeholder="Stripe, Square, etc."
                />
              </div>
              <div className="group relative">
                <label className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium">
                  Merchant ID
                </label>
                <Input 
                  className="h-10 w-full" 
                  placeholder="123456789"
                />
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* QR Code for Payment */}
          <div className="*:not-first:mt-2">
            <Label htmlFor={qrCodeId} className="text-xs font-medium">QR Code for Payment</Label>
            <Input
              id={qrCodeId}
              className="p-0 pe-3 file:me-3 file:border-0 file:border-e h-10"
              type="file"
              accept="image/*"
            />
          </div>

          {/* Digital Signature */}
          <div className="*:not-first:mt-2">
            <Label htmlFor={digitalSignatureId} className="text-xs font-medium">Digital Signature</Label>
            <Input
              id={digitalSignatureId}
              className="p-0 pe-3 file:border-0 file:border-e h-10"
              type="file"
              accept="image/*"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PaymentDetails 