"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { HOME_ROUTE, LOGIN_ROUTE } from "@/app/constants/routes";
import useAuthStore from "@/stores/authStores";

export default function MerchantLayout({ children }) {
  const router = useRouter();
  const isAuth = useAuthStore((state) => state.isAuth);
  const role = useAuthStore((state) => state.user?.role);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  useEffect(() => {
    if (!hasHydrated) return;
    if (!isAuth) {
      router.replace(LOGIN_ROUTE);
    } else if (role !== "merchant") {
      router.replace(HOME_ROUTE);
    }
  }, [hasHydrated, isAuth, role, router]);

  if (!hasHydrated || !isAuth || role !== "merchant") return null;

  return children;
}
