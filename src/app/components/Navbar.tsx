"use client";
import {
    Bell,
    User,
    Settings,
    Home,
    LogOut,
    MessageCircle,
    Activity,
    BriefcaseBusiness,
    Moon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Logout } from "../api/auth";

export default function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const logout = async () => {
        const resp = await Logout();
        if (resp.status === 200) {
            router.push("/signin");
        }
    };

    const navLinks = [
        { name: "Dashboard", href: "/dashboard", icon: Home },
        { name: "Jobs", href: "/jobs", icon: BriefcaseBusiness },
        { name: "Messages", href: "/chat", icon: MessageCircle },
        { name: "Activity", href: "/activity", icon: Activity },
    ];

    return (
        <>
            {/* Desktop Navbar */}
            <nav className="sticky top-0 z-50 hidden lg:block bg-white dark:bg-neutral-900 rounded-2xl mx-2 mt-2 shadow-sm border border-gray-200 dark:border-neutral-800">
                <div className="mx-auto px-6 py-3 flex items-center justify-between">
                    {/* Left: Logo */}
                    <div className="flex items-center">
                        <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            <span className="text-indigo-600 dark:text-indigo-400">Jobly</span>
                        </h1>
                    </div>

                    {/* Center: Navigation Links */}
                    <div className="hidden md:flex items-center gap-6 font-medium text-gray-700 dark:text-gray-300">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            const Icon = link.icon;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-md transition ${isActive
                                        ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400 font-semibold"
                                        : "hover:text-indigo-600 dark:hover:text-indigo-400"
                                        }`}
                                >
                                    <Icon size={20} />
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right: Notifications + Profile */}
                    <div className="flex items-center gap-4 relative">
                        {/* dark mode icon */}
                        <button
                            className="flex items-center gap-2 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
                        >
                            <Moon onClick={() => document.documentElement.classList.toggle("dark")} size={20} className="text-gray-700 dark:text-gray-300" />
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
                                        { icon: User, label: "Profile", href: "/profile/1" },
                                        { icon: Settings, label: "Settings", href: "/settings" },
                                    ].map((item) => {
                                        const ItemIcon = item.icon;
                                        return (
                                            <Link
                                                key={item.label}
                                                href={item.href}
                                                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-neutral-800 transition text-gray-700 dark:text-gray-300"
                                            >
                                                <ItemIcon size={16} /> {item.label}
                                            </Link>
                                        );
                                    })}
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
            <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-800 shadow-md md:hidden z-50">
                <div className="flex justify-around items-center py-2">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`flex flex-col items-center text-xs ${isActive
                                    ? "text-indigo-600 dark:text-indigo-400"
                                    : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                                    }`}
                            >
                                <Icon size={22} />
                                <span className="mt-1">{link.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
