import Link from "next/link";
import { CONTACT_ROUTE } from "../constants/routes";

const services = [
  {
    title: "Delivery",
    description:
      "Need to know whether we deliver to your area or when an order may arrive? Contact us with your location and the product you’re interested in for delivery details.",
  },
  {
    title: "Returns and exchanges",
    description:
      "If a product isn’t right for you, contact us to discuss return or exchange options. Eligibility and conditions depend on the item and purchase.",
  },
  {
    title: "Warranty and repairs",
    description:
      "Ask us about warranty coverage or repair support for a product. Have your order details and product information ready so we can help.",
  },
  {
    title: "Payment options",
    description:
      "Available payment methods are shown during checkout. Contact us if you have a question about paying for an order.",
  },
  {
    title: "Product advice",
    description:
      "Not sure which device is right for you? Tell us what you need, your preferred features, and your budget, and we’ll help you compare options.",
  },
  {
    title: "Order support",
    description:
      "Need help with an existing order? Contact us with your order reference and question so we can look into it.",
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-primary/5">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Electro Shop support
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Services to help you shop with confidence
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            From choosing a product to getting help after your purchase, we’re
            here to make your shopping experience easier.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5"
            >
              <h2 className="text-xl font-semibold text-gray-900">
                {service.title}
              </h2>
              <p className="mt-3 leading-7 text-gray-600">
                {service.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-white px-6 py-10 text-center shadow-sm ring-1 ring-gray-900/5 sm:px-10">
          <h2 className="text-2xl font-bold text-gray-900">
            Have a question?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Contact our team for current service details or help with a product
            or order.
          </p>
          <Link
            href={CONTACT_ROUTE}
            className="mt-6 inline-flex rounded-lg bg-primary px-5 py-3 font-semibold text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Contact us
          </Link>
        </div>
      </section>
    </main>
  );
}
