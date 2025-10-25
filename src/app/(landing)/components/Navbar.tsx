"use client"
import React, { useState } from 'react';
import Link from 'next/link';

const TiptapLogo = () => (
    <svg width="4.2rem" height="1rem" viewBox="0 0 84 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M28.2939 2.38667H38.6146V4.59824H34.7075V15.3612H32.201V4.59824H28.2939V2.38667Z" fill="currentColor" />
        <path d="M40.0963 4.4508V2.0918H42.4553V4.4508H40.0963ZM40.0963 15.3612V5.6303H42.4553V15.3612H40.0963Z" fill="currentColor" />
        <path d="M46.7388 5.6303V5.99889C46.7388 6.38592 46.6466 6.68079 46.4807 7.01253C46.407 7.19682 46.278 7.41798 46.4623 7.51013C46.6466 7.60228 46.7572 7.36269 46.7941 7.28897C47.3838 6.25691 48.3606 5.48286 49.8718 5.48286C52.3967 5.48286 54.1106 7.69443 54.1106 10.4957C54.1106 13.2971 52.3967 15.5086 49.8718 15.5086C48.3974 15.5086 47.3838 14.753 46.7941 13.6841C46.7572 13.6288 46.6835 13.4445 46.5176 13.4998C46.3149 13.5735 46.3886 13.7578 46.4807 13.9421C46.6466 14.2738 46.7388 14.5687 46.7388 14.9373V18.8997H44.3798V5.6303H46.7388ZM49.3189 13.3708C50.9776 13.3708 51.7516 12.0438 51.7516 10.4957C51.7516 8.94765 50.9776 7.62071 49.3189 7.62071C47.7708 7.62071 46.7388 8.94765 46.7388 10.4957C46.7388 12.0438 47.7708 13.3708 49.3189 13.3708Z" fill="currentColor" />
        <path d="M61.3459 7.69443H58.692V12.136C58.692 13.2049 58.7104 13.2971 59.7056 13.2971H61.3459V15.3612H59.208C57.2545 15.3612 56.333 14.7161 56.333 12.3756V7.69443H54.5638V5.6303H56.333V2.97642H58.692V5.6303H61.3459V7.69443Z" fill="currentColor" />
        <path d="M69.7536 5.6303H72.1126V15.3612H69.7536V14.9373C69.7536 14.5687 69.8457 14.2738 70.0116 13.9421C70.1037 13.7578 70.1775 13.5735 69.9747 13.4998C69.8089 13.4445 69.7351 13.6288 69.6983 13.6841C69.0164 14.6977 68.0949 15.5086 66.6205 15.5086C64.0957 15.5086 62.3817 13.2971 62.3817 10.4957C62.3817 7.69443 64.0957 5.48286 66.6205 5.48286C68.1318 5.48286 69.1638 6.22005 69.6983 7.28897C69.7351 7.36269 69.8457 7.60228 70.03 7.51013C70.2143 7.41798 70.1037 7.19682 70.0116 7.01253C69.8457 6.68079 69.7536 6.38592 69.7536 5.99889V5.6303ZM67.1734 13.3708C68.7215 13.3708 69.7536 12.0438 69.7536 10.4957C69.7536 8.94765 68.7215 7.62071 67.1734 7.62071C65.5147 7.62071 64.7407 8.94765 64.7407 10.4957C64.7407 12.0438 65.5147 13.3708 67.1734 13.3708Z" fill="currentColor" />
        <path d="M76.3991 5.6303V5.99889C76.3991 6.38592 76.3069 6.68079 76.141 7.01253C76.0673 7.19682 75.9383 7.41798 76.1226 7.51013C76.3069 7.60228 76.4175 7.36269 76.4544 7.28897C77.0441 6.25691 78.0209 5.48286 79.5321 5.48286C82.057 5.48286 83.771 7.69443 83.771 10.4957C83.771 13.2971 82.057 15.5086 79.5321 15.5086C78.0577 15.5086 77.0441 14.753 76.4544 13.6841C76.4175 13.6288 76.3438 13.4445 76.1779 13.4998C75.9752 13.5735 76.0489 13.7578 76.141 13.9421C76.3069 14.2738 76.3991 14.5687 76.3991 14.9373V18.8997H74.0401V5.6303H76.3991ZM78.9792 13.3708C80.6379 13.3708 81.4119 12.0438 81.4119 10.4957C81.4119 8.94765 80.6379 7.62071 78.9792 7.62071C77.4311 7.62071 76.3991 8.94765 76.3991 10.4957C76.3991 12.0438 77.4311 13.3708 78.9792 13.3708Z" fill="currentColor" />
        <path d="M10.2499 0C8.40798 0 6.68237 0.497993 5.20039 1.36667C4.90185 1.54167 4.77093 1.93059 5.02448 2.16608C5.24757 2.37329 5.54646 2.5 5.87494 2.5H14.6248C14.9533 2.5 15.2522 2.37329 15.4753 2.16608C15.7289 1.93059 15.5979 1.54167 15.2994 1.36667C13.8174 0.497993 12.0918 0 10.2499 0Z" fill="currentColor" />
        <path d="M20.2498 10C20.2498 9.30963 19.6902 8.75 18.9998 8.75H1.49999C0.809625 8.75 0.25 9.30963 0.25 10C0.25 10.6904 0.809625 11.25 1.49999 11.25H18.9998C19.6902 11.25 20.2498 10.6904 20.2498 10Z" fill="currentColor" />
        <path d="M15.4753 17.8339C15.7289 18.0694 15.5979 18.4583 15.2994 18.6333C13.8174 19.502 12.0918 20 10.2499 20C8.40798 20 6.68236 19.502 5.20039 18.6333C4.90185 18.4583 4.77092 18.0694 5.02447 17.8339C5.24756 17.6267 5.54646 17.5 5.87494 17.5H14.6248C14.9533 17.5 15.2522 17.6267 15.4753 17.8339Z" fill="currentColor" />
        <path d="M1.49999 5.625C1.49999 4.93463 2.05961 4.375 2.74997 4.375H17.7498C18.4402 4.375 18.9998 4.93463 18.9998 5.625C18.9998 6.31537 18.4402 6.875 17.7498 6.875H2.74997C2.05961 6.875 1.49999 6.31537 1.49999 5.625Z" fill="currentColor" />
        <path d="M1.49999 14.375C1.49999 13.6846 2.05961 13.125 2.74997 13.125H17.7498C18.4402 13.125 18.9998 13.6846 18.9998 14.375C18.9998 15.0654 18.4402 15.625 17.7498 15.625H2.74997C2.05961 15.625 1.49999 15.0654 1.49999 14.375Z" fill="currentColor" />
    </svg>
);

const ArrowIcon = () => (
    <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 7.38197L15.4495 7.10674L15.4484 7.10617L15.4455 7.10464L15.4188 7.09062C15.393 7.07688 15.3516 7.05438 15.2965 7.02295C15.1862 6.96006 15.0213 6.86173 14.8166 6.72686C14.4066 6.45661 13.8417 6.0427 13.2383 5.47699C12.029 4.34323 10.6931 2.62752 10.1006 0.257465L8.16032 0.742531C8.87215 3.58987 10.4711 5.62416 11.8704 6.93606C11.8933 6.95756 11.9162 6.97887 11.9391 7H0V9H11.9391C11.9162 9.02112 11.8933 9.04244 11.8704 9.06394C10.4711 10.3758 8.87215 12.4101 8.16032 15.2575L10.1006 15.7425C10.6931 13.3725 12.029 11.6568 13.2383 10.523C13.8417 9.9573 14.4066 9.54339 14.8166 9.27313C15.0213 9.13826 15.1862 9.03994 15.2965 8.97705C15.3516 8.94562 15.393 8.92311 15.4188 8.90937L15.4455 8.89535L15.4484 8.89383L15.4495 8.89326L16 8.61803V7.38197Z" fill="currentColor" />
    </svg>
);

const DiscordIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <g clipPath="url(#a)">
            <path d="M20.317 4.656a19.79 19.79 0 0 0-4.885-1.516.074.074 0 0 0-.079.038c-.21.375-.444.864-.608 1.249a18.271 18.271 0 0 0-5.487 0 12.645 12.645 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.516.07.07 0 0 0-.032.027C.533 9.332-.32 13.866.099 18.343a.083.083 0 0 0 .031.057 19.902 19.902 0 0 0 5.993 3.03.078.078 0 0 0 .084-.029 14.22 14.22 0 0 0 1.226-1.994.075.075 0 0 0-.041-.105 13.109 13.109 0 0 1-1.872-.893.077.077 0 0 1-.008-.127c.126-.095.252-.193.372-.292a.074.074 0 0 1 .078-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .079.01c.12.098.245.197.372.292.044.032.04.1-.006.127-.598.35-1.22.645-1.873.892a.077.077 0 0 0-.041.106c.36.698.772 1.363 1.225 1.994a.076.076 0 0 0 .084.028 19.836 19.836 0 0 0 6.002-3.03.077.077 0 0 0 .032-.055c.5-5.176-.838-9.673-3.549-13.66a.06.06 0 0 0-.031-.028ZM8.02 15.617c-1.182 0-2.157-1.086-2.157-2.419S6.82 10.78 8.02 10.78c1.21 0 2.176 1.095 2.157 2.42 0 1.332-.956 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.086-2.157-2.419s.955-2.419 2.157-2.419c1.21 0 2.176 1.095 2.157 2.42 0 1.332-.946 2.418-2.157 2.418Z" />
        </g>
        <defs>
            <clipPath id="a">
                <path d="M0 0h24v24H0z" />
            </clipPath>
        </defs>
    </svg>
);

const GitHubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <g clipPath="url(#a)">
            <path fillRule="evenodd" d="M12.015.044A12.003 12.003 0 0 0 8.221 23.44c.596.11.817-.266.817-.582v-2.041c-3.337.736-4.045-1.607-4.045-1.607a3.213 3.213 0 0 0-1.333-1.76c-1.084-.738.088-.738.088-.738a2.528 2.528 0 0 1 1.835 1.238 2.565 2.565 0 0 0 3.492 1.002 2.55 2.55 0 0 1 .737-1.606c-2.667-.302-5.467-1.334-5.467-5.931a4.642 4.642 0 0 1 1.23-3.22 4.37 4.37 0 0 1 .118-3.176s1.01-.324 3.301 1.23c1.968-.54 4.045-.54 6.013 0 2.291-1.554 3.293-1.23 3.293-1.23a4.347 4.347 0 0 1 .126 3.176 4.642 4.642 0 0 1 1.23 3.22c0 4.612-2.807 5.622-5.482 5.894a2.838 2.838 0 0 1 .818 2.21v3.294c0 .39.214.693.825.582A12.01 12.01 0 0 0 12.015 0v.044Z" clipRule="evenodd" />
        </g>
        <defs>
            <clipPath id="a">
                <path d="M0 0h24v24H0z" />
            </clipPath>
        </defs>
    </svg>
);

const BurgerIcon = () => (
    <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="4" r="2" fill="currentColor" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <circle cx="4" cy="4" r="2" fill="currentColor" />
        <circle cx="4" cy="12" r="2" fill="currentColor" />
    </svg>
);

export default function Navbar() {
    const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const featuresData = {
        'Open source foundation': [
            {
                href: '/product/editor',
                icon: 'https://cdn.prod.website-files.com/645a9acecda2e0594fac6126/65baa412e8e00dbb65c3e145_editor-signet.svg',
                title: 'Editor',
                description: 'Headless editor framework'
            },
            {
                href: '/open-source-to-cloud',
                icon: 'https://cdn.prod.website-files.com/645a9acecda2e0594fac6126/68c04ac275f889a11207361f_oss-cloud.svg',
                title: 'Open source to cloud',
                description: 'Seamless Cloud migration'
            }
        ],
        'AI-powered': [
            {
                href: '/product/content-ai',
                icon: 'https://cdn.prod.website-files.com/645a9acecda2e0594fac6126/65baa3dc3f58a040b8249857_content-ai-signet.svg',
                title: 'AI Generation',
                description: 'Generate & rewrite'
            },
            {
                href: '/product/ai-agent',
                icon: 'https://cdn.prod.website-files.com/645a9acecda2e0594fac6126/65baa3dc3f58a040b8249857_content-ai-signet.svg',
                title: 'AI Agent',
                description: 'Automated workflows'
            }
        ],
        'Collaboration & editing': [
            {
                href: '/product/collaboration',
                icon: 'https://cdn.prod.website-files.com/645a9acecda2e0594fac6126/65baa3dc67b063a50545c95d_collaboration-signet.svg',
                title: 'Collaboration',
                description: 'Real-time co‑editing'
            },
            {
                href: '/product/comments',
                icon: 'https://cdn.prod.website-files.com/645a9acecda2e0594fac6126/65baa3dc5d0a67adb5b7b76f_comments-signet.svg',
                title: 'Comments',
                description: 'Inline annotations'
            },
            {
                href: '/product/conversion',
                icon: 'https://cdn.prod.website-files.com/645a9acecda2e0594fac6126/67e5707721bae6cae59ba070_conversion-signet.svg',
                title: 'Conversion',
                description: 'Import/Export DOCX',
                badge: 'Beta'
            }
        ],
        'Quick start & productivity': [
            {
                href: '/product/ui-components',
                icon: 'https://cdn.prod.website-files.com/645a9acecda2e0594fac6126/68c04ac2b6ec22087c39d43f_component-signet.svg',
                title: 'UI Components',
                description: 'Prebuilt React components'
            },
            {
                href: 'https://tiptap.dev/product/ui-components#templates',
                icon: 'https://cdn.prod.website-files.com/645a9acecda2e0594fac6126/65baa3dc2cfbe39108749178_templates-signet.svg',
                title: 'Templates',
                description: 'Quick‑start kits'
            },
            {
                href: '/product/documents',
                icon: 'https://cdn.prod.website-files.com/645a9acecda2e0594fac6126/65baa3dc276ae556f0a6f4a9_documents-signet.svg',
                title: 'Cloud documents',
                description: 'Managed documents'
            }
        ]
    };

    const teasers = [
        {
            image: 'https://cdn.prod.website-files.com/645a9acecda2e0594fac6126/67d9fe169b372fd4ac409fb7_entprise-small-vertical.png',
            title: "Host Tiptap's cloud features on your premises.",
            buttonText: 'Get enterprise',
            href: '/enterprise'
        },
        {
            image: 'https://cdn.prod.website-files.com/645a9acecda2e0594fac6126/67d9ffe5289375ba6e11f831_tiptap-v3-teaser.jpg',
            title: 'Editor 3.0',
            buttonText: 'Learn more',
            href: '/tiptap-editor-v3'
        }
    ];

    return (
        <nav className="sticky top-5 left-0 z-[9999] bg-white/95 backdrop-blur-lg border border-gray-200 max-w-4xl rounded-2xl mx-auto  px-4 sm:px-6 lg:px-8">
            <div className="">
                <div className="flex justify-between items-center h-16 space-x-6">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            <TiptapLogo />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-2">
                        {/* Features Dropdown */}
                        <div className="relative">
                            <button
                                className="flex items-center text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                                onMouseEnter={() => setIsFeaturesOpen(true)}
                                onMouseLeave={() => setIsFeaturesOpen(false)}
                            >
                                Features
                            </button>

                            {isFeaturesOpen && (
                                <div
                                    className="absolute left-0 top-full mt-2 w-[800px] bg-white rounded-lg shadow-xl border border-gray-200 z-50"
                                    onMouseEnter={() => setIsFeaturesOpen(true)}
                                    onMouseLeave={() => setIsFeaturesOpen(false)}
                                >
                                    <div className="p-6">
                                        <div className="grid grid-cols-3 gap-8">
                                            {/* Features Categories */}
                                            <div className="col-span-2 space-y-8">
                                                {Object.entries(featuresData).map(([category, items]) => (
                                                    <div key={category}>
                                                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
                                                            {category}
                                                        </h3>
                                                        <div className="space-y-4">
                                                            {items.map((item, idx) => (
                                                                <Link
                                                                    key={idx}
                                                                    href={item.href}
                                                                    className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 group"
                                                                >
                                                                    <img src={item.icon} alt="" className="w-6 h-6 mt-1" />
                                                                    <div>
                                                                        <div className="flex items-center space-x-2">
                                                                            <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                                                                                {item.title}
                                                                            </span>
                                                                            {/* {item.badge && (
                                                                                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                                                                                    {item.badge}
                                                                                </span>
                                                                            )} */}
                                                                        </div>
                                                                        <p className="text-sm text-gray-500">{item.description}</p>
                                                                    </div>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Teasers */}
                                            <div className="space-y-6">
                                                {teasers.map((teaser, idx) => (
                                                    <div key={idx} className="bg-gray-50 rounded-lg p-4">
                                                        <div className="flex items-center space-x-3 mb-3">
                                                            <img src={teaser.image} alt="" className="w-12 h-12 rounded" />
                                                        </div>
                                                        <h4 className="text-sm font-semibold text-gray-900 mb-3">
                                                            {teaser.title}
                                                        </h4>
                                                        <Link
                                                            href={teaser.href}
                                                            className="inline-flex items-center space-x-2 bg-black text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-gray-800"
                                                        >
                                                            <span>{teaser.buttonText}</span>
                                                            <ArrowIcon />
                                                        </Link>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Other Navigation Links */}
                        <Link href="/customers" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                            Customers
                        </Link>
                        <Link href="/enterprise" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                            Enterprise
                        </Link>
                        <Link href="/pricing" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                            Pricing
                        </Link>
                        <a href="https://tiptap.dev/docs" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                            Docs
                        </a>
                    </div>

                    {/* Right Side Actions */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            {/* <a href="https://tiptap.dev/discord" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
                                <DiscordIcon />
                            </a>
                            <a href="https://tiptap.dev/github" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                                <GitHubIcon />
                                <span className="text-sm">32.6k</span>
                            </a> */}
                            <div className="w-px h-6 bg-gray-300 mx-2"></div>
                        </div>

                        {/* CTA Buttons */}
                        <Link href="/contact-sales" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                            Contact sales
                        </Link>

                        {/* Sign In (Mobile) */}
                        <a
                            href="https://cloud.tiptap.dev/login"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="lg:hidden inline-flex items-center space-x-2 bg-black text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-800"
                        >
                            <span>Sign in</span>
                            <ArrowIcon />
                        </a>

                        {/* Sign Up (Desktop) */}
                        <a
                            href="https://cloud.tiptap.dev/register"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden lg:inline-flex items-center space-x-2 bg-black text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-800"
                        >
                            <span>Sign up</span>
                            <ArrowIcon />
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-gray-700 hover:text-gray-900 p-2"
                        >
                            <BurgerIcon />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white border-t border-gray-200">
                    <div className="px-4 py-4 space-y-4">
                        <button
                            onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
                            className="block w-full text-left text-gray-700 hover:text-gray-900 py-2 text-base font-medium"
                        >
                            Features
                        </button>

                        {isFeaturesOpen && (
                            <div className="pl-4 space-y-3">
                                {Object.entries(featuresData).map(([category, items]) => (
                                    <div key={category} className="space-y-2">
                                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                            {category}
                                        </h4>
                                        {items.map((item, idx) => (
                                            <Link
                                                key={idx}
                                                href={item.href}
                                                className="block py-2 text-sm text-gray-600 hover:text-gray-900"
                                            >
                                                {item.title}
                                            </Link>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        )}

                        <Link href="/customers" className="block text-gray-700 hover:text-gray-900 py-2 text-base font-medium">
                            Customers
                        </Link>
                        <Link href="/enterprise" className="block text-gray-700 hover:text-gray-900 py-2 text-base font-medium">
                            Enterprise
                        </Link>
                        <Link href="/pricing" className="block text-gray-700 hover:text-gray-900 py-2 text-base font-medium">
                            Pricing
                        </Link>
                        <a href="https://tiptap.dev/docs" className="block text-gray-700 hover:text-gray-900 py-2 text-base font-medium">
                            Docs
                        </a>

                        {/* Mobile Social Links */}
                        <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                            <a href="https://tiptap.dev/discord" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
                                <DiscordIcon />
                            </a>
                            <a href="https://tiptap.dev/github" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                                <GitHubIcon />
                                <span className="text-sm">32.6k</span>
                            </a>
                        </div>

                        {/* Mobile CTA Buttons */}
                        <div className="space-y-2 pt-4 border-t border-gray-200">
                            <Link href="/contact-sales" className="block text-gray-700 hover:text-gray-900 py-2 text-base font-medium">
                                Contact sales
                            </Link>
                            <a
                                href="https://cloud.tiptap.dev/login"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-2 bg-black text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-800 w-full justify-center"
                            >
                                <span>Sign in</span>
                                <ArrowIcon />
                            </a>
                            <a
                                href="https://cloud.tiptap.dev/register"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-2 bg-gray-100 text-gray-900 px-4 py-2 rounded text-sm font-medium hover:bg-gray-200 w-full justify-center"
                            >
                                <span>Sign up</span>
                                <ArrowIcon />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}