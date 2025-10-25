'use client'
import Link from "next/link";
import React, { useState } from "react";

const Navbar = ({ page }: { page: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="flex justify-between items-center px-6 md:px-12 py-6 text-sm relative z-50">
            {/* Logo */}
            <div className="flex items-center gap-3 text-gray-800 font-bold">
                <div className="w-6 h-10 bg-black rounded-r-full" />
                <span>{page === "signin" ? "/signin@dev.mind" : "/register@dev.mind"}</span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
                <Link href="/landing" className="text-gray-700 font-semibold hover:text-gray-900 transition">
                    About Us
                </Link>
                {/* <a href="#" className="text-gray-700 font-semibold hover:text-gray-900 transition">
                    Payment
                </a>
                <a href="#" className="text-gray-700 font-semibold hover:text-gray-900 transition">
                    Account
                </a> */}
            </nav>

            {/* Mobile Hamburger */}
            <div className="md:hidden">
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex flex-col justify-between w-6 h-5 focus:outline-none"
                >
                    <span className="block h-1 bg-gray-800" />
                    <span className="block h-1 bg-gray-800" />
                    <span className="block h-1 bg-gray-800" />
                </button>
            </div>

            {/* Fullscreen Mobile Menu with Slide Animation */}
            <div
                className={`fixed h-screen inset-0 bg-black bg-opacity-90 flex flex-col justify-center items-center text-white  transform transition-transform duration-500 ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Close Button */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-8 right-8 text-white text-3xl font-bold focus:outline-none"
                >
                    &times;
                </button>

                {/* Mobile Links */}
                <nav className="flex flex-col gap-8 text-2xl text-center">
                    {["About Us"].map((item, idx) => (
                        <Link
                            key={idx}
                            href="/landing"
                            onClick={() => setIsOpen(false)}
                            className={`hover:text-[#f8bda4] transition-all duration-500 transform ${isOpen ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                                } delay-[${idx * 100}ms]`}
                        >
                            {item}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
