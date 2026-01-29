"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import SearchHeader from './seeker/SearchHeader';
import JobSidebar from './seeker/JobSidebar';
import JobDetail from './seeker/JobDetail';
import FilterDrawer from './seeker/FilterDrawer';
import { MOCK_JOBS } from '../../constant';
import { Job } from '@/app/types';

const SeekerJobs: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(MOCK_JOBS[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile && isMobileDetailOpen) {
        setIsMobileDetailOpen(false);
        document.body.style.overflow = 'auto';
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobileDetailOpen]);

  const filteredJobs = useMemo(() => {
    let results = MOCK_JOBS;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(job =>
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.skills.some((skill: string) => skill.toLowerCase().includes(query))
      );
    }

    if (selectedCategory) {
      const cat = selectedCategory.toLowerCase();
      results = results.filter(job =>
        job.title.toLowerCase().includes(cat) ||
        job.skills.some((skill: string) => skill.toLowerCase().includes(cat))
      );
    }

    return results;
  }, [searchQuery, selectedCategory]);

  const handleSelectJob = (job: Job) => {
    if (selectedJob?.id === job.id) {
      if (isMobile) {
        setIsMobileDetailOpen(true);
        document.body.style.overflow = 'hidden';
      }
      return;
    }

    setIsLoading(true);
    setSelectedJob(job);

    // Simulate data fetching delay
    setTimeout(() => {
      setIsLoading(false);
    }, 600);

    if (isMobile) {
      setIsMobileDetailOpen(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const handleCloseMobileDetail = () => {
    setIsMobileDetailOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  return (
    <div className="h-screen space-y-2 flex flex-col transition-colors duration-200 overflow-hidden font-sans">
      <div className="relative">
        <SearchHeader
          onSearch={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

      </div>

      <main className="flex-1 flex w-full relative overflow-hidden  ">
        <FilterDrawer
          isOpen={isFilterDrawerOpen}
          onClose={() => setIsFilterDrawerOpen(false)}
        />

        {filteredJobs.length > 0 ? (
          <div className="flex gap-2 w-full h-full overflow-hidden">
            <JobSidebar
              jobs={filteredJobs}
              selectedJobId={selectedJob?.id || ''}
              onSelectJob={handleSelectJob}
              onOpenFilters={() => setIsFilterDrawerOpen(true)}
            />
            {!isMobile && (
              <div className="flex-1 overflow-hidden h-full bg-white dark:bg-neutral-900 rounded-xl ">
                <JobDetail job={selectedJob} isLoading={isLoading} />
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white dark:bg-neutral-950 text-center">
            <div className="w-20 h-20 bg-neutral-50 dark:bg-neutral-900 rounded-3xl flex items-center justify-center mb-6 border border-neutral-100 dark:border-neutral-800">
              <svg className="w-10 h-10 text-neutral-300 dark:text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-display font-bold text-neutral-900 dark:text-white">No matching results</h2>
            <p className="text-neutral-500 dark:text-neutral-400 mt-2 max-w-[280px] text-sm leading-relaxed">Try adjusting your keywords or clearing filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
              }}
              className="mt-8 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl text-sm transition-all hover:bg-blue-700 active:scale-95 shadow-sm"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>

      {/* Mobile Detail Overlay using Tailwind Transitions */}
      <div
        className={`fixed inset-0 bg-neutral-900/60 dark:bg-black/80 backdrop-blur-[4px] z-[100] transition-opacity duration-300 ease-in-out ${isMobile && isMobileDetailOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={handleCloseMobileDetail}
      />
      <div
        className={`fixed bottom-0 left-0 right-0 z-[101] overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isMobile && isMobileDetailOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
      >
        <JobDetail
          job={selectedJob}
          isMobile={true}
          onClose={handleCloseMobileDetail}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default SeekerJobs;