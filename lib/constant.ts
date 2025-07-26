import { Invoice } from "@/app/types/invoice";

export const initialInvoice: Invoice = {
  id: "",
  companyName: "Acme Corporation",
  companyAddress: "123 Business Street, Suite 100\nNew York, NY 10001",
  companyPhone: "(555) 123-4567",
  companyEmail: "contact@acmecorp.com",
  companyWebsite: "www.acmecorp.com",
  companyTaxId: "12-3456789",
  companyLogo: "",
  invoiceNumber: "INV-2024-001",
  invoiceDate: "2024-01-15",
  dueDate: "2024-02-15",
  poNumber: "PO-2024-001",
  project: "Website Redesign",
  items: [
    {
      id: "1",
      description: "Website Design & Development",
      quantity: 1,
      rate: 5000,
      amount: 5000
    },
    {
      id: "2",
      description: "SEO Optimization",
      quantity: 1,
      rate: 1500,
      amount: 1500
    },
    {
      id: "3",
      description: "Content Creation",
      quantity: 10,
      rate: 150,
      amount: 1500
    },
    {
      id: "4",
      description: "Monthly Maintenance",
      quantity: 3,
      rate: 500,
      amount: 1500
    }
  ],
  subtotal: 9500,
  discount: 950,
  tax: 897.75,
  total: 9447.75,
  clientName: "Jane Doe",
  clientEmail: "jane.doe@clientcompany.com",
  clientAddress: "456 Client Avenue, Suite 200\nLos Angeles, CA 90210",
  clientPhone: "(555) 987-6543",
  qrCodeData: "",
  qrCodeImage: "",
  digitalSignature: "",
  selectedPaymentMethods: {
    bankTransfer: false,
    paypal: false,
    venmo: false,
    cashApp: false,
    zelle: false,
    check: false,
    crypto: false
  },
  paymentInfo: {
    bankName: "Chase Bank",
    accountNumber: "1234567890",
    routingNumber: "021000021",
    paypalEmail: "payments@acmecorp.com",
    venmoUsername: "@acmecorp",
    cashAppCashtag: "$acmecorp",
    zelleEmail: "payments@acmecorp.com",
    cryptoWallet: ""
  },
  thankYouMessage: "",
  termsConditions: ""
};
