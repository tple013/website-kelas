"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
  mounted: false,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  // Pastikan dark class dihapus saat initial render (sebelum hydration)
  useEffect(() => {
    // Hapus dark class dulu untuk mencegah flash
    document.documentElement.classList.remove("dark");
    
    setMounted(true);
    
    try {
      const savedTheme = localStorage.getItem("theme") as Theme | null;
      
      // Hanya set dark jika EKSPLISIT tersimpan "dark"
      if (savedTheme === "dark") {
        setTheme("dark");
        document.documentElement.classList.add("dark");
      } else {
        // Default SELALU light
        setTheme("light");
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    } catch {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // localStorage not available
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}