"use client";
import Link from "next/link";

export default function Custom404() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 via-white to-gray-100 px-6">
            <div className="max-w-4xl text-center">
                {/* Floating Background Accent */}
                <div className="absolute inset-0 flex justify-center -z-10">
                    <div className="w-[40rem] h-[40rem] bg-purple-200 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
                </div>

                {/* 404 Illustration */}
                <div className="inline-block mb-8">
                    <svg
                        className="w-48 h-48 mx-auto text-purple-600"
                        fill="none"
                        viewBox="0 0 256 256"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="128" cy="128" r="128" fill="currentColor" fillOpacity="0.1" />
                        <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="central"
                            className="text-6xl font-bold fill-current text-purple-600"
                        >
                            404
                        </text>
                    </svg>
                </div>

                {/* Title & Subtitle */}
                <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
                    Page Not Found
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                    Oops! The page you are looking for doesn’t exist or has been moved.
                </p>

                {/* CTA Buttons */}
                <div className="flex justify-center gap-4 flex-wrap">
                    <Link
                        href="/"
                        className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg shadow-lg hover:bg-purple-700 transition-colors duration-300"
                    >
                        Go to Home
                    </Link>
                    <Link
                        href="/contact"
                        className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-50 transition-colors duration-300"
                    >
                        Contact Support
                    </Link>
                </div>

                {/* Optional Subtle Footer */}
                <p className="mt-12 text-sm text-gray-400">
                    © {new Date().getFullYear()} Your Company. All rights reserved.
                </p>
            </div>
        </div>
    );
}
