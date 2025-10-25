import React from "react";

interface HeaderProps {
    name: string;
    icon?: React.ReactNode;
    subtitle?: string;
}

const Header = ({ heading, subHeading }: { heading: string, subHeading: string }) => {
    return (
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-xl bg-white dark:bg-neutral-900 rounded-2xl p-8">
            <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                    {heading}
                </h1>
                <p className="text-sm lg:text-lg text-gray-600 dark:text-gray-400">
                    {subHeading}
                </p>
            </div>
        </header>
    );
};

export default Header;
