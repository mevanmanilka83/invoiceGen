import React, { useId } from 'react'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useInvoice } from '@/context/invoice-context'

const ContactDetails = () => {
  const fromNameId = useId()
  const fromEmailId = useId()
  const toNameId = useId()
  const toEmailId = useId()
  const toAddressId = useId()
  const toPhoneId = useId()

  const { invoice, updateInvoice } = useInvoice()

  const handleInputChange = (field: string, value: string) => {
    updateInvoice({ [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>
          Enter the contact information for both parties
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* From Section */}
          <div className="grid grid-cols-1 gap-4">
            <h4 className="text-md font-medium text-muted-foreground">From</h4>
            <div className="grid grid-cols-1 gap-4">
              <div className="group relative">
                <label
                  htmlFor={fromNameId}
                  className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
                >
                  Name
                </label>
                <Input 
                  id={fromNameId} 
                  className="h-10 w-full" 
                  placeholder="John Smith"
                  value={invoice.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                />
              </div>
              <div className="group relative">
                <label
                  htmlFor={fromEmailId}
                  className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
                >
                  Email
                </label>
                <Input 
                  id={fromEmailId} 
                  type="email"
                  className="h-10 w-full" 
                  placeholder="john.smith@acmecorp.com"
                  value={invoice.companyEmail}
                  onChange={(e) => handleInputChange('companyEmail', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* To Section */}
          <div className="grid grid-cols-1 gap-4">
            <h4 className="text-md font-medium text-muted-foreground">To</h4>
            <div className="grid grid-cols-1 gap-4">
              <div className="group relative">
                <label
                  htmlFor={toNameId}
                  className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
                >
                  Name
                </label>
                <Input 
                  id={toNameId} 
                  className="h-10 w-full" 
                  placeholder="Jane Doe"
                  value={invoice.clientName || ''}
                  onChange={(e) => handleInputChange('clientName', e.target.value)}
                />
              </div>
              <div className="group relative">
                <label
                  htmlFor={toEmailId}
                  className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
                >
                  Email
                </label>
                <Input 
                  id={toEmailId} 
                  type="email"
                  className="h-10 w-full" 
                  placeholder="jane.doe@clientcompany.com"
                  value={invoice.clientEmail || ''}
                  onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                />
              </div>
              <div className="group relative">
                <label
                  htmlFor={toAddressId}
                  className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
                >
                  Address
                </label>
                <Input 
                  id={toAddressId} 
                  className="h-10 w-full" 
                  placeholder="456 Client Avenue, Suite 200, Los Angeles, CA 90210"
                  value={invoice.clientAddress || ''}
                  onChange={(e) => handleInputChange('clientAddress', e.target.value)}
                />
              </div>
              <div className="group relative">
                <label
                  htmlFor={toPhoneId}
                  className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
                >
                  Phone
                </label>
                <Input 
                  id={toPhoneId} 
                  type="tel"
                  className="h-10 w-full" 
                  placeholder="+1 (555) 987-6543"
                  value={invoice.clientPhone || ''}
                  onChange={(e) => handleInputChange('clientPhone', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ContactDetails 