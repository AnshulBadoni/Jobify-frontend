import React from 'react';
import { BRANDS } from '../../constants';

const Brands: React.FC = () => {
  return (
    <div className="bg-white pb-12 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-gray-500 text-sm font-medium mb-8">Several companies are opening vacancies here</p>
        <div className="flex flex-wrap items-center gap-8 md:gap-12 opacity-40">
          {/* Recreating brand logos with text/svg placeholders for simplicity or using devicon CDN if available */}
          <img src="upwork.png" className="h-10 grayscale hover:grayscale-0 transition-all cursor-pointer" alt="Upwork" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" className="h-8 grayscale hover:grayscale-0 transition-all cursor-pointer" alt="Github" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg" className="h-8 grayscale hover:grayscale-0 transition-all cursor-pointer" alt="Notion" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg" className="h-6 grayscale hover:grayscale-0 transition-all cursor-pointer" alt="Slack" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" className="h-6 grayscale hover:grayscale-0 transition-all cursor-pointer" alt="Google" />
        </div>
      </div>
    </div>
  );
};

export default Brands;