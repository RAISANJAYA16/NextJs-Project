import Link from 'next/link'
import { CONTACT_ROUTE } from '../constants/routes'

const sections = [
  {
    title: 'Using the store',
    text: 'By browsing or placing an order, you agree to use Electro Shop lawfully and provide accurate information when creating an account or checking out. You are responsible for keeping your account credentials private and for activity under your account.',
  },
  {
    title: 'Products and availability',
    text: 'We aim to display product descriptions, images, prices, and availability accurately. Product details and availability may change, and an item in your cart is not reserved until an order is accepted.',
  },
  {
    title: 'Orders and payment',
    text: 'Submitting an order is a request to purchase. We may contact you if information is incomplete or an item cannot be supplied. An order is confirmed when Electro Shop accepts it and provides confirmation. Payment must be completed using the methods offered at checkout.',
  },
  {
    title: 'Delivery, returns, and refunds',
    text: 'Delivery estimates, return eligibility, and refund timing depend on the order details and applicable consumer law. Any specific shipping or return terms shown during checkout or with your order apply to that purchase. Contact us promptly if an order arrives damaged or does not arrive.',
  },
  {
    title: 'Store content and availability',
    text: 'Store text, branding, and other content may not be copied or used commercially without permission, except where applicable law allows. We work to keep the store available, but cannot promise uninterrupted access or that every page will always be error-free.',
  },
  {
    title: 'Liability and legal rights',
    text: 'Nothing in these terms limits rights or remedies that cannot be limited under the laws that apply to you. To the extent permitted by law, Electro Shop is not responsible for indirect losses arising from your use of the store.',
  },
  {
    title: 'Updates and contact',
    text: 'We may update these terms as the store changes. The version published on this page applies to future use and orders, subject to applicable law. If you have a question about an order or these terms, please contact us.',
  },
]

export default function TermsAndConditionsPage() {
  return (
    <article className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10 border-b border-base-content/15 pb-6">
        <p className="mb-2 text-sm font-semibold uppercase text-primary">Electro Shop</p>
        <h1 className="text-3xl font-bold text-base-content sm:text-4xl">Terms &amp; Conditions</h1>
        <p className="mt-4 text-base leading-7 text-base-content/75">
          These terms cover using the Electro Shop website and placing an order through it.
        </p>
      </header>

      <div className="space-y-8">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="mb-2 text-xl font-semibold text-base-content">{section.title}</h2>
            <p className="leading-7 text-base-content/80">{section.text}</p>
          </section>
        ))}
      </div>

      <p className="mt-10 border-t border-base-content/15 pt-6 leading-7 text-base-content/80">
        Need help with an order or these terms?{' '}
        <Link href={CONTACT_ROUTE} className="font-semibold text-primary underline">Contact Electro Shop</Link>.
      </p>
    </article>
  )
}