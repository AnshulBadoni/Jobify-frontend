"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { Search, Wifi, Signal, Battery, Bookmark, MapPin, Clock, Home, Briefcase, MessageSquare, User, Chrome as ChromeIcon, Tablet, LucideChrome } from 'lucide-react';
import InstagramFeed from './Instagram';

// --- Mock Data ---
const mockJobs: any[] = [
   {
      id: '1',
      title: 'Senior UI/UX Designer',
      company: 'Google',
      companyLogo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
      description: 'Design beautiful user experiences for millions of users worldwide.',
      tags: ['Remote', 'Senior', 'Design'],
      salary: '$120k - $160k',
      location: 'Mountain View, CA',
      postedAt: '2h ago'
   },
   {
      id: '2',
      title: 'Product Designer',
      company: 'Apple',
      companyLogo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg',
      description: 'Create innovative product designs for next-gen devices.',
      tags: ['On-site', 'Product', 'Figma'],
      salary: '$140k - $180k',
      location: 'Cupertino, CA',
      postedAt: '5h ago'
   },
   {
      id: '3',
      title: 'Motion Designer',
      company: 'Spotify',
      companyLogo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spotify/spotify-original.svg',
      description: 'Bring music to life through stunning animations.',
      tags: ['Remote', 'Motion', 'After Effects'],
      salary: '$100k - $130k',
      location: 'New York, NY',
      postedAt: '1d ago'
   },
   {
      id: '4',
      title: 'Frontend Engineer',
      company: 'Airbnb',
      companyLogo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg',
      description: 'Build the next generation of travel experiences.',
      tags: ['Hybrid', 'React', 'TypeScript'],
      salary: '$150k - $190k',
      location: 'San Francisco, CA',
      postedAt: '2d ago'
   }
];

// --- Icons ---
const AppIcons = {

   JobHunt: () => (
      <div className="w-full h-full bg-gradient-to-br from-[#6D28D9] to-[#4C1D95] rounded-[22%] flex items-center justify-center shadow-sm relative overflow-hidden group">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.3),transparent_70%)]"></div>
         <div className="relative flex flex-col items-center">
            <div className="bg-white rounded-lg p-1.5 shadow-lg">
               <Briefcase className="w-4 h-4 text-[#6D28D9]" strokeWidth={2.5} />
            </div>
         </div>
      </div>
   ),
};

// --- Sub-Components ---

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
      ];
      return schemes[idNum % schemes.length];
   }, [job.id]);

   return (
      <div className={`rounded-[24px] p-4 flex flex-col transition-all duration-300 shadow-sm border ${theme.light} border-transparent`}>
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

const StatusBar: React.FC<{ variant: 'light' | 'dark'; time: string }> = ({ variant, time }) => {
   const colorClass = variant === 'light' ? 'text-white' : 'text-gray-900';

   return (
      <div className={`absolute top-0 left-0 right-0 z-50 px-7 pt-[14px] flex justify-between items-center ${colorClass} transition-colors duration-500`}>
         <span className="text-[14px] font-semibold tracking-wide w-[60px] pl-1">{time}</span>

         <div className="flex-1"></div>

         <div className="flex items-center gap-1.5 w-[60px] justify-end pr-1">
            <Wifi className="w-[16px] h-[16px]" strokeWidth={2.5} />
            <div className="relative">
               <Battery className="w-[19px] h-[19px]" strokeWidth={2.5} />
            </div>
         </div>
      </div>
   );
};

const DynamicIsland: React.FC<{ expanded?: boolean }> = ({ expanded }) => (
   <div className="absolute top-[11px] left-1/2 -translate-x-1/2 z-[60]">
      {/* Reduced width to prevent overlapping with Time in status bar */}
      <div className={`bg-black rounded-[24px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-md ${expanded ? 'w-[120px] h-[32px]' : 'w-[100px] h-[30px]'} flex items-center justify-center overflow-hidden relative`}>

         {/* Camera Lens Hardware Simulation */}
         <div className={`absolute right-[22%] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#101015] ring-1 ring-white/5 flex items-center justify-center overflow-hidden z-20 transition-opacity duration-300 ${expanded ? 'opacity-0' : 'opacity-100'}`}>
            <div className="w-1.5 h-1.5 rounded-full bg-[#0a0a20] shadow-[inset_0_1px_2px_rgba(255,255,255,0.15)] relative">
               <div className="absolute top-0.5 right-0.5 w-[2px] h-[2px] bg-indigo-400/40 rounded-full blur-[0.5px]"></div>
            </div>
         </div>

         <div className="flex items-center justify-between w-full px-3 opacity-0 animate-[fadeIn_0.5s_0.2s_forwards]">
            {/* Expanded Content Placeholder */}
         </div>
      </div>
   </div>
);

// --- Screen States ---

const LockScreen: React.FC<{ time: string; date: string; onUnlock: () => void }> = ({ time, date, onUnlock }) => {
   return (
      <div
         className="absolute inset-0 z-30 flex flex-col items-center justify-between overflow-hidden cursor-pointer"
         onClick={onUnlock}
      >
         {/* Wallpaper */}
         <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out hover:scale-105"
            style={{ backgroundImage: 'url("https://w0.peakpx.com/wallpaper/697/23/HD-wallpaper-iphone-14-iphone-apple.jpg")' }}>
            <div className="absolute inset-0 bg-black/20"></div>
         </div>

         <div className="relative z-10 mt-20 text-center w-full px-6">
            <div className="text-white/90 text-sm font-medium drop-shadow-md mb-2">{date}</div>
            <div className="text-white text-7xl font-bold tracking-tight drop-shadow-lg leading-none">
               {time}
            </div>
         </div>

         {/* Notifications */}
         <div className="relative z-10 w-full px-4 flex flex-col gap-2 mt-4">
            <div className="bg-white/40 backdrop-blur-xl rounded-[20px] p-3 flex gap-3 items-center border border-white/20 shadow-lg transform transition-transform hover:scale-[1.02]">
               <div className="w-10 h-10 bg-white rounded-[10px] flex items-center justify-center">
                  <AppIcons.JobHunt />
               </div>
               <div className="flex-1">
                  <div className="flex justify-between items-center mb-0.5">
                     <span className="text-gray-900 text-[13px] font-bold">JobHunt</span>
                     <span className="text-gray-800 text-[11px]">now</span>
                  </div>
                  <p className="text-gray-900 text-[13px] leading-tight">3 new jobs match your profile</p>
               </div>
            </div>
         </div>

         <div className="flex-1"></div>

         <div className="relative z-10 w-full px-12 pb-[50px] flex justify-between items-end h-32">
            <button className="w-[45px] h-[45px] bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/30 transition-colors shadow-lg">
               <svg viewBox="0 0 24 24" className="size-5 text-white" fill="currentColor"><path d="M12 2C9 2 7 3.5 7 6v8c0 2.5 2 4 5 4s5-1.5 5-4V6c0-2.5-2-4-5-4z" opacity="0.9" /></svg>
            </button>
            <button className="w-[45px] h-[45px] bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/30 transition-colors shadow-lg">
               <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" /></svg>
            </button>
         </div>

         <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-white rounded-full z-40 mb-1"></div>
      </div>
   );
};

const HomeScreen: React.FC<{ onAppClick: (appId: string) => void }> = ({ onAppClick }) => {
   const mainApps = [
      { id: 'jobhunt', name: 'JobHunt', Component: AppIcons.JobHunt },
      { id: 'calendar', name: 'Calendar', Component: () => <div className="w-full h-full bg-white rounded-[22%] flex flex-col items-center justify-center shadow-sm"><div className="text-red-500 text-[9px] font-bold uppercase mt-1">WED</div><div className="text-black text-xl font-light -mt-1">28</div></div> },
      { id: 'clock', name: 'Clock', Component: () => <div className="w-full h-full bg-black rounded-[22%] relative border border-gray-700 flex items-center justify-center shadow-sm"><div className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center"><div className="w-0.5 h-3 bg-red-500 absolute top-2 rounded-full"></div><div className="w-0.5 h-3 bg-white absolute bottom-4 rotate-45 rounded-full origin-bottom"></div></div></div> },
      { id: "browser", name: 'Browser', Component: () => <div> <img src="chrome.png" alt="" /> </div> },
   ];

   return (
      <div className="absolute inset-0 z-20">
         <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://pbs.twimg.com/media/G6M_NZKXgAAAo9J?format=jpg&name=large")' }}>
            <div className="absolute inset-0 bg-black/5"></div>
         </div>

         <div className="relative z-10 pt-[70px] px-6 h-full flex flex-col">
            <div className="grid grid-cols-4 gap-x-5 gap-y-8">
               {mainApps.map(app => (
                  <button
                     key={app.id}
                     onClick={() => onAppClick(app.id)}
                     className="flex flex-col items-center gap-1.5 group active:opacity-70 transition-all duration-200"
                  >
                     <div className="w-[50px] h-[50px] transition-transform duration-200 group-active:scale-90">
                        <app.Component />
                     </div>
                     <span className="text-[11px] text-white font-medium drop-shadow-md truncate w-full text-center">
                        {app.name}
                     </span>
                  </button>
               ))}
            </div>

            <div className="mt-10 flex justify-center gap-2">
               <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
               <div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
            </div>

            <div className="flex-1"></div>

            {/* Dock */}
            <div className="mb-[22px] mx-1">
               <div className="bg-white/20 backdrop-blur-2xl rounded-[32px] px-5 py-4 flex justify-between border border-white/10 shadow-lg">
                  <div className="w-[50px] h-[50px] hover:-translate-y-1 transition-transform cursor-pointer active:scale-90"><AppIcons.JobHunt /></div>
               </div>
            </div>
         </div>
      </div>
   );
};

const JobAppScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
   const [activeTab, setActiveTab] = useState('jobs');

   return (
      <div className="absolute inset-0 z-20 bg-gray-50 flex flex-col animate-[slideInUp_0.3s_ease-out]">
         {/* App Header */}
         <div className="pt-14 pb-4 px-6 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-100">
            <div className="flex flex-col">
               <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Welcome Back</span>
               <h1 className="text-xl font-extrabold text-gray-900">Alex Designer</h1>
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-full overflow-hidden border-2 border-white shadow-sm">
               <img src="https://i.pravatar.cc/150?img=12" alt="Profile" className="w-full h-full object-cover" />
            </div>
         </div>

         {/* Search & Filter */}
         <div className="px-6 py-4 bg-white/60 backdrop-blur-md sticky top-[81px] z-10">
            <div className="relative mb-4">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
               <input
                  type="text"
                  placeholder="Search jobs, companies..."
                  className="w-full h-10 bg-white/80 border border-gray-200 rounded-xl pl-9 pr-4 text-[13px] font-medium text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-300 shadow-sm transition-all"
               />
            </div>

            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-6 px-6">
               {['All', 'Design', 'Engineering', 'Marketing', 'Product'].map((filter, i) => (
                  <button key={filter} className={`px-4 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-colors ${i === 0 ? 'bg-gray-900 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-100 shadow-sm'}`}>
                     {filter}
                  </button>
               ))}
            </div>
         </div>

         {/* Content */}
         <div className="flex-1 px-5 pb-24 overflow-y-auto scrollbar-hide space-y-4 pt-1">
            <div className="flex justify-between items-end px-1 mt-2">
               <h2 className="text-[16px] font-bold text-gray-900 tracking-tight">New Opportunities</h2>
               <span className="text-[12px] font-bold text-purple-600">See All</span>
            </div>
            {mockJobs.map((job) => (
               <MiniJobCard key={job.id} job={job} />
            ))}
         </div>

         {/* Bottom Navigation */}
         <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-200 px-6 pt-2 pb-8 shadow-[0_-5px_20px_-10px_rgba(0,0,0,0.05)] rounded-t-[24px]">
            <div className="flex justify-between items-center px-2">
               {[
                  { id: 'home', icon: Home, label: 'Home' },
                  { id: 'jobs', icon: Briefcase, label: 'Jobs' },
                  { id: 'chat', icon: MessageSquare, label: 'Chat' },
                  { id: 'profile', icon: User, label: 'Profile' },
               ].map((tab) => (
                  <button
                     key={tab.id}
                     onClick={() => setActiveTab(tab.id)}
                     className={`flex flex-col items-center gap-1 w-14 py-2 rounded-xl transition-colors duration-200 ${activeTab === tab.id ? 'text-purple-600 bg-purple-50' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                     {activeTab === tab.id ?
                        <tab.icon className="w-5 h-5" fill="currentColor" strokeWidth={0} /> :
                        <tab.icon className="w-5 h-5" strokeWidth={2.3} />
                     }
                     <span className="text-[10px] font-bold">{tab.label}</span>
                  </button>
               ))}
            </div>
         </div>

         {/* Home Indicator Overlay for navigation */}
         <div
            className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-black/80 rounded-full z-50 cursor-pointer hover:bg-black transition-colors hover:scale-105 active:scale-95"
            onClick={onBack}
         ></div>
      </div>
   );
};

const BrowserScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
   const [activeTab, setActiveTab] = useState('jobs');

   return (
      <div className="absolute inset-0 z-20 bg-gray-50 flex flex-col animate-[slideInUp_0.3s_ease-out]">
         {/* App Header */}
         <InstagramFeed />
      </div>
   );
};

// --- Main Hero Component ---

const Hero: React.FC = () => {
   const [screenState, setScreenState] = useState<ScreenState>('lock');
   const [time, setTime] = useState('9:41');
   const [date, setDate] = useState('Monday, January 1');

   useEffect(() => {
      const updateTime = () => {
         const now = new Date();
         setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
         setDate(now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }));
      };
      updateTime();
      const interval = setInterval(updateTime, 1000);
      return () => clearInterval(interval);
   }, []);

   const handlePower = () => setScreenState((prev: ScreenState) => prev === 'off' ? 'lock' : 'off');
   const handleUnlock = () => setScreenState('home');

   const handleGetStarted = () => {
      alert("Navigate to Sign In");
   };

   return (
      <div className="relative bg-white pt-28 lg:pt-32 pb-20 lg:pb-32 overflow-hidden min-h-screen">
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

         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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

                  <h1 className="text-xl md:text-3xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] lg:leading-[1.05] tracking-tight animate-title opacity-0">
                     Your Dream <br className="hidden md:block" />
                     Career Starts <br className="hidden md:block" />
                     <span className="relative inline-block">
                        Here
                        {/* Purple underline swoosh */}
                        <svg className="absolute w-[110%] h-4 lg:h-6 -bottom-1 lg:-bottom-2 left-0 text-purple-600 -z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
                           <path d="M0 15 Q 50 20 100 5" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                        </svg>
                     </span>
                  </h1>

                  <p className="text-gray-500 text-base lg:text-md max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium animate-title opacity-0" style={{ animationDelay: '0.2s' }}>
                     Job Hunting Made Easy: Get instant alerts for jobs matching your skills with our AI-powered job platform.
                  </p>

                  {/* Search Box */}
                  <div className="bg-white border border-gray-200 p-2 pl-4 lg:pl-6 rounded-full shadow-lg max-w-xl w-full flex items-center gap-2 lg:gap-4 transition-all hover:shadow-xl hover:border-gray-300 mx-auto lg:mx-0 animate-title opacity-0" style={{ animationDelay: '0.4s' }}>
                     <Search className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400 flex-shrink-0" />
                     <input
                        type="text"
                        placeholder="Search for a Job"
                        className="flex-1 py-1 lg:py-2 outline-none text-gray-900 placeholder-gray-400 bg-transparent text-sm lg:text-lg font-medium min-w-0"
                     />
                     <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-full font-bold transition-all shadow-md text-sm lg:text-base whitespace-nowrap"
                        onClick={handleGetStarted}
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
                        <p className="text-sm font-bold text-gray-900"><span className="text-purple-600">60k+</span> Talents Found</p>
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
               <div className=" -mt-4 flex justify-center lg:justify-end relative order-1 lg:order-2">
                  {/* Phone Container */}
                  <div className="relative w-[300px] h-[600px] transition-transform duration-500 hover:scale-[1.01]">

                     {/* Titanium Frame Layer 1 (Outer Shadow/Glow) */}
                     <div className="absolute inset-0 rounded-[64px] shadow-[0_0_0_0px_transparent,0_50px_100px_-20px_rgba(50,50,93,0.5),0_30px_60px_-30px_rgba(0,0,0,0.6)] z-0"></div>

                     {/* Titanium Frame Layer 2 (Main Chassis Gradient) */}
                     <div className="absolute inset-0 bg-gradient-to-tr from-[#3a3a3a] via-[#1a1a1a] to-[#3a3a3a] rounded-[64px] shadow-[inset_0_0_4px_1px_rgba(255,255,255,0.2),inset_0_-4px_6px_rgba(0,0,0,0.8)] z-10 border border-[#444]"></div>

                     {/* Titanium Texture Overlay */}
                     <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,#ffffff05_2px,#ffffff05_4px)] rounded-[64px] z-10 pointer-events-none opacity-20"></div>

                     {/* Titanium Frame Layer 3 (Side Highlights) */}
                     <div className="absolute inset-0 rounded-[64px] z-10 pointer-events-none shadow-[inset_0_0_0_2px_rgba(255,255,255,0.05)]"></div>

                     {/* Buttons */}
                     <div className="absolute -left-[3px] top-[120px] w-[3px] h-[35px] bg-[#2a2a2a] rounded-l-sm shadow-[inset_-1px_0_2px_rgba(255,255,255,0.2)] z-0"></div> {/* Mute */}
                     <div className="absolute -left-[3px] top-[180px] w-[3px] h-[60px] bg-[#2a2a2a] rounded-l-sm shadow-[inset_-1px_0_2px_rgba(255,255,255,0.2)] z-0"></div> {/* Vol Up */}
                     <div className="absolute -left-[3px] top-[250px] w-[3px] h-[60px] bg-[#2a2a2a] rounded-l-sm shadow-[inset_-1px_0_2px_rgba(255,255,255,0.2)] z-0"></div> {/* Vol Down */}

                     {/* Power Button Label Indicator */}
                     <div
                        onClick={handlePower}
                        className="absolute -right-[45px] top-[195px] flex items-center animate- z-0 lg:flex cursor-pointer group"
                     >
                        <div className="w-2 h-[1px] bg-red-500/50 group-hover:bg-red-500 transition-colors"></div>
                        <div className="bg-red-500 shadow-md text-white text-sm font-black px-3.5 py-2.5 rounded-xs tracking-widest border border-red-400 group-hover:scale-105 transition-transform" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                           POWER
                        </div>
                     </div>

                     {/* Power Button */}
                     <div
                        onClick={handlePower}
                        className="absolute -right-[3px] top-[195px] w-[3px] h-[90px] bg-[#3a3a3a] rounded-r-sm cursor-pointer active:scale-x-75 origin-left transition-transform shadow-[inset_1px_0_2px_rgba(255,255,255,0.2)] z-20 hover:bg-red-900/40"
                        title="Power Button"
                     ></div>

                     {/* Inner Black Bezel */}
                     <div className="absolute inset-[4px] bg-black rounded-[60px] z-20 overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,1)]">
                        {/* Camera / Sensors Area */}
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-7 bg-black z-20"></div>
                     </div>

                     {/* Screen Content Area - With realistic glass edge bevel */}
                     <div className="absolute inset-[10px] bg-black rounded-[54px] overflow-hidden z-30 transition-opacity duration-500 shadow-[0_0_0_1px_#000,inset_0_0_4px_0_rgba(255,255,255,0.2)] border border-black">

                        {/* Dynamic Island */}
                        {screenState !== 'off' && <DynamicIsland expanded={screenState === 'app'} />}

                        {/* Status Bar */}
                        {screenState !== 'off' && <StatusBar variant={screenState === 'app' ? 'dark' : 'light'} time={time} />}

                        {/* Screens */}
                        <div className={`w-full h-full transition-opacity duration-300 ${screenState === 'off' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                           {screenState === 'lock' && (
                              <LockScreen time={time} date={date} onUnlock={handleUnlock} />
                           )}
                           {screenState === 'home' && (
                              <HomeScreen onAppClick={(id) => id === 'jobhunt' ? setScreenState('app') : (id === 'browser' ? setScreenState('browser') : null)} />
                           )}
                           {screenState === 'app' && (
                              <JobAppScreen onBack={() => setScreenState('home')} />
                           )}
                           {screenState === 'browser' && (
                              <BrowserScreen onBack={() => setScreenState('home')} />
                           )}

                        </div>

                        {/* Screen Gloss/Reflection Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none z-[100] rounded-[54px] mix-blend-overlay opacity-50"></div>
                        <div className="absolute top-0 right-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none z-[100] rounded-t-[54px] opacity-30"></div>

                        {/* Home Indicator (Global) */}
                        {screenState !== 'off' && screenState !== 'app' && screenState !== 'lock' && (
                           <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-white rounded-full z-50 shadow-sm"></div>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Hero;