"use client";

import usePreferenceStore from "@/stores/peferencesStore";
import { FaSun } from "react-icons/fa";

const ThemeSwitcher = () => {
  const toggleTheme = usePreferenceStore((state) => state.toggleTheme);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <FaSun aria-hidden="true" />
    </button>
  );
};

export default ThemeSwitcher;
