import { useState, useEffect } from "react";

export function useDarkMode() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const stored = localStorage.getItem("noteman-theme");
    // If user has never toggled, default to dark
    if (!stored) return true;
    return stored === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("noteman-theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("noteman-theme", "light");
    }
  }, [isDark]);

  const toggle = () => setIsDark((prev) => !prev);

  return { isDark, toggle };
}
