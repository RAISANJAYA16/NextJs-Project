"use client";

import { useEffect } from "react";
import useAuthStore from "@/stores/authStores";

export default function AuthStoreHydration() {
  const setHasHydrated = useAuthStore((state) => state.setHasHydrated);

  useEffect(() => {
    const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
      setHasHydrated(true);
    });

    useAuthStore.persist.rehydrate();

    return unsubscribe;
  }, [setHasHydrated]);

  return null;
}
