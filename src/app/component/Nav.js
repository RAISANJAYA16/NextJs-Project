"use client"
import Link from "next/link";
import navMenu from "../constants/navMenu";
import Logo from "./Logo";
import { usePathname, useRouter } from "next/navigation";
import { LOGIN_ROUTE } from "@/app/constants/routes";
import { HOME_ROUTE } from "@/app/constants/routes";
import useAuthStore from "@/stores/authStores";
function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const isAuth = useAuthStore((state) => state.isAuth);
  const logoutUser = useAuthStore((state) => state.logoutUser);

  return (
    <nav className="sticky w-full z-20 top-0 inset-s-0 bg-white">
      <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
      <Logo />


      <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="flex text-sm bg-neutral-primary rounded-full md:me-0 focus:ring-4 focus:ring-neutral-tertiary"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom" >
          </button>

          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
                    <svg
              className="w-6 h-6"
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

      {isAuth ?(<button type="button" onClick={() => { logoutUser(); router.push(HOME_ROUTE); }} className="rounded bg-primary text-white  md:me-0 gap-2  ">
            Log out
          </button>

      ):( <Link href={LOGIN_ROUTE} className="rounded bg-primary text-white  md:me-0 gap-2  ">
            Sign In
          </Link>
      ) }
        </div>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
            {navMenu.map((navItem) => {
              const isActive = navItem.route === pathname;

              return (
                <li key={navItem.route}>
                  <Link
                    href={navItem.route}
                    className={`${isActive ? "text-primary" : "text-heading"} block py-2 px-3 rounded hover:underline md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent`}
                  >
                    {navItem.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
