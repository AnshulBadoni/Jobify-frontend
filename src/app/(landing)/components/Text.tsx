"use client";
import React from 'react';
import { ArrowRight } from 'lucide-react';

const Text = () => {
    // Marquee text data with directions
    const marqueeLines = [
        { text: "Get Perfect Job", direction: "right", speed: "slow" },
        { text: "AI Powered", direction: "left", speed: "normal" },
        { text: "Easy to use", direction: "right", speed: "normal" },
        { text: "Mock Interviews", direction: "left", speed: "normal" },
        { text: "Join Us", direction: "right", speed: "slow" }
    ];

    // Client testimonials
    const testimonials = [
        {
            quote: "The flexibility to customize the editor UI at a lower cost is a core requirement to build an editor that integrates seemingly across GitLab.",
            company: "GitLab",
            description: "DevSecOps platform",
            logo: "https://cdn.prod.website-files.com/649fb1e58cd0c1375ad3909b/6679c641396e8cd540a7977b_gitlab-long.svg"
        },
        {
            quote: "Tiptap gives us the opportunity to actually build the software product that we've been brainstorming about for a long time now.",
            company: "Welleton",
            description: "Website builder",
            logo: "https://cdn.prod.website-files.com/649fb1e58cd0c1375ad3909b/65e8c94e326fd91becdd3429_welleton.svg"
        }
    ];

    // Company logos
    const companyLogos = [
        "https://cdn.prod.website-files.com/649fb1e58cd0c1375ad3909b/6864e186cc9cbcfb675eb52e_hebbia.svg",
        "https://cdn.prod.website-files.com/649fb1e58cd0c1375ad3909b/6780370fe4f75d3e91658bf2_thomson-reuters.svg",
        "https://cdn.prod.website-files.com/649fb1e58cd0c1375ad3909b/6765e8e251f5f8968c12de85_softexpert.svg",
        "https://cdn.prod.website-files.com/649fb1e58cd0c1375ad3909b/66cf1d5842eaaa1369ec6c50_devrev.svg",
        "https://cdn.prod.website-files.com/649fb1e58cd0c1375ad3909b/66cf1d3ad95bb891bb886bf4_scispace.svg",
        "https://cdn.prod.website-files.com/649fb1e58cd0c1375ad3909b/66cf1ceb520ae15fbc1bfc12_bcg.svg",
        "https://cdn.prod.website-files.com/649fb1e58cd0c1375ad3909b/66cf1ccd02eedd5e7621532e_reforge.svg",
        "https://cdn.prod.website-files.com/649fb1e58cd0c1375ad3909b/6679800e2efdf373581d13c8_linkedin.svg",
        "https://cdn.prod.website-files.com/649fb1e58cd0c1375ad3909b/665ecfe1dd87825e576be850_productboard.svg",
        "https://cdn.prod.website-files.com/649fb1e58cd0c1375ad3909b/665ecfc8e0c4cf1af23aef1a_axios.svg",
        "https://cdn.prod.website-files.com/649fb1e58cd0c1375ad3909b/65e8c99c97e1bfd2fe178f02_substack-wordmark.svg",
        "https://cdn.prod.website-files.com/649fb1e58cd0c1375ad3909b/6567a745a93a6c937428f137_storyblok-long.svg"
    ];

    const MarqueeText = ({ text, direction, speed }: { text: string; direction: 'left' | 'right'; speed: 'slow' | 'normal' }) => {
        const animationClass = direction === 'left'
            ? (speed === 'slow' ? 'animate-marquee-left-slow' : 'animate-marquee-left')
            : (speed === 'slow' ? 'animate-marquee-right-slow' : 'animate-marquee-right');

        return (
            <div className="flex overflow-hidden whitespace-nowrap">
                <div className={`flex gap-8 ${animationClass}`}>
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex gap-8 items-center">
                            <span className="text-8xl md:text-[9rem] font-black text-white leading-none">
                                {text}
                            </span>
                            <span className="text-8xl md:text-9xl font-black text-transparent leading-none stroke-white stroke-2">
                                {text}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const TestimonialCard = ({ quote, company, description, logo }: { quote: string; company: string; description: string; logo: string }) => {
        // Helper function to generate random rgba color
        const getRandomColor = (alpha = 0.3) => {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            return `rgba(${r},${g},${b},${alpha})`;
        };

        // Random colors for gradient
        const color1 = getRandomColor(0.3);
        const color2 = getRandomColor(0.95);
        const color3 = getRandomColor(0.3);

        // Random gradient origin
        const posX = Math.floor(Math.random() * 100);
        const posY = Math.floor(Math.random() * 100);

        return (
            <div
                className="relative rounded-3xl p-12 max-w-4xl w-full mx-4 shadow-2xl border border-gray-700/30 overflow-hidden"
                style={{
                    background: `radial-gradient(circle at ${posX}% ${posY}%, ${color1}, ${color2}, ${color3})`,
                }}
            >
                {/* Noise overlay */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-20 mix-blend-overlay"></div>
                </div>

                <blockquote className="text-center mb-8 relative z-10">
                    <span className="text-2xl md:text-3xl font-medium text-white leading-tight bg-black px-3 py-2 rounded-lg inline-block">
                        "{quote}"
                    </span>
                </blockquote>

                <div className="flex flex-col items-center gap-2 relative z-10">
                    <div className="h-10 flex items-center">
                        <img
                            src={logo}
                            alt={company}
                            className="h-full object-contain filter invert"
                        />
                    </div>
                    <p className="text-gray-400 text-sm">{description}</p>
                </div>
            </div>
        );
    };

    return (
        <section className="bg-neutral-900 text-white overflow-hidden relative lg:rounded-t-[5rem] rounded-t-4xl">
            {/* Custom CSS for animations */}
            <style jsx>{`
        @keyframes marquee-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        @keyframes marquee-left-slow {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right-slow {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        
        .animate-marquee-left {
          animation: marquee-left 30s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 30s linear infinite;
        }
        .animate-marquee-left-slow {
          animation: marquee-left-slow 45s linear infinite;
        }
        .animate-marquee-right-slow {
          animation: marquee-right-slow 45s linear infinite;
        }
        
        .stroke-white {
          -webkit-text-stroke: 2px white;
        }
        .stroke-2 {
          -webkit-text-stroke-width: 2px;
        }
        
        @keyframes logo-scroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-logo-scroll {
          animation: logo-scroll 60s linear infinite;
        }
      `}</style>

            <div className="py-72 px-4 flex flex-col items-center gap-16">

                {/* Marquee Section */}
                <div className="w-full flex flex-col gap-4">
                    {marqueeLines.map((line: any, index: number) => (
                        <MarqueeText
                            key={index}
                            text={line.text}
                            direction={line.direction}
                            speed={line.speed}
                        />
                    ))}
                </div>

                {/* Testimonials Section */}
                <div className="flex flex-col gap-12 pt-20">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard
                            key={index}
                            {...testimonial}
                        />
                    ))}
                </div>

                {/* Call to Action Buttons */}
                <div className="flex flex-col items-center gap-4 mt-12">
                    <button className="group bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:rounded-3xl hover:-translate-x-1 hover:-translate-y-1 hover:shadow-lg hover:shadow-white/20 transition-all duration-300 flex items-center gap-3">
                        <span className="group-hover:translate-x-5 transition-transform duration-300">
                            Get started
                        </span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-8 transition-transform duration-300" />
                    </button>

                    <button className="text-white font-semibold hover:shadow-lg hover:shadow-white/20 px-4 py-2 hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 text-sm">
                        See all customers
                    </button>
                </div>

                {/* Company Logos Marquee */}
                <div className="w-full overflow-hidden mt-16">
                    <div className="flex gap-16 animate-logo-scroll">
                        {[...companyLogos, ...companyLogos].map((logo, index) => (
                            <div key={index} className="flex-shrink-0 h-10 px-4 flex items-center">
                                <img
                                    src={logo}
                                    alt={`Company logo ${index + 1}`}
                                    className="h-full object-contain filter invert opacity-70 hover:opacity-100 transition-opacity"
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Text;