import React from 'react';
import { CheckCircle2, Star, MapPin, Bookmark, Send, Briefcase, X, Share2, Building2, Calendar, ShieldCheck } from 'lucide-react';
import { Job } from '@/app/types';
import Badge from './Badge';

interface JobDetailProps {
  job: Job | null;
  isMobile?: boolean;
  onClose?: () => void;
  isLoading?: boolean;
}

const JobDetailSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col bg-white dark:bg-neutral-900 overflow-hidden h-full">
      <div className="flex-1 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 py-8 space-y-8">
          <div className="flex justify-between items-start">
            <div className="flex gap-4">
              <div className="w-16 h-16 rounded-xl shimmer-bg animate-shimmer" />
              <div className="space-y-3">
                <div className="w-64 h-8 rounded shimmer-bg animate-shimmer" />
                <div className="w-32 h-4 rounded shimmer-bg animate-shimmer" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-32 h-10 rounded-xl shimmer-bg animate-shimmer" />
              <div className="w-10 h-10 rounded-xl shimmer-bg animate-shimmer" />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-8 space-y-6">
              <div className="w-full h-32 rounded-xl shimmer-bg animate-shimmer" />
              <div className="w-full h-64 rounded-xl shimmer-bg animate-shimmer" />
            </div>
            <div className="hidden lg:block lg:col-span-4 space-y-6">
              <div className="w-full h-48 rounded-2xl shimmer-bg animate-shimmer" />
              <div className="w-full h-48 rounded-2xl shimmer-bg animate-shimmer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const JobDetail: React.FC<JobDetailProps> = ({ job, isMobile, onClose, isLoading }) => {
  if (isLoading) return <JobDetailSkeleton />;

  if (!job) {
    return (
      <div className="h-full flex items-center justify-center bg-white dark:bg-neutral-900 p-8 text-center">
        <div className="max-w-xs">
          <div className="w-16 h-16 bg-neutral-50 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-neutral-100 dark:border-neutral-700">
            <Briefcase className="w-8 h-8 text-neutral-300 dark:text-neutral-600" />
          </div>
          <h2 className="text-lg font-display font-bold text-neutral-700 dark:text-neutral-300 mb-2">Select a job to view</h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-500 leading-relaxed">Choose a listing from the sidebar to explore details.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col bg-white dark:bg-neutral-900 overflow-hidden transition-colors ${isMobile ? 'h-[92vh] rounded-t-3xl shadow-2xl' : 'h-full'}`}>
      {/* Mobile Top Header (Sticky-like via Flexbox) */}
      {isMobile && (
        <div className="px-6 py-4 flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 shrink-0 bg-white dark:bg-neutral-900 z-30">
          <div className="flex items-center gap-3 min-w-0">
             <div className="w-10 h-10 rounded-xl bg-neutral-50 dark:bg-neutral-800 p-2 flex items-center justify-center border border-neutral-100 dark:border-neutral-700 shrink-0">
                <img src={job.companyLogo} alt={job.company} className="max-w-full max-h-full object-contain" />
             </div>
             <div className="min-w-0">
                <span className="block text-sm font-display font-bold text-neutral-900 dark:text-white truncate">{job.title}</span>
                <span className="block text-[11px] text-neutral-500 font-medium">{job.company}</span>
             </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors shrink-0">
            <X className="w-6 h-6 text-neutral-500 dark:text-neutral-400" />
          </button>
        </div>
      )}

      {/* Scrollable Content Area - Explicitly constrained by min-h-0 */}
      <div className="flex-1 min-h-0 overflow-y-auto scroll-smooth custom-scrollbar overscroll-contain">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-6 md:py-10">
          {/* Header row for Desktop */}
          {!isMobile && (
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8 relative">
              <div className="flex gap-4 md:gap-6 items-start flex-1 min-w-0">
                <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-800 p-3 flex items-center justify-center shrink-0 shadow-sm">
                  <img src={job.companyLogo} alt={job.company} className="max-w-full max-h-full object-contain" />
                </div>
                <div className="min-w-0 pt-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-2">
                    <h1 className="text-md md:text-xl font-display font-extrabold text-neutral-900 dark:text-white tracking-tight">
                      {job.title}
                    </h1>
                    <div className="flex gap-2">
                      <Badge variant="green" className="bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100/50 text-[11px] py-1 px-3 rounded-lg">{job.workType}</Badge>
                      <Badge variant="blue" className="bg-blue-50 dark:bg-blue-900/10 border-blue-100/50 text-[11px] py-1 px-3 rounded-lg">{job.level}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 font-medium">
                    <span className="text-[14px] md:text-[16px]">{job.company}</span>
                    {job.client.isVerified && <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-50 dark:fill-blue-900/30" />}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button className="px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white font-display font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm whitespace-nowrap active:scale-95">
                  Apply
                </button>
                <button className="p-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all group shrink-0 shadow-sm" title="Save Job">
                  <Bookmark className="w-5 h-5 group-hover:fill-blue-600 group-hover:text-blue-600" />
                </button>
              </div>
            </div>
          )}

          {/* Title row for Mobile (when header is simplified) */}
          {isMobile && (
            <div className="mb-6">
              <h1 className="text-2xl font-display font-extrabold text-neutral-900 dark:text-white tracking-tight leading-tight mb-3">
                {job.title}
              </h1>
              <div className="flex flex-wrap gap-2">
                <Badge variant="green" className="bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100/50 text-[10px] py-1 px-3 rounded-lg">{job.workType}</Badge>
                <Badge variant="blue" className="bg-blue-50 dark:bg-blue-900/10 border-blue-100/50 text-[10px] py-1 px-3 rounded-lg">{job.level}</Badge>
              </div>
            </div>
          )}

          <div className="h-px bg-neutral-100 dark:bg-neutral-800 mb-8 md:mb-10" />

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-10 md:space-y-12">
              <section>
                <h3 className="text-lg md:text-xl font-display font-bold text-neutral-900 dark:text-neutral-100 mb-4">Job Description:</h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-md md:text-sm">
                  {job.description}
                </p>
              </section>

              <section>
                <h3 className="text-lg md:text-xl font-display font-bold text-neutral-900 dark:text-neutral-100 mb-6">Key Responsibilities:</h3>
                <ul className="space-y-4">
                  {job.responsibilities.map((item, idx) => (
                    <li key={idx} className="flex gap-4 text-neutral-600 dark:text-neutral-400 text-md md:text-sm leading-relaxed group">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-lg md:text-xl font-display font-bold text-neutral-900 dark:text-neutral-100 mb-5">Required skills:</h3>
                <div className="flex flex-wrap gap-2.5">
                  {job.skills.map(skill => (
                    <Badge key={skill} variant="gray" className="px-5 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-none text-[13px] font-bold rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all cursor-default shadow-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Sidebar Column */}
            <div className="lg:col-span-4 space-y-8 md:space-y-12">
              {/* About Client Card */}
              <section className="bg-neutral-50/50 dark:bg-neutral-800/30 p-6 md:p-8 rounded-3xl border border-neutral-100 dark:border-neutral-800 space-y-6 shadow-sm">
                <h3 className="text-md font-display font-bold text-neutral-900 dark:text-neutral-100">About Client</h3>
                <div className="space-y-6">
                  <div className="group">
                    <p className="text-xs font-bold text-neutral-400 dark:text-neutral-500 mb-1.5 uppercase tracking-wider">Client name</p>
                    <div className="flex items-center gap-2 font-display font-bold text-neutral-900 dark:text-neutral-100 text-sm group-hover:text-blue-600 transition-colors">
                      {job.client.name}
                      {job.client.isVerified && <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-50 dark:fill-blue-900/20" />}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-400 dark:text-neutral-500 mb-1.5 uppercase tracking-wider">Joined time</p>
                    <p className="text-md font-medium text-neutral-700 dark:text-neutral-300">{job.client.joinedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-neutral-400 dark:text-neutral-500 mb-1.5 uppercase tracking-wider">Location</p>
                    <div className="flex items-center gap-2 text-[15px] font-medium text-neutral-700 dark:text-neutral-300">
                      <MapPin className="w-4 h-4 text-neutral-400" />
                      {job.client.location}
                    </div>
                  </div>
                </div>
              </section>

              {/* Other Information Card */}
              <section className="bg-white dark:bg-neutral-900 p-6 md:p-8 rounded-3xl border border-neutral-100 dark:border-neutral-800 space-y-6 shadow-sm">
                <h3 className="text-md font-display font-bold text-neutral-900 dark:text-neutral-100">Performance</h3>
                <div className="space-y-5">
                  <div>
                    <p className="text-xs font-bold text-neutral-400 dark:text-neutral-500 mb-2 uppercase tracking-wider">Client Rating</p>
                    <div className="flex items-center gap-1.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < job.client.rating ? 'text-amber-400 fill-amber-400' : 'text-neutral-200 dark:text-neutral-800'}`} />
                      ))}
                      <span className="ml-2 text-sm font-bold text-neutral-700 dark:text-neutral-300">{job.client.rating}.0</span>
                    </div>
                  </div>
                  
                  {job.client.paymentVerified && (
                    <div className="flex items-center gap-2.5 py-2.5 px-4 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-xl border border-emerald-100 dark:border-emerald-800/20">
                      <ShieldCheck className="w-5 h-5 text-emerald-500" />
                      <span className="text-sm text-emerald-700 dark:text-emerald-400 font-bold">Payment verified</span>
                    </div>
                  )}

                  <div className="pt-2">
                    <p className="text-xs font-bold text-neutral-400 dark:text-neutral-500 mb-2 uppercase tracking-wider">Total Investment</p>
                    <p className="text-md font-display font-bold text-neutral-900 dark:text-neutral-100">{job.client.spend} Total Spend</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-500 font-medium mt-1.5 leading-relaxed">
                      {job.client.hiringCount}+ professionals hired, <span className="text-blue-600 dark:text-blue-400 font-bold">{job.client.activeCount} currently active</span>
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
          
          {/* Bottom Padding for Desktop Spacing */}
          <div className="h-10 md:h-20" />
        </div>
      </div>

      {/* Mobile Footer CTA - Fixed at bottom via Flexbox */}
      {isMobile && (
        <div className="border-t border-neutral-100 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md px-6 py-5 flex gap-3 shrink-0 z-40 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] pb-8">
          <button className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white font-display font-bold rounded-2xl shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98] text-[16px] flex items-center justify-center gap-2">
            Apply job
            <Send className="w-4 h-4" />
          </button>
          <button className="px-5 py-4 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 font-bold rounded-2xl transition-all active:scale-[0.98] shadow-sm">
            <Bookmark className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default JobDetail;