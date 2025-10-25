import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface ProductFeature {
    id: string;
    title: string;
    href: string;
    description: string;
    icon: string;
    badges: {
        text: string;
        variant: 'primary' | 'secondary';
    }[];
}

const productFeatures: ProductFeature[] = [
    {
        id: 'editor',
        title: 'Editor',
        href: '/product/editor',
        description:
            "Build custom editors that align perfectly with your user's needs, offering flexibility and ease of use. Ideal for creating user-centric interfaces with minimal fuss.",
        icon: 'https://cdn.prod.website-files.com/645a9acecda2e0594fac6126/65baa412e8e00dbb65c3e145_editor-signet.svg',
        badges: [{ text: 'Open source', variant: 'primary' }],
    },
    {
        id: 'collaboration',
        title: 'Collaboration',
        href: '/product/collaboration',
        description:
            'Allow your users to collaborate in any document and media. Integrate live carets and cursors to show who is typing, support offline editing and sync content.',
        icon: 'https://cdn.prod.website-files.com/645a9acecda2e0594fac6126/65baa3dc67b063a50545c95d_collaboration-signet.svg',
        badges: [
            { text: 'Paid', variant: 'primary' },
            { text: 'Try for free', variant: 'secondary' },
        ],
    },
    {
        id: 'content-ai',
        title: 'Content AI',
        href: '/product/content-ai',
        description:
            "Help your users perfecting their tone and crossing language barriers, Tiptap's Content AI transforms words into wonders. Write, refine, and captivate with ease.",
        icon: 'https://cdn.prod.website-files.com/645a9acecda2e0594fac6126/65baa3dc3f58a040b8249857_content-ai-signet.svg',
        badges: [
            { text: 'Paid', variant: 'primary' },
            { text: 'Try for free', variant: 'secondary' },
        ],
    },
    {
        id: 'ai-agent',
        title: 'AI Agent',
        href: '/product/ai-agent',
        description:
            'Add an AI teammate to your editor. Allow users to delegate tasks such as reading, editing, and formatting directly to AI for smarter, faster workflows.',
        icon: 'https://cdn.prod.website-files.com/645a9acecda2e0594fac6126/65baa3dc3f58a040b8249857_content-ai-signet.svg',
        badges: [
            { text: 'Paid', variant: 'primary' },
            { text: 'Try for free', variant: 'secondary' },
        ],
    },
    {
        id: 'conversion',
        title: 'Conversion',
        href: '/product/conversion',
        description:
            'Import and export DOCX, ODT, or Markdown with one click. Make your editor compatible with the formats your users already use.',
        icon: 'https://cdn.prod.website-files.com/645a9acecda2e0594fac6126/67e5707721bae6cae59ba070_conversion-signet.svg',
        badges: [
            { text: 'Paid', variant: 'primary' },
            { text: 'Try for free', variant: 'secondary' },
        ],
    },
    {
        id: 'comments',
        title: 'Comments',
        href: '/product/comments',
        description:
            'Integrate inline and document comments directly in your editor with Tiptap Comments. Ideal for collaboration, enabling real-time discussion and suggestions within the content.',
        icon: 'https://cdn.prod.website-files.com/645a9acecda2e0594fac6126/65baa3dc5d0a67adb5b7b76f_comments-signet.svg',
        badges: [
            { text: 'Paid', variant: 'primary' },
            { text: 'Try for free', variant: 'secondary' },
        ],
    },
    {
        id: 'documents',
        title: 'Documents',
        href: '/product/documents',
        description:
            "Self-host your documents for full control, or opt for our secure, scalable cloud. Create and manipulate your documents any way you want, whether you're flying solo or on Cloud 9.",
        icon: 'https://cdn.prod.website-files.com/645a9acecda2e0594fac6126/65baa3dc276ae556f0a6f4a9_documents-signet.svg',
        badges: [
            { text: 'Paid', variant: 'primary' },
            { text: 'Try for free', variant: 'secondary' },
        ],
    },
];

interface ProductCardProps {
    feature: ProductFeature;
}

const ProductCard: React.FC<ProductCardProps> = ({ feature }) => {
    return (
        <Link
            href={feature.href}
            className="group relative flex-shrink-0 max-w-96 sm:min-w-[320px] select-none p-2 "
        >
            {/* Card background container that scales */}
            <div className="absolute inset-0 rounded-4xl bg-white shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:scale-105" />

            {/* Actual content (does NOT scale) */}
            <div className="relative z-10 flex flex-col justify-between h-full rounded-3xl p-8 pb-6">
                {/* Icon */}
                <div className="flex-shrink-0 h-8 mb-6">
                    <img src={feature.icon} alt={`${feature.title} icon`} className="h-full" />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                    {/* Title and Badges */}
                    <div className="flex flex-col gap-1 mb-4">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                        <div className="flex flex-wrap gap-1">
                            {feature.badges.map((badge, index) => (
                                <span
                                    key={index}
                                    className={`
                                        inline-block px-2 py-1 text-xs font-semibold rounded-md border
                                        ${badge.variant === 'primary'
                                            ? 'bg-white border-gray-300 text-gray-700'
                                            : 'bg-gray-50 border-gray-200 text-gray-600'}
                                    `}
                                >
                                    {badge.text}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-lg text-gray-800 opacity-70 mb-6 flex-1">
                        {feature.description}
                    </p>

                    {/* CTA Button */}
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                        <span className="transition-transform duration-300 group-hover:translate-x-3">
                            Learn more
                        </span>
                        <ChevronRight
                            size={16}
                            className="transition-transform duration-300 group-hover:translate-x-4"
                        />
                    </div>
                </div>
            </div>
        </Link>
    );
};

interface ProductFeatureSliderProps {
    title?: string;
    features?: ProductFeature[];
    className?: string;
}

const ProductFeatureSlider: React.FC<ProductFeatureSliderProps> = ({
    title = 'Explore our features',
    features = productFeatures,
    className = '',
}) => {
    return (
        <section className={`${className} my-16`}>
            {/* Header */}
            <div className="px-40 flex justify-between items-center">
                <h2 className="text-3xl font-semibold text-gray-900">{title}</h2>
            </div>

            {/* Horizontal Scroll */}
            <div className="flex gap-6 overflow-x-auto pb-16 px-40 py-6 scrollbar-hide">
                {features.map((feature) => (
                    <ProductCard key={feature.id} feature={feature} />
                ))}
            </div>

            <div className="flex items-center justify-center">
                {/* CTA button */}
                <a
                    href="https://tiptap.dev/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 inline-flex items-center gap-2 rounded-lg border-2 border-black px-5 py-3 text-black font-medium transition hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_#000]"
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
            </div>
        </section>
    );
};

export default ProductFeatureSlider;
