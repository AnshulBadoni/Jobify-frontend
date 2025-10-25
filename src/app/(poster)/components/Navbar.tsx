"use client";
import { Menu, Bell, User, Settings, Search, Home, LogOut, Building2, Activity, MessageCircle, BriefcaseBusinessIcon, Moon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { redirect } from "next/navigation";
import { Logout } from "@/app/api/auth";

export default function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const logout = async () => {
        const resp = await Logout();
        if (resp.status === 200) {
            redirect("/signin");
        }
    }

    const navLinks = [
        { name: "Dashboard", href: "dashboard", icon: <Home size={24} /> },
        { name: "Jobs", href: "jobs", icon: <BriefcaseBusinessIcon size={24} /> },
        { name: "Messages", href: "chat", icon: <MessageCircle size={24} /> },
        { name: "Activity", href: "activity", icon: <Activity size={24} /> },
    ];

    return (
        <>
            {/* Desktop Navbar */}
            <nav className="sticky top-0 z-50 lg:block hidden bg-white dark:bg-neutral-900 rounded-2xl mx-2 mt-2 shadow-sm">
                <div className="mx-auto px-6 py-3 flex items-center justify-between">
                    {/* Left: Logo */}
                    <div className="flex items-center">
                        <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            <span className="text-indigo-600 dark:text-indigo-400">Jobly</span>
                        </h1>
                    </div>

                    {/* Center: Navigation Links (desktop only) */}
                    <div className="hidden md:flex items-center gap-8 font-medium text-gray-700 dark:text-gray-300">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="cursor-pointer relative px-2 py-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right: Notifications + Profile */}
                    <div className="flex items-center gap-4 relative">
                        {/* Dark Mode Toggle */}
                        <button
                            className="flex items-center gap-2 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
                        >
                            <Moon onClick={() => document.documentElement.classList.toggle("dark")} size={20} className="text-gray-700 dark:text-gray-300" />
                        </button>
                        {/* Notifications */}
                        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition relative">
                            <Bell className="text-gray-600 dark:text-gray-300" size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button
                                className="flex items-center gap-2 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <img
                                    src="https://i.pravatar.cc/300"
                                    alt="User"
                                    className="w-9 h-9 rounded-full object-cover border border-gray-300 dark:border-neutral-700"
                                />
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-900 rounded-xl shadow-md border border-gray-200 dark:border-neutral-800 overflow-hidden z-50">
                                    {[
                                        { icon: <User size={16} />, label: "Profile", href: "/profile" },
                                        { icon: <Settings size={16} />, label: "Settings", href: "/settings" },
                                    ].map((item) => (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-neutral-800 transition text-gray-700 dark:text-gray-300"
                                        >
                                            {item.icon} {item.label}
                                        </Link>
                                    ))}
                                    <button
                                        onClick={logout}
                                        className="flex w-full items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-neutral-800 transition text-gray-700 dark:text-gray-300"
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Bottom Navbar */}
            <div className="fixed -bottom-1 py-3 left-0 w-full bg-white dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-800 shadow-md md:hidden z-50">
                <div className="flex justify-around items-center py-3">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                        >
                            {link.icon}
                            {/* <span className="text-xs">{link.name}</span> */}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
