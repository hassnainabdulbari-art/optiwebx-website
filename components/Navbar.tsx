"use client";


import Image from "next/image";


import { useState } from "react";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 px-4 sm:px-6 py-3 sm:py-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 sm:px-8 py-3 sm:py-4">
        
        {/* Logo */}
        
        <a href="/" className="flex items-center">
  <a href="/" className="flex items-center">
  <Image
    src="/logo.png"
    alt="OptiWebx"
    width={280}
    height={80}
    priority
    className="h-16 w-auto object-contain"
  />
</a>
</a>
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 lg:gap-8 text-gray-300">
          <a href="/" className="hover:text-white transition">Home</a>
          <a href="/services" className="hover:text-white transition">Services</a>
          <a href="/projects" className="hover:text-white transition">Projects</a>
          <a href="/pricing" className="hover:text-white transition">Pricing</a>
          <a href="/contact" className="hover:text-white transition">Contact</a>
        </div>

        {/* Desktop Button */}
        <a
          href="/contact"
          className="hidden md:block px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition shadow-lg text-white text-sm sm:text-base"
        >
          Get Started
        </a>

        {/* Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/5 transition"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 right-0 mt-2 mx-4 rounded-2xl border border-white/10 bg-black/95 backdrop-blur-xl overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="flex flex-col p-4 space-y-3 text-gray-300">
            <a href="/" className="hover:text-white transition py-2 px-3 rounded-lg hover:bg-white/5">Home</a>
            <a href="/services" className="hover:text-white transition py-2 px-3 rounded-lg hover:bg-white/5">Services</a>
            <a href="/projects" className="hover:text-white transition py-2 px-3 rounded-lg hover:bg-white/5">Projects</a>
            <a href="/pricing" className="hover:text-white transition py-2 px-3 rounded-lg hover:bg-white/5">Pricing</a>
            <a href="/contact" className="hover:text-white transition py-2 px-3 rounded-lg hover:bg-white/5">Contact</a>
            <a
              href="/contact"
              className="text-center py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition text-white font-semibold"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}