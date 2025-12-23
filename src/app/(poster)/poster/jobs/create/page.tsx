"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // 1. Import Router
import { postJob } from "@/app/api/jobs";

// --- Icons ---
const Icons = {
    ArrowLeft: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>,
    Check: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>,
    Alert: () => <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    X: () => <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
};

// --- Types ---
type EmploymentType = 'FULLTIME' | 'PARTTIME' | 'CONTRACT' | 'INTERNSHIP';
type ExperienceLevel = 'ENTRY' | 'MID' | 'SENIOR' | 'EXECUTIVE';
type JobStatus = 'OPEN' | 'CLOSED' | 'DRAFT';

interface JobFormData {
    title: string;
    slug: string;
    description: string;
    skills: string[];
    location: string;
    salaryMin: number | "";
    salaryMax: number | "";
    currency: string;
    experience: ExperienceLevel;
    employment: EmploymentType;
    openings: number;
    status: JobStatus;
    featured: boolean;
}

export default function JobEditorPage() {
    const router = useRouter(); // 2. Initialize Router
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false); // 3. Success Modal State
    const [skillInput, setSkillInput] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    // --- Form State ---
    const [formData, setFormData] = useState<JobFormData>({
        title: "",
        slug: "",
        description: "",
        skills: [],
        location: "",
        salaryMin: "",
        salaryMax: "",
        currency: "USD",
        experience: "MID",
        employment: "FULLTIME",
        openings: 1,
        status: "DRAFT",
        featured: false,
    });

    // --- Validation State ---
    const [touched, setTouched] = useState<Partial<Record<keyof JobFormData, boolean>>>({});

    // --- Computed Errors ---
    const errors = useMemo(() => {
        const newErrors: Partial<Record<keyof JobFormData, string>> = {};

        if (!formData.title.trim()) newErrors.title = "Job title is required";
        else if (formData.title.length < 5) newErrors.title = "Title must be at least 5 characters";

        if (!formData.description.trim()) newErrors.description = "Description is required";

        if (!formData.location.trim()) newErrors.location = "Location is required";

        if (formData.skills.length === 0) newErrors.skills = "At least one skill tag is required";

        if (formData.salaryMin !== "" && formData.salaryMax !== "") {
            if (Number(formData.salaryMin) > Number(formData.salaryMax)) {
                newErrors.salaryMin = "Min salary cannot exceed Max salary";
            }
        }

        if (formData.openings < 1) newErrors.openings = "Must have at least 1 opening";

        return newErrors;
    }, [formData]);

    const isValid = Object.keys(errors).length === 0;

    // Auto-slug
    useEffect(() => {
        const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        setFormData(prev => ({ ...prev, slug }));
    }, [formData.title]);

    // --- Handlers ---
    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setTouched(prev => ({ ...prev, [e.target.name]: true }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? (value === "" ? "" : Number(value)) : value
        }));
    };

    const handleToggle = (field: keyof JobFormData) => {
        setFormData(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const addSkill = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && skillInput.trim()) {
            e.preventDefault();
            if (!formData.skills.includes(skillInput.trim())) {
                setFormData(prev => ({ ...prev, skills: [...prev.skills, skillInput.trim()] }));
            }
            setSkillInput("");
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setFormData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skillToRemove) }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);

        // Mark all as touched
        const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {});
        setTouched(allTouched);

        if (!isValid) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setIsSaving(true);

        try {
            const res = await postJob(formData);

            // 4. Handle Success Logic
            if (res.status == 201) {
                setShowSuccess(true); // Show Modal
                setIsSaving(false);

                // Navigate after 2 seconds
                setTimeout(() => {
                    router.push("/dashboard/jobs");
                }, 2000);
            } else {
                setIsSaving(false);
                console.log("Unexpected status:", res.status);
            }
        }
        catch (error) {
            setIsSaving(false);
            console.log("error happen:", error)
        }
    };

    // Helper for Input Styles
    const getInputClass = (fieldName: keyof JobFormData) => {
        const hasError = errors[fieldName] && (touched[fieldName] || isSubmitted);
        const base = "w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-950 border rounded-lg text-sm focus:outline-none focus:ring-2 transition font-medium";

        if (hasError) {
            return `${base} border-rose-300 dark:border-rose-900/50 text-rose-900 dark:text-rose-100 focus:ring-rose-500 placeholder-rose-300`;
        }
        return `${base} border-gray-200 dark:border-neutral-800 text-slate-800 dark:text-white focus:ring-indigo-500 focus:border-indigo-500`;
    };

    return (
        <section className="font-sans min-h-screen bg-gray-50/50 dark:bg-neutral-950 text-slate-800 dark:text-slate-200 relative">

            {/* --- ROUNDED FLOATING HEADER --- */}
            <div className="my-2">
                <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-lg border border-gray-200 dark:border-neutral-800 rounded-2xl shadow-slate-200/50 dark:shadow-black/50 px-6 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard/jobs" className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-800 text-slate-500 transition">
                            <Icons.ArrowLeft />
                        </Link>
                        <div className="flex flex-col">
                            <h1 className="text-base font-bold text-slate-900 dark:text-white">
                                {formData.title || "New Job Posting"}
                            </h1>
                            <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${isValid ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`}></span>
                                <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">
                                    {isValid ? 'Ready to Publish' : 'Draft - Incomplete'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button type="button" className="hidden sm:block px-4 py-2 bg-transparent border border-gray-200 dark:border-neutral-700 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-neutral-800 transition">
                            Save as Draft
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={isSaving || showSuccess}
                            className={`px-6 py-2 text-black dark:text-white rounded-xl text-xs font-bold transition flex items-center gap-2 ${isValid
                                ? 'bg-indigo-600 hover:bg-indigo-700 hover:scale-105 shadow-indigo-500/20'
                                : 'bg-slate-200 dark:bg-neutral-700 cursor-not-allowed opacity-80'
                                }`}
                        >
                            {isSaving ? 'Saving...' : <><Icons.Check /> Publish Job</>}
                        </button>
                    </div>
                </div>

                {/* Global Error Message */}
                {isSubmitted && !isValid && (
                    <div className="mt-2 mx-4 p-2 bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-900 rounded-lg text-center animate-in fade-in slide-in-from-top-2">
                        <p className="text-xs font-bold text-rose-600 dark:text-rose-300 flex items-center justify-center gap-2">
                            <Icons.Alert /> Please fix the errors below before publishing.
                        </p>
                    </div>
                )}
            </div>

            <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-2">

                {/* --- LEFT COLUMN: MAIN CONTENT --- */}
                <div className="lg:col-span-2 space-y-2">

                    {/* 1. Basic Info */}
                    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-200 dark:border-neutral-800 p-6 shadow-sm">
                        <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            Job Details
                            {errors.title && touched.title && <span className="text-rose-500 text-[10px] font-normal bg-rose-50 px-2 py-0.5 rounded-full dark:bg-rose-900/30">Required</span>}
                        </h2>
                        <div className="space-y-4">
                            {/* Title */}
                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Job Title <span className="text-rose-500">*</span></label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="e.g. Senior React Developer"
                                    className={getInputClass('title')}
                                />
                                {errors.title && touched.title && <p className="text-[10px] text-rose-500 mt-1 font-medium flex items-center gap-1"><Icons.Alert /> {errors.title}</p>}
                            </div>

                            {/* Slug */}
                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Slug (Auto-generated)</label>
                                <div className={`flex rounded-lg border overflow-hidden ${errors.slug ? 'border-rose-300' : 'border-gray-200 dark:border-neutral-800'}`}>
                                    <span className="px-3 py-2.5 bg-gray-100 dark:bg-neutral-800 border-r border-gray-200 dark:border-neutral-700 text-xs text-slate-500 flex items-center font-medium">
                                        jobs.com/
                                    </span>
                                    <input
                                        type="text"
                                        name="slug"
                                        readOnly
                                        value={formData.slug}
                                        className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-neutral-950 text-sm focus:outline-none text-slate-500 cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Description <span className="text-rose-500">*</span></label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    rows={8}
                                    className={getInputClass('description')}
                                    placeholder="Describe the role, responsibilities, and requirements..."
                                ></textarea>
                                {errors.description && touched.description && <p className="text-[10px] text-rose-500 mt-1 font-medium flex items-center gap-1"><Icons.Alert /> {errors.description}</p>}
                                <div className="flex justify-between mt-1">
                                    <p className="text-[10px] text-slate-400">Markdown supported</p>
                                    <p className={`text-[10px] ${formData.description.length < 100 ? 'text-amber-500' : 'text-emerald-500'}`}>{formData.description.length} chars</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Skills */}
                    <div className={`bg-white dark:bg-neutral-900 rounded-2xl border p-6 shadow-sm transition-colors ${errors.skills && touched.skills ? 'border-rose-200 dark:border-rose-900/50' : 'border-gray-200 dark:border-neutral-800'}`}>
                        <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Skills & Tags</h2>
                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Required Skills <span className="text-rose-500">*</span></label>

                            <div className={`p-2 bg-gray-50 dark:bg-neutral-950 border rounded-lg flex flex-wrap gap-2 transition-all ${errors.skills && touched.skills ? 'border-rose-300 ring-1 ring-rose-200' : 'border-gray-200 dark:border-neutral-800 focus-within:ring-2 focus-within:ring-indigo-500'}`}>
                                {formData.skills.map((skill, index) => (
                                    <span key={index} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-slate-700 dark:text-slate-300 shadow-sm">
                                        {skill}
                                        <button type="button" onClick={() => removeSkill(skill)} className="hover:text-rose-500 transition"><Icons.X /></button>
                                    </span>
                                ))}
                                <input
                                    type="text"
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    onBlur={() => setTouched(prev => ({ ...prev, skills: true }))}
                                    onKeyDown={addSkill}
                                    placeholder={formData.skills.length === 0 ? "Type a skill (e.g. React) and press Enter..." : "Add another..."}
                                    className="flex-1 bg-transparent text-sm min-w-[200px] outline-none py-1 px-1 placeholder-slate-400"
                                />
                            </div>
                            {errors.skills && touched.skills && <p className="text-[10px] text-rose-500 mt-1 font-medium flex items-center gap-1"><Icons.Alert /> {errors.skills}</p>}
                        </div>
                    </div>

                    {/* 3. Compensation */}
                    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-200 dark:border-neutral-800 p-6 shadow-sm">
                        <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Compensation</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Currency</label>
                                <select
                                    name="currency"
                                    value={formData.currency}
                                    onChange={handleChange}
                                    className={getInputClass('currency')}
                                >
                                    <option value="USD">USD ($)</option>
                                    <option value="EUR">EUR (€)</option>
                                    <option value="GBP">GBP (£)</option>
                                    <option value="CAD">CAD ($)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Min Salary</label>
                                <input
                                    type="number"
                                    name="salaryMin"
                                    value={formData.salaryMin}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="0"
                                    className={getInputClass('salaryMin')}
                                />
                                {errors.salaryMin && touched.salaryMin && <p className="text-[10px] text-rose-500 mt-1 font-medium">{errors.salaryMin}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Max Salary</label>
                                <input
                                    type="number"
                                    name="salaryMax"
                                    value={formData.salaryMax}
                                    onChange={handleChange}
                                    placeholder="0"
                                    className={getInputClass('salaryMax')}
                                />
                            </div>
                        </div>
                    </div>

                </div>

                {/* --- RIGHT COLUMN: SETTINGS --- */}
                <div className="space-y-2">

                    {/* 1. Publishing Status */}
                    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-200 dark:border-neutral-800 p-6 shadow-sm">
                        <h2 className="text-xs font-bold uppercase text-slate-400 mb-4 tracking-wider">Visibility</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Post Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="DRAFT">Draft</option>
                                    <option value="OPEN">Open / Published</option>
                                    <option value="CLOSED">Closed</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800">
                                <div>
                                    <p className="text-xs font-bold text-slate-900 dark:text-white">Featured Job</p>
                                    <p className="text-[10px] text-slate-500">Pin to top of career page</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleToggle('featured')}
                                    className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${formData.featured ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-neutral-700'}`}
                                >
                                    <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-200 ${formData.featured ? 'translate-x-5' : 'translate-x-0'}`} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 2. Classifications */}
                    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-200 dark:border-neutral-800 p-6 shadow-sm">
                        <h2 className="text-xs font-bold uppercase text-slate-400 mb-4 tracking-wider">Classifications</h2>
                        <div className="space-y-4">

                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Work Mode</label>
                                <select
                                    name="type"
                                    // value={formData.type}
                                    onChange={handleChange}
                                >
                                    <option value="REMOTE">Remote</option>
                                    <option value="ONSITE">On-site</option>
                                    <option value="HYBRID">Hybrid</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Experience</label>
                                <select
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    className={getInputClass('experience')}
                                >
                                    <option value="ENTRY">Entry Level</option>
                                    <option value="MID">Mid Level</option>
                                    <option value="SENIOR">Senior</option>
                                    <option value="EXECUTIVE">Executive</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Employment</label>
                                <select
                                    name="employment"
                                    onChange={handleChange}
                                    className={getInputClass('employment')}
                                >
                                    <option value="FULL_TIME">Full Time</option>
                                    <option value="PART_TIME">Part Time</option>
                                    <option value="CONTRACT">Contract</option>
                                    <option value="INTERNSHIP">Internship</option>
                                </select>
                            </div>

                        </div>
                    </div>

                    {/* 3. Logistics */}
                    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-200 dark:border-neutral-800 p-6 shadow-sm">
                        <h2 className="text-xs font-bold uppercase text-slate-400 mb-4 tracking-wider">Logistics</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Location <span className="text-rose-500">*</span></label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="City, State or Country"
                                    className={getInputClass('location')}
                                />
                                {errors.location && touched.location && <p className="text-[10px] text-rose-500 mt-1 font-medium">{errors.location}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Openings</label>
                                <input
                                    type="number"
                                    name="openings"
                                    value={formData.openings}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    min="1"
                                    className={getInputClass('openings')}
                                />
                                {errors.openings && touched.openings && <p className="text-[10px] text-rose-500 mt-1 font-medium">{errors.openings}</p>}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* --- SUCCESS MODAL --- */}
            {showSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center border border-gray-200 dark:border-neutral-800 transform scale-100 animate-in zoom-in-95 duration-200">
                        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Job Published!</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                            Your job post is live. Redirecting you to your dashboard...
                        </p>
                        <div className="w-full bg-gray-100 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 animate-[progress_2s_ease-in-out_forwards] w-0" style={{ animationFillMode: 'forwards', width: '100%' }}></div>
                        </div>
                    </div>
                </div>
            )}

        </section>
    );
}