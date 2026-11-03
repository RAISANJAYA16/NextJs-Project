import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const usePreferenceStore = create(
  devtools(
    persist(
      (set) => ({
        theme: "dark",
        toggleTheme: () =>
          set((state) => ({
            theme: state.theme === "light" ? "dark" : "light",
          })),
      }),
      {
        name: "zustand:preferences-storage",
        skipHydration: true,
        version: 3,
        migrate: (persistedState) => ({
          theme: persistedState?.theme === "light" ? "light" : "dark",
        }),
        partialize: ({ theme }) => ({ theme }),
      },
    ),
    {
      name: "Electro Shop Preferences",
    },
  ),
);

export default usePreferenceStore;
