import { Separator } from "@/components/ui/separator"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | Invoice Generator",
  description: "Terms of service for Invoice Generator - a browser-based invoice creation tool.",
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsOfService() {
  return (
    <article className="max-w-7xl mx-auto py-8 px-4 bg-background">
      <header>
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <Separator className="mb-6" />
        <p className="mb-6 text-base">
          These Terms of Service govern your use of Invoice Generator, a browser-based tool for creating professional invoices. By using our service, you agree to these terms.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Service Description</h2>
          <div className="space-y-4">
            <div>
              <h3 className="block mb-2 text-base font-semibold">What We Provide</h3>
              <p className="text-base">Invoice Generator is a web-based tool that allows you to create, customize, and download professional invoices. All processing happens locally in your browser.</p>
            </div>
            <div>
              <h3 className="block mb-2 text-base font-semibold">Features</h3>
              <p className="text-base">Our service includes invoice form creation, PDF generation, preview functionality, and download capabilities. We do not store your data on our servers.</p>
            </div>
            <div>
              <h3 className="block mb-2 text-base font-semibold">Availability</h3>
              <p className="text-base">We strive to maintain service availability but cannot guarantee uninterrupted access. The service may be temporarily unavailable for maintenance or updates.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Acceptable Use</h2>
          <div className="space-y-4">
            <div>
              <h3 className="block mb-2 text-base font-semibold">Permitted Use</h3>
              <p className="text-base">You may use Invoice Generator to create legitimate business invoices for your own business or on behalf of clients with proper authorization.</p>
            </div>
            <div>
              <h3 className="block mb-2 text-base font-semibold">Prohibited Activities</h3>
              <p className="text-base">You may not use our service to create fraudulent invoices, impersonate others, or violate any applicable laws or regulations.</p>
            </div>
            <div>
              <h3 className="block mb-2 text-base font-semibold">Data Responsibility</h3>
              <p className="text-base">You are responsible for the accuracy and legality of all information entered into the invoice forms and for ensuring compliance with applicable tax and business regulations.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Intellectual Property</h2>
          <p className="mb-4 text-base">
            Invoice Generator and its interface are owned by us. You retain all rights to your business data and generated invoices. You may not reverse engineer or copy our service.
          </p>

          <h2 className="text-xl font-semibold mb-4">Limitation of Liability</h2>
          <div className="space-y-4">
            <div>
              <h3 className="block mb-2 text-base font-semibold">Service Limitations</h3>
              <p className="text-base">Invoice Generator is provided as-is without warranties. We are not responsible for errors in calculations, data loss, or any consequences of using generated invoices.</p>
            </div>
            <div>
              <h3 className="block mb-2 text-base font-semibold">Data Loss</h3>
              <p className="text-base">Since all processing happens locally, we cannot recover lost data. Always save your work and download invoices promptly.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">User Responsibilities</h2>
          <div className="space-y-4">
            <div>
              <h3 className="block mb-2 text-base font-semibold">Accuracy</h3>
              <p className="text-base">You are responsible for ensuring all invoice information is accurate, complete, and compliant with applicable laws and regulations.</p>
            </div>
            <div>
              <h3 className="block mb-2 text-base font-semibold">Tax Compliance</h3>
              <p className="text-base">You must ensure that all invoices comply with applicable tax laws, including proper tax calculations, rates, and documentation requirements.</p>
            </div>
            <div>
              <h3 className="block mb-2 text-base font-semibold">Backup</h3>
              <p className="text-base">You are responsible for backing up your invoice data and ensuring you have copies of important documents before closing the browser.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Service Modifications</h2>
          <p className="mb-6 text-base">
            We reserve the right to modify, suspend, or discontinue Invoice Generator at any time. We will provide reasonable notice for significant changes that affect service functionality.
          </p>

          <h2 className="text-xl font-semibold mb-4">Governing Law</h2>
          <p className="mb-4 text-base">
            These terms are governed by applicable laws. Any disputes will be resolved through appropriate legal channels. Continued use of the service constitutes acceptance of these terms.
          </p>
        </section>
      </div>

      <footer className="mt-8 text-sm text-center">
        <p>Last updated January 15, 2025</p>
      </footer>
    </article>
  )
} 