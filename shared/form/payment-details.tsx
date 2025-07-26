import React, { useId, useState } from 'react'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const PaymentDetails = () => {
  const bankNameId = useId()
  const accountNumberId = useId()
  const routingNumberId = useId()
  const paypalEmailId = useId()
  const venmoId = useId()
  const cashAppId = useId()
  const zelleEmailId = useId()
  const checkAddressId = useId()
  const cryptoWalletId = useId()
  const qrCodeId = useId()
  const digitalSignatureId = useId()

  // Payment method selection states
  const [selectedMethods, setSelectedMethods] = useState({
    bankTransfer: false,
    paypal: false,
    venmo: false,
    cashApp: false,
    zelle: false,
    check: false,
    crypto: false
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
        <CardTitle>Payment Instructions</CardTitle>
        <CardDescription>
          Select payment methods and add your payment information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Payment Method Selection */}
        <div className="space-y-4">
          <Label className="text-xs font-medium">Select Payment Methods</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <label className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
              <input 
                type="checkbox" 
                className="rounded"
                checked={selectedMethods.bankTransfer}
                onChange={() => handleMethodChange('bankTransfer')}
              />
              <span className="text-sm">Bank Transfer</span>
            </label>
            <label className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
              <input 
                type="checkbox" 
                className="rounded"
                checked={selectedMethods.paypal}
                onChange={() => handleMethodChange('paypal')}
              />
              <span className="text-sm">PayPal</span>
            </label>
            <label className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
              <input 
                type="checkbox" 
                className="rounded"
                checked={selectedMethods.venmo}
                onChange={() => handleMethodChange('venmo')}
              />
              <span className="text-sm">Venmo</span>
            </label>
            <label className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
              <input 
                type="checkbox" 
                className="rounded"
                checked={selectedMethods.cashApp}
                onChange={() => handleMethodChange('cashApp')}
              />
              <span className="text-sm">Cash App</span>
            </label>
            <label className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
              <input 
                type="checkbox" 
                className="rounded"
                checked={selectedMethods.zelle}
                onChange={() => handleMethodChange('zelle')}
              />
              <span className="text-sm">Zelle</span>
            </label>
            <label className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
              <input 
                type="checkbox" 
                className="rounded"
                checked={selectedMethods.check}
                onChange={() => handleMethodChange('check')}
              />
              <span className="text-sm">Check</span>
            </label>
            <label className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
              <input 
                type="checkbox" 
                className="rounded"
                checked={selectedMethods.crypto}
                onChange={() => handleMethodChange('crypto')}
              />
              <span className="text-sm">Crypto</span>
            </label>
          </div>
        </div>

        {/* Bank Transfer Details */}
        {selectedMethods.bankTransfer && (
          <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
            <h4 className="text-sm font-medium">Bank Transfer Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          </div>
        )}

        {/* PayPal Details */}
        {selectedMethods.paypal && (
          <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
            <h4 className="text-sm font-medium">PayPal Details</h4>
            <div className="group relative">
              <label
                htmlFor={paypalEmailId}
                className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
              >
                PayPal Email
              </label>
              <Input 
                id={paypalEmailId} 
                type="email"
                className="h-10 w-full" 
                placeholder="payments@yourcompany.com"
              />
            </div>
          </div>
        )}

        {/* Venmo Details */}
        {selectedMethods.venmo && (
          <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
            <h4 className="text-sm font-medium">Venmo Details</h4>
            <div className="group relative">
              <label
                htmlFor={venmoId}
                className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
              >
                Venmo Username
              </label>
              <Input 
                id={venmoId} 
                className="h-10 w-full" 
                placeholder="@yourusername"
              />
            </div>
          </div>
        )}

        {/* Cash App Details */}
        {selectedMethods.cashApp && (
          <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
            <h4 className="text-sm font-medium">Cash App Details</h4>
            <div className="group relative">
              <label
                htmlFor={cashAppId}
                className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
              >
                Cash App $Cashtag
              </label>
              <Input 
                id={cashAppId} 
                className="h-10 w-full" 
                placeholder="$yourcashtag"
              />
            </div>
          </div>
        )}

        {/* Zelle Details */}
        {selectedMethods.zelle && (
          <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
            <h4 className="text-sm font-medium">Zelle Details</h4>
            <div className="group relative">
              <label
                htmlFor={zelleEmailId}
                className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
              >
                Zelle Email/Phone
              </label>
              <Input 
                id={zelleEmailId} 
                className="h-10 w-full" 
                placeholder="payments@yourcompany.com"
              />
            </div>
          </div>
        )}

        {/* Check Payment Details */}
        {selectedMethods.check && (
          <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
            <h4 className="text-sm font-medium">Check Payment Details</h4>
            <div className="group relative">
              <label
                htmlFor={checkAddressId}
                className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
              >
                Mailing Address
              </label>
              <Input 
                id={checkAddressId} 
                className="h-10 w-full" 
                placeholder="123 Business St, New York, NY 10001"
              />
            </div>
          </div>
        )}

        {/* Crypto Details */}
        {selectedMethods.crypto && (
          <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
            <h4 className="text-sm font-medium">Crypto Payment Details</h4>
            <div className="group relative">
              <label
                htmlFor={cryptoWalletId}
                className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
              >
                Crypto Wallet Address
              </label>
              <Input 
                id={cryptoWalletId} 
                className="h-10 w-full" 
                placeholder="0x1234...5678"
              />
            </div>
          </div>
        )}

        {/* Digital Elements */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground">Digital Elements (Optional)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* QR Code for Payment */}
            <div className="*:not-first:mt-2">
              <Label htmlFor={qrCodeId} className="text-xs font-medium">QR Code</Label>
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
        </div>
      </CardContent>
    </Card>
  )
}

export default PaymentDetails 