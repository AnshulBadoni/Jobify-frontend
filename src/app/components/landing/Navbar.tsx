"use client"
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 10C10 12.7614 7.76142 15 5 15C2.23858 15 0 12.7614 0 10C0 7.23858 2.23858 5 5 5C7.76142 5 10 7.23858 10 10Z" stroke="black" strokeWidth="2" />
              <path d="M25 10C25 12.7614 22.7614 15 20 15C17.2386 15 15 12.7614 15 10C15 7.23858 17.2386 5 20 5C22.7614 5 25 7.23858 25 10Z" stroke="black" strokeWidth="2" />
              <path d="M40 10C40 12.7614 37.7614 15 35 15C32.2386 15 30 12.7614 30 10C30 7.23858 32.2386 5 35 5C37.7614 5 40 7.23858 40 10Z" stroke="black" strokeWidth="2" />
            </svg>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-10">
              <a href="#joboffers" className="text-dark hover:text-primary text-sm font-medium transition-colors">Find a Job</a>
              <a href="#companies" className="text-dark hover:text-primary text-sm font-medium transition-colors">Companies</a>
              <a href="#whyus" className="text-dark hover:text-primary text-sm font-medium transition-colors">Why Connect?</a>
              <a href="#contact" className="text-dark hover:text-primary text-sm font-medium transition-colors">Contact</a>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button className="bg-primary hover:bg-violet-700 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-glow text-sm">
              Join with Us!
            </button>
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
            <div className="mt-4 pt-4 border-t border-gray-100">
              <button className="bg-primary text-white w-full py-3 rounded-full font-medium">Join with Us!</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;