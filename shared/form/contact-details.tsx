import React, { useId } from 'react'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const ContactDetails = () => {
  const fromNameId = useId()
  const fromEmailId = useId()
  const toNameId = useId()
  const toEmailId = useId()

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