"use client";

export default function Navbar() {

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-5">

      <div className="max-w-7xl mx-auto flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-8 py-4">


        {/* Logo */}

        <a href="/" className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-2xl shadow-lg">
            O
          </div>


          <h1 className="text-2xl font-bold text-white">
            Opti<span className="text-blue-500">webx</span>
          </h1>

        </a>




        {/* Menu */}

        <div className="hidden md:flex gap-8 text-gray-300">


          <a href="/" className="hover:text-white transition">
            Home
          </a>


          <a href="/services" className="hover:text-white transition">
            Services
          </a>


          <a href="/projects" className="hover:text-white transition">
            Projects
          </a>


          <a href="/pricing" className="hover:text-white transition">
            Pricing
          </a>


          <a href="/contact" className="hover:text-white transition">
            Contact
          </a>


        </div>




        {/* Button */}

        <a
          href="/contact"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition shadow-lg text-white"
        >
          Get Started
        </a>


      </div>


    </nav>
  );
}