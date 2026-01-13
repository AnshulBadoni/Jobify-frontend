import React, { useMemo } from 'react';
import { Job } from '../types';
import { Bookmark } from 'lucide-react';

interface JobCardProps {
    job: Job;
}

const BrandIcon = ({ name, src }: { name: string, src: string }) => {
    if (name === 'X') {
        return (
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        );
    }
    return <img src={src} alt={name} className="w-7 h-7 object-contain" />;
};

const JobCard: React.FC<JobCardProps> = ({ job }) => {
    const theme = useMemo(() => {
        // Generate a deterministic random-like index based on job ID
        const idNum = Number(job.id) || 0;

        // Theme palette: Light Mode (Pastels) & Dark Mode (Gradients)
        const schemes = [
            {
                light: 'bg-[#E6EFFF]',
                dark: 'dark:bg-gradient-to-br dark:from-blue-900/60 dark:to-[#0f1115] dark:border-blue-800/20'
            },
            {
                light: 'bg-[#DDF7F2]',
                dark: 'dark:bg-gradient-to-br dark:from-emerald-900/60 dark:to-[#0f1115] dark:border-emerald-800/20'
            },
            {
                light: 'bg-[#FCEAF3]',
                dark: 'dark:bg-gradient-to-br dark:from-pink-900/60 dark:to-[#0f1115] dark:border-pink-800/20'
            },
            {
                light: 'bg-[#EBE5FA]',
                dark: 'dark:bg-gradient-to-br dark:from-violet-900/60 dark:to-[#0f1115] dark:border-violet-800/20'
            },
            {
                light: 'bg-[#EFF4F8]',
                dark: 'dark:bg-gradient-to-br dark:from-slate-800/80 dark:to-[#0f1115] dark:border-slate-700/20'
            },
            {
                light: 'bg-[#FFF0DB]',
                dark: 'dark:bg-gradient-to-br dark:from-orange-900/60 dark:to-[#0f1115] dark:border-orange-800/20'
            }
        ];

        return schemes[idNum % schemes.length];
    }, [job.id]);

    return (
        <div
            className={`rounded-lg min-w-96 p-8 flex flex-col h-full transition-all duration-300 hover:-translate-y-1 shadow-sm dark:shadow-none dark:border ${theme.light} ${theme.dark} border-transparent`}
        >
            <div className="flex justify-between items-start">
                <div className="w-8 h-8 mb-2 bg-white rounded-full flex items-center justify-center">
                    <BrandIcon name={job.company} src={job.companyIcon} />
                </div>
                <button className="text-gray-900 transition-opacity hover:opacity-60">
                    <Bookmark className="w-6 h-6" strokeWidth={1.8} />
                </button>
            </div>

            <div className="mb-">
                <h3 className="text-lg font-bold text-gray-900 leading-tight mb-3">
                    {job.title}
                </h3>
                <p className="text-sm text-gray-600 font-medium leading-relaxed mb-4">
                    {job.description}
                </p>
            </div>

            <div className="flex gap-3 mb-6">
                {job.tags.map((tag, index) => (
                    <span
                        key={index}
                        className="px-3 py-2 bg-white rounded-xl text-xs font-bold text-gray-900 tracking-wide whitespace-nowrap"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <div className="mt-auto grid grid-cols-2 gap-4">
                <button className="h-10 rounded-xl border-[1.5px] border-gray-900 text-sm font-bold text-gray-900 hover:bg-white/50 transition-colors">
                    Details
                </button>
                <button className="h-10 rounded-xl bg-black text-sm font-bold text-white hover:bg-gray-800 transition-colors">
                    Apply Now
                </button>
            </div>
        </div>
    );
};

export default JobCard;
