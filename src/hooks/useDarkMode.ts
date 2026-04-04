import { useEffect } from "react";

export function useDarkMode() {
  // Force dark mode globally
  useEffect(() => {
    document.documentElement.classList.add("dark");
    localStorage.setItem("noteman-theme", "dark");
  }, []);

  return { isDark: true, toggle: () => {} };
}

