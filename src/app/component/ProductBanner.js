
import React from "react"
import Image from "next/image"

const ProductBanner = () => (
  <section className="relative isolate overflow-hidden bg-red-700 text-white">
    <Image
      src="/assets/banner.jpg"
      alt=""
      fill
      priority
      quality={100}
      className="absolute inset-0 z-0 object-cover opacity-30"
    />
    <div className="absolute inset-0 z-10 bg-linear-to-r from-red-950/90 via-red-900/75 to-red-800/40" />

    <div className="relative z-20 mx-auto grid min-h-104 max-w-7xl items-center gap-6 px-6 py-10 sm:px-10 md:grid-cols-2 md:px-12">
      <div className="text-center md:text-left">
        <p className="mb-3 inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-semibold uppercase tracking-[0.2em]">
          Limited-time offer
        </p>
        <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          Big savings.
          <br />
          Better tech.
        </h1>
        <p className="mt-4 max-w-lg text-base text-white/90 sm:text-lg">
          Discover special deals on the latest iPhone and more in our sale.
        </p>
      </div>

      <div className="relative mx-auto h-50 w-full max-w-sm sm:h-72 md:h-96">
        <Image
          src="/assets/iphone17proMax.png"
          alt="iPhone 17 Pro Max"
          fill
          priority
          quality={100}
          sizes="(max-width: 768px) 80vw, 40vw"
          className="object-contain drop-shadow-2xl"
        />
      </div>
    </div>
  </section>
);

export default ProductBanner
