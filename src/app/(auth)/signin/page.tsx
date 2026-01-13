"use client";
import { signin } from "@/app/api/auth";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// Content Configuration
const CONTENT = {
    badge: {
        text: "Login",
        color: "violet"
    },
    heading: {
        main: "Your next role, discovered by ",
        highlight: "Devmind"
    },
    description: "Join millions of professionals discovering roles they love. Connect with companies, get matched instantly.",
    features: [
        {
            id: 1,
            icon: "lightning",
            title: "AI-Powered Matching",
            description: "Smart job recommendations",
            color: "violet"
        },
        {
            id: 2,
            icon: "users",
            title: "Direct Access",
            description: "Connect with recruiters",
            color: "blue"
        },
        // {
        //     id: 3,
        //     icon: "check",
        //     title: "Verified Companies",
        //     description: "Trusted opportunities only",
        //     color: "purple"
        // }
    ]
};

const ICONS = {
    lightning: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    ),
    users: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    ),
    check: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    )
};

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [touched, setTouched] = useState({ email: false, password: false });
    const router = useRouter();
    const emailInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        emailInputRef.current?.focus();
    }, []);

    const validateEmail = (email: string) => {
        if (!email) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return "Please enter a valid email address";
        return "";
    };

    const validatePassword = (password: string) => {
        if (!password) return "Password is required";
        if (password.length < 8) return "Password must be at least 8 characters";
        return "";
    };

    useEffect(() => {
        if (touched.email) setEmailError(validateEmail(email));
    }, [email, touched.email]);

    useEffect(() => {
        if (touched.password) setPasswordError(validatePassword(password));
    }, [password, touched.password]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setTouched({ email: true, password: true });

        const emailErr = validateEmail(email);
        const passwordErr = validatePassword(password);

        setEmailError(emailErr);
        setPasswordError(passwordErr);

        if (emailErr || passwordErr) return;

        setLoading(true);
        setError("");

        try {
            const res = await signin({ email, password });
            if (res.status != 200) {
                setError(res.data.message || "Invalid credentials. Please check your email and password.");
                setLoading(false);
                return;
            }

            setSuccess(true);
            setTimeout(() => router.push("/dashboard"), 800);
        } catch (err) {
            setError("Unable to connect. Please check your internet connection and try again.");
            setLoading(false);
        }
    };

    const isFormValid = !validateEmail(email) && !validatePassword(password);

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
                
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    50% { transform: translateY(-15px) translateX(10px); }
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

                .animate-float-slow {
                    animation: float-slow 8s ease-in-out infinite;
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
                    <Link href="/register" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                        Create account
                    </Link>
                </header>

                {/* Main */}
                <main className="flex-1 flex items-center justify-center px-6 lg:px-10 py-6">
                    <div className="w-full max-w-[1140px]">

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                            {/* Left Content */}
                            <div>
                                <div className="relative space-y-8 hidden lg:block">

                                    {/* Floating decorative orbs */}
                                    <div className="absolute -top-10 -left-10 w-44 h-44 bg-violet-200 rounded-full blur-2xl opacity-40 animate-float"></div>
                                    <div className="absolute top-20 right-10 w-44 h-44 bg-blue-200 rounded-full blur-xl opacity-30 animate-float-slow"></div>
                                    <div className="absolute bottom-32 -left-5 w-24 h-24 bg-purple-200 rounded-full blur-2xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
                                    <div className="absolute bottom-10 right-20 w-12 h-12 bg-pink-200 rounded-full blur-xl opacity-40 animate-float-slow" style={{ animationDelay: '1s' }}></div>

                                    {/* Subtle line decorations */}
                                    {/* <div className="absolute top-1/3 -left-8 w-32 h-[2px] bg-gradient-to-r from-transparent via-violet-300 to-transparent opacity-30"></div> */}
                                    {/* <div className="absolute bottom-1/3 right-0 w-24 h-[2px] bg-gradient-to-r from-transparent via-blue-300 to-transparent opacity-30"></div> */}

                                    <div className="relative z-10 space-y-5">
                                        {/* Badge */}
                                        <div className="inline-block animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                                            <div className="flex items-center gap-2 px-3 py-1.5 bg-violet-50 border border-violet-200 rounded-full">
                                                <div className="relative">
                                                    <div className="w-1.5 h-1.5 bg-violet-600 rounded-full"></div>
                                                    <div className="absolute inset-0 w-1.5 h-1.5 bg-violet-600 rounded-full animate-ping"></div>
                                                </div>
                                                <span className="text-xs font-medium text-violet-900">{CONTENT.badge.text}</span>
                                            </div>
                                        </div>

                                        {/* Heading */}
                                        <h1
                                            className="text-5xl lg:text-6xl font-bold text-gray-900 leading-[1] animate-fade-in-up"
                                            style={{ fontFamily: 'Space Grotesk, sans-serif', animationDelay: '0.2s' }}
                                        >
                                            {CONTENT.heading.main.split('\n').map((line, i) => (
                                                <span key={i}>
                                                    {line}
                                                    {i < CONTENT.heading.main.split('\n').length - 1 && <br />}
                                                </span>
                                            ))}<br />
                                            <span className="text-violet-600">{CONTENT.heading.highlight}</span>
                                        </h1>

                                        {/* Description */}
                                        <p className="text-lg text-gray-600 max-w-md leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                                            {CONTENT.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Feature Cards */}
                                <div className="relative z-10 flex gap-6 pt-16">
                                    {CONTENT.features.map((feature, index) => (
                                        <div
                                            key={feature.id}
                                            className="group flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 hover:shadow-lg animate-fade-in-up"
                                            style={{
                                                animationDelay: `${0.4 + index * 0.1}s`,
                                                backgroundColor: `rgb(var(--${feature.color}-50) / 0)`
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = `rgb(var(--${feature.color}-50) / 0.5)`;
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = `rgb(var(--${feature.color}-50) / 0)`;
                                            }}
                                        >
                                            <div
                                                className={`w-10 h-10 bg-${feature.color}-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                                            >
                                                <svg className={`w-5 h-5 text-${feature.color}-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    {ICONS[feature.icon as keyof typeof ICONS]}
                                                </svg>
                                            </div>
                                            <div className="text-nowrap">
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

                                    <div className="mb-6">
                                        <h2 className="text-xl font-bold text-gray-900">
                                            Welcome back
                                        </h2>
                                        <p className="text-sm text-gray-500 mt-1">
                                            New?{" "}
                                            <Link href="/register" className="text-violet-600 font-semibold hover:text-violet-700 transition-colors">
                                                Create account
                                            </Link>
                                        </p>
                                    </div>

                                    <form onSubmit={handleLogin} className="space-y-4" noValidate>

                                        {/* Email */}
                                        <div className="space-y-1.5">
                                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                                                Email
                                            </label>
                                            <input
                                                ref={emailInputRef}
                                                id="email"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                onBlur={() => setTouched({ ...touched, email: true })}
                                                autoComplete="email"
                                                required
                                                aria-invalid={emailError ? "true" : "false"}
                                                aria-describedby={emailError ? "email-error" : undefined}
                                                className={`w-full h-11 px-3.5 bg-gray-50 border-2 rounded-xl focus:bg-white focus:ring-2 focus:ring-violet-100 outline-none transition-all text-gray-900 placeholder:text-gray-400 ${emailError && touched.email
                                                    ? 'border-red-300 focus:border-red-400'
                                                    : 'border-gray-100 focus:border-violet-400'
                                                    }`}
                                                placeholder="you@company.com"
                                            />
                                            {emailError && touched.email && (
                                                <p id="email-error" className="text-xs text-red-600 flex items-center gap-1">
                                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                    {emailError}
                                                </p>
                                            )}
                                        </div>

                                        {/* Password */}
                                        <div className="space-y-1.5">
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                                                    Password
                                                </label>
                                                <Link href="/forgot-password" className="text-xs font-medium text-violet-600 hover:text-violet-700 transition-colors">
                                                    Forgot?
                                                </Link>
                                            </div>
                                            <div className="relative">
                                                <input
                                                    id="password"
                                                    type={showPassword ? "text" : "password"}
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    onBlur={() => setTouched({ ...touched, password: true })}
                                                    autoComplete="current-password"
                                                    required
                                                    aria-invalid={passwordError ? "true" : "false"}
                                                    aria-describedby={passwordError ? "password-error" : undefined}
                                                    className={`w-full h-11 px-3.5 pr-10 bg-gray-50 border-2 rounded-xl focus:bg-white focus:ring-2 focus:ring-violet-100 outline-none transition-all text-gray-900 placeholder:text-gray-400 ${passwordError && touched.password
                                                        ? 'border-red-300 focus:border-red-400'
                                                        : 'border-gray-100 focus:border-violet-400'
                                                        }`}
                                                    placeholder="••••••••"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                                >
                                                    {showPassword ? (
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                        </svg>
                                                    ) : (
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                            {passwordError && touched.password && (
                                                <p id="password-error" className="text-xs text-red-600 flex items-center gap-1">
                                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                    {passwordError}
                                                </p>
                                            )}
                                        </div>

                                        {/* Server Error Message */}
                                        {error && (
                                            <div id="error-message" className="p-3 bg-red-50 rounded-xl border-2 border-red-100 animate-shake" role="alert">
                                                <div className="flex items-start gap-2">
                                                    <svg className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                    </svg>
                                                    <p className="text-xs font-medium text-red-900">{error}</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Success Message */}
                                        {success && (
                                            <div className="p-3 bg-green-50 rounded-xl border-2 border-green-100" role="status">
                                                <div className="flex items-start gap-2">
                                                    <svg className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                    <p className="text-xs font-medium text-green-900">Success! Redirecting...</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={loading || success || !isFormValid}
                                            className="w-full h-11 bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-700 hover:to-violet-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold rounded-xl transition-all disabled:cursor-not-allowed "
                                        >
                                            {loading ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                    Signing in...
                                                </span>
                                            ) : success ? (
                                                "Success!"
                                            ) : (
                                                "Sign in"
                                            )}
                                        </button>

                                        {/* Divider */}
                                        <div className="relative py-3">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t border-gray-200"></div>
                                            </div>
                                            <div className="relative flex justify-center">
                                                <span className="bg-white px-2 text-xs font-semibold text-gray-400 uppercase">
                                                    Or
                                                </span>
                                            </div>
                                        </div>

                                        {/* Social Buttons */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                type="button"
                                                disabled={loading || success}
                                                className="h-10 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-medium flex items-center justify-center gap-2 transition-all text-sm"
                                                aria-label="Sign in with Google"
                                            >
                                                <svg className="w-4 h-4" viewBox="0 0 24 24">
                                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                                </svg>
                                                Google
                                            </button>

                                            <button
                                                type="button"
                                                disabled={loading || success}
                                                className="h-10 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-medium flex items-center justify-center gap-2 transition-all text-sm"
                                                aria-label="Sign in with LinkedIn"
                                            >
                                                <svg className="w-4 h-4" fill="#0A66C2" viewBox="0 0 24 24">
                                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                </svg>
                                                LinkedIn
                                            </button>
                                        </div>

                                    </form>

                                </div>
                            </div>

                        </div>
                    </div>
                </main>

            </div>

            <style jsx>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-4px); }
                    75% { transform: translateX(4px); }
                }
                .animate-shake {
                    animation: shake 0.3s ease-in-out;
                }
            `}</style>
        </>
    );
}