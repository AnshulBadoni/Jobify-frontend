import React from "react";

interface HeaderProps {
    heading: string;
    subHeading: string;
}

const Header = ({ heading, subHeading }: HeaderProps) => {
    // Get current date for a professional touch
    const currentDate = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    return (
        <header className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl p-6 md:p-6 shadow-sm">
            <div className="flex flex-col gap-3">

                {/* Date Pill */}
                <div className="w-fit">
                    <span className="inline-flex items-center gap-1.5 p-1 rounded-lg bg-gray-50 dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        {currentDate}
                    </span>
                </div>

                {/* Main Text */}
                <div className="space-y-1">
                    <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        {heading}
                    </h1>
                    <p className="text-sm md:text-lg text-gray-500 dark:text-gray-400 font-medium">
                        {subHeading}
                    </p>
                </div>
            </div>
        </header>
    );
};

export default Header;