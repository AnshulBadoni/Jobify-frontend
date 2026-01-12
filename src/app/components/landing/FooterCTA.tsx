import React from 'react';

const FooterCTA: React.FC = () => {
  return (
    <div id="contact" className="bg-white pb-16 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-light-yellow rounded-[2.5rem] lg:rounded-[4rem] p-8 md:p-12 lg:p-20 relative overflow-hidden">

          <div className="relative z-10 max-w-2xl">
            <p className="text-gray-400 text-sm font-medium mb-3 uppercase tracking-wide">Let's Find your Dream Job</p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-dark mb-6 lg:mb-8 leading-[1.1]">
              Ready to take<br />
              your career to<br />
              the next level?
            </h2>
            <p className="text-gray-500 text-sm lg:text-base mb-8 lg:mb-10 max-w-md leading-relaxed font-medium">
              Our website is more than just a search engine. Sign up today and unlock a world of possibilities!
            </p>

            <div className="bg-white p-2 lg:p-2.5 rounded-full flex items-center shadow-sm max-w-lg border border-gray-100">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 lg:px-6 outline-none text-xs lg:text-sm text-dark placeholder-gray-400 font-medium bg-transparent min-w-0"
              />
              <button className="bg-primary text-white text-xs font-bold px-6 lg:px-8 py-3 lg:py-3.5 rounded-full hover:bg-violet-700 transition-colors shadow-glow whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>

          {/* Floating Cards - Desktop Only */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 hidden lg:block w-1/3 h-full pointer-events-none">
            <div className="absolute top-16 right-16 bg-white p-5 rounded-2xl shadow-card flex items-center gap-4 animate-[bounce_5s_infinite]">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" className="w-10 h-10" alt="Google" />
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">Google</p>
                <p className="text-sm font-bold text-dark">Sr. UI/UX Designer</p>
              </div>
            </div>

            <div className="absolute bottom-32 left-8 bg-white p-5 rounded-2xl shadow-card flex items-center gap-4 animate-[bounce_6s_infinite]">
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg" className="w-10 h-10" alt="Notion" />
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">Notion</p>
                <p className="text-sm font-bold text-dark">Senior Motion Designer</p>
              </div>
            </div>

            {/* Decorative Arrow */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-60">
              <svg width="80" height="80" viewBox="0 0 60 60" fill="none" className="text-primary rotate-12">
                <path d="M10 30 Q 30 10 50 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M45 25 L 50 30 L 45 35" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FooterCTA;