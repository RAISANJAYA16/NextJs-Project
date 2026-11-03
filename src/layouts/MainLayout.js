"use client";
import { useEffect } from "react";
import usePreferenceStore from "@/stores/peferencesStore";

const MainLayout = ({ children }) => {
  const theme = usePreferenceStore((state) => state.theme);

  useEffect(() => {
    usePreferenceStore.persist.rehydrate();
  }, []);

  return (
    <div
      className={`${theme} min-h-full bg-white text-slate-900 dark:bg-neutral-950 dark:text-slate-100`}
    >
      {children}
    </div>
  );
};

export default MainLayout;
