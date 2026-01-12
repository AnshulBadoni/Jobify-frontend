import React from 'react';
import { Clock, UserCheck, Search, Target, Zap, Microscope } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
   return (
      <div id="whyus" className="bg-[#FAFAFA] py-24">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
               <p className="text-gray-400 text-sm font-medium mb-3 uppercase tracking-wider">Choose me</p>
               <h2 className="text-4xl lg:text-5xl font-extrabold text-dark mb-8">Why We are Right<br />for You?</h2>

               <div className="flex justify-center gap-4 flex-wrap items-center">
                  <span className="bg-yellow-50 text-dark border border-yellow-100 px-8 py-3 rounded-full text-sm font-bold shadow-sm">Make</span>
                  <span className="bg-green-50 text-dark border border-green-100 px-8 py-3 rounded-full text-sm font-bold shadow-sm">it</span>
                  <span className="bg-pink-50 text-dark border border-pink-100 px-8 py-3 rounded-full text-sm font-bold shadow-sm">easier</span>
                  <span className="bg-blue-50 text-dark border border-blue-100 px-8 py-3 rounded-full text-sm font-bold shadow-sm">with</span>
                  <span className="bg-violet-500 text-white border border-primary px-8 py-3 rounded-full text-sm font-bold shadow-glow">Us</span>
               </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               {/* Item 1 */}
               <div className="bg-white rounded-[2.5rem] p-10 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-gray-100/50 hover:border-gray-100 transition-all duration-300 hover:-translate-y-2 group">
                  <div className="flex justify-between items-start mb-8">
                     <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <Clock className="w-6 h-6" />
                     </div>
                     <span className="text-gray-200 text-2xl font-black group-hover:text-purple-400 transition-colors">01</span>
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-4">Time-Saving Efficiency</h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-medium">Stop wasting time scouring multiple job boards and company websites. Our comprehensive search engine aggregates listings.</p>
               </div>

               {/* Item 2 */}
               <div className="bg-white rounded-[2.5rem] p-10 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-gray-100/50 hover:border-gray-100 transition-all duration-300 hover:-translate-y-2 group">
                  <div className="flex justify-between items-start mb-8">
                     <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <UserCheck className="w-6 h-6" />
                     </div>
                     <span className="text-gray-200 text-2xl font-black group-hover:text-purple-400 transition-colors">02</span>
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-4">Personalized Results</h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-medium">Tailor your job hunt to your unique goals. Save your search filters and receive instant alerts whenever new opportunities match.</p>
               </div>

               {/* Item 3 */}
               <div className="bg-white rounded-[2.5rem] p-10 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-gray-100/50 hover:border-gray-100 transition-all duration-300 hover:-translate-y-2 group">
                  <div className="flex justify-between items-start mb-8">
                     <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <Search className="w-6 h-6" />
                     </div>
                     <span className="text-gray-200 text-2xl font-black group-hover:text-purple-400 transition-colors">03</span>
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-4">Uncover Hidden Gems</h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-medium">Go beyond basic job boards and access a wider pool of job postings from diverse sources.</p>
               </div>

               {/* Item 4 */}
               <div className="bg-white rounded-[2.5rem] p-10 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-gray-100/50 hover:border-gray-100 transition-all duration-300 hover:-translate-y-2 group">
                  <div className="flex justify-between items-start mb-8">
                     <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <Target className="w-6 h-6" />
                     </div>
                     <span className="text-gray-200 text-2xl font-black group-hover:text-purple-400 transition-colors">04</span>
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-4">Unmatched Accuracy</h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-medium">Our advanced search and filter system allows you to target the exact type of job you're looking for.</p>
               </div>

               {/* Item 5 */}
               <div className="bg-white rounded-[2.5rem] p-10 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-gray-100/50 hover:border-gray-100 transition-all duration-300 hover:-translate-y-2 group">
                  <div className="flex justify-between items-start mb-8">
                     <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <Zap className="w-6 h-6" />
                     </div>
                     <span className="text-gray-200 text-2xl font-black group-hover:text-purple-400 transition-colors">05</span>
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-4">Save Valuable Time</h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-medium">No more sifting through irrelevant postings! Find the perfect job faster with precise filtering options.</p>
               </div>

               {/* Item 6 */}
               <div className="bg-white rounded-[2.5rem] p-10 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-gray-100/50 hover:border-gray-100 transition-all duration-300 hover:-translate-y-2 group">
                  <div className="flex justify-between items-start mb-8">
                     <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <Microscope className="w-6 h-6" />
                     </div>
                     <span className="text-gray-200 text-2xl font-black group-hover:text-purple-400 transition-colors">06</span>
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-4">Laser Focus Your Search</h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-medium">Explore industries and roles you might not have considered before, broadening your job search horizons.</p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default WhyChooseUs;