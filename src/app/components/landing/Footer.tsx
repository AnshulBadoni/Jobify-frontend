import React from 'react';
import { Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-dark py-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          
          <div className="flex items-center gap-2">
            <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 10C10 12.7614 7.76142 15 5 15C2.23858 15 0 12.7614 0 10C0 7.23858 2.23858 5 5 5C7.76142 5 10 7.23858 10 10Z" stroke="black" strokeWidth="2"/>
              <path d="M25 10C25 12.7614 22.7614 15 20 15C17.2386 15 15 12.7614 15 10C15 7.23858 17.2386 5 20 5C22.7614 5 25 7.23858 25 10Z" stroke="black" strokeWidth="2"/>
              <path d="M40 10C40 12.7614 37.7614 15 35 15C32.2386 15 30 12.7614 30 10C30 7.23858 32.2386 5 35 5C37.7614 5 40 7.23858 40 10Z" stroke="black" strokeWidth="2"/>
            </svg>
          </div>

          <div className="flex gap-8 text-sm font-medium">
             <a href="#" className="hover:text-primary">Find a Job</a>
             <a href="#" className="hover:text-primary">Companies</a>
             <a href="#" className="hover:text-primary">Why Connect?</a>
             <a href="#" className="hover:text-primary">Contact</a>
          </div>

          <div className="flex gap-4">
             <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer text-gray-400">
               <Instagram className="w-4 h-4" />
             </div>
             <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer text-gray-400">
               <Twitter className="w-4 h-4" />
             </div>
             <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer text-gray-400">
               <Linkedin className="w-4 h-4" />
             </div>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 border-t border-gray-100 pt-8">
           <p className="max-w-xs text-center md:text-left">Wellington Square, Oxford OX1 2JD, United Kingdom 85648 (+44 1865 270000)</p>
           <div className="flex gap-6 mt-4 md:mt-0">
             <p>© 2024 Connect. All rights reserved.</p>
             <div className="flex gap-4">
                <a href="#" className="hover:text-dark">Terms of Service</a>
                <a href="#" className="hover:text-dark">Privacy Policy</a>
                <a href="#" className="hover:text-dark">Partners</a>
             </div>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;