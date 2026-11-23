"use client"
import Link from "next/link";
import { useState } from "react";
import navMenu from "../constants/navMenu";
import Logo from "./Logo";
import { usePathname, useRouter } from "next/navigation";
import { FiMoon, FiShoppingCart, FiSun } from "react-icons/fi";
import { CART_ROUTE, LOGIN_ROUTE } from "@/app/constants/routes";
import { HOME_ROUTE } from "@/app/constants/routes";
import useAuthStore from "@/stores/authStores";
import usePreferenceStore from "@/stores/peferencesStore";

function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const isAuth = useAuthStore((state) => state.isAuth);
  const user = useAuthStore((state) => state.user);
  const logoutUser = useAuthStore((state) => state.logoutUser);
  const theme = usePreferenceStore((state) => state.theme);
  const toggleTheme = usePreferenceStore((state) => state.toggleTheme);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-20 w-full border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-sm dark:border-neutral-700 dark:bg-neutral-900/95">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Logo />
        </div>

        <div className="order-3 w-full md:order-2 md:w-auto">
          <div
            className={`${mobileOpen ? "flex" : "hidden"} w-full md:flex md:w-auto md:items-center md:justify-center`}
            id="navbar-user"
          >
            <ul className="flex w-full flex-col gap-1 rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-neutral-700 dark:bg-neutral-900 md:w-auto md:flex-row md:items-center md:gap-2 md:border-0 md:bg-transparent md:p-0 md:shadow-none">
              {navMenu.map((navItem) => {
                const isActive =
                  pathname === navItem.route ||
                  pathname.startsWith(`${navItem.route}/`);

                return (
                  <li key={navItem.route}>
                    <Link
                      href={navItem.route}
                      onClick={() => setMobileOpen(false)}
                      className={`${
                        isActive
                          ? "text-primary"
                          : "text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                      } relative block rounded-full px-4 py-2 text-sm font-medium transition md:px-3`}
                    >
                      <span className="relative z-10">{navItem.label}</span>
                      {isActive && (
                        <span className="absolute inset-x-2 bottom-1 h-0.5 rounded-full bg-primary" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-3 md:order-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-slate-200 px-3 text-sm text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-primary dark:border-neutral-700 dark:text-slate-200 dark:hover:bg-neutral-800"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? (
              <>
                <FiSun className="h-4 w-4" aria-hidden="true" />
                <span>Light</span>
              </>
            ) : (
              <>
                <FiMoon className="h-4 w-4" aria-hidden="true" />
                <span>Dark</span>
              </>
            )}
          </button>

          <Link
            href={CART_ROUTE}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 transition hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-neutral-700 dark:bg-neutral-800 dark:text-slate-200"
            aria-label="View shopping cart"
          >
            <FiShoppingCart className="h-5 w-5" />
          </Link>

          {user?.role === "merchant" && (
            <Link
              href="/private/product-management"
              className="hidden rounded-full border border-primary px-3 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10 sm:inline-flex"
            >
              Manage store
            </Link>
          )}

          {user?.role === "merchant" && (
            <Link
              href="/private/orders"
              className="hidden rounded-full border border-primary px-3 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10 sm:inline-flex"
            >
              Orders
            </Link>
          )}

          {isAuth ? (
            <button
              type="button"
              onClick={() => {
                logoutUser();
                router.push(HOME_ROUTE);
              }}
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Log out
            </button>
          ) : (
            <Link
              href={LOGIN_ROUTE}
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Sign In
            </Link>
          )}

          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-primary dark:border-neutral-700 dark:text-slate-200 dark:hover:bg-neutral-800 md:hidden"
            aria-controls="navbar-user"
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
          >
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth={2}
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
