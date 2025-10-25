"use client"
import React, { useEffect, useState } from 'react'

const Banner = ({ showProfileCTA = false, title, subtitle }: { showProfileCTA: boolean, title: string, subtitle: string }) => {
    const [isAnimated, setIsAnimated] = useState(false);

    useEffect(() => {
        setIsAnimated(true);
    }, []);

    return (
        <div className={`transform transition-all duration-1000 delay-500 ${isAnimated ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <div className="relative rounded-2xl p-8 overflow-hidden shadow-2xl bg-gradient-to-r from-indigo-600 to-purple-600">
                <div className="relative z-10 text-white">
                    <h3 className="text-3xl font-bold mb-2">{title}</h3>
                    <p className="text-indigo-100 mb-6">{subtitle}</p>
                    <div className="flex flex-wrap gap-4">
                        <button
                            className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-white/90 transition-all transform hover:scale-105 shadow-lg"
                        >
                            {showProfileCTA ? "Complete Profile" : "Boost Profile"}
                        </button>
                        <button className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all">
                            Browse Jobs
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner