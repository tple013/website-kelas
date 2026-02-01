"use client";

import { useTheme } from "@/shared/context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200"
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      title={theme === "light" ? "Mode Gelap" : "Mode Terang"}
    >
      {/* Sun icon */}
      <i
        className={`bi bi-sun-fill text-lg text-yellow-500 transition-all duration-300 ${
          theme === "light" ? "opacity-100 rotate-0" : "opacity-0 rotate-90 absolute"
        }`}
      />
      {/* Moon icon */}
      <i
        className={`bi bi-moon-stars-fill text-lg text-blue-300 transition-all duration-300 ${
          theme === "dark" ? "opacity-100 rotate-0" : "opacity-0 -rotate-90 absolute"
        }`}
      />
    </button>
  );
}
