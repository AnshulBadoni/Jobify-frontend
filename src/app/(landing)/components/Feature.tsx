// components/Hero.tsx
import React from "react";

const Features = ({ info, title, subtitle, content }: { info: string, title: string, subtitle: string, content: string }) => {
    return (
        <section className="mt-36 flex flex-col items-center justify-center text-center w-[90vw] max-w-[60rem] mx-auto py-16">
            <div className="flex flex-col items-center max-w-[66rem]">
                <p className="text-lg md:text-xl font-light mt-0">{info}</p>
                <h2 className="font-extrabold text-4xl md:text-7xl leading-tight mt-4 mb-6">
                    {title}
                    <strong className="italic font-light flex gap-2 text-nowrap mx-24 text-center item-center">{subtitle}</strong>
                </h2>
            </div>
            <div className="flex flex-col max-w-[40rem] mt-8 text-base md:text-lg font-light leading-relaxed opacity-90">
                <p>
                    {content}
                </p>
            </div>
        </section>
    );
};

export default Features;
