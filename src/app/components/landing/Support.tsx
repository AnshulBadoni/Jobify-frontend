import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const benefits = [
  "Career Information Center.",
  "Latest Job Vacancies.",
  "Career Guidance.",
  "Skills Development.",
  "Portfolio & CV development",
  "Professional Network.",
  "Interview Consultation.",
  "Job Recommendations."
];

const Support: React.FC = () => {
  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="relative order-2 lg:order-1">
             <div className="bg-gray-100 rounded-3xl p-8 relative">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                  alt="Team Support" 
                  className="rounded-2xl shadow-lg w-full h-[400px] object-cover" 
                />
                
                <div className="absolute bottom-12 left-12 bg-white p-4 rounded-xl shadow-xl flex items-center gap-4 max-w-xs">
                   <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white">
                      <CheckCircle2 className="w-6 h-6" />
                   </div>
                   <div>
                      <p className="font-bold text-dark text-sm">Project Manager</p>
                      <p className="text-xs text-gray-500">240+ Applied</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="text-primary text-sm font-bold uppercase tracking-wider">We Help You</span>
            <h2 className="text-4xl font-bold text-dark mt-2 mb-6">
              We Are Here To Help Your Career
            </h2>
            <p className="text-gray-500 mb-8">
              We are committed to supporting your career journey towards success.
            </p>

            <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8 mb-8">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-dark" />
                  <span className="text-gray-600 text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button className="px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-emerald-500 transition-colors shadow-lg shadow-primary/20">
                Sign Up For Free
              </button>
              <button className="px-8 py-3 border border-gray-200 text-dark rounded-full font-semibold hover:bg-gray-50 transition-colors">
                Learn More
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Support;