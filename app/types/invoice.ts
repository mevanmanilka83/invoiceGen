export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Invoice {
  id: string;
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  companyWebsite: string;
  companyTaxId: string;
  companyLogo?: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  poNumber?: string;
  project?: string;
  items: InvoiceItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  clientName?: string;
  clientEmail?: string;
  clientAddress?: string;
  clientPhone?: string;
  qrCodeData?: string;
  qrCodeImage?: string;
  digitalSignature?: string;
  selectedPaymentMethods?: {
    bankTransfer: boolean;
    paypal: boolean;
    venmo: boolean;
    cashApp: boolean;
    zelle: boolean;
    check: boolean;
    crypto: boolean;
  };
  paymentInfo?: {
    bankName: string;
    accountNumber: string;
    routingNumber: string;
    paypalEmail: string;
    venmoUsername: string;
    cashAppCashtag: string;
    zelleEmail: string;
    cryptoWallet: string;
  };
  thankYouMessage?: string;
  termsConditions?: string;
  legalCompliance?: string;
}
