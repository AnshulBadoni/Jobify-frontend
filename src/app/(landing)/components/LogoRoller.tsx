"use client";
import React from "react";

const logos = [
  "https://cdn.prod.website-files.com/649fb1e58cd0c1375ad3909b/6864e186cc9cbcfb675eb52e_hebbia.svg",
  "https://cdn.prod.website-files.com/649fb1e58cd0c1375ad3909b/6780370fe4f75d3e91658bf2_thomson-reuters.svg",
  "https://cdn.prod.website-files.com/649fb1e58cd0c1375ad3909b/6765e8e251f5f8968c12de85_softexpert.svg",
  "https://cdn.prod.website-files.com/649fb1e58cd0c1375ad3909b/66cf1d5842eaaa1369ec6c50_devrev.svg",
  "https://cdn.prod.website-files.com/649fb1e58cd0c1375ad3909b/66cf1d3ad95bb891bb886bf4_scispace.svg",
  "https://cdn.prod.website-files.com/649fb1e58cd0c1375ad3909b/66cf1ceb520ae15fbc1bfc12_bcg.svg",
  "https://cdn.prod.website-files.com/649fb1e58cd0c1375ad3909b/66cf1ccd02eedd5e7621532e_reforge.svg",
  "https://cdn.prod.website-files.com/649fb1e58cd0c1375ad3909b/66cef353420e0a8fd1d073f4_businessinsider.svg",
  // Add the rest of your logos here
];

const LogoRoller = () => {
  return (
    <div className="overflow-hidden w-full">
      <div className="flex animate-scroll gap-10">
        {/* Duplicate logos for continuous effect */}
        {[...logos, ...logos].map((logo, idx) => (
          <div key={idx} className="flex-none h-12">
            <img src={logo} alt="company logo" className="h-full object-contain" />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          display: flex;
          gap: 4rem;
          animation: scroll 60s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LogoRoller;
