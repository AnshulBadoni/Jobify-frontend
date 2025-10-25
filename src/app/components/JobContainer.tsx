import Link from 'next/link'
import React from 'react'

const JobContainer = ({ title, closestJobs }: { title: string, closestJobs: any }) => {
    return (
        < div className="rounded-2xl bg-gradient-to-b from-white to-gray-50 dark:from-neutral-900 dark:to-black backdrop-blur-md p-6 shadow-lg border border-gray-100 dark:border-neutral-800 space-y-4" >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {title}
            </h2>

            <div className="flex gap-6 overflow-x-auto py-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-indigo-300 dark:scrollbar-thumb-indigo-700 scrollbar-track-gray-100 dark:scrollbar-track-neutral-800 scrollbar-hide">
                {closestJobs.map((job: any) => (
                    <Link
                        key={job.id}
                        href={`/job/${job.id}`}
                        className="min-w-[260px] flex-shrink-0 flex flex-col justify-between p-5 rounded-xl  hover:scale-95 transition-all duration-300 border bg-gray-50 dark:bg-neutral-900 border-gray-100 dark:border-neutral-800 cursor-pointer snap-start"
                    >
                        <div className="flex items-center gap-4 mb-3">
                            <img src={job.logo} alt={job.company} className="w-12 h-12 object-contain rounded-lg" />
                            <div className="flex flex-col">
                                <h3 className="font-semibold text-gray-900 dark:text-white text-base truncate">{job.role}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{job.company}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-xs font-medium">
                            <span className="px-2 py-1 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100">{job.type}</span>
                            <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-neutral-800 dark:text-gray-200">{job.experience}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>

    )
}

export default JobContainer