"use client"
import React from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

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

               {/* Right Visual - Mock App Interface */}
               <div className="relative flex justify-center lg:justify-end mt-12 lg:mt-0">
                  {/* Background blobs */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-purple-50 rounded-full blur-3xl -z-10 opacity-60"></div>


                  {/* Phone Frame - Made responsive max-w */}
                  <div className="bg-white p-2 lg:p-3 rounded-[2.5rem] lg:rounded-[3rem] shadow-2xl border-[4px] lg:border-[6px] border-gray-50 w-full max-w-[300px] lg:max-w-[340px] max-h-[600px] relative z-10 mx-auto">
                     <div className="bg-white rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden h-[550px] lg:h-[540px] relative border border-gray-100 flex flex-col">
                        {/* App Header */}
                        <div className="px-5 lg:px-6 pt-6 lg:pt-8 pb-4 flex justify-between items-center bg-white sticky top-0 z-10">
                           <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-200 rounded-full overflow-hidden border border-gray-100">
                              <img src="https://picsum.photos/100/100?random=50" className="w-full h-full object-cover" />
                           </div>
                           <div className="flex gap-1.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                              <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                           </div>
                        </div>

                        {/* In-App Search */}
                        <div className="px-5 lg:px-6 mb-4 lg:mb-6">
                           <div className="bg-white border border-gray-100 p-3 lg:p-4 rounded-2xl shadow-sm flex items-center gap-3">
                              <Search className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
                              <span className="text-xs lg:text-sm text-gray-400 font-medium">Search Your Job</span>
                           </div>
                        </div>

                        {/* Scrollable Content */}
                        <div className="px-5 lg:px-6 space-y-4 overflow-y-auto scrollbar-hide pb-6 flex-1">
                           <div className="flex justify-between items-end">
                              <p className="text-base lg:text-lg font-bold text-dark">Your Job</p>
                              <p className="text-[10px] lg:text-xs text-primary font-medium">See all</p>
                           </div>

                           {/* Job Card 1 */}
                           <div className="bg-white p-4 rounded-3xl shadow-card border border-gray-50">
                              <div className="flex justify-between items-start mb-3">
                                 <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white border border-gray-100 p-1.5">
                                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" className="w-full h-full" />
                                 </div>
                                 <span className="text-[10px] text-green-600 bg-green-50 px-2 py-1 rounded-full font-bold">Trusted</span>
                              </div>
                              <h4 className="text-sm lg:text-base font-bold text-dark mb-1">Junior UI/UX</h4>
                              <p className="text-[10px] lg:text-xs text-gray-400 mb-3">Google • Jakarta</p>
                              <div className="flex gap-2 mb-3">
                                 <span className="text-[10px] bg-gray-50 px-2 py-1 rounded-lg text-gray-500 font-medium">Full time</span>
                                 <span className="text-[10px] bg-gray-50 px-2 py-1 rounded-lg text-gray-500 font-medium">Junior</span>
                              </div>
                              <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                                 <span className="text-xs lg:text-sm font-bold text-dark">$250<span className="text-gray-400 font-normal">/hr</span></span>
                                 <button className="bg-dark text-white text-[10px] font-bold px-3 lg:px-4 py-1.5 lg:py-2 rounded-full">Details</button>
                              </div>
                           </div>

                           {/* Job Card 2 */}
                           <div className="bg-white p-4 rounded-3xl shadow-card border border-gray-50">
                              <div className="flex justify-between items-start mb-3">
                                 <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-pink-50 p-1.5 lg:p-2 flex items-center justify-center text-pink-500 font-bold border border-pink-100 text-xs">
                                    Dr
                                 </div>
                              </div>
                              <h4 className="text-sm lg:text-base font-bold text-dark mb-1">Sr. Motion Designer</h4>
                              <p className="text-[10px] lg:text-xs text-gray-400 mb-3">Dribbble • Remote</p>
                              <div className="flex gap-2 mb-3">
                                 <span className="text-[10px] bg-gray-50 px-2 py-1 rounded-lg text-gray-500 font-medium">Part time</span>
                                 <span className="text-[10px] bg-gray-50 px-2 py-1 rounded-lg text-gray-500 font-medium">Senior</span>
                              </div>
                              <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                                 <span className="text-xs lg:text-sm font-bold text-dark">$450<span className="text-gray-400 font-normal">/hr</span></span>
                                 <button className="bg-dark text-white text-[10px] font-bold px-3 lg:px-4 py-1.5 lg:py-2 rounded-full">Details</button>
                              </div>
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