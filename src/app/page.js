import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/products";
import { PRODUCTS_ROUTE, SERVICES_ROUTE } from "./constants/routes";
import ProductCard from "./component/ProductCard";
import { getProductImageUrl } from "@/lib/imageUrl";

const highlights = [
  {
    number: "01",
    title: "Find your next favorite",
    description: "Browse useful tech and discover products for your everyday.",
  },
  {
    number: "02",
    title: "Choose with confidence",
    description: "Explore product details and find the features that fit you.",
  },
  {
    number: "03",
    title: "Help when you need it",
    description: "Our services and support are here before and after you shop.",
  },
];

export default async function Homepage() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 4);
  const featuredProduct = products[0];
  const featuredImage = getProductImageUrl(
    featuredProduct?.imageUrls?.[0],
    "/assets/images/iphone.jpg",
  );

  return (
    <main className="overflow-hidden bg-white">
      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        <Image
          src="/assets/banner.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-linear-to-br from-slate-950 via-slate-950/95 to-teal-950/80" />
        <div className="pointer-events-none absolute -right-32 -top-40 h-120 w-120 rounded-full bg-teal-400/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-60 left-1/4 h-120 w-120 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative mx-auto grid min-h-155 max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:py-24">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-teal-100 shadow-lg shadow-black/10 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-teal-300 shadow-[0_0_14px_rgba(94,234,212,0.9)]" />
              A smarter way to shop for tech
            </p>
            <h1 className="mt-7 text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
              Good tech.
              <br />
              <span className="bg-linear-to-r from-teal-200 via-cyan-200 to-white bg-clip-text text-transparent">
                Better everyday.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300 sm:text-xl">
              Discover electronics picked to keep you connected, productive, and
              entertained—without making shopping complicated.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href={PRODUCTS_ROUTE}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-teal-300 px-7 py-4 font-semibold text-slate-950 shadow-xl shadow-teal-950/30 transition duration-300 hover:-translate-y-1 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-200 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                Explore products
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href={SERVICES_ROUTE}
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur transition hover:border-white/40 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                Explore our services
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <span className="text-teal-300" aria-hidden="true">✓</span>
                Browse the latest picks
              </span>
              <span className="flex items-center gap-2">
                <span className="text-teal-300" aria-hidden="true">✓</span>
                Straightforward product details
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:justify-self-end">
            <div className="absolute inset-8 rounded-full bg-teal-300/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-4xl border border-white/15 bg-white/8 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:rotate-1">
              <div className="relative aspect-[4/4.3] overflow-hidden rounded-3xl bg-linear-to-br from-slate-800 to-slate-900">
                <Image
                  src={featuredImage}
                  alt={featuredProduct?.name || "Featured electronics"}
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="object-contain p-8 drop-shadow-2xl"
                />
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-slate-950/95 via-slate-950/50 to-transparent p-6 pt-20">
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-teal-200">
                    {featuredProduct ? "Featured pick" : "Electro Shop"}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    {featuredProduct?.name || "Find something brilliant"}
                  </h2>
                  {featuredProduct && (
                    <p className="mt-2 text-lg font-medium text-white/80">
                      Rs {Number(featuredProduct.price ?? 0).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between px-2 pb-1 pt-4 text-sm text-slate-300">
                <span>Discover something new</span>
                <span className="text-teal-200" aria-hidden="true">✦</span>
              </div>
            </div>
            <div className="absolute -left-5 top-12 hidden rounded-2xl border border-white/15 bg-slate-900/80 px-4 py-3 shadow-xl backdrop-blur sm:block">
              <p className="text-xs uppercase tracking-widest text-slate-400">Curated tech</p>
              <p className="mt-1 font-semibold text-white">Made for your day</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              The collection
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Popular right now
            </h2>
            <p className="mt-3 max-w-xl text-slate-600">
              Take a look at products customers are exploring.
            </p>
          </div>
          <Link
            href={PRODUCTS_ROUTE}
            className="inline-flex w-fit items-center gap-2 font-semibold text-primary transition hover:gap-3"
          >
            View all products <span aria-hidden="true">→</span>
          </Link>
        </div>

        {featuredProducts.length > 0 ? (
          <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id ?? product.id ?? product.name} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-9 rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
            <h3 className="text-lg font-semibold text-slate-900">Products are on the way</h3>
            <p className="mt-2 text-slate-600">Please check back soon to explore our collection.</p>
          </div>
        )}
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Shopping, simplified
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              From discovery to support
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {highlights.map((highlight) => (
              <article
                key={highlight.number}
                className="group rounded-3xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl hover:shadow-slate-900/5"
              >
                <span className="text-sm font-semibold tracking-widest text-primary">
                  {highlight.number}
                </span>
                <h3 className="mt-6 text-xl font-semibold text-slate-950">
                  {highlight.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {highlight.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-6 rounded-4xl bg-teal-50 p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-800">
              Need a hand?
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
              Let’s find the right tech for you.
            </h2>
          </div>
          <Link
            href={SERVICES_ROUTE}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-slate-950 px-6 py-3 font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
          >
            Get shopping help <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
