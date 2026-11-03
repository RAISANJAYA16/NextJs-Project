import React from 'react'

const OrderPage = () => {
  return (
<section id="oh-table" aria-labelledby="oh-table-title" className="bg-primary-100 px-4 py-12 md:px-8 md:py-20 dark:bg-neutral-950">
  <div className="mx-auto max-w-8xl rounded-xl bg-white shadow-xs ring-1 ring-neutral-950/10 dark:bg-neutral-900 dark:ring-neutral-800">
    <div className="px-4 pt-5 sm:px-5">
      <h2 id="oh-table-title" className="text-base font-semibold text-neutral-950 dark:text-neutral-50">Orders</h2>
      <p className="mt-2 text-lg text-pretty text-neutral-600 dark:text-neutral-400">Every order you've placed with Northwind. Search by number or narrow by status and date.</p>
    </div>
    <div className="grid grid-cols-2 gap-3 px-4 pt-4 pb-5 sm:grid-cols-[minmax(0,1fr)_11rem_10rem] sm:px-5">
      <div className="col-span-2 min-w-0 sm:col-span-1">
        <label htmlFor="oh-table-search" className="mb-1.5 block text-[13px] font-medium text-neutral-950 dark:text-neutral-50">Order number</label>
        <div className="relative">
          <svg className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-neutral-600 dark:text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m21 21-4.34-4.34" /><circle cx={11} cy={11} r={8} /></svg>
          <input id="oh-table-search" type="search" inputMode="search" autoComplete="off" spellCheck="false" placeholder="NW-30418" className="block h-9 w-full rounded-lg bg-neutral-100 pr-3 pl-8 text-sm text-neutral-950 outline-1 -outline-offset-1 outline-neutral-200 placeholder:text-neutral-600 hover:outline-neutral-300 focus:outline-2 focus:-outline-offset-2 focus:outline-zinc-950 dark:bg-neutral-900 dark:text-neutral-50 dark:outline-neutral-700 dark:placeholder:text-neutral-400 dark:hover:outline-neutral-600 dark:focus:outline-zinc-50" />
        </div>
      </div>
      <div className="min-w-0">
        <label htmlFor="oh-table-status" className="mb-1.5 block text-[13px] font-medium text-neutral-950 dark:text-neutral-50">Status</label>
        <div className="relative">
          <select id="oh-table-status" className="block h-9 w-full cursor-pointer appearance-none rounded-lg bg-neutral-100 pr-9 pl-3 text-sm text-neutral-950 outline-1 -outline-offset-1 outline-neutral-200 hover:outline-neutral-300 focus:outline-2 focus:-outline-offset-2 focus:outline-zinc-950 aria-[invalid=true]:outline-red-600 dark:bg-neutral-900 dark:text-neutral-50 dark:[color-scheme:dark] dark:outline-neutral-700 dark:hover:outline-neutral-600 dark:focus:outline-zinc-50 dark:aria-[invalid=true]:outline-red-500">
            <option value="all">All statuses</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="returned">Returned</option>
            <option value="refunded">Refunded</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <svg className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-neutral-600 dark:text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
        </div>
      </div>
      <div className="min-w-0">
        <label htmlFor="oh-table-range" className="mb-1.5 block text-[13px] font-medium text-neutral-950 dark:text-neutral-50">Placed</label>
        <div className="relative">
          <select id="oh-table-range" className="block h-9 w-full cursor-pointer appearance-none rounded-lg bg-neutral-100 pr-9 pl-3 text-sm text-neutral-950 outline-1 -outline-offset-1 outline-neutral-200 hover:outline-neutral-300 focus:outline-2 focus:-outline-offset-2 focus:outline-zinc-950 aria-[invalid=true]:outline-red-600 dark:bg-neutral-900 dark:text-neutral-50 dark:[color-scheme:dark] dark:outline-neutral-700 dark:hover:outline-neutral-600 dark:focus:outline-zinc-50 dark:aria-[invalid=true]:outline-red-500">
            <option value="all">All time</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 3 months</option>
            <option value={2026}>2026</option>
            <option value={2025}>2025</option>
          </select>
          <svg className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-neutral-600 dark:text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
        </div>
      </div>
    </div>
    <table aria-labelledby="oh-table-title" className="w-full text-left text-sm max-lg:block">
      <thead className="text-xs text-neutral-600 max-lg:sr-only lg:border-y lg:border-neutral-200 lg:bg-neutral-50 dark:text-neutral-400 dark:lg:border-neutral-800 dark:lg:bg-neutral-900">
        <tr>
          <th scope="col" className="py-2.5 pr-4 pl-5 font-medium">Order</th>
          <th scope="col" className="px-4 py-2.5 font-medium">Items</th>
          <th scope="col" className="px-4 py-2.5 font-medium">Status</th>
          <th scope="col" className="px-4 py-2.5 text-right font-medium">Total</th>
          <th scope="col" className="py-2.5 pr-5 pl-4"><span className="sr-only">Action</span></th>
        </tr>
      </thead>
      <tbody id="oh-table-rows" className="divide-y divide-neutral-200 max-lg:block max-lg:border-t max-lg:border-neutral-200 dark:divide-neutral-800 dark:max-lg:border-neutral-800">
        <tr data-num="NW-30427" data-status="processing" data-date="2026-10-25" className="transition-colors duration-150 hover:bg-neutral-50 motion-reduce:transition-none max-lg:grid max-lg:grid-cols-[minmax(0,1fr)_auto] max-lg:items-center max-lg:gap-x-4 max-lg:gap-y-3 max-lg:p-4 sm:max-lg:grid-cols-[9rem_minmax(0,1fr)_auto] sm:max-lg:gap-x-6 sm:max-lg:px-5 dark:hover:bg-neutral-800/50">
          <td className="max-lg:col-start-1 max-lg:row-start-1 lg:py-3 lg:pr-4 lg:pl-5 lg:whitespace-nowrap">
            <a href="#" className="rounded-sm font-mono text-[13px] text-neutral-950 underline decoration-neutral-950/20 underline-offset-4 transition-colors duration-150 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 motion-reduce:transition-none dark:text-neutral-50 dark:decoration-neutral-50/30 dark:focus-visible:outline-zinc-50"><span className="sr-only">Order </span>#NW-30427</a>
            <p className="mt-0.5 text-[13px] text-neutral-600 dark:text-neutral-400"><time dateTime="2026-10-25">Oct 25, 2026</time></p>
          </td>
          <td className="min-w-0 max-lg:col-span-2 max-lg:row-start-2 sm:max-lg:col-span-1 sm:max-lg:col-start-2 sm:max-lg:row-span-2 sm:max-lg:row-start-1 lg:px-4 lg:py-3">
            <div className="flex items-center gap-3">
              <div className="size-10 shrink-0 rounded-md bg-neutral-100 p-1 dark:bg-neutral-800"><img src="https://readymadeui.com/images/laptop2.webp" alt className="size-full object-contain" /></div>
              <div className="min-w-0">
                <p className="truncate text-neutral-950 lg:max-w-56 dark:text-neutral-50">Brightpath Air 13</p>
              </div>
            </div>
          </td>
          <td className="max-lg:col-start-2 max-lg:row-start-1 max-lg:justify-self-end sm:max-lg:col-start-3 lg:px-4 lg:py-3"><span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium whitespace-nowrap text-amber-800 ring-1 ring-amber-600/20 ring-inset dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/20"><span aria-hidden="true" className="size-1.5 rounded-full bg-amber-500" />Processing</span></td>
          <td data-label="Total" className="font-medium text-neutral-950 tabular-nums max-lg:col-start-1 max-lg:row-start-3 max-lg:before:mr-1.5 max-lg:before:font-normal max-lg:before:text-neutral-600 max-lg:before:content-[attr(data-label)] sm:max-lg:row-start-2 lg:px-4 lg:py-3 lg:text-right dark:text-neutral-50 dark:max-lg:before:text-neutral-400">$1,149.00</td>
          <td className="max-lg:col-start-2 max-lg:row-start-3 max-lg:justify-self-end sm:max-lg:col-start-3 sm:max-lg:row-start-2 lg:py-3 lg:pr-5 lg:pl-4 lg:text-right"><a href="#" className="inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 text-[13px] font-medium whitespace-nowrap text-neutral-950 shadow-xs transition-colors duration-150 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50 dark:hover:bg-neutral-800 dark:focus-visible:outline-zinc-50">Cancel<span className="sr-only">, order #NW-30427</span></a></td>
        </tr>
        <tr data-num="NW-30418" data-status="shipped" data-date="2026-10-22" className="transition-colors duration-150 hover:bg-neutral-50 motion-reduce:transition-none max-lg:grid max-lg:grid-cols-[minmax(0,1fr)_auto] max-lg:items-center max-lg:gap-x-4 max-lg:gap-y-3 max-lg:p-4 sm:max-lg:grid-cols-[9rem_minmax(0,1fr)_auto] sm:max-lg:gap-x-6 sm:max-lg:px-5 dark:hover:bg-neutral-800/50">
          <td className="max-lg:col-start-1 max-lg:row-start-1 lg:py-3 lg:pr-4 lg:pl-5 lg:whitespace-nowrap">
            <a href="#" className="rounded-sm font-mono text-[13px] text-neutral-950 underline decoration-neutral-950/20 underline-offset-4 transition-colors duration-150 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 motion-reduce:transition-none dark:text-neutral-50 dark:decoration-neutral-50/30 dark:focus-visible:outline-zinc-50"><span className="sr-only">Order </span>#NW-30418</a>
            <p className="mt-0.5 text-[13px] text-neutral-600 dark:text-neutral-400"><time dateTime="2026-10-22">Oct 22, 2026</time></p>
          </td>
          <td className="min-w-0 max-lg:col-span-2 max-lg:row-start-2 sm:max-lg:col-span-1 sm:max-lg:col-start-2 sm:max-lg:row-span-2 sm:max-lg:row-start-1 lg:px-4 lg:py-3">
            <div className="flex items-center gap-3">
              <div className="size-10 shrink-0 rounded-md bg-neutral-100 p-1 dark:bg-neutral-800"><img src="https://readymadeui.com/images/product13.webp" alt className="size-full object-contain" /></div>
              <div className="min-w-0">
                <p className="truncate text-neutral-950 lg:max-w-56 dark:text-neutral-50">Ridge Trail</p>
                <p className="text-[13px] text-neutral-600 dark:text-neutral-400">and 1 more item</p>
              </div>
            </div>
          </td>
          <td className="max-lg:col-start-2 max-lg:row-start-1 max-lg:justify-self-end sm:max-lg:col-start-3 lg:px-4 lg:py-3"><span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium whitespace-nowrap text-neutral-950 ring-1 ring-neutral-500/15 ring-inset dark:bg-neutral-800 dark:text-neutral-300 dark:ring-white/10"><span aria-hidden="true" className="size-1.5 rounded-full bg-neutral-400" />Shipped</span></td>
          <td data-label="Total" className="font-medium text-neutral-950 tabular-nums max-lg:col-start-1 max-lg:row-start-3 max-lg:before:mr-1.5 max-lg:before:font-normal max-lg:before:text-neutral-600 max-lg:before:content-[attr(data-label)] sm:max-lg:row-start-2 lg:px-4 lg:py-3 lg:text-right dark:text-neutral-50 dark:max-lg:before:text-neutral-400">$243.50</td>
          <td className="max-lg:col-start-2 max-lg:row-start-3 max-lg:justify-self-end sm:max-lg:col-start-3 sm:max-lg:row-start-2 lg:py-3 lg:pr-5 lg:pl-4 lg:text-right"><a href="#" className="inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 text-[13px] font-medium whitespace-nowrap text-neutral-950 shadow-xs transition-colors duration-150 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50 dark:hover:bg-neutral-800 dark:focus-visible:outline-zinc-50">Track<span className="sr-only">, order #NW-30418</span></a></td>
        </tr>
        <tr data-num="NW-30392" data-status="delivered" data-date="2026-10-14" className="transition-colors duration-150 hover:bg-neutral-50 motion-reduce:transition-none max-lg:grid max-lg:grid-cols-[minmax(0,1fr)_auto] max-lg:items-center max-lg:gap-x-4 max-lg:gap-y-3 max-lg:p-4 sm:max-lg:grid-cols-[9rem_minmax(0,1fr)_auto] sm:max-lg:gap-x-6 sm:max-lg:px-5 dark:hover:bg-neutral-800/50">
          <td className="max-lg:col-start-1 max-lg:row-start-1 lg:py-3 lg:pr-4 lg:pl-5 lg:whitespace-nowrap">
            <a href="#" className="rounded-sm font-mono text-[13px] text-neutral-950 underline decoration-neutral-950/20 underline-offset-4 transition-colors duration-150 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 motion-reduce:transition-none dark:text-neutral-50 dark:decoration-neutral-50/30 dark:focus-visible:outline-zinc-50"><span className="sr-only">Order </span>#NW-30392</a>
            <p className="mt-0.5 text-[13px] text-neutral-600 dark:text-neutral-400"><time dateTime="2026-10-14">Oct 14, 2026</time></p>
          </td>
          <td className="min-w-0 max-lg:col-span-2 max-lg:row-start-2 sm:max-lg:col-span-1 sm:max-lg:col-start-2 sm:max-lg:row-span-2 sm:max-lg:row-start-1 lg:px-4 lg:py-3">
            <div className="flex items-center gap-3">
              <div className="size-10 shrink-0 rounded-md bg-neutral-100 p-1 dark:bg-neutral-800"><img src="https://readymadeui.com/images/watch8.webp" alt className="size-full object-contain" /></div>
              <div className="min-w-0">
                <p className="truncate text-neutral-950 lg:max-w-56 dark:text-neutral-50">Pulse 2 smartwatch</p>
              </div>
            </div>
          </td>
          <td className="max-lg:col-start-2 max-lg:row-start-1 max-lg:justify-self-end sm:max-lg:col-start-3 lg:px-4 lg:py-3"><span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium whitespace-nowrap text-green-700 ring-1 ring-green-600/20 ring-inset dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20"><span aria-hidden="true" className="size-1.5 rounded-full bg-green-500" />Delivered</span></td>
          <td data-label="Total" className="font-medium text-neutral-950 tabular-nums max-lg:col-start-1 max-lg:row-start-3 max-lg:before:mr-1.5 max-lg:before:font-normal max-lg:before:text-neutral-600 max-lg:before:content-[attr(data-label)] sm:max-lg:row-start-2 lg:px-4 lg:py-3 lg:text-right dark:text-neutral-50 dark:max-lg:before:text-neutral-400">$249.00</td>
          <td className="max-lg:col-start-2 max-lg:row-start-3 max-lg:justify-self-end sm:max-lg:col-start-3 sm:max-lg:row-start-2 lg:py-3 lg:pr-5 lg:pl-4 lg:text-right"><a href="#" className="inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 text-[13px] font-medium whitespace-nowrap text-neutral-950 shadow-xs transition-colors duration-150 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50 dark:hover:bg-neutral-800 dark:focus-visible:outline-zinc-50">Return<span className="sr-only">, order #NW-30392</span></a></td>
        </tr>
        <tr data-num="NW-30371" data-status="refunded" data-date="2026-10-03" className="transition-colors duration-150 hover:bg-neutral-50 motion-reduce:transition-none max-lg:grid max-lg:grid-cols-[minmax(0,1fr)_auto] max-lg:items-center max-lg:gap-x-4 max-lg:gap-y-3 max-lg:p-4 sm:max-lg:grid-cols-[9rem_minmax(0,1fr)_auto] sm:max-lg:gap-x-6 sm:max-lg:px-5 dark:hover:bg-neutral-800/50">
          <td className="max-lg:col-start-1 max-lg:row-start-1 lg:py-3 lg:pr-4 lg:pl-5 lg:whitespace-nowrap">
            <a href="#" className="rounded-sm font-mono text-[13px] text-neutral-950 underline decoration-neutral-950/20 underline-offset-4 transition-colors duration-150 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 motion-reduce:transition-none dark:text-neutral-50 dark:decoration-neutral-50/30 dark:focus-visible:outline-zinc-50"><span className="sr-only">Order </span>#NW-30371</a>
            <p className="mt-0.5 text-[13px] text-neutral-600 dark:text-neutral-400"><time dateTime="2026-10-03">Oct 3, 2026</time></p>
          </td>
          <td className="min-w-0 max-lg:col-span-2 max-lg:row-start-2 sm:max-lg:col-span-1 sm:max-lg:col-start-2 sm:max-lg:row-span-2 sm:max-lg:row-start-1 lg:px-4 lg:py-3">
            <div className="flex items-center gap-3">
              <div className="size-10 shrink-0 rounded-md bg-neutral-100 p-1 dark:bg-neutral-800"><img src="https://readymadeui.com/images/sunglass2.webp" alt className="size-full object-contain" /></div>
              <div className="min-w-0">
                <p className="truncate text-neutral-950 lg:max-w-56 dark:text-neutral-50">Sola sunglasses</p>
              </div>
            </div>
          </td>
          <td className="max-lg:col-start-2 max-lg:row-start-1 max-lg:justify-self-end sm:max-lg:col-start-3 lg:px-4 lg:py-3"><span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium whitespace-nowrap text-neutral-950 ring-1 ring-neutral-500/15 ring-inset dark:bg-neutral-800 dark:text-neutral-300 dark:ring-white/10"><span aria-hidden="true" className="size-1.5 rounded-full bg-neutral-400" />Refunded</span></td>
          <td data-label="Total" className="font-medium text-neutral-950 tabular-nums max-lg:col-start-1 max-lg:row-start-3 max-lg:before:mr-1.5 max-lg:before:font-normal max-lg:before:text-neutral-600 max-lg:before:content-[attr(data-label)] sm:max-lg:row-start-2 lg:px-4 lg:py-3 lg:text-right dark:text-neutral-50 dark:max-lg:before:text-neutral-400">$96.00</td>
          <td className="max-lg:col-start-2 max-lg:row-start-3 max-lg:justify-self-end sm:max-lg:col-start-3 sm:max-lg:row-start-2 lg:py-3 lg:pr-5 lg:pl-4 lg:text-right"><a href="#" className="inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 text-[13px] font-medium whitespace-nowrap text-neutral-950 shadow-xs transition-colors duration-150 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50 dark:hover:bg-neutral-800 dark:focus-visible:outline-zinc-50">Refund details<span className="sr-only">, order #NW-30371</span></a></td>
        </tr>
        <tr data-num="NW-30340" data-status="delivered" data-date="2026-09-19" className="transition-colors duration-150 hover:bg-neutral-50 motion-reduce:transition-none max-lg:grid max-lg:grid-cols-[minmax(0,1fr)_auto] max-lg:items-center max-lg:gap-x-4 max-lg:gap-y-3 max-lg:p-4 sm:max-lg:grid-cols-[9rem_minmax(0,1fr)_auto] sm:max-lg:gap-x-6 sm:max-lg:px-5 dark:hover:bg-neutral-800/50">
          <td className="max-lg:col-start-1 max-lg:row-start-1 lg:py-3 lg:pr-4 lg:pl-5 lg:whitespace-nowrap">
            <a href="#" className="rounded-sm font-mono text-[13px] text-neutral-950 underline decoration-neutral-950/20 underline-offset-4 transition-colors duration-150 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 motion-reduce:transition-none dark:text-neutral-50 dark:decoration-neutral-50/30 dark:focus-visible:outline-zinc-50"><span className="sr-only">Order </span>#NW-30340</a>
            <p className="mt-0.5 text-[13px] text-neutral-600 dark:text-neutral-400"><time dateTime="2026-09-19">Sep 19, 2026</time></p>
          </td>
          <td className="min-w-0 max-lg:col-span-2 max-lg:row-start-2 sm:max-lg:col-span-1 sm:max-lg:col-start-2 sm:max-lg:row-span-2 sm:max-lg:row-start-1 lg:px-4 lg:py-3">
            <div className="flex items-center gap-3">
              <div className="size-10 shrink-0 rounded-md bg-neutral-100 p-1 dark:bg-neutral-800"><img src="https://readymadeui.com/images/product11.webp" alt className="size-full object-contain" /></div>
              <div className="min-w-0">
                <p className="truncate text-neutral-950 lg:max-w-56 dark:text-neutral-50">Harbour boot</p>
                <p className="text-[13px] text-neutral-600 dark:text-neutral-400">and 2 more items</p>
              </div>
            </div>
          </td>
          <td className="max-lg:col-start-2 max-lg:row-start-1 max-lg:justify-self-end sm:max-lg:col-start-3 lg:px-4 lg:py-3"><span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium whitespace-nowrap text-green-700 ring-1 ring-green-600/20 ring-inset dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20"><span aria-hidden="true" className="size-1.5 rounded-full bg-green-500" />Delivered</span></td>
          <td data-label="Total" className="font-medium text-neutral-950 tabular-nums max-lg:col-start-1 max-lg:row-start-3 max-lg:before:mr-1.5 max-lg:before:font-normal max-lg:before:text-neutral-600 max-lg:before:content-[attr(data-label)] sm:max-lg:row-start-2 lg:px-4 lg:py-3 lg:text-right dark:text-neutral-50 dark:max-lg:before:text-neutral-400">$412.80</td>
          <td className="max-lg:col-start-2 max-lg:row-start-3 max-lg:justify-self-end sm:max-lg:col-start-3 sm:max-lg:row-start-2 lg:py-3 lg:pr-5 lg:pl-4 lg:text-right"><a href="#" className="inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 text-[13px] font-medium whitespace-nowrap text-neutral-950 shadow-xs transition-colors duration-150 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50 dark:hover:bg-neutral-800 dark:focus-visible:outline-zinc-50">Invoice<span className="sr-only">, order #NW-30340</span></a></td>
        </tr>
        <tr data-num="NW-30305" data-status="cancelled" data-date="2026-08-28" className="transition-colors duration-150 hover:bg-neutral-50 motion-reduce:transition-none max-lg:grid max-lg:grid-cols-[minmax(0,1fr)_auto] max-lg:items-center max-lg:gap-x-4 max-lg:gap-y-3 max-lg:p-4 sm:max-lg:grid-cols-[9rem_minmax(0,1fr)_auto] sm:max-lg:gap-x-6 sm:max-lg:px-5 dark:hover:bg-neutral-800/50">
          <td className="max-lg:col-start-1 max-lg:row-start-1 lg:py-3 lg:pr-4 lg:pl-5 lg:whitespace-nowrap">
            <a href="#" className="rounded-sm font-mono text-[13px] text-neutral-950 underline decoration-neutral-950/20 underline-offset-4 transition-colors duration-150 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 motion-reduce:transition-none dark:text-neutral-50 dark:decoration-neutral-50/30 dark:focus-visible:outline-zinc-50"><span className="sr-only">Order </span>#NW-30305</a>
            <p className="mt-0.5 text-[13px] text-neutral-600 dark:text-neutral-400"><time dateTime="2026-08-28">Aug 28, 2026</time></p>
          </td>
          <td className="min-w-0 max-lg:col-span-2 max-lg:row-start-2 sm:max-lg:col-span-1 sm:max-lg:col-start-2 sm:max-lg:row-span-2 sm:max-lg:row-start-1 lg:px-4 lg:py-3">
            <div className="flex items-center gap-3">
              <div className="size-10 shrink-0 rounded-md bg-neutral-100 p-1 dark:bg-neutral-800"><img src="https://readymadeui.com/images/product15.webp" alt className="size-full object-contain" /></div>
              <div className="min-w-0">
                <p className="truncate text-neutral-950 lg:max-w-56 dark:text-neutral-50">Oxford Gloss</p>
              </div>
            </div>
          </td>
          <td className="max-lg:col-start-2 max-lg:row-start-1 max-lg:justify-self-end sm:max-lg:col-start-3 lg:px-4 lg:py-3"><span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium whitespace-nowrap text-red-700 ring-1 ring-red-600/20 ring-inset dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/20"><span aria-hidden="true" className="size-1.5 rounded-full bg-red-500" />Cancelled</span></td>
          <td data-label="Total" className="font-medium text-neutral-950 tabular-nums max-lg:col-start-1 max-lg:row-start-3 max-lg:before:mr-1.5 max-lg:before:font-normal max-lg:before:text-neutral-600 max-lg:before:content-[attr(data-label)] sm:max-lg:row-start-2 lg:px-4 lg:py-3 lg:text-right dark:text-neutral-50 dark:max-lg:before:text-neutral-400">$158.00</td>
          <td className="max-lg:col-start-2 max-lg:row-start-3 max-lg:justify-self-end sm:max-lg:col-start-3 sm:max-lg:row-start-2 lg:py-3 lg:pr-5 lg:pl-4 lg:text-right"><a href="#" className="inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 text-[13px] font-medium whitespace-nowrap text-neutral-950 shadow-xs transition-colors duration-150 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50 dark:hover:bg-neutral-800 dark:focus-visible:outline-zinc-50">Buy again<span className="sr-only">, order #NW-30305</span></a></td>
        </tr>
        <tr data-num="NW-30266" data-status="returned" data-date="2026-07-30" className="transition-colors duration-150 hover:bg-neutral-50 motion-reduce:transition-none max-lg:grid max-lg:grid-cols-[minmax(0,1fr)_auto] max-lg:items-center max-lg:gap-x-4 max-lg:gap-y-3 max-lg:p-4 sm:max-lg:grid-cols-[9rem_minmax(0,1fr)_auto] sm:max-lg:gap-x-6 sm:max-lg:px-5 dark:hover:bg-neutral-800/50">
          <td className="max-lg:col-start-1 max-lg:row-start-1 lg:py-3 lg:pr-4 lg:pl-5 lg:whitespace-nowrap">
            <a href="#" className="rounded-sm font-mono text-[13px] text-neutral-950 underline decoration-neutral-950/20 underline-offset-4 transition-colors duration-150 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 motion-reduce:transition-none dark:text-neutral-50 dark:decoration-neutral-50/30 dark:focus-visible:outline-zinc-50"><span className="sr-only">Order </span>#NW-30266</a>
            <p className="mt-0.5 text-[13px] text-neutral-600 dark:text-neutral-400"><time dateTime="2026-07-30">Jul 30, 2026</time></p>
          </td>
          <td className="min-w-0 max-lg:col-span-2 max-lg:row-start-2 sm:max-lg:col-span-1 sm:max-lg:col-start-2 sm:max-lg:row-span-2 sm:max-lg:row-start-1 lg:px-4 lg:py-3">
            <div className="flex items-center gap-3">
              <div className="size-10 shrink-0 rounded-md bg-neutral-100 p-1 dark:bg-neutral-800"><img src="https://readymadeui.com/images/watch7.webp" alt className="size-full object-contain" /></div>
              <div className="min-w-0">
                <p className="truncate text-neutral-950 lg:max-w-56 dark:text-neutral-50">Tempo GPS watch</p>
              </div>
            </div>
          </td>
          <td className="max-lg:col-start-2 max-lg:row-start-1 max-lg:justify-self-end sm:max-lg:col-start-3 lg:px-4 lg:py-3"><span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium whitespace-nowrap text-neutral-950 ring-1 ring-neutral-500/15 ring-inset dark:bg-neutral-800 dark:text-neutral-300 dark:ring-white/10"><span aria-hidden="true" className="size-1.5 rounded-full bg-neutral-400" />Returned</span></td>
          <td data-label="Total" className="font-medium text-neutral-950 tabular-nums max-lg:col-start-1 max-lg:row-start-3 max-lg:before:mr-1.5 max-lg:before:font-normal max-lg:before:text-neutral-600 max-lg:before:content-[attr(data-label)] sm:max-lg:row-start-2 lg:px-4 lg:py-3 lg:text-right dark:text-neutral-50 dark:max-lg:before:text-neutral-400">$329.00</td>
          <td className="max-lg:col-start-2 max-lg:row-start-3 max-lg:justify-self-end sm:max-lg:col-start-3 sm:max-lg:row-start-2 lg:py-3 lg:pr-5 lg:pl-4 lg:text-right"><a href="#" className="inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 text-[13px] font-medium whitespace-nowrap text-neutral-950 shadow-xs transition-colors duration-150 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50 dark:hover:bg-neutral-800 dark:focus-visible:outline-zinc-50">Refund details<span className="sr-only">, order #NW-30266</span></a></td>
        </tr>
        <tr data-num="NW-30214" data-status="delivered" data-date="2026-06-12" className="transition-colors duration-150 hover:bg-neutral-50 motion-reduce:transition-none max-lg:grid max-lg:grid-cols-[minmax(0,1fr)_auto] max-lg:items-center max-lg:gap-x-4 max-lg:gap-y-3 max-lg:p-4 sm:max-lg:grid-cols-[9rem_minmax(0,1fr)_auto] sm:max-lg:gap-x-6 sm:max-lg:px-5 dark:hover:bg-neutral-800/50">
          <td className="max-lg:col-start-1 max-lg:row-start-1 lg:py-3 lg:pr-4 lg:pl-5 lg:whitespace-nowrap">
            <a href="#" className="rounded-sm font-mono text-[13px] text-neutral-950 underline decoration-neutral-950/20 underline-offset-4 transition-colors duration-150 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 motion-reduce:transition-none dark:text-neutral-50 dark:decoration-neutral-50/30 dark:focus-visible:outline-zinc-50"><span className="sr-only">Order </span>#NW-30214</a>
            <p className="mt-0.5 text-[13px] text-neutral-600 dark:text-neutral-400"><time dateTime="2026-06-12">Jun 12, 2026</time></p>
          </td>
          <td className="min-w-0 max-lg:col-span-2 max-lg:row-start-2 sm:max-lg:col-span-1 sm:max-lg:col-start-2 sm:max-lg:row-span-2 sm:max-lg:row-start-1 lg:px-4 lg:py-3">
            <div className="flex items-center gap-3">
              <div className="size-10 shrink-0 rounded-md bg-neutral-100 p-1 dark:bg-neutral-800"><img src="https://readymadeui.com/images/product14.webp" alt className="size-full object-contain" /></div>
              <div className="min-w-0">
                <p className="truncate text-neutral-950 lg:max-w-56 dark:text-neutral-50">Canvas Low</p>
                <p className="text-[13px] text-neutral-600 dark:text-neutral-400">Qty 2</p>
              </div>
            </div>
          </td>
          <td className="max-lg:col-start-2 max-lg:row-start-1 max-lg:justify-self-end sm:max-lg:col-start-3 lg:px-4 lg:py-3"><span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium whitespace-nowrap text-green-700 ring-1 ring-green-600/20 ring-inset dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20"><span aria-hidden="true" className="size-1.5 rounded-full bg-green-500" />Delivered</span></td>
          <td data-label="Total" className="font-medium text-neutral-950 tabular-nums max-lg:col-start-1 max-lg:row-start-3 max-lg:before:mr-1.5 max-lg:before:font-normal max-lg:before:text-neutral-600 max-lg:before:content-[attr(data-label)] sm:max-lg:row-start-2 lg:px-4 lg:py-3 lg:text-right dark:text-neutral-50 dark:max-lg:before:text-neutral-400">$136.00</td>
          <td className="max-lg:col-start-2 max-lg:row-start-3 max-lg:justify-self-end sm:max-lg:col-start-3 sm:max-lg:row-start-2 lg:py-3 lg:pr-5 lg:pl-4 lg:text-right"><a href="#" className="inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 text-[13px] font-medium whitespace-nowrap text-neutral-950 shadow-xs transition-colors duration-150 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50 dark:hover:bg-neutral-800 dark:focus-visible:outline-zinc-50">Buy again<span className="sr-only">, order #NW-30214</span></a></td>
        </tr>
        <tr data-num="NW-30159" data-status="delivered" data-date="2026-04-03" className="transition-colors duration-150 hover:bg-neutral-50 motion-reduce:transition-none max-lg:grid max-lg:grid-cols-[minmax(0,1fr)_auto] max-lg:items-center max-lg:gap-x-4 max-lg:gap-y-3 max-lg:p-4 sm:max-lg:grid-cols-[9rem_minmax(0,1fr)_auto] sm:max-lg:gap-x-6 sm:max-lg:px-5 dark:hover:bg-neutral-800/50">
          <td className="max-lg:col-start-1 max-lg:row-start-1 lg:py-3 lg:pr-4 lg:pl-5 lg:whitespace-nowrap">
            <a href="#" className="rounded-sm font-mono text-[13px] text-neutral-950 underline decoration-neutral-950/20 underline-offset-4 transition-colors duration-150 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 motion-reduce:transition-none dark:text-neutral-50 dark:decoration-neutral-50/30 dark:focus-visible:outline-zinc-50"><span className="sr-only">Order </span>#NW-30159</a>
            <p className="mt-0.5 text-[13px] text-neutral-600 dark:text-neutral-400"><time dateTime="2026-04-03">Apr 3, 2026</time></p>
          </td>
          <td className="min-w-0 max-lg:col-span-2 max-lg:row-start-2 sm:max-lg:col-span-1 sm:max-lg:col-start-2 sm:max-lg:row-span-2 sm:max-lg:row-start-1 lg:px-4 lg:py-3">
            <div className="flex items-center gap-3">
              <div className="size-10 shrink-0 rounded-md bg-neutral-100 p-1 dark:bg-neutral-800"><img src="https://readymadeui.com/images/sunglass7.webp" alt className="size-full object-contain" /></div>
              <div className="min-w-0">
                <p className="truncate text-neutral-950 lg:max-w-56 dark:text-neutral-50">Linden browline glasses</p>
              </div>
            </div>
          </td>
          <td className="max-lg:col-start-2 max-lg:row-start-1 max-lg:justify-self-end sm:max-lg:col-start-3 lg:px-4 lg:py-3"><span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium whitespace-nowrap text-green-700 ring-1 ring-green-600/20 ring-inset dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20"><span aria-hidden="true" className="size-1.5 rounded-full bg-green-500" />Delivered</span></td>
          <td data-label="Total" className="font-medium text-neutral-950 tabular-nums max-lg:col-start-1 max-lg:row-start-3 max-lg:before:mr-1.5 max-lg:before:font-normal max-lg:before:text-neutral-600 max-lg:before:content-[attr(data-label)] sm:max-lg:row-start-2 lg:px-4 lg:py-3 lg:text-right dark:text-neutral-50 dark:max-lg:before:text-neutral-400">$64.00</td>
          <td className="max-lg:col-start-2 max-lg:row-start-3 max-lg:justify-self-end sm:max-lg:col-start-3 sm:max-lg:row-start-2 lg:py-3 lg:pr-5 lg:pl-4 lg:text-right"><a href="#" className="inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 text-[13px] font-medium whitespace-nowrap text-neutral-950 shadow-xs transition-colors duration-150 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50 dark:hover:bg-neutral-800 dark:focus-visible:outline-zinc-50">Invoice<span className="sr-only">, order #NW-30159</span></a></td>
        </tr>
        <tr data-num="NW-30088" data-status="delivered" data-date="2026-01-21" className="transition-colors duration-150 hover:bg-neutral-50 motion-reduce:transition-none max-lg:grid max-lg:grid-cols-[minmax(0,1fr)_auto] max-lg:items-center max-lg:gap-x-4 max-lg:gap-y-3 max-lg:p-4 sm:max-lg:grid-cols-[9rem_minmax(0,1fr)_auto] sm:max-lg:gap-x-6 sm:max-lg:px-5 dark:hover:bg-neutral-800/50">
          <td className="max-lg:col-start-1 max-lg:row-start-1 lg:py-3 lg:pr-4 lg:pl-5 lg:whitespace-nowrap">
            <a href="#" className="rounded-sm font-mono text-[13px] text-neutral-950 underline decoration-neutral-950/20 underline-offset-4 transition-colors duration-150 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 motion-reduce:transition-none dark:text-neutral-50 dark:decoration-neutral-50/30 dark:focus-visible:outline-zinc-50"><span className="sr-only">Order </span>#NW-30088</a>
            <p className="mt-0.5 text-[13px] text-neutral-600 dark:text-neutral-400"><time dateTime="2026-01-21">Jan 21, 2026</time></p>
          </td>
          <td className="min-w-0 max-lg:col-span-2 max-lg:row-start-2 sm:max-lg:col-span-1 sm:max-lg:col-start-2 sm:max-lg:row-span-2 sm:max-lg:row-start-1 lg:px-4 lg:py-3">
            <div className="flex items-center gap-3">
              <div className="size-10 shrink-0 rounded-md bg-neutral-100 p-1 dark:bg-neutral-800"><img src="https://readymadeui.com/images/laptop3.webp" alt className="size-full object-contain" /></div>
              <div className="min-w-0">
                <p className="truncate text-neutral-950 lg:max-w-56 dark:text-neutral-50">Brightpath Slim 14</p>
              </div>
            </div>
          </td>
          <td className="max-lg:col-start-2 max-lg:row-start-1 max-lg:justify-self-end sm:max-lg:col-start-3 lg:px-4 lg:py-3"><span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium whitespace-nowrap text-green-700 ring-1 ring-green-600/20 ring-inset dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20"><span aria-hidden="true" className="size-1.5 rounded-full bg-green-500" />Delivered</span></td>
          <td data-label="Total" className="font-medium text-neutral-950 tabular-nums max-lg:col-start-1 max-lg:row-start-3 max-lg:before:mr-1.5 max-lg:before:font-normal max-lg:before:text-neutral-600 max-lg:before:content-[attr(data-label)] sm:max-lg:row-start-2 lg:px-4 lg:py-3 lg:text-right dark:text-neutral-50 dark:max-lg:before:text-neutral-400">$1,389.00</td>
          <td className="max-lg:col-start-2 max-lg:row-start-3 max-lg:justify-self-end sm:max-lg:col-start-3 sm:max-lg:row-start-2 lg:py-3 lg:pr-5 lg:pl-4 lg:text-right"><a href="#" className="inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 text-[13px] font-medium whitespace-nowrap text-neutral-950 shadow-xs transition-colors duration-150 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50 dark:hover:bg-neutral-800 dark:focus-visible:outline-zinc-50">Invoice<span className="sr-only">, order #NW-30088</span></a></td>
        </tr>
        <tr data-num="NW-29961" data-status="delivered" data-date="2025-12-02" className="transition-colors duration-150 hover:bg-neutral-50 motion-reduce:transition-none max-lg:grid max-lg:grid-cols-[minmax(0,1fr)_auto] max-lg:items-center max-lg:gap-x-4 max-lg:gap-y-3 max-lg:p-4 sm:max-lg:grid-cols-[9rem_minmax(0,1fr)_auto] sm:max-lg:gap-x-6 sm:max-lg:px-5 dark:hover:bg-neutral-800/50">
          <td className="max-lg:col-start-1 max-lg:row-start-1 lg:py-3 lg:pr-4 lg:pl-5 lg:whitespace-nowrap">
            <a href="#" className="rounded-sm font-mono text-[13px] text-neutral-950 underline decoration-neutral-950/20 underline-offset-4 transition-colors duration-150 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 motion-reduce:transition-none dark:text-neutral-50 dark:decoration-neutral-50/30 dark:focus-visible:outline-zinc-50"><span className="sr-only">Order </span>#NW-29961</a>
            <p className="mt-0.5 text-[13px] text-neutral-600 dark:text-neutral-400"><time dateTime="2025-12-02">Dec 2, 2025</time></p>
          </td>
          <td className="min-w-0 max-lg:col-span-2 max-lg:row-start-2 sm:max-lg:col-span-1 sm:max-lg:col-start-2 sm:max-lg:row-span-2 sm:max-lg:row-start-1 lg:px-4 lg:py-3">
            <div className="flex items-center gap-3">
              <div className="size-10 shrink-0 rounded-md bg-neutral-100 p-1 dark:bg-neutral-800"><img src="https://readymadeui.com/images/product10.webp" alt className="size-full object-contain" /></div>
              <div className="min-w-0">
                <p className="truncate text-neutral-950 lg:max-w-56 dark:text-neutral-50">Field High</p>
                <p className="text-[13px] text-neutral-600 dark:text-neutral-400">and 1 more item</p>
              </div>
            </div>
          </td>
          <td className="max-lg:col-start-2 max-lg:row-start-1 max-lg:justify-self-end sm:max-lg:col-start-3 lg:px-4 lg:py-3"><span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium whitespace-nowrap text-green-700 ring-1 ring-green-600/20 ring-inset dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20"><span aria-hidden="true" className="size-1.5 rounded-full bg-green-500" />Delivered</span></td>
          <td data-label="Total" className="font-medium text-neutral-950 tabular-nums max-lg:col-start-1 max-lg:row-start-3 max-lg:before:mr-1.5 max-lg:before:font-normal max-lg:before:text-neutral-600 max-lg:before:content-[attr(data-label)] sm:max-lg:row-start-2 lg:px-4 lg:py-3 lg:text-right dark:text-neutral-50 dark:max-lg:before:text-neutral-400">$221.00</td>
          <td className="max-lg:col-start-2 max-lg:row-start-3 max-lg:justify-self-end sm:max-lg:col-start-3 sm:max-lg:row-start-2 lg:py-3 lg:pr-5 lg:pl-4 lg:text-right"><a href="#" className="inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 text-[13px] font-medium whitespace-nowrap text-neutral-950 shadow-xs transition-colors duration-150 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50 dark:hover:bg-neutral-800 dark:focus-visible:outline-zinc-50">Buy again<span className="sr-only">, order #NW-29961</span></a></td>
        </tr>
        <tr data-num="NW-29870" data-status="cancelled" data-date="2025-11-14" className="transition-colors duration-150 hover:bg-neutral-50 motion-reduce:transition-none max-lg:grid max-lg:grid-cols-[minmax(0,1fr)_auto] max-lg:items-center max-lg:gap-x-4 max-lg:gap-y-3 max-lg:p-4 sm:max-lg:grid-cols-[9rem_minmax(0,1fr)_auto] sm:max-lg:gap-x-6 sm:max-lg:px-5 dark:hover:bg-neutral-800/50">
          <td className="max-lg:col-start-1 max-lg:row-start-1 lg:py-3 lg:pr-4 lg:pl-5 lg:whitespace-nowrap">
            <a href="#" className="rounded-sm font-mono text-[13px] text-neutral-950 underline decoration-neutral-950/20 underline-offset-4 transition-colors duration-150 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 motion-reduce:transition-none dark:text-neutral-50 dark:decoration-neutral-50/30 dark:focus-visible:outline-zinc-50"><span className="sr-only">Order </span>#NW-29870</a>
            <p className="mt-0.5 text-[13px] text-neutral-600 dark:text-neutral-400"><time dateTime="2025-11-14">Nov 14, 2025</time></p>
          </td>
          <td className="min-w-0 max-lg:col-span-2 max-lg:row-start-2 sm:max-lg:col-span-1 sm:max-lg:col-start-2 sm:max-lg:row-span-2 sm:max-lg:row-start-1 lg:px-4 lg:py-3">
            <div className="flex items-center gap-3">
              <div className="size-10 shrink-0 rounded-md bg-neutral-100 p-1 dark:bg-neutral-800"><img src="https://readymadeui.com/images/watch2.webp" alt className="size-full object-contain" /></div>
              <div className="min-w-0">
                <p className="truncate text-neutral-950 lg:max-w-56 dark:text-neutral-50">Cove watch</p>
              </div>
            </div>
          </td>
          <td className="max-lg:col-start-2 max-lg:row-start-1 max-lg:justify-self-end sm:max-lg:col-start-3 lg:px-4 lg:py-3"><span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium whitespace-nowrap text-red-700 ring-1 ring-red-600/20 ring-inset dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/20"><span aria-hidden="true" className="size-1.5 rounded-full bg-red-500" />Cancelled</span></td>
          <td data-label="Total" className="font-medium text-neutral-950 tabular-nums max-lg:col-start-1 max-lg:row-start-3 max-lg:before:mr-1.5 max-lg:before:font-normal max-lg:before:text-neutral-600 max-lg:before:content-[attr(data-label)] sm:max-lg:row-start-2 lg:px-4 lg:py-3 lg:text-right dark:text-neutral-50 dark:max-lg:before:text-neutral-400">$189.00</td>
          <td className="max-lg:col-start-2 max-lg:row-start-3 max-lg:justify-self-end sm:max-lg:col-start-3 sm:max-lg:row-start-2 lg:py-3 lg:pr-5 lg:pl-4 lg:text-right"><a href="#" className="inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 text-[13px] font-medium whitespace-nowrap text-neutral-950 shadow-xs transition-colors duration-150 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50 dark:hover:bg-neutral-800 dark:focus-visible:outline-zinc-50">Buy again<span className="sr-only">, order #NW-29870</span></a></td>
        </tr>
      </tbody>
    </table>
    <div id="oh-table-empty" hidden className="flex flex-col items-center border-t border-neutral-200 px-4 py-12 text-center dark:border-neutral-800">
      <span className="flex size-10 items-center justify-center rounded-lg bg-neutral-100 text-neutral-950 dark:bg-neutral-800 dark:text-neutral-50"><svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m13.5 8.5-5 5" /><path d="m8.5 8.5 5 5" /><circle cx={11} cy={11} r={8} /><path d="m21 21-4.3-4.3" /></svg></span>
      <p className="mt-3 text-sm font-medium text-neutral-950 dark:text-neutral-50">No orders match</p>
      <p className="mt-1 text-sm text-pretty text-neutral-600 dark:text-neutral-400">Check the order number, or choose another status or date range.</p>
      <button type="button" data-clear className="mt-4 inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 text-[13px] font-medium whitespace-nowrap text-neutral-950 shadow-xs transition-colors duration-150 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50 dark:hover:bg-neutral-800 dark:focus-visible:outline-zinc-50">Clear filters</button>
    </div>
    <div className="flex min-h-14 flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-neutral-200 px-4 py-3 sm:px-5 dark:border-neutral-800">
      <p id="oh-table-count" role="status" className="text-sm text-pretty text-neutral-600 dark:text-neutral-400">Showing <span id="oh-table-shown" className="font-medium text-neutral-950 tabular-nums dark:text-neutral-50">12</span><span id="oh-table-of" hidden> of <span className="font-medium text-neutral-950 tabular-nums dark:text-neutral-50">12</span></span> orders</p>
      <button type="button" id="oh-table-clear" data-clear hidden className="cursor-pointer rounded-sm text-sm font-medium text-zinc-950 underline decoration-zinc-950/30 underline-offset-4 transition-colors duration-150 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 dark:text-zinc-50 dark:decoration-zinc-50/30 dark:focus-visible:outline-zinc-50">Clear filters</button>
    </div>
  </div>
</section>

  )
}

export default OrderPage
