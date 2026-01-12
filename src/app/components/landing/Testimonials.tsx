"use client";
import React, { useState } from 'react';
import { TESTIMONIALS } from '../../constants';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const activeTestimonial = TESTIMONIALS[activeIndex];

  return (
    <div className="bg-white py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image Section */}
          <div className="relative w-full max-w-md lg:max-w-full mx-auto order-1 lg:order-1">
            <div className="bg-purple-50 rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden aspect-[4/5] lg:aspect-square relative flex items-end justify-center shadow-inner">
              <img
                key={activeTestimonial.image} // Re-render image on change
                src={activeTestimonial.image}
                alt={activeTestimonial.name}
                className="w-full h-full object-cover relative z-10 animate-fade-in"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full text-center lg:text-left order-2 lg:order-2">
            <p className="text-gray-400 text-sm font-bold uppercase tracking-wide mb-3">Connect's Users</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-dark mb-8 lg:mb-12 leading-tight">
              What Our Users Say<br className="hidden lg:block" /> About Connect
            </h2>

            {/* Navigation Buttons */}
            <div className="flex justify-center lg:justify-start gap-4 mb-8 lg:mb-10">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 active:scale-95"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 active:scale-95"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center lg:justify-start gap-2 mb-6">
              {TESTIMONIALS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-8 bg-primary' : 'w-2 bg-gray-200'}`}
                ></div>
              ))}
            </div>

            {/* Testimonial Text */}
            <div className="space-y-4 min-h-[180px] lg:min-h-[200px]">
              <div className="animate-fade-in">
                <h3 className="text-2xl lg:text-3xl font-bold text-dark">{activeTestimonial.name}</h3>
                <p className="text-primary font-bold text-base lg:text-lg mb-4">{activeTestimonial.role}</p>
                <p className="text-gray-500 text-base lg:text-xl leading-relaxed italic font-medium">
                  "{activeTestimonial.text}"
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Testimonials;