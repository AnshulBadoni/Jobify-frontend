import React from 'react';
import { Facebook, Instagram, Linkedin, Youtube, Command } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer>
    <div className="m-16 rounded-[3rem] bg-[#111111] pt-20 pb-10 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-[1400px] mx-auto">

        {/* Main Red Container with Hard-Stop Curtain Gradient */}
       <div
  className="relative rounded-[3rem] p-12 lg:p-20 shadow-2xl overflow-hidden"
  style={{
    background: `linear-gradient(90deg,
      #FF0015 0%,
      #FF0015 10%,

      #E50914 10%,
      #E50914 18%,

      #B20710 18%,
      #B20710 28%,

      #6A0007 28%,
      #6A0007 38%,

      #4A0005 38%,
      #4A0005 50%,

      #6A0007 50%,
      #6A0007 62%,

      #B20710 62%,
      #B20710 72%,

      #E50914 72%,
      #E50914 82%,

      #FF0015 82%,
      #FF0015 100%
    )`
  }}
>

          {/* Content Grid */}
          <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-8 relative z-10">

            {/* Left Section: Brand & Description */}
            <div className="lg:w-[35%] space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center transform rotate-12">
                  <Command className="w-5 h-5 text-[#FF0015]" strokeWidth={3} />
                </div>
                <span className="text-3xl font-bold text-white tracking-tight">Elevate</span>
              </div>

              <p className="text-white text-lg leading-relaxed font-medium">
                Elevate helps teams collaborate faster and work smarter with our all-in-one project management platform. Trusted by over 10,000 companies worldwide.
              </p>

              <div className="flex gap-4 pt-4">
                {[
                  { icon: Linkedin, href: '#' },
                  { icon: Facebook, href: '#' },
                  { icon: Instagram, href: '#' },
                  { icon: Youtube, href: '#' }
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform duration-200"
                  >
                    <social.icon size={20} strokeWidth={2.5} />
                  </a>
                ))}
              </div>
            </div>

            {/* Right Section: Navigation Columns */}
            <div className="lg:w-[50%] flex flex-wrap justify-between gap-10 lg:pl-10 pt-2">

              {/* Product Column */}
              <div className="space-y-6 min-w-[140px]">
                <h4 className="text-white font-bold text-xl">Product</h4>
                <ul className="space-y-4">
                  {['Features', 'Integrations', 'Pricing', 'Updates', 'Roadmap', 'Enterprise'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-white hover:text-white/80 transition-colors text-base font-medium block">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company Column */}
              <div className="space-y-6 min-w-[140px]">
                <h4 className="text-white font-bold text-xl">Company</h4>
                <ul className="space-y-4">
                  {['About Us', 'Careers', 'Contact', 'Press Kit', 'Partners'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-white hover:text-white/80 transition-colors text-base font-medium block">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources Column */}
              <div className="space-y-6 min-w-[140px]">
                <h4 className="text-white font-bold text-xl">Resources</h4>
                <ul className="space-y-4">
                  {['Documentation', 'API Reference', 'Help Center', 'Blog'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-white hover:text-white/80 transition-colors text-base font-medium block">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>

        {/* Copyright Section (Outside the Red Box) */}
        <div className="mt-12 text-center">
          <p className="text-white/60 text-sm font-medium">
            &copy; {new Date().getFullYear()} Elevate Inc. All rights reserved.
          </p>
        </div>

      </div>
    </div>
    </footer>
  );
};

export default Footer;