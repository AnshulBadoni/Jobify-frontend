import React from 'react';
import { JOBS } from '../../constants';
import { SlidersHorizontal, Bookmark } from 'lucide-react';

const JobOffers: React.FC = () => {
  return (
    <div id="joboffers" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-dark">Recommended jobs</h2>
            <div className="bg-white border border-gray-200 px-3 py-1 rounded-full text-lg font-bold shadow-sm">
              386
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
            <span>Sort by:</span>
            <span className="text-dark font-bold cursor-pointer">Last updated</span>
            <SlidersHorizontal className="w-4 h-4 ml-1 cursor-pointer" />
          </div>
        </div>

        {/* Job Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">

          {/* 1. Black Promo Card (Distinct from Job Cards) */}
          <div className="bg-[#191919] p-8 rounded-[2rem] relative overflow-hidden flex flex-col justify-between min-h-[340px] text-white group shadow-xl">
            {/* Abstract Background Lines */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="none">
                <path d="M-50 100 Q 50 50 150 200" stroke="white" strokeWidth="1" fill="none" />
                <path d="M0 150 Q 100 0 200 100" stroke="white" strokeWidth="1" fill="none" />
                <circle cx="180" cy="20" r="40" stroke="white" strokeWidth="1" fill="none" opacity="0.5" />
              </svg>
            </div>

            <div className="relative z-10 mt-4 space-y-2">
              <h3 className="text-4xl font-extrabold leading-[1.2] tracking-tight">
                Get Your best <br />
                profession <br />
                with LuckyJob
              </h3>
            </div>

            <button className="relative z-10 bg-[#82C3FF] text-[#0F172A] w-full py-4 rounded-full font-bold text-sm hover:bg-[#6BAFD8] transition-colors shadow-lg">
              Learn more
            </button>
          </div>

          {/* 2. Render Job Cards */}
          {JOBS.map((job) => (
            <div key={job.id} className={`${job.cardColor} p-6 rounded-[2rem] hover:scale-[1.02] transition-transform duration-300 relative flex flex-col min-h-[340px]`}>

              {/* Header: Date & Bookmark */}
              <div className="flex justify-between items-center mb-6">
                <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold text-dark shadow-sm">
                  {job.date}
                </span>
                <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-dark hover:text-primary transition-colors shadow-sm">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>

              {/* Company Info */}
              <div className="mb-6 relative">
                <p className="text-xs font-bold text-dark mb-1">{job.company}</p>
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-extrabold text-dark leading-tight max-w-[80%]">
                    {job.title}
                  </h3>
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm p-1.5 shrink-0">
                    <img src={job.logo} alt={job.company} className="w-full h-full object-contain" />
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {job.tags.map((tag, idx) => (
                  <span key={idx} className="bg-transparent border border-dark/10 px-3 py-1.5 rounded-2xl text-[11px] font-bold text-dark/70">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-auto flex items-end justify-between">
                <div>
                  <p className="text-lg font-extrabold text-dark">{job.salary}</p>
                  <p className="text-xs text-gray-500 font-medium">{job.location}</p>
                </div>
                <button className="bg-black text-white text-xs font-bold px-6 py-3 rounded-full hover:bg-black/80 transition-colors shadow-lg">
                  Details
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <button className="bg-white border border-gray-200 text-dark px-10 py-4 rounded-full font-bold hover:bg-gray-50 transition-colors shadow-sm">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobOffers;