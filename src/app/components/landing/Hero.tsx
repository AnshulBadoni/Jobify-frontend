"use client"
import React, { useMemo } from 'react';
import { Search, Wifi, Battery, Signal, Bookmark } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Types
interface Job {
   id: string;
   title: string;
   company: string;
   companyLogo: string;
   description: string;
   tags: string[];
}

// Mock Data for the phone display
const mockJobs: Job[] = [
   {
      id: '1',
      title: 'Senior UI/UX Designer',
      company: 'Google',
      companyLogo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
      description: 'Design beautiful user experiences for millions of users worldwide.',
      tags: ['Remote', 'Full-time', 'Senior']
   },
   {
      id: '2',
      title: 'Product Designer',
      company: 'Apple',
      companyLogo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg',
      description: 'Create innovative product designs for next-gen devices.',
      tags: ['On-site', 'Full-time']
   },
   {
      id: '3',
      title: 'Motion Designer',
      company: 'Spotify',
      companyLogo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spotify/spotify-original.svg',
      description: 'Bring music to life through stunning animations.',
      tags: ['Remote', 'Contract']
   }
];

// Brand Icon Component
const BrandIcon = ({ name, src }: { name: string, src: string }) => {
   if (name === 'X') {
      return (
         <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
         </svg>
      );
   }
   return <img src={src} alt={name} className="w-5 h-5 object-contain" />;
};

// Mini JobCard Component for Phone Display
const MiniJobCard: React.FC<{ job: Job }> = ({ job }) => {
   const theme = useMemo(() => {
      const idNum = parseInt(job.id) || 0;
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
         className={`rounded-[24px] p-4 flex flex-col transition-all duration-300 shadow-sm dark:shadow-none dark:border ${theme.light} ${theme.dark} border-transparent`}
      >
         <div className="flex justify-between items-start mb-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
               <BrandIcon name={job.company} src={job.companyLogo} />
            </div>
            <button className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-gray-600 transition-opacity hover:opacity-60">
               <Bookmark className="w-4 h-4" strokeWidth={1.8} />
            </button>
         </div>

         <div className="mb-3">
            <h3 className="text-sm font-bold text-gray-900 leading-tight mb-1">
               {job.title}
            </h3>
            <p className="text-[10px] text-gray-500 font-medium">
               {job.company}
            </p>
         </div>

         <p className="text-[10px] text-gray-600 font-medium leading-relaxed mb-3 line-clamp-2">
            {job.description}
         </p>

         <div className="flex flex-wrap gap-1.5 mb-4">
            {job.tags.map((tag, index) => (
               <span
                  key={index}
                  className="px-2 py-1 bg-white/80 rounded-lg text-[9px] font-bold text-gray-700 whitespace-nowrap"
               >
                  {tag}
               </span>
            ))}
         </div>

         <div className="mt-auto grid grid-cols-2 gap-2">
            <button className="h-8 rounded-xl border-[1.5px] border-gray-900 text-[10px] font-bold text-gray-900 hover:bg-white/50 transition-colors">
               Details
            </button>
            <button className="h-8 rounded-xl bg-black text-[10px] font-bold text-white hover:bg-gray-800 transition-colors">
               Apply Now
            </button>
         </div>
      </div>
   );
};

const Hero: React.FC = () => {
   const router = useRouter()
   return (
      <div className="relative bg-white pt-28 lg:pt-32 pb-20 lg:pb-32 overflow-hidden">
         <style>{`
        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-title {
          animation: slideUpFade 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
         {/* Subtle Grid Pattern */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

               {/* Left Content */}
               <div className="space-y-8 lg:space-y-10 relative text-center lg:text-left">
                  {/* Decorative Dashed Arrow Top Left */}
                  <div className="hidden lg:block absolute -top-16 -left-24 opacity-30">
                     <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 80 C 20 50, 50 20, 80 20" stroke="#000" strokeWidth="2" strokeDasharray="4 4" />
                        <path d="M80 20 L 70 20" stroke="#000" strokeWidth="2" />
                        <path d="M80 20 L 80 30" stroke="#000" strokeWidth="2" />
                     </svg>
                  </div>

                  <h1 className="mt-10 text-2xl md:text-4xl lg:text-[4rem] font-extrabold text-dark leading-[1.1] lg:leading-[1.05] tracking-tight animate-title opacity-0">
                     Your Dream <br className="hidden md:block" />
                     Career Starts <br className="hidden md:block" />
                     <span className="relative inline-block">
                        Here
                        {/* Purple underline swoosh */}
                        <svg className="absolute w-[110%] h-4 lg:h-6 -bottom-1 lg:-bottom-2 left-0 text-primary -z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
                           <path d="M0 15 Q 50 20 100 5" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                        </svg>
                     </span>
                  </h1>

                  <p className="text-gray-500 text-base lg:text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium animate-title opacity-0" style={{ animationDelay: '0.2s' }}>
                     Job Hunting Made Easy: Get instant alerts for jobs matching your skills with our AI-powered job platform.
                  </p>

                  {/* Search Box */}
                  <div className="bg-white border border-gray-200 p-2 pl-4 lg:pl-6 rounded-full shadow-soft max-w-xl w-full flex items-center gap-2 lg:gap-4 transition-all hover:shadow-lg hover:border-gray-300 mx-auto lg:mx-0 animate-title opacity-0" style={{ animationDelay: '0.4s' }}>
                     <Search className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400 flex-shrink-0" />
                     <input
                        type="text"
                        placeholder="Search for a Job"
                        className="flex-1 py-1 lg:py-2 outline-none text-dark placeholder-gray-400 bg-transparent text-sm lg:text-lg font-medium min-w-0"
                     />
                     <button className="bg-violet-500 hover:bg-violet-600 text-white px-2 lg:px-4 py-1 lg:py-2 rounded-full font-bold transition-all shadow-glow text-sm lg:text-base whitespace-nowrap"
                        onClick={() => router.push('/signin')}
                     >
                        Get Started
                     </button>
                  </div>

                  {/* User Avatars & Stats */}
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-4 animate-title opacity-0" style={{ animationDelay: '0.6s' }}>
                     <div className="flex -space-x-4">
                        {[1, 2, 3].map(i => (
                           <div key={i} className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-4 border-white overflow-hidden shadow-sm">
                              <img src={`https://picsum.photos/100/100?random=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                           </div>
                        ))}
                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-4 border-white bg-orange-100 flex items-center justify-center text-xs lg:text-sm font-bold text-orange-600 shadow-sm">
                           +
                        </div>
                     </div>
                     <div className="bg-white/80 backdrop-blur-sm px-5 py-3 rounded-2xl border border-gray-100 shadow-sm">
                        <p className="text-sm font-bold text-dark"><span className="text-primary">60k+</span> Talents Found</p>
                        <p className="text-xs text-gray-500 font-medium">Their Dream Job!</p>
                     </div>
                  </div>

                  {/* Decorative arrow pointing to stats */}
                  <div className="hidden lg:block absolute bottom-0 right-10 animate-pulse">
                     <svg width="80" height="80" viewBox="0 0 60 60" fill="none" className="text-yellow-400 rotate-12">
                        <path d="M10 50 Q 30 10 50 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                        <path d="M40 10 L 50 10 L 50 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                     </svg>
                  </div>
               </div>

               {/* Right Visual - iPhone Mockup */}
               <div className="relative flex justify-center lg:justify-end mt-12 lg:mt-0">
                  {/* Background blobs */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-br from-purple-100 via-violet-50 to-pink-100 rounded-full blur-3xl -z-10 opacity-70"></div>

                  {/* iPhone Frame */}
                  <div className="relative w-[280px] lg:w-[320px] mx-auto">
                     {/* Outer Frame - Titanium/Steel look */}
                     <div className="relative bg-gradient-to-b from-[#1a1a1a] via-[#2d2d2d] to-[#1a1a1a] rounded-[50px] lg:rounded-[55px] p-[3px] shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_25px_50px_-12px_rgba(0,0,0,0.5),0_0_0_1px_rgba(0,0,0,0.1)_inset]">

                        {/* Side Buttons - Left */}
                        <div className="absolute -left-[2px] top-[100px] w-[3px] h-[30px] bg-[#2d2d2d] rounded-l-sm"></div>
                        <div className="absolute -left-[2px] top-[150px] w-[3px] h-[50px] bg-[#2d2d2d] rounded-l-sm"></div>
                        <div className="absolute -left-[2px] top-[210px] w-[3px] h-[50px] bg-[#2d2d2d] rounded-l-sm"></div>

                        {/* Side Button - Right */}
                        <div className="absolute -right-[2px] top-[160px] w-[3px] h-[70px] bg-[#2d2d2d] rounded-r-sm"></div>

                        {/* Inner bezel */}
                        <div className="bg-black rounded-[47px] lg:rounded-[52px] p-[10px] lg:p-[12px]">

                           {/* Screen */}
                           <div className="relative bg-white rounded-[38px] lg:rounded-[42px] overflow-hidden h-[580px] lg:h-[640px]">

                              {/* Dynamic Island */}
                              <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50">
                                 <div className="bg-black w-[90px] lg:w-[100px] h-[28px] lg:h-[32px] rounded-full flex items-center justify-center gap-2">
                                    {/* Camera */}
                                    <div className="w-[10px] h-[10px] rounded-full bg-[#1a1a2e] ring-1 ring-[#2d2d4d]">
                                       <div className="w-[4px] h-[4px] rounded-full bg-[#0f0f1a] mt-[3px] ml-[3px]"></div>
                                    </div>
                                 </div>
                              </div>

                              {/* Status Bar */}
                              <div className="absolute top-0 left-0 right-0 z-40 px-6 pt-3 flex justify-between items-center text-black">
                                 <span className="text-[12px] font-semibold w-[54px]">9:41</span>
                                 <div className="flex-1"></div>
                                 <div className="flex items-center gap-1 w-[54px] justify-end">
                                    <Signal className="w-[14px] h-[14px]" />
                                    <Wifi className="w-[14px] h-[14px]" />
                                    <div className="flex items-center">
                                       <div className="w-[22px] h-[10px] border border-black rounded-[3px] p-[1px] relative">
                                          <div className="bg-black h-full w-[80%] rounded-[1px]"></div>
                                       </div>
                                       <div className="w-[1px] h-[4px] bg-black rounded-r-sm ml-[1px]"></div>
                                    </div>
                                 </div>
                              </div>

                              {/* App Content */}
                              <div className="pt-14 h-full flex flex-col bg-gray-50">
                                 {/* App Header */}
                                 <div className="px-5 py-4 flex justify-between items-center bg-white border-b border-gray-100">
                                    <div className="flex items-center gap-3">
                                       <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                                          <span className="text-white font-bold text-sm">JH</span>
                                       </div>
                                       <div>
                                          <p className="text-[10px] text-gray-400">Good Morning 👋</p>
                                          <p className="text-sm font-bold text-gray-900">John Doe</p>
                                       </div>
                                    </div>
                                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center relative">
                                       <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                       </svg>
                                       <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></div>
                                    </div>
                                 </div>

                                 {/* In-App Search */}
                                 <div className="px-5 py-4 bg-white">
                                    <div className="bg-gray-100 p-3 rounded-2xl flex items-center gap-3">
                                       <Search className="w-4 h-4 text-gray-400" />
                                       <span className="text-xs text-gray-400">Search jobs, companies...</span>
                                    </div>
                                 </div>

                                 {/* Quick Filters */}
                                 <div className="px-5 py-2 flex gap-2 overflow-x-auto scrollbar-hide bg-white pb-4">
                                    <div className="px-4 py-2 bg-black text-white rounded-full text-[10px] font-semibold whitespace-nowrap">All Jobs</div>
                                    <div className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-[10px] font-semibold whitespace-nowrap">Remote 🏠</div>
                                    <div className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-[10px] font-semibold whitespace-nowrap">Full-time</div>
                                    <div className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-[10px] font-semibold whitespace-nowrap">Design</div>
                                 </div>

                                 {/* Scrollable Job Cards */}
                                 <div className="flex-1 px-4 space-y-3 overflow-y-auto scrollbar-hide pb-24">
                                    <div className="flex justify-between items-center pt-2 px-1">
                                       <p className="text-sm font-bold text-gray-900">Recommended</p>
                                       <p className="text-[10px] text-violet-600 font-semibold">See all</p>
                                    </div>

                                    {/* Job Cards using MiniJobCard Component */}
                                    {mockJobs.map((job) => (
                                       <MiniJobCard key={job.id} job={job} />
                                    ))}
                                 </div>

                                 {/* Bottom Navigation */}
                                 <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 pb-8">
                                    <div className="flex justify-between items-center">
                                       <button className="flex flex-col items-center gap-1">
                                          <svg className="w-5 h-5 text-violet-600" fill="currentColor" viewBox="0 0 24 24">
                                             <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                                          </svg>
                                          <span className="text-[9px] font-semibold text-violet-600">Home</span>
                                       </button>
                                       <button className="flex flex-col items-center gap-1">
                                          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                          </svg>
                                          <span className="text-[9px] font-medium text-gray-400">Jobs</span>
                                       </button>
                                       <button className="flex flex-col items-center gap-1">
                                          <div className="w-12 h-12 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full flex items-center justify-center -mt-8 shadow-lg border-4 border-white">
                                             <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                                             </svg>
                                          </div>
                                       </button>
                                       <button className="flex flex-col items-center gap-1">
                                          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                          </svg>
                                          <span className="text-[9px] font-medium text-gray-400">Chat</span>
                                       </button>
                                       <button className="flex flex-col items-center gap-1">
                                          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                          </svg>
                                          <span className="text-[9px] font-medium text-gray-400">Profile</span>
                                       </button>
                                    </div>
                                 </div>

                              </div>

                              {/* Home Indicator */}
                              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-black rounded-full"></div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </div>
   );
};

export default Hero;