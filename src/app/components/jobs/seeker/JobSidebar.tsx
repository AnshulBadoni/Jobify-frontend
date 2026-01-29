import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { Job } from '@/app/types';

interface JobSidebarProps {
    jobs: Job[];
    selectedJobId: string;
    onSelectJob: (job: Job) => void;
    onOpenFilters: () => void;
}

const JobSidebar: React.FC<JobSidebarProps> = ({ jobs, selectedJobId, onSelectJob, onOpenFilters }) => {
    return (
        <aside className="w-full lg:w-[400px] rounded-xl bg-white dark:bg-neutral-900 lg:border-r border-neutral-200 dark:border-neutral-800 flex flex-col h-full shrink-0 transition-colors">
            <div className="px-5 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h2 className="font-display font-bold text-neutral-900 dark:text-neutral-100 text-sm">Opportunities</h2>
                    <span className="bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 px-2 py-0.5 rounded-full text-[10px] font-bold">
                        {jobs.length}
                    </span>
                </div>
                <button
                    onClick={onOpenFilters}
                    className="flex items-center gap-1.5 px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg text-[12px] font-bold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors shadow-sm active:bg-neutral-100 dark:active:bg-neutral-700"
                >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    Filter
                </button>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-neutral-100 dark:divide-neutral-800/50 custom-scrollbar">
                {jobs.map((job) => (
                    <button
                        key={job.id}
                        onClick={() => onSelectJob(job)}
                        className={`w-full p-5 text-left transition-all group relative border-l-4 border-t ${selectedJobId === job.id
                            ? 'bg-blue-50/30 dark:bg-blue-900/10 border-blue-600'
                            : 'border-transparent hover:bg-neutral-50 dark:hover:bg-neutral-800/20'
                            }`}
                    >
                        <div className="flex gap-4">
                            <div className="size-10 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 flex items-center justify-center p-2 shrink-0">
                                <img src={job.companyIcon} alt={job.company} className="max-w-full max-h-full object-contain" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-display font-bold text-neutral-900 dark:text-neutral-100 text-sm leading-tight group-hover:text-blue-600 transition-colors truncate">
                                        {job.title}
                                    </h3>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400 truncate">
                                        {job.company}
                                    </p>
                                    <div className="flex items-center gap-2 text-[12px] text-neutral-400 dark:text-neutral-500">
                                        <span className="font-bold text-blue-600 dark:text-blue-400">{job.location}</span>
                                        <span>•</span>
                                        <span>{job?.date?.replace('Posted ', '')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </aside>
    );
};

export default JobSidebar;