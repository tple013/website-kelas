"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Beranda", href: "/" },
    { label: "Anggota", href: "/members" },
    { label: "Proyek", href: "/projects" },
    { label: "Jadwal", href: "/schedule" },
    { label: "Tentang", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-grey-800/95 backdrop-blur-md border-b border-blue-700 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* LOGO */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-black transition-all duration-300">
              <i className="bi bi-code-slash text-white text-xl"></i>
            </div>
            <Link href="/" className="text-xl font-bold text-blue tracking-wider hover: text-stone-700 transition-colors">
              TPLE<span className="text-blue-500">013</span>
            </Link>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className="text-sm font-medium text-blue-100 hover:text-white transition-colors duration-200 tracking-wide relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-300 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            
            <div className="pl-6 border-l border-blue-600/50">
              <a href="https://github.com/tple013" target="_blank" className="text-sm font-semibold text-white bg-blue-700 hover:bg-blue-600 px-5 py-2.5 rounded-full transition-all shadow-lg shadow-blue-900/20">
                GitHub
              </a>
            </div>
          </div>

          {/* MOBILE TOGGLE */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-blue-100 hover:text-white hover:bg-blue-700 p-2 rounded-md transition-colors"
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
              <div className="pt-4 mt-2 border-t border-blue-700">
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