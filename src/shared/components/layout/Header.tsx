"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ThemeToggle } from '@/shared/components/ui';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll untuk background transparent
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: "Beranda", href: "/" },
    { label: "Anggota", href: "/members" },
    { label: "Proyek", href: "/projects" },
    { label: "Jadwal", href: "/schedule" },
    { label: "Tentang", href: "/about" },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-sm' 
        : 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 shadow-sm'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* LOGO */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-all duration-300">
              <i className="bi bi-code-slash text-white text-xl"></i>
            </div>
           <Link
  href="/"
  className="text-xl font-bold tracking-wider bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent hover:font-extrabold dark:from-blue-500 dark:to-sky-300"
 >TPLE<span className="font-extrabold">013</span>
</Link>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 tracking-wide relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            
            <div className="pl-6 border-l border-slate-300 dark:border-slate-600 flex items-center gap-3">
              <ThemeToggle />
              <Link href="/admin" className="text-sm font-semibold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50 hover:bg-blue-100 dark:hover:bg-blue-900 px-4 py-2.5 rounded-full transition-all flex items-center gap-2">
                <i className="bi bi-shield-lock"></i>
                Admin
              </Link>
              <a href="https://github.com/tple013" target="_blank" className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-full transition-all shadow-lg shadow-blue-600/20">
                GitHub
              </a>
            </div>
          </div>

          {/* MOBILE TOGGLE */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-700 dark:text-slate-300 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              <i className={`bi ${isMenuOpen ? 'bi-x-lg' : 'bi-list'} text-2xl`}></i>
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-full bg-blue-800 border-b border-blue-700 shadow-xl animate-fade-in px-4 pb-6">
            <div className="flex flex-col space-y-2 mt-4">
              {menuItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className="block px-4 py-3 rounded-lg text-base font-medium text-blue-100 hover:text-white hover:bg-blue-700 transition-all border-l-4 border-transparent hover:border-sky-300" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-blue-700 space-y-3">
                <Link 
                  href="/admin" 
                  className="flex items-center justify-center gap-2 w-full bg-white text-blue-700 font-medium py-3 rounded-lg hover:bg-blue-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className="bi bi-shield-lock"></i>
                  Admin Panel
                </Link>
                <a href="https://github.com/tple013" className="block w-full text-center bg-blue-700 text-white font-medium py-3 rounded-lg hover:bg-blue-600 transition-colors">
                  Kunjungi GitHub
                
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
