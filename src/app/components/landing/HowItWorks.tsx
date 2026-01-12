import React from 'react';
import { UserPlus, Search, Send } from 'lucide-react';

const steps = [
  {
    icon: <UserPlus className="w-6 h-6 text-primary" />,
    title: "Sign Up For Jobnest",
    desc: "Unlock thousands of career opportunities on Jobnest! Sign up now to match your skills.",
    image: "https://plus.unsplash.com/premium_photo-1681487746049-c39357159f69?q=80&w=2070&auto=format&fit=crop"
  },
  {
    icon: <Search className="w-6 h-6 text-primary" />,
    title: "Discover Opportunities",
    desc: "Explore thousands of diverse job vacancies across industries! Find your perfect match today.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop"
  },
  {
    icon: <Send className="w-6 h-6 text-primary" />,
    title: "Apply And Thrive",
    desc: "Turn your career dreams into reality! Apply now for exciting job opportunities in growing industries.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop"
  }
];

const HowItWorks: React.FC = () => {
  return (
    <div className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-primary text-sm font-bold uppercase tracking-wider">How It Works ?</span>
        <h2 className="text-3xl font-bold text-dark mt-2 mb-4">Easy To Use, Easy To Apply</h2>
        <p className="text-gray-500 max-w-2xl mx-auto mb-16">
          Find your dream job easily and quickly. Our platform is designed for your convenience, making the search and application process easy.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl transition-shadow duration-300 text-left group">
              <div className="h-40 bg-gray-100 rounded-2xl mb-6 overflow-hidden relative">
                 {/* Abstract UI representation within the card */}
                 <img src={step.image} alt={step.title} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500" />
                 <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                    <div className="bg-white p-3 rounded-xl shadow-lg">
                        {step.icon}
                    </div>
                 </div>
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;