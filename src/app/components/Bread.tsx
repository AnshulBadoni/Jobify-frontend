import { ArrowLeft, ChevronRight } from "lucide-react";
import React from "react";

interface BreadProps {
    company?: string;
    jobTitle?: string;
    onBack?: () => void;
    onApply?: () => void;
    showBack?: boolean; // ⬅️ control whether "Back to Jobs" is visible
}

const Bread: React.FC<BreadProps> = ({
    company,
    jobTitle,
    onBack,
    onApply,
    showBack = true,
}) => {
    return (
        <header className="sticky lg:top-16 shadow-lg top-0 mb-2 z-10 bg-white dark:bg-neutral-900 backdrop-blur border-b border-gray-200 dark:border-neutral-800 rounded-xl">
            <div className="mx-auto lg:px-10 px-4 py-3 flex items-center justify-between">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    {showBack && (
                        <>
                            <button
                                onClick={onBack}
                                className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Jobs
                            </button>
                            {(company || jobTitle) && (
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                            )}
                        </>
                    )}

                    {company && (
                        <div className="hidden lg:flex">
                            <span className="hover:text-indigo-600 dark:hover:text-indigo-400 transition cursor-pointer">
                                {company.split(" ").slice(0, 3).join(" ")}
                            </span>
                            {jobTitle && (
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                            )}
                        </div>
                    )}

                    {jobTitle && (
                        <div>
                            <span className="hidden lg:block font-medium text-gray-900 dark:text-gray-100">
                                {jobTitle}
                            </span>
                            <span className="lg:hidden sm:block font-medium text-gray-900 dark:text-gray-100">
                                {jobTitle.split(" ").map(word => word[0].toUpperCase()).join("")}
                            </span>
                        </div>
                    )}
                </nav>

                {/* Apply CTA only if jobTitle exists */}
                {jobTitle && (
                    <button
                        onClick={onApply}
                        className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
                    >
                        Apply Now
                    </button>
                )}
            </div>
        </header>
    );
};

export default Bread;
