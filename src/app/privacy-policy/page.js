import Link from 'next/link'
import { CONTACT_ROUTE } from '../constants/routes'

const sections = [
  {
    title: 'Information we collect',
    text: 'When you use Electro Shop, you may provide information such as your name, email address, phone number, account details, and delivery address. We may also receive order and payment status information needed to process your purchase. Do not send full payment-card details through email or contact forms.',
  },
  {
    title: 'How we use your information',
    text: 'We use relevant information to manage your account, process and deliver orders, respond to questions, provide customer support, and maintain the security and operation of the store. We use it for other purposes only where permitted by applicable law.',
  },
  {
    title: 'Sharing and service providers',
    text: 'We may share the information needed to complete your request with service providers, such as payment, delivery, hosting, and customer-support providers. They should receive only the information needed for their service. We do not include a promise here about advertising or analytics practices; update this policy if the store uses those services.',
  },
  {
    title: 'Cookies and security',
    text: 'The site may use browser storage or similar technologies to support essential features such as your cart, sign-in, and site preferences. We take reasonable steps to protect information, but no online service can guarantee absolute security.',
  },
  {
    title: 'Retention and your choices',
    text: 'We keep information for as long as needed to provide the store, meet legal and accounting obligations, resolve disputes, and protect the service. Depending on where you live, you may have rights to access, correct, or request deletion of your personal information, subject to applicable law.',
  },
  {
    title: 'Changes to this policy',
    text: 'We may update this policy when the store or its practices change. The latest version will be published on this page.',
  },
]

export default function PrivacyPolicyPage() {
  return (
    <article className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10 border-b border-base-content/15 pb-6">
        <p className="mb-2 text-sm font-semibold uppercase text-primary">Electro Shop</p>
        <h1 className="text-3xl font-bold text-base-content sm:text-4xl">Privacy Policy</h1>
        <p className="mt-4 text-base leading-7 text-base-content/75">
          This page explains what information may be used when you browse, create an account, or place an order with Electro Shop.
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
        Questions or requests about your information?{' '}
        <Link href={CONTACT_ROUTE} className="font-semibold text-primary underline">Contact Electro Shop</Link>.
      </p>
    </article>
  )
}