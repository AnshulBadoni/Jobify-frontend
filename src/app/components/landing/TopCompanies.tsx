import React from 'react';
import { Search, ArrowUpRight } from 'lucide-react';

const TopCompanies: React.FC = () => {
   return (
      <div id="companies" className="bg-white pb-20 lg:pb-32">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row justify-between items-end gap-8 lg:gap-10">
               <div className="max-w-xl w-full">
                  <p className="text-gray-400 text-sm font-medium mb-3 uppercase tracking-wider">Top Companies</p>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-dark leading-tight">Best Places to<br />Work 2026</h2>
               </div>
               <div className="w-full lg:w-auto">
                  <p className="text-sm text-gray-400 mb-6 max-w-sm leading-relaxed font-medium">Leverage the job finder's company review section to gain insights into employee experiences at different companies.</p>
                  <div className="bg-white border border-gray-200 p-2 rounded-full flex items-center shadow-soft w-full lg:w-[28rem] shadow-md hover:shadow-lg transition-shadow">
                     <input
                        type="text"
                        placeholder="Search for a Companies"
                        className="flex-1 px-4 text-sm outline-none text-dark font-medium bg-transparent placeholder-gray-400 min-w-0"
                     />
                     <Search className="w-4 h-4 text-gray-400 mx-2 flex-shrink-0" />
                     <button className="bg-violet-500 text-white text-xs font-bold px-4 md:px-6 py-3 rounded-full hover:bg-violet-600 transition-colors whitespace-nowrap">
                        Get Started
                     </button>
                  </div>
               </div>
            </div>

            {/* Arrow graphic */}
            <div className="flex justify-center mb-12 lg:mb-16 relative h-10 md:flex">
               <div className="absolute left-1/2 -translate-x-1/2">
                  <svg width="60" height="60" viewBox="0 0 50 50" fill="none" className="text-primary rotate-180 transform scale-x-[-1] opacity-60">
                     <path d="M10 40 Q 25 10 40 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                     <path d="M35 15 L 40 10 L 35 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
               </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
               {/* Upwork */}
               <div className="bg-gray-50 rounded-[2.5rem] p-8 lg:p-10 group hover:bg-white hover:shadow-xl transition-all duration-300 relative border border-transparent hover:border-gray-100 flex flex-col h-full min-h-[320px]">
                  <div className="flex justify-between items-start mb-8">
                     <div className="text-secondary font-bold text-3xl tracking-tighter">
                        <img src="upwork.png" className="w-8 h-8" alt="Upwork" />
                     </div>
                     <button className="w-12 h-12 bg-dark rounded-full flex items-center justify-center text-white bg-black group-hover:bg-violet-600 transition-colors shadow-lg">
                        <ArrowUpRight className="w-5 h-5" />
                     </button>
                  </div>
                  <div className="mt-auto">
                     <p className="text-xs text-gray-500 mb-2 font-bold uppercase tracking-wide">Upwork</p>
                     <h3 className="text-xl lg:text-2xl font-bold text-dark mb-4 leading-tight">Upwork is a Popular Online Platform</h3>
                     <p className="text-gray-400 text-sm leading-relaxed font-medium">Upwork is a valuable tool for businesses seeking freelance talent and for independent professionals looking to expand their reach.</p>
                  </div>
               </div>

               {/* Google - Added overflow-hidden to fix background logo spill */}
               <div className="bg-white rounded-[2.5rem] p-8 lg:p-10 shadow-xl border border-gray-100 relative flex flex-col h-full transform lg:-translate-y-4 overflow-hidden min-h-[320px] group">
                  <div className="flex justify-between items-start mb-8">
                     <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" className="w-8 h-8" alt="Google" />
                  </div>
                  <div className="mt-auto relative z-10">
                     <p className="text-xs text-gray-500 mb-2 font-bold uppercase tracking-wide">Google</p>
                     <h3 className="text-xl lg:text-2xl font-bold text-dark mb-4 leading-tight">Google is a Tech Giant</h3>
                     <p className="text-gray-400 text-sm leading-relaxed font-medium">Google is a major player in the tech industry, shaping how people access information, communicate, and consume entertainment.</p>
                  </div>

                  {/* Decorative Google Logo bottom left */}
                  <div className="absolute bottom-6 left-6 opacity-5 scale-[2] pointer-events-none grayscale">
                     <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" className="w-20 h-20" alt="Google" />
                  </div>
                  <div className="absolute top-10 right-10">
                     <button className="w-12 h-12 bg-dark rounded-full flex items-center justify-center text-white bg-black group-hover:bg-violet-600 transition-colors shadow-lg">
                        <ArrowUpRight className="w-5 h-5" />
                     </button>
                  </div>
               </div>

               {/* LinkedIn */}
               <div className="bg-gray-50 rounded-[2.5rem] p-8 lg:p-10 group hover:bg-white hover:shadow-xl transition-all duration-300 relative border border-transparent hover:border-gray-100 flex flex-col h-full min-h-[320px]">
                  <div className="flex justify-between items-start mb-8">
                     <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" className="w-8 h-8" alt="LinkedIn" />
                     <button className="w-12 h-12 bg-dark rounded-full flex items-center justify-center text-white bg-black group-hover:bg-violet-600 transition-colors shadow-lg">
                        <ArrowUpRight className="w-5 h-5" />
                     </button>
                  </div>
                  <div className="mt-auto">
                     <p className="text-xs text-gray-500 mb-2 font-bold uppercase tracking-wide">LinkedIn</p>
                     <h3 className="text-xl lg:text-2xl font-bold text-dark mb-4 leading-tight">LinkedIn is a Professional Social Networking Platform</h3>
                     <p className="text-gray-400 text-sm leading-relaxed font-medium">Overall, LinkedIn is a powerful tool for professionals of all levels.</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default TopCompanies;