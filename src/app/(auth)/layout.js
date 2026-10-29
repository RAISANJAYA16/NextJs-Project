'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import useAuthStore from '@/stores/authStores';
import { HOME_ROUTE } from '@/app/constants/routes';

function AuthLayout({ children }) {
  const router = useRouter();
  const isAuth = useAuthStore((state) => state.isAuth);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  useEffect(() => {
    if (hasHydrated && isAuth) {
      router.replace(HOME_ROUTE);
    }
  }, [hasHydrated, isAuth, router]);

  if (!hasHydrated || isAuth) return null;

  return (
    <main className="mx-auto grid min-h-screen w-full max-w-7xl items-center gap-8 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
      <section className="flex min-w-0 items-center justify-start">
        {children}
      </section>
      <div className="relative mx-auto aspect-[4/3] w-full max-w-xl">
        <Image
          src="https://readymadeui.com/images/integration-illus.webp"
          fill
          sizes="(max-width: 1024px) 90vw, 45vw"
          className="h-auto w-full object-contain"
          alt="Illustration of people working together"
        />
      </div>
    </main>
  );
}

export default AuthLayout;
