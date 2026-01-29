import React from 'react';
import { Share2, Bookmark } from 'lucide-react';
import { Job } from '../types';

interface JobListingCardProps {
  job: Job;
}

const JobListingCard: React.FC<JobListingCardProps> = ({ job }) => {
  return (
    <div className="w-80 bg-gray-100 dark:bg-neutral-900 rounded-xl p-6 shadow-card dark:shadow-none hover:shadow-card-hover dark:hover:shadow-white/5 transition-all duration-300 border border-gray-100 dark:border-white/10 relative group">
      {/* Top Section */}
      <div className="flex justify-between items-start mb-5">
        <div className="flex-1 pr-4">
          <h3 className="text-xs font-bold text-gray-900 dark:text-white mb-1.5">{job.company}</h3>

          <div className="mb-2.5">
            <h2 className="text-md leading-tight font-bold text-gray-900 dark:text-white tracking-tight max-w-[380px]">
              {job.title}
            </h2>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 mb-5">
            <span className="text-gray-900 dark:text-gray-300">{job.location}</span>
            {job.isRemote && (
              <span className="text-[#3B82F6] dark:text-[#60A5FA]">(Remote)</span>
            )}
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-white/5 px-3 py-1 rounded-lg border border-gray-100 dark:border-white/10">
              {job.salaryRange}
            </span>
          </div>
        </div>

        {/* Right Column: Logo & Date */}
        <div className="flex flex-col items-end justify-between self-stretch h-full">
          <div className="w-14 h-14 rounded-full bg-pink-50 dark:bg-pink-500/10 flex items-center justify-center overflow-hidden shrink-0 border border-pink-100/50 dark:border-pink-500/20">
            <img
              src={job.companyLogo}
              alt={job.company}
              className="w-8 h-8 object-contain"
            />
          </div>

          <span className="text-xs font-medium text-gray-400 dark:text-gray-500 whitespace-nowrap mt-auto">
            {job.postedAt}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-500/20 dark:bg-white/10 w-full mb-4"></div>

      {/* Bottom Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Match Pill */}
        <div className="bg-[#F0F6FF] dark:bg-blue-500/10 rounded-full py-1.5 px-2 pr-4 flex items-center gap-2.5 w-full sm:w-auto border border-blue-50 dark:border-blue-500/20">
          <div className="w-6 h-6 rounded-full overflow-hidden border border-white dark:border-white/10 shadow-sm shrink-0">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center gap-1.5 text-[13px] whitespace-nowrap">
            <span className="font-bold text-[#3B82F6] dark:text-[#60A5FA]">{job.matchPercentage}%</span>
            <span className="font-medium text-gray-500 dark:text-gray-400">profile match</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button className="w-8 h-8 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white transition-colors bg-white dark:bg-transparent">
            <Share2 className="w-4 h-4" strokeWidth={2} />
          </button>
          <button className="w-8 h-8 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white transition-colors bg-white dark:bg-transparent">
            <Bookmark className="w-4.5 h-4.5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobListingCard;