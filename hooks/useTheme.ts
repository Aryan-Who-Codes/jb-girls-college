"use client";

import { useState, useEffect } from "react";
import { Theme, themes } from "@/types/theme";
import { usePathname } from "next/navigation";

export function useTheme() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<Theme>(() => {
    // Initialize from localStorage during first render
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme") as Theme;
      return saved && Object.keys(themes).includes(saved) ? saved : "light";
    }
    return "light";
  });

  const currentTheme = themes[theme];

  useEffect(() => {
    try {
      localStorage.setItem("theme", theme);

      // Don't apply theme to form pages
      const isFormPage =
        pathname?.includes("/students") || pathname?.includes("/edit");

      if (!isFormPage) {
        // Apply theme classes to document root only for non-form pages
        document.documentElement.className = currentTheme.background;
      } else {
        // For form pages, ensure we use a neutral background
        document.documentElement.className = "bg-white";
      }
    } catch (error) {
      console.error("Failed to persist theme:", error);
    }
  }, [theme, currentTheme, pathname]);

  const toggleTheme = () => {
    const themeKeys = Object.keys(themes) as Theme[];
    const currentIndex = themeKeys.indexOf(theme);
    const nextTheme = themeKeys[(currentIndex + 1) % themeKeys.length];
    setTheme(nextTheme);
  };

  return { theme, currentTheme, setTheme, toggleTheme };
}
