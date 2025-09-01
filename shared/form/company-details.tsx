import React, { useId, useState } from 'react'
import { Trash2Icon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useInvoice } from '@/context/invoice-context'

const CompanyDetails = () => {
  const companyNameId = useId()
  const companyLogoId = useId()
  const companyAddressId = useId()
  const companyPhoneId = useId()
  const companyEmailId = useId()
  const websiteId = useId()
  const linkedinId = useId()
  const twitterId = useId()
  const facebookId = useId()
  const instagramId = useId()
  const taxNumberId = useId()
  const currencyId = useId()
  const currencyWordsId = useId()
  const brandColorId = useId()

  const { invoice, updateInvoice } = useInvoice()


  const [socialMedia, setSocialMedia] = useState({
    linkedin: '',
    twitter: '',
    facebook: '',
    instagram: ''
  })


  const [selectedCurrency, setSelectedCurrency] = useState('')
  const [customCurrency, setCustomCurrency] = useState('')
  const [exchangeRate, setExchangeRate] = useState('')
  const [baseCurrency, setBaseCurrency] = useState('usd')

  const handleInputChange = (field: string, value: string) => {
    updateInvoice({ [field]: value });
  };

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        updateInvoice({ companyLogo: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteSocialMedia = (platform: keyof typeof socialMedia) => {
    setSocialMedia(prev => ({
      ...prev,
      [platform]: ''
    }))
  }

  const handleCurrencyChange = (value: string) => {
    setSelectedCurrency(value)
    if (value === 'custom') {
      setCustomCurrency('')
    } else {
      setCustomCurrency('')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Details</CardTitle>
        <CardDescription>
          Enter your company information, branding, and contact details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="group relative">
            <label
              htmlFor={companyNameId}
              className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
            >
              Company Name
            </label>
            <Input 
              id={companyNameId} 
              className="h-10 w-full" 
              placeholder="Acme Corporation"
              value={invoice.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
            />
          </div>


          <div className="group relative">
            <label
              htmlFor={companyLogoId}
              className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
            >
              Company Logo
            </label>
            <Input
              id={companyLogoId}
              className="p-0 pe-3 file:me-3 file:border-0 file:border-e h-10 w-full"
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
            />
            {invoice.companyLogo && (
              <div className="mt-2">
                <img 
                  src={invoice.companyLogo} 
                  alt="Company Logo" 
                  className="h-12 w-auto object-contain"
                />
              </div>
            )}
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="md:col-span-2 group relative">
            <label
              htmlFor={companyAddressId}
              className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
            >
              Address
            </label>
            <Input 
              id={companyAddressId} 
              className="h-10 w-full" 
              placeholder="123 Business St, Suite 100, New York, NY 10001"
              value={invoice.companyAddress}
              onChange={(e) => handleInputChange('companyAddress', e.target.value)}
            />
          </div>


          <div className="group relative">
            <label
              htmlFor={companyPhoneId}
              className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
            >
              Phone
            </label>
            <Input 
              id={companyPhoneId} 
              type="tel"
              className="h-10 w-full" 
              placeholder="+1 (555) 123-4567"
              value={invoice.companyPhone}
              onChange={(e) => handleInputChange('companyPhone', e.target.value)}
            />
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="group relative">
            <label
              htmlFor={companyEmailId}
              className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
            >
              Email
            </label>
            <Input 
              id={companyEmailId} 
              type="email"
              className="h-10 w-full" 
              placeholder="contact@acmecorp.com"
              value={invoice.companyEmail}
              onChange={(e) => handleInputChange('companyEmail', e.target.value)}
            />
          </div>


          <div className="group relative">
            <label
              htmlFor={websiteId}
              className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
            >
              Website
            </label>
            <Input 
              id={websiteId} 
              type="url"
              className="h-10 w-full" 
              placeholder="https://www.acmecorp.com"
              value={invoice.companyWebsite}
              onChange={(e) => handleInputChange('companyWebsite', e.target.value)}
            />
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="flex items-center gap-2">
            <div className="group relative flex-1">
              <label
                htmlFor={linkedinId}
                className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
              >
                LinkedIn
              </label>
              <Input 
                id={linkedinId} 
                type="url"
                value={socialMedia.linkedin}
                onChange={(e) => setSocialMedia(prev => ({ ...prev, linkedin: e.target.value }))}
                className="h-10 w-full" 
                placeholder="https://linkedin.com/company/acmecorp"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => deleteSocialMedia('linkedin')}
              className="h-8 w-8 p-0"
            >
              <Trash2Icon className="h-4 w-4" />
              <span className="sr-only">Delete LinkedIn</span>
            </Button>
          </div>


          <div className="flex items-center gap-2">
            <div className="group relative flex-1">
              <label
                htmlFor={twitterId}
                className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
              >
                Twitter/X
              </label>
              <Input 
                id={twitterId} 
                type="url"
                value={socialMedia.twitter}
                onChange={(e) => setSocialMedia(prev => ({ ...prev, twitter: e.target.value }))}
                className="h-10 w-full" 
                placeholder="https://twitter.com/acmecorp"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => deleteSocialMedia('twitter')}
              className="h-8 w-8 p-0"
            >
              <Trash2Icon className="h-4 w-4" />
              <span className="sr-only">Delete Twitter/X</span>
            </Button>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="flex items-center gap-2">
            <div className="group relative flex-1">
              <label
                htmlFor={facebookId}
                className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
              >
                Facebook
              </label>
              <Input 
                id={facebookId} 
                type="url"
                value={socialMedia.facebook}
                onChange={(e) => setSocialMedia(prev => ({ ...prev, facebook: e.target.value }))}
                className="h-10 w-full" 
                placeholder="https://facebook.com/acmecorp"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => deleteSocialMedia('facebook')}
              className="h-8 w-8 p-0"
            >
              <Trash2Icon className="h-4 w-4" />
              <span className="sr-only">Delete Facebook</span>
            </Button>
          </div>


          <div className="flex items-center gap-2">
            <div className="group relative flex-1">
              <label
                htmlFor={instagramId}
                className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
              >
                Instagram
              </label>
              <Input 
                id={instagramId} 
                type="url"
                value={socialMedia.instagram}
                onChange={(e) => setSocialMedia(prev => ({ ...prev, instagram: e.target.value }))}
                className="h-10 w-full" 
                placeholder="https://instagram.com/acmecorp"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => deleteSocialMedia('instagram')}
              className="h-8 w-8 p-0"
            >
              <Trash2Icon className="h-4 w-4" />
              <span className="sr-only">Delete Instagram</span>
            </Button>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="group relative">
            <label
              htmlFor={taxNumberId}
              className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
            >
              Tax/VAT Number
            </label>
            <Input 
              id={taxNumberId} 
              className="h-10 w-full" 
              placeholder="12-3456789 or VAT123456789"
              value={invoice.companyTaxId}
              onChange={(e) => handleInputChange('companyTaxId', e.target.value)}
            />
          </div>


          <div className="group relative">
            <label
              htmlFor={brandColorId}
              className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
            >
              Brand Color
            </label>
            <Input 
              id={brandColorId} 
              type="color"
              className="h-10 w-full" 
              value={invoice.brandColor || '#1a73e8'}
              onChange={e => handleInputChange('brandColor', e.target.value)}
            />
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="space-y-2">
            <Label htmlFor={currencyId} className="text-xs font-medium">Currency</Label>
            <select 
              id={currencyId}
              value={selectedCurrency}
              onChange={(e) => handleCurrencyChange(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Select currency</option>
              <option value="usd">USD ($)</option>
              <option value="eur">EUR (€)</option>
              <option value="gbp">GBP (£)</option>
              <option value="cad">CAD (C$)</option>
              <option value="aud">AUD (A$)</option>
              <option value="jpy">JPY (¥)</option>
              <option value="inr">INR (₹)</option>
              <option value="cny">CNY (¥)</option>
              <option value="custom">Add Custom Currency</option>
            </select>
          </div>


          <div className="group relative">
            <label
              htmlFor={currencyWordsId}
              className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
            >
              Currency in Words
            </label>
            {selectedCurrency === 'custom' ? (
              <Input 
                id={currencyWordsId} 
                value={customCurrency}
                onChange={(e) => setCustomCurrency(e.target.value)}
                className="h-10 w-full" 
                placeholder="Enter custom currency (e.g., Bitcoin, Ethereum)"
              />
            ) : (
              <Input 
                id={currencyWordsId} 
                className="h-10 w-full" 
                placeholder="Dollars, Euros, Pounds, etc."
                disabled
              />
            )}
          </div>
        </div>


        {selectedCurrency && selectedCurrency !== 'custom' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="space-y-2">
              <Label className="text-xs font-medium">Base Currency</Label>
              <select 
                value={baseCurrency}
                onChange={(e) => setBaseCurrency(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="usd">USD ($)</option>
                <option value="eur">EUR (€)</option>
                <option value="gbp">GBP (£)</option>
                <option value="cad">CAD (C$)</option>
                <option value="aud">AUD (A$)</option>
                <option value="jpy">JPY (¥)</option>
                <option value="inr">INR (₹)</option>
                <option value="cny">CNY (¥)</option>
              </select>
            </div>


            <div className="group relative">
              <label
                htmlFor="exchangeRate"
                className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
              >
                Exchange Rate
              </label>
              <Input 
                id="exchangeRate"
                type="number"
                step="0.0001"
                value={exchangeRate}
                onChange={(e) => setExchangeRate(e.target.value)}
                className="h-10 w-full" 
                placeholder="1.25 (1 USD = 1.25 EUR)"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default CompanyDetails 