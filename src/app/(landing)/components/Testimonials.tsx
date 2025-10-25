"use client";
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Feature from './Feature';
import BlogSection from './Blog';
import DocCard from './DocCard';

interface Template {
    id: string;
    title: string;
    description: string;
    image: string;
    type: 'free' | 'paid';
    status: 'released' | 'in-development';
    previewUrl?: string;
    detailsUrl?: string;
}

const templates: Template[] = [
    {
        id: 'simple-editor',
        title: 'Simple editor template',
        description: 'Start your editor integration with a super tiny editor template. It comes with just the things you need to start coding.',
        image: '/api/placeholder/990/660',
        type: 'free',
        status: 'released',
        previewUrl: 'https://template.tiptap.dev/preview/templates/simple/',
        detailsUrl: '/templates/simple-editor-template'
    },
    {
        id: 'comments',
        title: 'Comments template',
        description: 'Add threads and comments to your documents and app with our Editor extension and Comments UI template.',
        image: '/api/placeholder/990/660',
        type: 'paid',
        status: 'in-development',
        detailsUrl: '/templates/comments-template'
    },
    {
        id: 'notion-like',
        title: 'Notion-like template',
        description: 'Launch your product with our prebuilt notion-like template and quickly release a full fledged editor experience.',
        image: '/api/placeholder/990/660',
        type: 'paid',
        status: 'released',
        previewUrl: 'https://template-preview.tiptap.dev/notion-like?mode=dark',
        detailsUrl: '/templates/notion-like-template'
    }
];

interface CarouselButtonProps {
    onClick: () => void;
    disabled?: boolean;
    direction: 'prev' | 'next';
    className?: string;
}

const CarouselButton = ({ onClick, disabled, direction, className = '' }: CarouselButtonProps) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`
      absolute top-1/2 -translate-y-1/2 z-10 
      w-12 h-12 rounded-full bg-white shadow-lg
      flex items-center justify-center
      hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed
      transition-all duration-300 ease-out
      ${direction === 'prev' ? '-left-6' : '-right-6'}
      ${className}
    `}
    >
        {direction === 'prev' ?
            <ChevronLeft className="w-6 h-6 text-gray-700" /> :
            <ChevronRight className="w-6 h-6 text-gray-700" />
        }
    </button>
);

interface TemplateCardProps {
    template: Template;
    isActive?: boolean;
}

const TemplateCard = ({ template, isActive }: TemplateCardProps) => (
    <div className="flex-shrink-0 w-80 mx-4 group">
        <div className="flex flex-col gap-8">
            {/* Image */}
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-sm group-hover:shadow-lg transition-all duration-300">
                <Image
                    src={template.image}
                    alt={template.title}
                    width={990}
                    height={660}
                    className="w-full aspect-[3/2] object-cover"
                    priority={isActive}
                />
            </div>

            {/* Content */}
            <div className="px-4 space-y-6">
                <div className="space-y-2">
                    {/* Badge */}
                    <div className="inline-flex">
                        <span className={`
              px-2 py-1 text-xs font-semibold rounded border
              ${template.type === 'free'
                                ? 'text-gray-700 border-gray-200'
                                : 'text-gray-700 border-gray-200'
                            }
            `}>
                            {template.type === 'free' ? 'Free' : 'Paid'}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                        {template.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-relaxed opacity-70">
                        {template.description}
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-3">
                    {template.status === 'in-development' ? (
                        <span className="text-sm text-gray-400 font-medium">
                            In development
                        </span>
                    ) : (
                        <>
                            {template.previewUrl && (
                                <a
                                    href={template.previewUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group/link inline-flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-gray-700 transition-all duration-300"
                                >
                                    <span className="group-hover/link:translate-x-5 transition-transform duration-300">
                                        Preview
                                    </span>
                                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-8 transition-transform duration-300" />
                                </a>
                            )}

                            {template.detailsUrl && (
                                <a
                                    href={template.detailsUrl}
                                    className="group/link inline-flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-gray-700 transition-all duration-300"
                                >
                                    <span className="group-hover/link:translate-x-5 transition-transform duration-300">
                                        More details
                                    </span>
                                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-8 transition-transform duration-300" />
                                </a>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    </div>
);

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === templates.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const goToPrev = () => {
        setCurrentIndex(currentIndex === 0 ? templates.length - 1 : currentIndex - 1);
        setIsAutoPlaying(false);
    };

    const goToNext = () => {
        setCurrentIndex(currentIndex === templates.length - 1 ? 0 : currentIndex + 1);
        setIsAutoPlaying(false);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
        setIsAutoPlaying(false);
    };

    return (
        <section className="relative bg-stone-100 rounded-t-[4rem] -mt-64">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <Feature info="Testomonials" title="Listen from our" subtitle="happy customers" content="we offer a wide range of job opportunities to help you find the perfect fit for your skills and experience by integrating our AI-powered job recommendation system." />

                    <a
                        href="/product/ui-components"
                        className="group inline-flex items-center gap-2 mt-8 text-base font-semibold text-gray-900 hover:text-gray-700 transition-all duration-300"
                    >
                        <span className="group-hover:translate-x-5 transition-transform duration-300">
                            Explore Jobs <ArrowRight className="w-4 h-4 group-hover:translate-x-8 transition-transform duration-300" />
                        </span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-8 transition-transform duration-300" />
                    </a>
                </div>

                {/* Carousel */}
                <div className="relative">
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-out"
                            style={{
                                transform: `translateX(-${currentIndex * (320 + 32)}px)` // card width + gap
                            }}
                        >
                            {templates.map((template, index) => (
                                <TemplateCard
                                    key={template.id}
                                    template={template}
                                    isActive={index === currentIndex}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <CarouselButton
                        direction="prev"
                        onClick={goToPrev}
                        disabled={currentIndex === 0}
                        className="hidden lg:flex"
                    />
                    <CarouselButton
                        direction="next"
                        onClick={goToNext}
                        disabled={currentIndex === templates.length - 1}
                        className="hidden lg:flex"
                    />
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-12">
                    {templates.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${index === currentIndex
                                    ? 'bg-gray-900 scale-110'
                                    : 'bg-gray-300 hover:bg-gray-400'
                                }
              `}
                        />
                    ))}
                </div>
                <BlogSection />
                <DocCard />
            </div>
        </section>
    );
};

export default Testimonials;