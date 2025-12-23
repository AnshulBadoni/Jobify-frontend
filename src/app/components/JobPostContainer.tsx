"use client";

interface JobPost {
    id: number;
    title: string;
    department: string;
    location: string;
    type: string;
    salary: number;
    applicants: number;
    posted: string;
    status: string;
}

interface JobPostContainerProps {
    title: string;
    jobPosts: JobPost[];
}

export default function JobPostContainer({ title, jobPosts }: JobPostContainerProps) {
    return (
        <div className="rounded-2xl bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-neutral-900 backdrop-blur-md p-6 shadow-lg border border-gray-100 dark:border-neutral-800">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-all transform hover:scale-105 shadow-lg">
                    + Post Job
                </button>
            </div>

            <div className="space-y-3">
                {jobPosts.map((job) => (
                    <div
                        key={job.id}
                        className="p-4 rounded-xl border border-gray-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-800 transition-all cursor-pointer group"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                        {job.title}
                                    </h3>
                                    <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-xs font-medium rounded-full">
                                        {job.status}
                                    </span>
                                </div>

                                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-3">
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        {job.department}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        </svg>
                                        {job.location}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {job.type}
                                    </span>
                                </div>

                                <div className="flex items-center gap-4 text-sm">
                                    <span className="flex items-center gap-1.5 text-gray-900 dark:text-white font-semibold">
                                        <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        {job.applicants} applicants
                                    </span>
                                    <span className="text-gray-500 dark:text-gray-400">•</span>
                                    <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                                        ${(job.salary / 1000).toFixed(0)}k/year
                                    </span>
                                    <span className="text-gray-500 dark:text-gray-400">•</span>
                                    <span className="text-gray-500 dark:text-gray-400">
                                        Posted {job.posted}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-lg transition-colors" title="Edit">
                                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                                <button className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-lg transition-colors" title="More">
                                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}