"use client";

interface CompanyProfilePreviewProps {
    profile: any;
}

export default function CompanyProfilePreview({ profile }: CompanyProfilePreviewProps) {
    const company = profile?.company || {};
    
    return (
        <div className="rounded-2xl bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-neutral-900 backdrop-blur-md p-6 shadow-lg border border-gray-100 dark:border-neutral-800">
            <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl">
                    {company?.name?.[0] || "C"}
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                        {company?.name || "Your Company"}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {company?.industry || "Technology"}
                    </p>
                </div>
            </div>

            <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {company?.location || "San Francisco, CA"}
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    {company?.website || "www.yourcompany.com"}
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {company?.size || "50-200"} employees
                </div>
            </div>

            <button className="w-full mt-4 py-2.5 bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 text-gray-900 dark:text-white font-semibold rounded-xl transition-colors">
                Edit Company Profile
            </button>
        </div>
    );
}