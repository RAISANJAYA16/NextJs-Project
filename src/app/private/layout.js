"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LOGIN_ROUTE } from "../constants/routes";
import useAuthStore from "@/stores/authStores";

export default function PrivateLayout({ children }) {
  const isAuth = useAuthStore((state) => state.isAuth);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const router = useRouter();

  useEffect(() => {
    if (hasHydrated && !isAuth) {
      router.replace(LOGIN_ROUTE);
    }
  }, [hasHydrated, isAuth, router]);

  if (!hasHydrated || !isAuth) return null;

  return <>{children}</>;
}
