"use client";

import usePreferenceStore from "@/stores/peferencesStore";
import { GiButtonFinger } from "react-icons/gi";

const ThemeSwitcher = () => {
    const {toggleTheme}= usePreferenceStore.getState();
  return (

    <button
       onClick={toogleTheme}>
    <FaSun/>
       </button>

  )
}

export default ThemeSwitcher
