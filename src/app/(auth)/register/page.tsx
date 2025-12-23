"use client";
import { signup } from "@/app/api/auth";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCompanies } from "@/app/api/company";

// Content Configuration
const CONTENT = {
    steps: [
        { id: 1, title: "Your Details", label: "Step 1" },
        { id: 2, title: "Choose Role", label: "Step 2" },
        { id: 3, title: "Security", label: "Step 3" }
    ],
    roles: [
        {
            value: "SEEKER",
            label: "Job Seeker",
            description: "Looking for opportunities",
            icon: "search"
        },
        {
            value: "POSTER",
            label: "Employer",
            description: "Hiring talent",
            icon: "briefcase"
        }
    ],
    features: [
        {
            id: 1,
            icon: "shield",
            title: "Secure & Private",
            description: "Your data is encrypted",
            color: "violet"
        },
        {
            id: 2,
            icon: "zap",
            title: "Quick Setup",
            description: "3 steps to get started",
            color: "blue"
        }
    ]
};

const ICONS = {
    shield: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    ),
    zap: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    ),
    users: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    ),
    search: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    ),
    briefcase: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    )
};

export default function Register() {
    const [existingCompanies, setExistingCompanies] = useState([])
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        role: "SEEKER",
        companyName: "",
        avatar: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    // --- COMBOBOX STATE ---
    const [isCompanyOpen, setIsCompanyOpen] = useState(false);
    const [companySearch, setCompanySearch] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsCompanyOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleCompanies = async () => {
        try {
            const res = await getCompanies()
            if (res.status == 200) {
                setExistingCompanies(res.data);
            }
            else {
                console.log("something went wrong", res)
            }
        }
        catch (error) {
            console.log("error:", error)
        }
    }
    // Filter companies based on search
    const filteredCompanies = existingCompanies.filter((c: any) =>
        c.name.toLowerCase().includes(companySearch.toLowerCase())
    );

    const validateField = (name: string, value: string) => {
        switch (name) {
            case 'username':
                if (!value) return 'Name is required';
                if (value.length < 3) return 'Name must be at least 3 characters';
                return '';
            case 'email':
                if (!value) return 'Email is required';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return 'Please enter a valid email';
                return '';
            case 'companyName':
                if (formData.role === 'POSTER' && !value) return 'Please select a company';
                return '';
            case 'password':
                if (!value) return 'Password is required';
                if (value.length < 8) return 'Password must be at least 8 characters';
                return '';
            case 'confirmPassword':
                if (!value) return 'Please confirm your password';
                if (value !== formData.password) return 'Passwords do not match';
                return '';
            default:
                return '';
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (touched[name]) {
            setErrors({ ...errors, [name]: validateField(name, value) });
        }
    };

    const handleBlur = (name: string) => {
        setTouched({ ...touched, [name]: true });
        setErrors({ ...errors, [name]: validateField(name, formData[name as keyof typeof formData]) });
    };

    const canProceed = (currentStep: number) => {
        if (currentStep === 1) {
            return formData.username && formData.email &&
                !validateField('username', formData.username) &&
                !validateField('email', formData.email);
        }
        if (currentStep === 2) {
            if (!formData.role) return false;
            if (formData.role === 'POSTER') {
                return formData.companyName && !validateField('companyName', formData.companyName);
            }
            return true;
        }
        if (currentStep === 3) {
            return formData.password && formData.confirmPassword &&
                !validateField('password', formData.password) &&
                !validateField('confirmPassword', formData.confirmPassword);
        }
        return false;
    };

    const handleRegister = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await signup(formData);
            if (response.status != "201") {
                setError(response.message || "Something went wrong");
                setLoading(false);
            } else {
                router.push("/signin");
            }
        } catch (err) {
            setError("Failed to register. Try again later.");
            setLoading(false);
        }
    };

    return (
        <>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');
                
                .pattern-dots {
                    background-image: radial-gradient(circle, #e5e7eb 1px, transparent 1px);
                    background-size: 24px 24px;
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }

                .animate-fade-in-up {
                    animation: fadeInUp 0.6s ease-out forwards;
                }
            `}</style>

            <div className="h-screen overflow-hidden flex flex-col" style={{ fontFamily: 'Outfit, sans-serif' }}>

                {/* Custom Background */}
                <div className="fixed inset-0 bg-white pattern-dots opacity-40 -z-10"></div>
                <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-violet-500 rounded-full blur-[150px] opacity-20 -z-10"></div>
                <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[120px] opacity-15 -z-10"></div>

                {/* Header */}
                <header className="px-6 lg:px-10 py-5 flex items-center justify-between border-b border-gray-100 bg-white/50 backdrop-blur-sm">
                    <Link href="/" className="inline-flex items-baseline gap-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        <span className="text-2xl font-bold text-gray-900">Dev</span>
                        <span className="text-2xl font-bold text-violet-600">mind</span>
                        <div className="w-1.5 h-1.5 bg-violet-600 rounded-full mb-1.5"></div>
                    </Link>
                    <Link href="/signin" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                        Sign in
                    </Link>
                </header>

                {/* Main */}
                <main className="flex-1 flex items-center justify-center px-6 lg:px-10 py-6 overflow-y-auto">
                    <div className="w-full max-w-[1140px]">

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                            {/* Left Content */}
                            <div className="relative space-y-8 hidden lg:block">

                                {/* Floating decorative orbs */}
                                <div className="absolute -top-10 -left-10 w-20 h-20 bg-violet-200 rounded-full blur-2xl opacity-40 animate-float"></div>
                                <div className="absolute bottom-20 right-10 w-24 h-24 bg-purple-200 rounded-full blur-2xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>

                                <div className="relative z-10 space-y-5">
                                    <div className="inline-block animate-fade-in-up">
                                        <div className="flex items-center gap-2 px-3 py-1.5 bg-violet-50 border border-violet-200 rounded-full">
                                            <div className="relative">
                                                <div className="w-1.5 h-1.5 bg-violet-600 rounded-full"></div>
                                                <div className="absolute inset-0 w-1.5 h-1.5 bg-violet-600 rounded-full animate-ping"></div>
                                            </div>
                                            <span className="text-xs font-medium text-violet-900">Join our growing community</span>
                                        </div>
                                    </div>

                                    <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-[1] animate-fade-in-up" style={{ fontFamily: 'Space Grotesk, sans-serif', animationDelay: '0.1s' }}>
                                        Start your<br />
                                        career journey<br />
                                        <span className="text-violet-600">today</span>
                                    </h1>

                                    <p className="text-lg text-gray-600 max-w-md leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                                        Create your account and unlock access to thousands of opportunities waiting for you.
                                    </p>
                                </div>

                                {/* Feature Cards */}
                                <div className="relative z-10 space-y3 pt-8 flex gap-10">
                                    {CONTENT.features.map((feature, index) => (
                                        <div
                                            key={feature.id}
                                            className="group flex items-center gap-3 p-3 rounded-2xl hover:bg-violet-50/50 transition-colors animate-fade-in-up"
                                        // style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                                        >
                                            <div className={`w-10 h-10 bg-${feature.color}-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                                <svg className={`w-5 h-5 text-${feature.color}-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    {ICONS[feature.icon as keyof typeof ICONS]}
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold text-gray-900">{feature.title}</div>
                                                <div className="text-xs text-gray-600">{feature.description}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Form Card */}
                            <div className="relative w-full">

                                {/* Decorative elements */}
                                <div className="absolute -top-4 -left-4 w-10 h-10 border-[3px] border-violet-300 rounded-lg rotate-12 z-10"></div>
                                <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-blue-200 rounded-full z-10"></div>

                                <div className="relative bg-white rounded-2xl shadow-xl shadow-violet-200/40 p-7 border border-gray-100 z-20">

                                    {/* Progress Steps */}
                                    <div className="flex items-center justify-between mb-8">
                                        {CONTENT.steps.map((s, index) => (
                                            <div key={s.id} className="flex items-center flex-1">
                                                <div className="flex flex-col items-center flex-1">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${step >= s.id
                                                        ? 'bg-violet-600 text-white'
                                                        : 'bg-gray-200 text-gray-500'
                                                        }`}>
                                                        {s.id}
                                                    </div>
                                                    <span className="text-xs text-gray-600 mt-1">{s.label}</span>
                                                </div>
                                                {index < CONTENT.steps.length - 1 && (
                                                    <div className={`h-0.5 flex-1 mx-2 ${step > s.id ? 'bg-violet-600' : 'bg-gray-200'
                                                        }`}></div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Step 1: Your Details */}
                                    {step === 1 && (
                                        <div className="space-y-5">
                                            <div>
                                                <h2 className="text-xl font-bold text-gray-900 mb-2">
                                                    Your Details
                                                </h2>
                                                <p className="text-sm text-gray-500">
                                                    Let's start with the basics
                                                </p>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="space-y-1.5">
                                                    <label htmlFor="username" className="block text-sm font-semibold text-gray-700">
                                                        Full Name
                                                    </label>
                                                    <input
                                                        id="username"
                                                        name="username"
                                                        type="text"
                                                        value={formData.username}
                                                        onChange={handleChange}
                                                        onBlur={() => handleBlur('username')}
                                                        className={`w-full h-11 px-3.5 bg-gray-50 border-2 rounded-xl focus:bg-white focus:ring-2 focus:ring-violet-100 outline-none transition-all text-gray-900 placeholder:text-gray-400 ${errors.username && touched.username
                                                            ? 'border-red-300 focus:border-red-400'
                                                            : 'border-gray-100 focus:border-violet-400'
                                                            }`}
                                                        placeholder="John Doe"
                                                    />
                                                    {errors.username && touched.username && (
                                                        <p className="text-xs text-red-600 flex items-center gap-1">
                                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                            </svg>
                                                            {errors.username}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="space-y-1.5">
                                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                                                        Email Address
                                                    </label>
                                                    <input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        onBlur={() => handleBlur('email')}
                                                        className={`w-full h-11 px-3.5 bg-gray-50 border-2 rounded-xl focus:bg-white focus:ring-2 focus:ring-violet-100 outline-none transition-all text-gray-900 placeholder:text-gray-400 ${errors.email && touched.email
                                                            ? 'border-red-300 focus:border-red-400'
                                                            : 'border-gray-100 focus:border-violet-400'
                                                            }`}
                                                        placeholder="you@company.com"
                                                    />
                                                    {errors.email && touched.email && (
                                                        <p className="text-xs text-red-600 flex items-center gap-1">
                                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                            </svg>
                                                            {errors.email}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => setStep(2)}
                                                disabled={!canProceed(1)}
                                                className="w-full h-11 bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-700 hover:to-violet-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold rounded-xl transition-all disabled:cursor-not-allowed shadow-lg shadow-violet-200 disabled:shadow-gray-200"
                                            >
                                                Continue →
                                            </button>

                                            <p className="text-center text-sm text-gray-600">
                                                Already have an account?{" "}
                                                <Link href="/signin" className="font-semibold text-violet-600 hover:text-violet-700">
                                                    Sign in
                                                </Link>
                                            </p>
                                        </div>
                                    )}

                                    {/* Step 2: Choose Role */}
                                    {step === 2 && (
                                        <div className="space-y-5">
                                            <div>
                                                <h2 className="text-xl font-bold text-gray-900 mb-2">
                                                    Choose Your Role
                                                </h2>
                                                <p className="text-sm text-gray-500">
                                                    What brings you to Devmind?
                                                </p>
                                            </div>

                                            <div className="space-y-3">
                                                {CONTENT.roles.map((role) => (
                                                    <div
                                                        key={role.value}
                                                        onClick={() => { setFormData({ ...formData, role: role.value }), handleCompanies() }}
                                                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.role === role.value
                                                            ? 'border-violet-600 bg-violet-50'
                                                            : 'border-gray-200 hover:border-gray-300'
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${formData.role === role.value ? 'bg-violet-600' : 'bg-gray-100'
                                                                }`}>
                                                                <svg className={`w-6 h-6 ${formData.role === role.value ? 'text-white' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    {ICONS[role.icon as keyof typeof ICONS]}
                                                                </svg>
                                                            </div>
                                                            <div className="flex-1">
                                                                <div className="font-semibold text-gray-900">{role.label}</div>
                                                                <div className="text-sm text-gray-600">{role.description}</div>
                                                            </div>
                                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.role === role.value
                                                                ? 'border-violet-600 bg-violet-600'
                                                                : 'border-gray-300'
                                                                }`}>
                                                                {formData.role === role.value && (
                                                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                    </svg>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* ADVANCED SEARCHABLE DROPDOWN (COMBOBOX) */}
                                            {formData.role === 'POSTER' && (
                                                <div className="space-y-1.5 animate-fade-in-up" ref={dropdownRef}>
                                                    <label className="block text-sm font-semibold text-gray-700">
                                                        Select Company
                                                    </label>
                                                    <div className="relative">
                                                        {/* Input acting as search + trigger */}
                                                        <div
                                                            className="relative"
                                                            onClick={() => setIsCompanyOpen(true)}
                                                        >
                                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                                </svg>
                                                            </div>
                                                            <input
                                                                type="text"
                                                                value={isCompanyOpen ? companySearch : (formData.companyName || companySearch)}
                                                                onChange={(e) => {
                                                                    setCompanySearch(e.target.value);
                                                                    setIsCompanyOpen(true);
                                                                    if (formData.companyName) setFormData({ ...formData, companyName: "" }); // Clear selection on edit
                                                                }}
                                                                onFocus={() => setIsCompanyOpen(true)}
                                                                className={`w-full h-11 pl-10 pr-10 bg-gray-50 border-2 rounded-xl focus:bg-white focus:ring-2 focus:ring-violet-100 outline-none transition-all text-gray-900 placeholder:text-gray-400 cursor-text ${errors.companyName && touched.companyName
                                                                    ? 'border-red-300 focus:border-red-400'
                                                                    : 'border-gray-100 focus:border-violet-400'
                                                                    }`}
                                                                placeholder="Search company name..."
                                                                autoComplete="off"
                                                            />
                                                            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                                                                <svg className={`w-4 h-4 transition-transform duration-200 ${isCompanyOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                                </svg>
                                                            </div>
                                                        </div>

                                                        {/* Dropdown Menu */}
                                                        {isCompanyOpen && (
                                                            <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl max-h-60 overflow-y-auto py-1 animate-fade-in-up" style={{ animationDuration: '0.2s' }}>
                                                                {filteredCompanies.length > 0 ? (
                                                                    filteredCompanies.map((company: any) => (
                                                                        <div
                                                                            key={company.id}
                                                                            onClick={() => {
                                                                                setFormData({ ...formData, companyName: company.name });
                                                                                setCompanySearch(company.name);
                                                                                setIsCompanyOpen(false);
                                                                                setErrors({ ...errors, companyName: "" });
                                                                            }}
                                                                            className="px-4 py-2.5 hover:bg-violet-50 cursor-pointer transition-colors"
                                                                        >
                                                                            <div className="text-sm font-medium text-gray-900">{company.name}</div>
                                                                        </div>
                                                                    ))
                                                                ) : (
                                                                    <div className="px-4 py-3 text-center text-sm text-gray-500">
                                                                        No companies found matching "{companySearch}"
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                    {errors.companyName && touched.companyName && (
                                                        <p className="text-xs text-red-600 flex items-center gap-1">
                                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                            </svg>
                                                            {errors.companyName}
                                                        </p>
                                                    )}
                                                </div>
                                            )}

                                            <div className="flex gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => setStep(1)}
                                                    className="h-11 px-6 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                                                >
                                                    ← Back
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setStep(3)}
                                                    disabled={!canProceed(2)}
                                                    className="flex-1 h-11 bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-700 hover:to-violet-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold rounded-xl transition-all disabled:cursor-not-allowed shadow-lg shadow-violet-200 disabled:shadow-gray-200"
                                                >
                                                    Continue →
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 3: Security */}
                                    {step === 3 && (
                                        <div className="space-y-5">
                                            <div>
                                                <h2 className="text-xl font-bold text-gray-900 mb-2">
                                                    Secure Your Account
                                                </h2>
                                                <p className="text-sm text-gray-500">
                                                    Create a strong password
                                                </p>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="space-y-1.5">
                                                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                                                        Password
                                                    </label>
                                                    <input
                                                        id="password"
                                                        name="password"
                                                        type="password"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        onBlur={() => handleBlur('password')}
                                                        className={`w-full h-11 px-3.5 bg-gray-50 border-2 rounded-xl focus:bg-white focus:ring-2 focus:ring-violet-100 outline-none transition-all text-gray-900 placeholder:text-gray-400 ${errors.password && touched.password
                                                            ? 'border-red-300 focus:border-red-400'
                                                            : 'border-gray-100 focus:border-violet-400'
                                                            }`}
                                                        placeholder="••••••••"
                                                    />
                                                    {errors.password && touched.password && (
                                                        <p className="text-xs text-red-600 flex items-center gap-1">
                                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                            </svg>
                                                            {errors.password}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="space-y-1.5">
                                                    <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">
                                                        Confirm Password
                                                    </label>
                                                    <input
                                                        id="confirmPassword"
                                                        name="confirmPassword"
                                                        type="password"
                                                        value={formData.confirmPassword}
                                                        onChange={handleChange}
                                                        onBlur={() => handleBlur('confirmPassword')}
                                                        className={`w-full h-11 px-3.5 bg-gray-50 border-2 rounded-xl focus:bg-white focus:ring-2 focus:ring-violet-100 outline-none transition-all text-gray-900 placeholder:text-gray-400 ${errors.confirmPassword && touched.confirmPassword
                                                            ? 'border-red-300 focus:border-red-400'
                                                            : 'border-gray-100 focus:border-violet-400'
                                                            }`}
                                                        placeholder="••••••••"
                                                    />
                                                    {errors.confirmPassword && touched.confirmPassword && (
                                                        <p className="text-xs text-red-600 flex items-center gap-1">
                                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                            </svg>
                                                            {errors.confirmPassword}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {error && (
                                                <div className="p-3 bg-red-50 rounded-xl border-2 border-red-100">
                                                    <div className="flex items-start gap-2">
                                                        <svg className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                        </svg>
                                                        <p className="text-xs font-medium text-red-900">{error}</p>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                                                <p className="text-xs text-blue-900">
                                                    By creating an account, you agree to our{" "}
                                                    <Link href="/terms" className="font-semibold underline">Terms of Service</Link>
                                                    {" "}and{" "}
                                                    <Link href="/privacy" className="font-semibold underline">Privacy Policy</Link>
                                                </p>
                                            </div>

                                            <div className="flex gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => setStep(2)}
                                                    className="h-11 px-6 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                                                >
                                                    ← Back
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={handleRegister}
                                                    disabled={!canProceed(3) || loading}
                                                    className="flex-1 h-11 bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-700 hover:to-violet-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold rounded-xl transition-all disabled:cursor-not-allowed shadow-lg shadow-violet-200 disabled:shadow-gray-200"
                                                >
                                                    {loading ? (
                                                        <span className="flex items-center justify-center gap-2">
                                                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                            </svg>
                                                            Creating account...
                                                        </span>
                                                    ) : (
                                                        "Create Account →"
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>

                        </div>
                    </div>
                </main>

            </div>
        </>
    );
}