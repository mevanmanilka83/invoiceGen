import React, { useId, useState, useRef, useEffect } from 'react'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useInvoice } from '@/context/invoice-context'
import QRCode from 'qrcode'
import SignatureCanvas from 'react-signature-canvas'

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
  const qrCodeDataId = useId()

  const { invoice, updateInvoice } = useInvoice()
  const signaturePadRef = useRef<SignatureCanvas>(null)
  const [qrCodeImage, setQrCodeImage] = useState<string>('')

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

  // Payment information state
  const [paymentInfo, setPaymentInfo] = useState({
    bankName: 'Chase Bank',
    accountNumber: '1234567890',
    routingNumber: '021000021',
    paypalEmail: 'payments@acmecorp.com',
    venmoUsername: '@acmecorp',
    cashAppCashtag: '$acmecorp',
    zelleEmail: 'payments@acmecorp.com',
    cryptoWallet: ''
  })

  const handleMethodChange = (method: keyof typeof selectedMethods) => {
    const newSelectedMethods = {
      ...selectedMethods,
      [method]: !selectedMethods[method]
    };
    setSelectedMethods(newSelectedMethods);
    updateInvoice({ selectedPaymentMethods: newSelectedMethods });
  }

  const handlePaymentInfoChange = (field: keyof typeof paymentInfo, value: string) => {
    const newPaymentInfo = {
      ...paymentInfo,
      [field]: value
    };
    setPaymentInfo(newPaymentInfo);
    updateInvoice({ paymentInfo: newPaymentInfo });
  }

  const handleInputChange = (field: string, value: string) => {
    updateInvoice({ [field]: value });
  };

  const generateQRCode = async () => {
    if (invoice.qrCodeData) {
      try {
        const qrDataUrl = await QRCode.toDataURL(invoice.qrCodeData, {
          width: 200,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });
        setQrCodeImage(qrDataUrl);
        updateInvoice({ qrCodeImage: qrDataUrl });
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    }
  };

  const clearSignature = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
      updateInvoice({ digitalSignature: '' });
    }
  };

  const saveSignature = () => {
    if (signaturePadRef.current) {
      const signatureData = signaturePadRef.current.getTrimmedCanvas().toDataURL('image/png');
      updateInvoice({ digitalSignature: signatureData });
    }
  };

  useEffect(() => {
    if (invoice.qrCodeData) {
      generateQRCode();
    }
  }, [invoice.qrCodeData]);

  // Sync with invoice state on mount
  useEffect(() => {
    if (invoice.selectedPaymentMethods) {
      setSelectedMethods(invoice.selectedPaymentMethods);
    }
    if (invoice.paymentInfo) {
      setPaymentInfo(invoice.paymentInfo);
    }
  }, [invoice.selectedPaymentMethods, invoice.paymentInfo]);

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
                  value={paymentInfo.bankName}
                  onChange={(e) => handlePaymentInfoChange('bankName', e.target.value)}
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
                  value={paymentInfo.accountNumber}
                  onChange={(e) => handlePaymentInfoChange('accountNumber', e.target.value)}
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
                  value={paymentInfo.routingNumber}
                  onChange={(e) => handlePaymentInfoChange('routingNumber', e.target.value)}
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
                value={paymentInfo.paypalEmail}
                onChange={(e) => handlePaymentInfoChange('paypalEmail', e.target.value)}
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
                value={paymentInfo.venmoUsername}
                onChange={(e) => handlePaymentInfoChange('venmoUsername', e.target.value)}
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
                value={paymentInfo.cashAppCashtag}
                onChange={(e) => handlePaymentInfoChange('cashAppCashtag', e.target.value)}
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
                value={paymentInfo.zelleEmail}
                onChange={(e) => handlePaymentInfoChange('zelleEmail', e.target.value)}
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
                value={invoice.companyAddress}
                disabled
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
                value={paymentInfo.cryptoWallet}
                onChange={(e) => handlePaymentInfoChange('cryptoWallet', e.target.value)}
              />
            </div>
          </div>
        )}

        {/* QR Code & Digital Signature */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground">QR Code & Digital Signature</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* QR Code Section */}
            <div className="space-y-4">
              <div className="group relative">
                <label
                  htmlFor={qrCodeDataId}
                  className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
                >
                  QR Code Data
                </label>
                <Input
                  id={qrCodeDataId}
                  className="h-10 w-full"
                  placeholder="Enter payment link or invoice details"
                  value={invoice.qrCodeData || ''}
                  onChange={(e) => handleInputChange('qrCodeData', e.target.value)}
                />
              </div>
              <Button 
                onClick={generateQRCode}
                disabled={!invoice.qrCodeData}
                className="w-full"
              >
                Generate QR Code
              </Button>
              {qrCodeImage && (
                <div className="flex justify-center">
                  <img src={qrCodeImage} alt="QR Code" className="w-32 h-32 object-contain" />
                </div>
              )}
            </div>

            {/* Digital Signature Section */}
            <div className="space-y-4">
              <div className="border-2 border-gray-300 rounded-lg p-4">
                <SignatureCanvas
                  ref={signaturePadRef}
                  canvasProps={{
                    className: 'w-full h-32 border border-gray-300 rounded'
                  }}
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={saveSignature}
                  className="flex-1"
                >
                  Save Signature
                </Button>
                <Button 
                  onClick={clearSignature}
                  variant="outline"
                  className="flex-1"
                >
                  Clear
                </Button>
              </div>
              {invoice.digitalSignature && (
                <div className="flex justify-center">
                  <img src={invoice.digitalSignature} alt="Digital Signature" className="max-w-full max-h-16 object-contain" />
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PaymentDetails 