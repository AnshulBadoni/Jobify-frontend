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
    return <img src={src} alt={name} className="w-5 h-5 object-contain" />;
};

const JobCard: React.FC<JobCardProps> = ({ job }) => {
    const theme = useMemo(() => {
        // Generate a deterministic random-like index based on job ID
        const idNum = Number(job.id) || 0;

        // Theme palette: Light Mode (Pastels) & Dark Mode (Gradients)
        const schemes = [
            {
                light: 'bg-[#E6EFFF]',
                dark: 'dark:bg-neutral-900'
            },
            {
                light: 'bg-[#DDF7F2]',
                dark: 'dark:bg-neutral-900'
            },
            {
                light: 'bg-[#FCEAF3]',
                dark: 'dark:bg-neutral-900'
            },
            {
                light: 'bg-[#EBE5FA]',
                dark: 'dark:bg-neutral-900'
            },
            {
                light: 'bg-[#EFF4F8]',
                dark: 'dark:bg-neutral-900'
            },
            {
                light: 'bg-[#FFF0DB]',
                dark: 'dark:bg-neutral-900'
            }
        ];

        return schemes[idNum % schemes.length];
    }, [job.id]);

    return (
        <div
            className={`rounded-xl min-w-80 p-6 flex flex-col h-full transition-all duration-300 hover:-translate-y-1 shadow-sm dark:shadow-none dark:border ${theme.light} ${theme.dark} border-transparent`}
        >
            <div className="flex justify-between items-start">
                <div className="w-8 h-8 mb-2 p-2 bg-white rounded-full flex items-center justify-center">
                    {/* <BrandIcon name={job.company} src={job.companyIcon} /> */}
                    <img src={job.companyIcon} alt={job.company} className="w-5 h-5 object-contain" />
                </div>
                <button className="text-gray-900 transition-opacity hover:opacity-60">
                    <Bookmark className="w-6 h-6" strokeWidth={1.8} />
                </button>
            </div>

            <div className="">
                <h3 className="text-md font-bold text-gray-900 dark:text-gray-200 leading-tight mb-3">
                    {job.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium leading-relaxed mb-4">
                    {job.description}
                </p>
            </div>

            <div className="flex gap-3 mb-6">
                {job.tags.map((tag, index) => (
                    <span
                        key={index}
                        className="px-3 py-2 bg-white dark:bg-gray-400 rounded-lg text-xs font-bold text-gray-900 tracking-wide whitespace-nowrap"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <div className="mt-auto grid grid-cols-2 gap-2">
                <button className="h-8 rounded-md border-[1.5px] border-gray-900 dark:border-gray-200 text-xs font-bold text-gray-900 dark:text-gray-200 hover:bg-white/50 transition-colors">
                    Details
                </button>
                <button className="h-8 rounded-md bg-black dark:bg-black text-xs font-bold text-white hover:bg-gray-800 transition-colors">
                    Apply Now
                </button>
            </div>
        </div>
    );
};

export default JobCard;
