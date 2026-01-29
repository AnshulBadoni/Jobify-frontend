"use client"
import React, { useState, useRef, useEffect } from 'react';
import {
    Search,
    Bell,
    X,
    Moon,
    Sun
} from 'lucide-react';
import { NAV_ITEMS, CURRENT_USER } from '../constant';
import Logo from './Logo';
import { ProfileDropdown } from './ProfileDropdown';
import { SearchModal } from './SearchModal';
import Link from 'next/link';

export const Navbar: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('dashboard');
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
    const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    const profileRef = useRef<HTMLDivElement>(null);
    const mobileProfileRef = useRef<HTMLDivElement>(null);

    // Handle Command+K to toggle search
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen((prev) => !prev);
            }
            if (e.key === 'Escape') {
                if (isSearchOpen) setIsSearchOpen(false);
                if (isProfileOpen) setIsProfileOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isSearchOpen, isProfileOpen]);

    // Handle click outside for profile dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
            // Also check mobile profile ref
            if (mobileProfileRef.current && !mobileProfileRef.current.contains(event.target as Node)) {
                // We only close if it's open, to avoid conflicting with the toggle
                if (isProfileOpen) setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isProfileOpen]);

    // Handle Dark Mode Toggle
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleSearch = () => setIsSearchOpen(true);
    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    return (
        <>
            {/* =====================================================================================
          DESKTOP NAVBAR 
          Hidden on mobile (md:hidden), visible on md+ 
      ====================================================================================== */}
            <nav className="hidden md:flex sticky top-0 z-50 bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800 h-16 pr-8 items-center justify-between shadow-sm dark:shadow-neutral-900/20 transition-all duration-300 mx-2 mt-2 rounded-xl">

                {/* LEFT SECTION: Logo */}
                <div className="flex items-center gap-4 h-full z-20">
                    <Logo page="/dashboard" />
                </div>

                {/* CENTER SECTION: Desktop Navigation */}
                <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                    <div className="flex items-center gap-1 lg:gap-2 pointer-events-auto bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm p-1 rounded-xl">
                        {NAV_ITEMS.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    href={item.href}
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${activeTab === item.id
                                            ? 'bg-blue-600 text-white'
                                            : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                                        }
                  `}
                                >
                                    <Icon size={18} className={activeTab === item.id ? 'text-white' : 'text-neutral-400 dark:text-neutral-500'} />
                                    <span className="hidden lg:inline">{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* RIGHT SECTION: Actions & Profile */}
                <div className="flex items-center gap-3 md:gap-5 z-20 bg-white dark:bg-neutral-900 pl-4 transition-colors">
                    {/* Utility Icons */}
                    <div className="flex items-center gap-1 md:gap-2 border-r border-neutral-200 dark:border-neutral-800 pr-4 md:pr-6 h-8">
                        <button
                            onClick={toggleSearch}
                            className="group flex items-center gap-2 w-36 px-3 py-1.5 rounded-lg text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-200 transition-all border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700"
                            aria-label="Open Search"
                        >
                            <Search size={18} />
                            <span className="hidden md:flex ml-auto text-xs font-medium opacity-60 group-hover:opacity-100">Cmd+K</span>
                        </button>

                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors duration-200"
                            aria-label="Toggle Dark Mode"
                        >
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <button className="relative p-2 rounded-full text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors duration-200">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-neutral-900"></span>
                        </button>
                    </div>

                    {/* User Profile */}
                    <div className="flex items-center gap-3 pl-1" ref={profileRef}>
                        <div className="relative">
                            <div
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className={`relative cursor-pointer group rounded-full transition-all ${isProfileOpen ? 'ring-4 ring-blue-50 dark:ring-blue-900/20' : ''}`}
                            >
                                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden ring-2 ring-white dark:ring-neutral-800 shadow-sm group-hover:ring-blue-100 dark:group-hover:ring-neutral-700 transition-all">
                                    <img
                                        src={CURRENT_USER.avatarUrl}
                                        alt={CURRENT_USER.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white dark:ring-neutral-900 bg-emerald-500"></span>
                            </div>
                            <ProfileDropdown user={CURRENT_USER} isOpen={isProfileOpen} direction="down" />
                        </div>
                    </div>
                </div>
            </nav>

            {/* =====================================================================================
          MOBILE BOTTOM NAVIGATION (md:hidden)
          Contains: [Search] | [Nav Items] | [Profile]
          Optimized for compact screens (<375px)
      ====================================================================================== */}
            <div className="md:hidden fixed bottom-0 z-50 w-full">
                <div className="flex p-2 items-center justify-between gap-1 bg-neutral-900/90 dark:bg-neutral-800/90 backdrop-blur-xl border border-white/5 dark:border-white/10 rounded-t-xl rounded-b-3xl shadow-2xl shadow-black/20 ring-1 ring-black/5">

                    {/* 1. Search Trigger (Fixed Size) */}
                    <button
                        onClick={toggleSearch}
                        className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-all"
                        aria-label="Search"
                    >
                        <Search size={18} />
                    </button>

                    {/* 2. Main Navigation Items (Flexible/Scrollable if needed) */}
                    {/* Using a scrolling container to ensure it never breaks layout, but sized to fit 5 items comfortably */}
                    <div className="flex-1 flex items-center justify-center gap-1 overflow-x-auto no-scrollbar scroll-smooth">
                        {NAV_ITEMS.map((item) => {
                            const isActive = activeTab === item.id;
                            const Icon = item.icon;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`
                    relative flex items-center justify-center rounded-full transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] overflow-hidden flex-shrink-0
                    ${isActive
                                            ? 'bg-white/10 text-white px-3 py-2'
                                            : 'text-neutral-400 hover:text-white w-9 h-9'
                                        }
                  `}
                                    aria-label={item.label}
                                >
                                    <Icon
                                        size={18}
                                        strokeWidth={isActive ? 2.5 : 2}
                                        className={`flex-shrink-0 transition-colors duration-300 ${isActive ? 'text-blue-400' : ''}`}
                                    />

                                    {/* Text only visible on active state */}
                                    <span
                                        className={`
                      whitespace-nowrap text-xs font-semibold ml-1.5
                      transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]
                      ${isActive ? 'max-w-[100px] opacity-100' : 'max-w-0 opacity-0 hidden'}
                    `}
                                    >
                                        {item.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* 3. Profile Trigger (Fixed Size) */}
                    <div className="relative flex-shrink-0" ref={mobileProfileRef}>
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className={`w-9 h-9 rounded-full overflow-hidden ring-2 transition-all ${isProfileOpen ? 'ring-blue-400 opacity-100' : 'ring-transparent opacity-80 hover:opacity-100'}`}
                        >
                            <img src={CURRENT_USER.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                        </button>
                        <ProfileDropdown user={CURRENT_USER} isOpen={isProfileOpen} direction="up" />
                    </div>

                </div>
            </div>

            {/* Render Search Modal */}
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
};  