"use client"
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="inline-flex items-baseline gap-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            <span className="text-2xl font-bold text-gray-900">Dev</span>
            <span className="text-2xl font-bold text-violet-600">mind</span>
            <div className="w-1.5 h-1.5 bg-violet-600 rounded-full mb-1.5"></div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-10">
              <a href="#joboffers" className="text-dark hover:text-primary text-sm font-medium transition-colors">Find a Job</a>
              <a href="#companies" className="text-dark hover:text-primary text-sm font-medium transition-colors">Companies</a>
              <a href="#whyus" className="text-dark hover:text-primary text-sm font-medium transition-colors">Why Connect?</a>
              <a href="#contact" className="text-dark hover:text-primary text-sm font-medium transition-colors">Contact</a>
            </div>
          </div>

          {/* Auth Buttons - Right side */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/signin" className="text-dark hover:text-violet-600 hover:border-violet-600 border border-gray-400 px-6 py-2 rounded-full font-medium transition-all text-sm">
              SignIn
            </Link>
            <Link href="/register" className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-full font-medium transition-all shadow-glow text-sm">
              SignUp
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-dark hover:text-primary focus:outline-none"
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <a href="#" className="text-dark block px-3 py-2 rounded-md text-base font-medium">Find a Job</a>
            <a href="#" className="text-dark block px-3 py-2 rounded-md text-base font-medium">Companies</a>
            <a href="#" className="text-dark block px-3 py-2 rounded-md text-base font-medium">Why Connect?</a>
            <a href="#" className="text-dark block px-3 py-2 rounded-md text-base font-medium">Contact</a>
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
             <Link href="/signin" className="text-dark hover:text-violet-600 hover:border-violet-600 border border-gray-400 px-6 py-2 rounded-full font-medium transition-all text-sm">
              SignIn
            </Link>
              <button className="bg-primary text-white w-full py-2 rounded-full font-medium text-sm">
                Register
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;