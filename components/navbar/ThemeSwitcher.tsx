"use client";

import { useEffect, useState } from "react";

import { useTheme } from "next-themes";

import MoonIcon from "./MoonIcon";
import SunIcon from "./SunIcon";

function ThemeSwitcher() {
  const { setTheme } = useTheme();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setChecked(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  const handleCheck = () => {
    setChecked((prev) => !prev);
  };

  useEffect(() => {
    if (checked) {
      setTheme("coffee");
    } else {
      setTheme("retro");
    }
  }, [checked]);

  return (
    <label htmlFor="theme-switcher" className="swap swap-rotate h-10 w-10">
      <input
        type="checkbox"
        id="theme-switcher"
        checked={checked}
        onChange={handleCheck}
      />
      <SunIcon />
      <MoonIcon />
    </label>
  );
}

export default ThemeSwitcher;
