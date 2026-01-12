import React from 'react';
import { CATEGORIES } from '../../constants';

const Categories: React.FC = () => {
  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-bold uppercase tracking-wider">Category</span>
          <h2 className="text-4xl font-bold text-dark mt-2 mb-6">Find Skills That Suit Your Interests</h2>

          <div className="flex justify-center gap-8 text-sm font-medium">
            <button className="text-primary border-b-2 border-primary pb-1">Near You</button>
            <button className="text-gray-400 hover:text-dark transition-colors">Top Skills</button>
            <button className="text-gray-400 hover:text-dark transition-colors">Trending Skills</button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="group p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-white group-hover:bg-primary/10 rounded-xl transition-colors text-dark group-hover:text-primary">
                  {cat.icon}
                </div>
              </div>
              <h3 className="text-lg font-bold text-dark mb-1 group-hover:text-primary transition-colors">{cat.title}</h3>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div> {cat.jobs} Jobs
                </span>
                <span className="font-semibold text-gray-900">{cat.salary}<span className="text-gray-400 font-normal"> /Month</span></span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-emerald-500 transition-colors shadow-lg shadow-primary/20">
            Browse All
          </button>
        </div>
      </div>
    </div>
  );
};

export default Categories;