import React from 'react'
import BasicDetails from './basic-details'
import ContactDetails from './contact-details'
import CompanyDetails from './company-details'
import InvoiceDetails from './invoice-details'
import PaymentDetails from './payment-details'
import ItemList from './item-list'
import TaxAndTotals from './TaxAndTotals'

const InvoiceForm = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="w-full max-w-4xl mx-auto">
        <CompanyDetails />
        <div className="h-4"></div>
        <ContactDetails />
        <div className="h-4"></div>
        <BasicDetails />
        <div className="h-4"></div>
        <InvoiceDetails />
        <div className="h-4"></div>
        <ItemList />
        <div className="h-4"></div>
        <TaxAndTotals />
        <div className="h-4"></div>
        <PaymentDetails />
      </div>
    </div>
  )
}

export default InvoiceForm 