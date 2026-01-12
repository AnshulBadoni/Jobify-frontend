import React from 'react';
import { Users, MoreHorizontal } from 'lucide-react';

const Community: React.FC = () => {
   return (
      <div className="bg-white pb-20 lg:pb-32">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-50 rounded-[2.5rem] lg:rounded-[3.5rem] pt-8 px-8 md:px-12 lg:px-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

               <div className="flex-1 space-y-6 lg:space-y-8 text-center lg:text-left">
                  <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">Join the Community</p>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-dark leading-[1.1]">
                     Creating strong match with your career goals
                  </h2>
                  <p className="text-gray-500 text-base leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium">
                     Join our community of professionals and access personalized job recommendations, and career resources to help you achieve your career goals.
                  </p>
                  <button className="bg-primary text-white px-8 lg:px-10 py-3 lg:py-4 rounded-full font-bold hover:bg-violet-700 transition-colors shadow-glow text-sm lg:text-base">
                     Get Started
                  </button>
               </div>

               <div className="flex-1 w-full relative">
                  <div className="bg-light-purple/40 rounded-[2.5rem] lg:rounded-[3rem] p-6 lg:p-10 relative min-h-[400px] lg:h-[600px] flex items-center justify-center">

                     {/* Background Pattern */}
                     <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#A855F7_1px,transparent_1px)] bg-[size:20px_20px] rounded-[2.5rem] lg:rounded-[3rem]"></div>

                     {/* Floating Card 1 - Top Right - Hidden on small mobile */}
                     <div className="hidden sm:block absolute top-8 right-8 lg:top-12 lg:right-12 bg-white p-4 lg:p-5 rounded-2xl shadow-card mb-4 max-w-[200px] lg:max-w-[240px] z-10 animate-[bounce_5s_infinite]">
                        <h4 className="font-bold text-dark mb-1 text-sm lg:text-base">Jobs in Tech</h4>
                        <p className="text-[10px] text-gray-400 mb-3 leading-snug font-medium">Many tech companies foster innovative work environments.</p>
                        <button className="bg-dark text-white text-[10px] font-bold px-3 py-1.5 rounded-full hover:bg-primary transition-colors">Details</button>
                     </div>

                     {/* Main Stats Card - Center */}
                     <div className="bg-white p-6 lg:p-8 rounded-[2rem] lg:rounded-[2.5rem] shadow-2xl border border-gray-100 relative z-20 w-full max-w-xs lg:max-w-sm">
                        <div className="flex justify-between items-start mb-6">
                           <h3 className="text-3xl lg:text-4xl font-extrabold text-dark">20K+</h3>
                           <div className="bg-purple-100 p-2 lg:p-3 rounded-2xl">
                              <Users className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                           </div>
                        </div>
                        <p className="text-sm font-bold text-dark mb-6 lg:mb-8">User joined the Community</p>

                        <div className="pt-6 border-t border-gray-100">
                           <h4 className="font-bold text-dark mb-2 text-base lg:text-lg">Salaries in Tech</h4>
                           <p className="text-xs text-gray-400 mb-4 leading-relaxed font-medium">Tech salaries are generally quite competitive.</p>
                           <div className="flex justify-between items-center">
                              <div className="flex -space-x-2">
                                 {[1, 2, 3].map(i => <div key={i} className="w-7 h-7 lg:w-8 lg:h-8 rounded-full border-2 border-white bg-gray-200">
                                    <img src={`https://picsum.photos/50/50?random=${i + 20}`} className="w-full h-full rounded-full object-cover" />
                                 </div>)}
                              </div>
                              <button className="bg-dark text-white text-[10px] font-bold px-4 py-2 rounded-full hover:bg-primary transition-colors">Details</button>
                           </div>
                        </div>
                     </div>

                     {/* Floating Card 2 - Bottom Left - Hidden on small mobile */}
                     <div className="hidden sm:block absolute bottom-12 left-6 lg:bottom-20 lg:left-8 bg-[#FFFBEB] p-4 lg:p-5 rounded-2xl shadow-card mt-4 max-w-[180px] lg:max-w-[220px] z-10 animate-[bounce_6s_infinite] border border-yellow-100">
                        <h4 className="font-bold text-dark mb-1 text-sm lg:text-base">Designers</h4>
                        <p className="text-[10px] text-gray-500 mb-3 leading-snug font-medium">Design jobs are all about creating visual components.</p>
                        <button className="bg-dark text-white text-[10px] font-bold px-3 py-1.5 rounded-full hover:bg-primary transition-colors">Details</button>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </div>
   );
};

export default Community;