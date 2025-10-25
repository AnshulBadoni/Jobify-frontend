"use client";
import React from "react";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative bg-stone-100 min-h-screen">
      <main className="relative z-10">{children}</main>

      {/* Orb Container to prevent x-overflow without affecting main content */}
      <div className="absolute inset-0 overflow-x-hidden pointer-events-none z-0">
        {/* Big Green Orb */}
        <div className="lg:block hidden absolute top-10 left-[75%] w-[70rem] h-[40rem] -translate-x-1/2 bg-teal-600 rounded-full filter blur-2xl opacity-50 animate-green-orbit">
          {/* Red Orb moving inside */}
          <div className="absolute size-64 bg-orange-600 rounded-full filter blur-3xl animate-orbit flex items-center justify-center">
            {/* Inner Blue Glow */}
            {/* <div className="w-12 h-12 bg-blue-400 rounded-full filter blur-xl opacity"></div> */}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes orbit {
          0% { transform: translate(0, 0); }
          25% { transform: translate(25rem, 7rem); }
          50% { transform: translate(0, 20rem); }
          75% { transform: translate(-14rem, 7rem); }
          100% { transform: translate(0, 0); }
        }

        @keyframes green-orbit {
          0% { transform: translate(-2rem, 0); }
          25% { transform: translate(2rem, 1rem); }
          50% { transform: translate(0, 2rem); }
          75% { transform: translate(-2rem, 1rem); }
          100% { transform: translate(-2rem, 0); }
        }

        .animate-orbit {
          animation: orbit 60s linear infinite;
        }

        .animate-green-orbit {
          animation: green-orbit 120s ease-in-out infinite alternate;
        }
      `}</style>
    </div>
  );
}
