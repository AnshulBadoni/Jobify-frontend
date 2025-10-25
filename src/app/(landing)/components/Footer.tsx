"use client";
import { ArrowRight, Users, Globe, Code } from "lucide-react";

export default function Footer() {
    const socialLinks = [
        { name: "Twitter", href: "#", icon: <Users className="w-5 h-5" /> },
        { name: "LinkedIn", href: "#", icon: <Globe className="w-5 h-5" /> },
        { name: "GitHub", href: "#", icon: <Code className="w-5 h-5" /> },
    ];

    return (
        <footer className="relative bg-neutral-950 text-white pt-16 pb-8 font-sans overflow-hidden">
            {/* Floating Shapes */}
            <div className="absolute top-0 -left-16 w-80 h-64 rounded-xl bg-cyan-500 animate-float-rotate"></div>
            <div className="absolute bottom-0 -right-24 w-96 h-72 rounded-tl-[10%] rounded-bl-2xl rounded-br-[10%] bg-gradient-to-tl bg-emerald-500 animate-float-rotate delay-1000"></div>

            {/* Wave Overlay */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-neutral-950 to-transparent opacity-50 pointer-events-none"></div>

            <div className="max-w-6xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* About Section */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                        DevFinder
                    </h3>
                    <p className="text-neutral-400">
                        Connecting the world's top developers with innovative companies. Build, hire, and grow your team effortlessly.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">Quick Links</h4>
                    <ul className="space-y-2 text-neutral-400">
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Home</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Jobs</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Hire Experts</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
                    </ul>
                </div>

                {/* Newsletter / Contact */}
                <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">Stay Updated</h4>
                    <p className="text-neutral-400">Subscribe to get the latest updates on new opportunities.</p>
                    <div className="flex gap-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-2 rounded-l-xl bg-neutral-800 text-white placeholder-white/70 focus:outline-none"
                        />
                        <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-4 py-2 rounded-r-xl flex items-center gap-2 font-semibold">
                            Subscribe <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-4 mt-4">
                        {socialLinks.map((s, i) => (
                            <a
                                key={i}
                                href={s.href}
                                className="bg-neutral-800 p-3 rounded-full hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-all"
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-12 text-center text-neutral-500 text-sm">
                &copy; {new Date().getFullYear()} DevFinder. All rights reserved.
            </div>

            {/* Animations */}
            <style jsx>{`
        @keyframes float-rotate {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(15deg); }
        }
        .animate-float-rotate { animation: float-rotate 25s ease-in-out infinite; }
        .delay-1000 { animation-delay: 1s; }
      `}</style>
        </footer>
    );
}
