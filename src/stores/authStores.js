import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const useAuthStore = create(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        isAuth: false,
        hasHydrated: false,
        setHasHydrated: (hasHydrated) =>
          set({ hasHydrated }, false, "auth/hydration"),
        loginUser: ({ user, token }) =>
          set({ user, token, isAuth: true }, false, "auth/login"),
        registerUser: ({ user, token }) =>
          set({ user, token, isAuth: true }, false, "auth/register"),
        logoutUser: () =>
          set({ user: null, token: null, isAuth: false }, false, "auth/logout"),
      }),
      {
        name: "zustand:auth-storage",
        skipHydration: true,
        version: 2,
        migrate: () => ({ user: null, token: null, isAuth: false }),
        partialize: ({ user, token, isAuth }) => ({ user, token, isAuth }),
      },
    ),
    {
      name: "Electro Shop Auth",
    },
  ),
);

export default useAuthStore;
