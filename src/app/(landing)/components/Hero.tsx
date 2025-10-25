"use client";

import { useState } from "react";

const tabs = [
    {
        id: "notion",
        label: "Notion-like UI",
        iframe: "https://template.tiptap.dev/preview/templates/notion-like/",
    },
    {
        id: "simple",
        label: "Simple UI",
        iframe: "https://template.tiptap.dev/preview/templates/simple/",
    },
    {
        id: "headless",
        label: "Headless",
        iframe: "https://embed.tiptap.dev/src/examples/default/react/",
    },
];

export default function HeroSection() {
    const [active, setActive] = useState("notion");

    return (
        <section className="relative flex flex-col items-center justify-center gap-12 px-6 sm:py-36 py-10 text-center overflow-hidden">

            {/* Heading */}
            <h1 className="block lg:hidden max-w-5xl text-6xl leading-16 font-extrabold tracking-tight md:text-8xl relative z-10">
                Get{" "}<br />
                <span className="bg-black text-white rounded-lg px-2 italic">
                    AI-powered
                </span>
                <br />
                jobs{" "}
                <span className="italic font-light">matches</span> <br /> 🚀 with <br /> tailored-to-your{" "}
                <span className="underline italic">profile</span>
            </h1>

            <h1 className="hidden lg:block max-w-5xl text-4xl font-extrabold leading-[1.1] tracking-tight text-center md:text-[5rem] relative z-10">
                {/* First line */}
                <div>
                    Get{" "}
                    <span className="bg-black text-white rounded-lg px-4 italic">
                        AI-powered
                    </span>
                </div>

                {/* Second line */}
                <div className="flex items-center justify-center gap-4">
                    jobs
                    <span className="flex items-center gap-2 italic font-light text-nowrap text-center">
                        matches 🚀
                    </span>
                    with
                </div>

                <div className="flex items-center justify-center gap-6 flex-nowrap">
                    tailored-to-your
                    <span className="underline italic">profile</span>
                </div>

            </h1>

            {/* Tabs */}
            <div className="flex flex-col items-center w-full max-w-5xl relative z-10">
                {/* Tab buttons */}
                <div className="flex gap-2 rounded-lg border border-gray-200 bg-white/40 p-1 text-sm font-semibold backdrop-blur-sm">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActive(tab.id)}
                            className={`rounded-md px-3 py-1.5 transition ${active === tab.id
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-500 hover:bg-gray-50"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab content */}
                <div className="mt-6 w-full h-[65vh] rounded-xl shadow-lg overflow-hidden bg-white">
                    {tabs.map(
                        (tab) =>
                            tab.id === active && (
                                <iframe
                                    key={tab.id}
                                    src={tab.iframe}
                                    loading="lazy"
                                    className="w-full h-full border-0"
                                />
                            )
                    )}
                </div>
            </div>

            {/* CTA button */}
            <a
                href="https://tiptap.dev/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 inline-flex items-center gap-2 rounded-lg border-2 border-black bg-black px-5 py-3 text-white font-medium transition hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_#000]"
            >
                <span>Read the docs</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                >
                    <path d="M16 7.38L15.45 7.11C15.39 7.08 15.35 7.05 15.3 7.02C15.19 6.96 15.02 6.86 14.82 6.73C14.41 6.46 13.84 6.04 13.24 5.48C12.03 4.34 10.69 2.63 10.1 0.26L8.16 0.74C8.87 3.59 10.47 5.62 11.87 6.94H0V9H11.87C10.47 10.38 8.87 12.41 8.16 15.26L10.1 15.74C10.69 13.37 12.03 11.66 13.24 10.52C13.84 9.96 14.41 9.54 14.82 9.27C15.02 9.14 15.19 9.04 15.3 8.98L15.45 8.9L16 8.62V7.38Z" />
                </svg>
            </a>

        </section>

    );
}
