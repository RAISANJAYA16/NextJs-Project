import Link from 'next/link'
import { FaFacebookF, FaGithub } from 'react-icons/fa'
import {
  CONTACT_ROUTE,
  HOME_ROUTE,
  PRODUCTS_ROUTE,
  PRIVACY_POLICY_ROUTE,
  TERMS_AND_CONDITIONS_ROUTE,
} from '../constants/routes'

function Footer() {
  return (
    <footer className="mt-auto border-t border-primary/20 bg-primary/40 text-[15px] text-base-content">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[minmax(12rem,1fr)_3fr]">
          <div>
            <Link href={HOME_ROUTE} className="text-xl font-bold hover:underline">
              Electro <span className="text-primary">Shop</span>
            </Link>
          </div>

          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <section>
              <h2 className="mb-4 text-sm font-semibold uppercase text-heading">Quick Links</h2>
              <ul className="space-y-3 text-body">
                <li><Link href={PRODUCTS_ROUTE} className="hover:underline">Products</Link></li>
                <li><Link href={CONTACT_ROUTE} className="hover:underline">Contact</Link></li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-semibold uppercase text-heading">Support</h2>
              <p className="mb-3 max-w-xs leading-6 text-body">Questions about a product or order?</p>
              <Link href={CONTACT_ROUTE} className="font-medium text-primary hover:underline">
                Contact us
              </Link>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-semibold uppercase text-heading">Follow us</h2>
              <ul className="space-y-3 text-body">
                <li>
                  <a
                    href="https://github.com/RAISANJAYA16"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:underline"
                  >
                    <FaGithub aria-hidden="true" />
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/NirmalaraiShivarai?rdid=BbHKkXIAUO606vLC&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1LpkBMz2sN%2F#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:underline"
                  >
                    <FaFacebookF aria-hidden="true" />
                    Facebook
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-semibold uppercase text-heading">Legal</h2>
              <ul className="space-y-3 text-body">
                <li><Link href={PRIVACY_POLICY_ROUTE} className="hover:underline">Privacy Policy</Link></li>
                <li><Link href={TERMS_AND_CONDITIONS_ROUTE} className="hover:underline">Terms &amp; Conditions</Link></li>
              </ul>
            </section>
          </nav>
        </div>

        <div className="mt-8 border-t border-primary/20 pt-5 text-sm text-body">
          <p>© {new Date().getFullYear()} <Link href={HOME_ROUTE} className="hover:underline">Electro Shop</Link>. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
