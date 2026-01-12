import React from 'react';

const Stats: React.FC = () => {
  return (
    <div className="w-full bg-light-purple/30 py-16 lg:py-24 border-y border-purple-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 items-start">
          <div className="space-y-3">
            <p className="text-gray-400 text-sm font-medium tracking-wide">Join Connect Today</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-dark leading-tight">
              Experience <br />
              with Number
            </h2>
          </div>
          
          <div className="space-y-2 lg:space-y-3 pt-2">
            <h3 className="text-4xl lg:text-5xl font-extrabold text-primary tracking-tight">92%</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">Many users find relevant jobs according to skills</p>
          </div>

          <div className="space-y-2 lg:space-y-3 pt-2">
            <h3 className="text-4xl lg:text-5xl font-extrabold text-primary tracking-tight">90%</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">Data filtering from companies doesn't take long</p>
          </div>

          <div className="space-y-2 lg:space-y-3 pt-2">
            <h3 className="text-4xl lg:text-5xl font-extrabold text-primary tracking-tight">89%</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">Many top employers and can connect with Mony users</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;