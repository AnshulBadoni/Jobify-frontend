import React from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-white pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Visual - Mockup */}
          <div className="relative">
            <div className="bg-gray-100 rounded-[3rem] p-8 relative z-10">
              <div className="space-y-4">
                {/* Chat Bubble 1 */}
                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm max-w-xs animate-slide-in-left">
                  <div className="flex items-center gap-3 mb-2">
                    <img src="https://picsum.photos/40/40?random=10" alt="User" className="w-8 h-8 rounded-full" />
                    <div>
                      <p className="text-xs font-bold text-dark">Michaela</p>
                      <p className="text-[10px] text-gray-400">System Analyst</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">Congratulations, your application has been successfully sent.</p>
                </div>

                {/* Chat Bubble 2 */}
                <div className="bg-primary p-4 rounded-2xl rounded-tr-none shadow-lg max-w-xs ml-auto text-white">
                  <p className="text-xs">Hello Michael, thank you for the information provided. Can we reschedule for the interview?</p>
                </div>

                <div className="bg-white p-3 rounded-full shadow-sm flex items-center gap-3">
                   <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
                   <div className="h-2 w-24 bg-gray-100 rounded-full"></div>
                   <Send className="w-4 h-4 text-primary ml-auto" />
                </div>
              </div>
              
              {/* Floating Image */}
              <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-48 h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-white hidden md:block">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" alt="Meeting" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Decorative dots */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-dots-pattern opacity-20"></div>
          </div>

          {/* Right Content */}
          <div>
            <span className="text-primary text-sm font-bold uppercase tracking-wider">More About JobNest</span>
            <h2 className="text-4xl font-bold text-dark mt-4 mb-6 leading-tight">
              Empowering Dreams, <br />
              Crafting Futures <br />
              Together
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Realizing dreams and shaping a better future through cooperation and mutual support. We connect you with the best opportunities globally.
            </p>

            <div className="grid grid-cols-3 gap-8">
              <div>
                <h4 className="text-2xl font-bold text-dark">100K</h4>
                <p className="text-sm text-gray-500">Users</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-dark">15K</h4>
                <p className="text-sm text-gray-500">Job Vacancy</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-dark">5+ Years</h4>
                <p className="text-sm text-gray-500">Experience</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;