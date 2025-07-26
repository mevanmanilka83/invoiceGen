import { Separator } from "@/components/ui/separator"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Invoice Generator",
  description: "Privacy policy for Invoice Generator - a browser-based invoice creation tool that processes everything locally in your browser.",
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPolicy() {
  return (
    <article className="max-w-7xl mx-auto py-8 px-4 bg-background">
      <header>
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <Separator className="mb-6" />
        <p className="mb-6 text-base">
          At Invoice Generator, we prioritize your privacy. This Privacy Policy explains how we handle your information when you use our browser-based invoice creation tool for generating and customizing professional invoices.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Information Collection & Processing</h2>
          <div className="space-y-4">
            <div>
              <h3 className="block mb-2 text-base font-semibold">Local Processing</h3>
              <p className="text-base">All invoice generation, including company details, client information, item lists, calculations, and PDF creation, happens entirely in your browser. Your business data, client information, and invoice content are never uploaded to our servers.</p>
            </div>
            <div>
              <h3 className="block mb-2 text-base font-semibold">Usage Analytics</h3>
              <p className="text-base">We collect anonymous usage statistics such as feature preferences, invoice generation frequency, and performance metrics to improve Invoice Generator. We do not collect or analyze your business data, client information, or invoice content.</p>
            </div>
            <div>
              <h3 className="block mb-2 text-base font-semibold">Cookies</h3>
              <p className="text-base">Invoice Generator uses only essential cookies to maintain your session and save your form preferences. No tracking or advertising cookies are used.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">How We Use Your Information</h2>
          <div className="space-y-4">
            <div>
              <h3 className="block mb-2 text-base font-semibold">Feature Enhancement</h3>
              <p className="text-base">Anonymous usage data helps us improve Invoice Generator's form capabilities, PDF generation features, and overall performance. No personal or business data is collected.</p>
            </div>
            <div>
              <h3 className="block mb-2 text-base font-semibold">Technical Support</h3>
              <p className="text-base">If you contact us for help with invoice generation or PDF creation issues, we may use the information you provide to assist you, but we never access your business data or invoice content.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Third Parties</h2>
          <p className="mb-4 text-base">
            We do not share your business data, client information, or invoice content with any third parties. Any analytics services we use cannot access your invoice data or business information.
          </p>

          <h2 className="text-xl font-semibold mb-4">Your Rights & Control</h2>
          <div className="space-y-4">
            <div>
              <h3 className="block mb-2 text-base font-semibold">Data Control</h3>
              <p className="text-base">Your business information, client details, and generated invoices remain on your device and are never stored by Invoice Generator. Closing or refreshing the page deletes all local data, including form inputs and invoice drafts.</p>
            </div>
            <div>
              <h3 className="block mb-2 text-base font-semibold">Form Preferences</h3>
              <p className="text-base">Your form settings and preferences are stored locally and can be cleared through your browser settings.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Security</h2>
          <p className="mb-6 text-base">
            We use standard security practices to protect any anonymous usage data. For your safety, always use Invoice Generator on trusted devices and networks, especially when working with sensitive business or client information.
          </p>

          <h2 className="text-xl font-semibold mb-4">Updates to This Policy</h2>
          <p className="mb-4 text-base">
            We may update this Privacy Policy from time to time. Significant changes will be posted on this page. Continued use of Invoice Generator means you accept any updates.
          </p>
        </section>
      </div>

      <footer className="mt-8 text-sm text-center">
        <p>Last updated January 15, 2025</p>
      </footer>
    </article>
  )
} 