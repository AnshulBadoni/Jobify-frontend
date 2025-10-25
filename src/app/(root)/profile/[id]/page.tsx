"use client";
import { getMe, getProfile, getSummary, updateProfile } from "@/app/api/profile";
import Input from "@/app/components/Input";
import TextArea from "@/app/components/TextArea";
import { cryptoId } from "@/app/utility";
import { Download, RefreshCw, X } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
// import { allvids } from "../../../../../collections";

type Application = {
    id: number;
    company: string;
    logo: string;
    title: string;
    date: string;
    status: "In Review" | "Approved" | "Pending";
};

type Activity = { id: number; action: string; date: string };

type Experience = {
    id: string;
    role: string;
    company: string;
    period: string;
    details: string;
};

type Education = {
    id: string;
    degree: string;
    institution: string;
    year: string;
};

type Project = {
    id: string;
    name: string;
    description: string;
    link?: string;
    img?: string[];
};

export interface User {
    id: number;
    username: string;
    email: string;
    avatar?: string | null;
    role: "ADMIN" | "SEEKER" | "POSTER";
}

export interface ProfileState {
    id: number;
    userId: number;
    professionalRole?: string | null;
    fullName?: string | null;
    bio?: string | null;
    location?: string | null;
    background?: string | null;
    githubUrl?: string | null;
    resumeUrl?: string | null;
    rating?: number | null;
    skills: string[];
    experience?: string | null;
    currentCTC?: string | null;
    expectedCTC?: string | null;
    currentLocation?: string | null;
    expectedLocation?: string | null;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    user: User;
}

const STORAGE_KEY = "saas_profile_page_v1";

const SaaSProfilePage = ({ params }: { params: { id: string } }) => {
    const initialApplications: Application[] = [
        {
            id: 1,
            company: "Salesly",
            logo: "https://logo.clearbit.com/salesforce.com",
            title: "CRM Dashboard",
            date: "Applied on Aug 30, 2025",
            status: "In Review",
        },
        {
            id: 2,
            company: "InsightIQ",
            logo: "https://logo.clearbit.com/google.com",
            title: "Analytics Portal",
            date: "Applied on Aug 27, 2025",
            status: "Approved",
        },
        {
            id: 3,
            company: "ShopEase",
            logo: "https://logo.clearbit.com/shopify.com",
            title: "E-commerce API",
            date: "Applied on Aug 20, 2025",
            status: "Pending",
        },
    ];

    const initialActivity: Activity[] = [
        { id: 1, action: "Applied to ShopEase", date: "Aug 20, 2025" },
        { id: 2, action: "Received reply from InsightIQ", date: "Aug 28, 2025" },
        { id: 3, action: "Profile viewed by 12 recruiters", date: "Aug 30, 2025" },
    ];

    const initialSkills = ["React", "Node.js", "TypeScript", "AWS", "GraphQL", "TailwindCSS"];

    const initialExperiences: Experience[] = [
        {
            id: cryptoId(),
            role: "Senior Software Engineer",
            company: "SaaSyTech",
            period: "2022 – Present",
            details: "Leading frontend team, building scalable SaaS dashboards.",
        },
        {
            id: cryptoId(),
            role: "Full Stack Developer",
            company: "TechNova",
            period: "2019 – 2022",
            details: "Worked on e-commerce APIs, optimized cloud infrastructure on AWS.",
        },
    ];

    const initialEducation: Education[] = [
        {
            id: cryptoId(),
            degree: "B.Tech in Computer Science",
            institution: "Stanford University",
            year: "2015 – 2019",
        },
    ];

    const initialProjects: Project[] = [
        {
            id: cryptoId(),
            name: "AI Resume Parser",
            description: "Built an AI tool that auto-parses resumes into structured data.",
        },
        {
            id: cryptoId(),
            name: "Realtime Chat App",
            description: "Socket.io powered chat app with file sharing & typing indicators.",
        },
    ];
    // get id from url
    const userId = useParams().id;
    const [latestApplications, setLatestApplications] = useState<Application[]>(initialApplications);
    const [activityFeed, setActivityFeed] = useState<Activity[]>(initialActivity);
    const [skills, setSkills] = useState<string[]>(initialSkills);
    const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);
    const [education, setEducation] = useState<Education[]>(initialEducation);
    const [projects, setProjects] = useState<Project[]>(initialProjects);
    const [summary, setSummary] = useState<any[]>([]);

    const [profile, setProfile] = useState<ProfileState>({
        id: 0,
        userId: 0,
        fullName: "",
        bio: "",
        professionalRole: "",
        location: "",
        background: "",
        githubUrl: "",
        resumeUrl: "",
        rating: 0,
        skills: [],
        experience: "",
        currentCTC: "",
        expectedCTC: "",
        currentLocation: "",
        expectedLocation: "",
        createdAt: "",
        updatedAt: "",
        user: {
            id: 0,
            username: "",
            email: "",
            avatar: "",
            role: "SEEKER",
        },
    });

    useEffect(() => {
        try {
            fetchProfile()
        } catch { }
    }, []);

    const fetchProfile = async () => {
        const response = await getProfile();
        // if (response.status != 200) { }
        setProfile(response.data)
    }

    // save to localStorage on change (debounced)
    useEffect(() => {
        const payload = {
            profile,
            skills,
            experiences,
            education,
            projects,
            latestApplications,
            activityFeed,
        };
        const t = setTimeout(() => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        }, 250);
        return () => clearTimeout(t);
    }, [profile, skills, experiences, education, projects, latestApplications, activityFeed]);

    // ---------- MODAL ----------
    const [open, setOpen] = useState(false);
    const tabs = ["Basic Info", "Resume", "Skills", "Experience", "Education", "Projects"] as const;
    type Tab = typeof tabs[number];
    const [activeTab, setActiveTab] = useState<Tab>("Basic Info");

    const [newSkill, setNewSkill] = useState("");

    // resume preview is memoized (if user uploaded)
    const resumePreview = useMemo(() => {
        if (!profile.resumeUrl) return undefined;
        const ext = (profile.resumeUrl || "").split(".").pop()?.toLowerCase();
        if (ext && ["pdf"].includes(ext)) return "pdf";
        return "file";
    }, [profile.resumeUrl, profile.resumeUrl]);

    // ---------- HANDLERS ----------

    async function generateSummary(usernames: string = "anshulbadoni") {
        const summary = await getSummary(usernames);
        setSummary(summary);

    }
    function handleProfileChange<K extends keyof ProfileState>(key: K, value: ProfileState[K]) {
        setProfile((p) => ({ ...p, [key]: value }));
    }

    const handleNestedProfileChange = (parent: string, key: string, value: string) => {
        setProfile((prev: any) => ({
            ...prev,
            [parent]: {
                ...prev[parent],
                [key]: value,
            },
        }));
    };


    function addSkill() {
        const s = newSkill.trim();
        if (!s) return;
        if (skills.includes(s)) return;
        setSkills((prev) => [...prev, s]);
        setNewSkill("");
    }

    function removeSkill(s: string) {
        setSkills((prev) => prev.filter((x) => x !== s));
    }

    function addExperience() {
        setExperiences((prev) => [
            ...prev,
            { id: cryptoId(), role: "", company: "", period: "", details: "" },
        ]);
    }

    function updateExperience(id: string, key: keyof Experience, value: any) {
        setExperiences((prev) => prev.map((e) => (e.id === id ? { ...e, [key]: value } : e)));
    }

    function removeExperience(id: string) {
        setExperiences((prev) => prev.filter((e) => e.id !== id));
    }

    function addEducation() {
        setEducation((prev) => [
            ...prev,
            { id: cryptoId(), degree: "", institution: "", year: "" },
        ]);
    }

    function updateEducation(id: string, key: keyof Education, value: any) {
        setEducation((prev) => prev.map((e) => (e.id === id ? { ...e, [key]: value } : e)));
    }

    function removeEducation(id: string) {
        setEducation((prev) => prev.filter((e) => e.id !== id));
    }

    function addProject() {
        setProjects((prev) => [...prev, { id: cryptoId(), name: "", description: "", link: "", imgs: [] }]);
    }

    function updateProject(id: string, key: keyof Project, value: any) {
        setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, [key]: value } : p)));
    }

    function removeProject(id: string) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
    }

    async function handleResumeUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        handleProfileChange("resumeUrl", file.name);
        handleProfileChange("resumeUrl", url);
    }

    async function handleProfileUpdate() {
        await updateProfile(profile);
        fetchProfile();
    }

    // ---------- RENDER ----------
    return (
        <section className="font-sans min-h-screen flex justify-center">
            <div className="grid lg:grid-cols-3 gap-2 w-full">
                {/* Main Profile */}
                <div className="relative lg:col-span-2 rounded-xl overflow-hidden bg-white dark:bg-neutral-900 shadow animate-fade-in">
                    {/* Cover */}
                    <div className="relative h-44">
                        <img
                            src="https://static.vecteezy.com/system/resources/previews/003/031/764/original/blue-wide-background-with-linear-blurred-gradient-free-vector.jpg"
                            className="w-full h-full object-cover"
                        />
                        {/* <video autoPlay muted loop className="w-full h-full object-cover" src={profile.background ?? allvids[Math.random() * allvids.length | 0]}></video> */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                        {/* Avatar & Stats */}
                        <div className="flex item-center justify-between">
                            <div>
                                <img
                                    className="absolute -bottom-16 left-5 lg:left-10 lg:size-36 size-28 rounded-full ring-pink-50 ring-4 object-cover"
                                    alt="Profile Avatar"
                                    src="https://img.freepik.com/free-psd/3d-rendering-avatar_23-2150833548.jpg"
                                />
                            </div>
                            <div className="mt-2 sm:mt-5 grid grid-cols-3 sm:grid-cols-3 gap-6 px-6">
                                {[
                                    { value: "245", label: "Viewed" },
                                    { value: "136", label: "Applied" },
                                    { value: "98", label: "Replies" },
                                ].map((stat, idx) => (
                                    <div key={idx} className="text-center transform transition hover:scale-105">
                                        <div className="mt-1 text-gray-600 dark:text-neutral-400 sm:text-sm text-xs">
                                            {stat.label}
                                        </div>
                                        <div className="sm:text-xl text-lg font-bold text-gray-900 dark:text-white">
                                            {stat.value}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="pt-20 pr-4 pl-6 sm:pl-12 pb-12">
                        {/* Header Info */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div>
                                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                                    {profile?.user?.username || "Unknown"}
                                </h1>
                                <p className="text-indigo-600 dark:text-indigo-400 mt-2 text-lg font-medium">
                                    {/* {profile.role} @{profile.company} */}
                                    {profile?.professionalRole}
                                </p>
                                <div className="mt-2 flex items-center text-sm text-gray-600 dark:text-neutral-400">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {profile.currentLocation !== "" ? profile.currentLocation : "Remote"}
                                </div>
                                {profile.resumeUrl && (
                                    <div className="mt-2 text-sm">
                                        <span className="text-gray-600 dark:text-neutral-400">Resume: </span>
                                        <a
                                            href={profile.resumeUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="underline text-indigo-600 dark:text-indigo-400"
                                        >
                                            {profile.resumeUrl}
                                        </a>
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setOpen(true)}
                                    className="px-5 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:from-indigo-700 hover:to-indigo-600 transition-all"
                                >
                                    Edit Profile
                                </button>
                                <button
                                    onClick={() => setOpen(true)}
                                    className="flex px-5 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-neutral-600 to-neutral-500 text-white hover:from-indigo-700 hover:to-indigo-600 transition-all"
                                >
                                    <Download className="w-4 h-4 mr-2 mt-0.5" />
                                    Generate Resume
                                </button>
                            </div>
                        </div>

                        {/* Sections */}
                        <div className="space-y-10 mt-10">
                            {/* Bio */}
                            <div className="animate-fade-up">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Bio</h2>
                                <p className="mt-3 text-gray-600 dark:text-neutral-400 leading-relaxed">
                                    {profile.bio != "" ? profile.bio : "No bio provided."}
                                </p>
                            </div>

                            {/* Skills */}
                            <div className="animate-fade-up delay-200">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Skills</h2>
                                <div className="flex flex-wrap gap-3 mt-3">
                                    {skills.map((skill, i) => (
                                        <span
                                            key={i}
                                            className="px-4 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-700 dark:bg-neutral-700 dark:text-gray-200 shadow-sm"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Work Experience */}
                            <div className="animate-fade-up delay-300">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Work Experience</h2>
                                <div className="mt-3 space-y-4">
                                    {experiences.map((exp) => (
                                        <div key={exp.id} className="border-l-4 border-indigo-500 pl-4">
                                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                                {exp.role} – {exp.company}
                                            </h3>
                                            <span className="text-sm text-gray-500 dark:text-neutral-400">
                                                {exp.period}
                                            </span>
                                            <p className="mt-1 text-gray-600 dark:text-neutral-300">{exp.details}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Education */}
                            <div className="animate-fade-up delay-400">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Education</h2>
                                <div className="mt-3 space-y-3">
                                    {education.map((edu) => (
                                        <div key={edu.id}>
                                            <h3 className="font-semibold text-gray-900 dark:text-white">{edu.degree}</h3>
                                            <p className="text-sm text-gray-600 dark:text-neutral-400">
                                                {edu.institution} ({edu.year})
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Projects */}
                            <div className="animate-fade-up delay-500">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Projects</h2>
                                <div className="mt-3 space-y-4">
                                    {projects.map((proj) => (
                                        <div key={proj.id} className="p-4 rounded-lg bg-gray-50 dark:bg-neutral-800">
                                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                                {proj.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-neutral-400 mt-1">
                                                {proj.description}
                                            </p>
                                            {proj.link && (
                                                <a
                                                    href={proj.link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-sm underline text-indigo-600 dark:text-indigo-400 mt-1 inline-block"
                                                >
                                                    Visit
                                                </a>
                                            )}
                                            {proj?.img && proj.img.length > 0 && (
                                                <div className="flex overflow-x-auto mt-2 space-x-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-400 scrollbar-hide">
                                                    {proj.img.map((img, index) => (
                                                        <div key={index} className="flex-shrink-0">
                                                            {img.endsWith(".mp4") || img.endsWith(".webm") ? (
                                                                <video
                                                                    src={img}
                                                                    muted
                                                                    className="w-80 rounded-md"
                                                                    onMouseEnter={(e) => (e.currentTarget.play())}   // play on hover
                                                                    onMouseLeave={(e) => (e.currentTarget.pause())}  // pause when hover ends
                                                                />
                                                            ) : (
                                                                <img src={img} alt={proj.name} className="w-48 rounded-md" />
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>

                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* CTC */}
                            <div className="animate-fade-up delay-600">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Compensation</h2>
                                <p className="mt-2 text-gray-600 dark:text-neutral-400">
                                    Current CTC: <strong>{profile.currentCTC}</strong>
                                </p>
                                <p className="text-gray-600 dark:text-neutral-400">
                                    Expected CTC: <strong>{profile.expectedCTC}</strong>
                                </p>
                            </div>

                            {/* Preferences */}
                            {/* <div className="animate-fade-up delay-700">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Preferences</h2>
                                <p className="mt-2 text-gray-600 dark:text-neutral-400">
                                    Availability: <strong>{profile.availability}</strong>
                                </p>
                                <p className="text-gray-600 dark:text-neutral-400">
                                    Location: <strong>{profile.location}</strong>
                                </p>
                                <p className="text-gray-600 dark:text-neutral-400">
                                    Expected Location: <strong>{profile.expectedLocation}</strong>
                                </p>
                            </div> */}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-2">
                    {/* ai generated summary */}
                    <aside className="lg:col-span-1 rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow animate-fade-in delay-300  ">
                        {/* Header */}
                        <div className="p-6 border-b border-gray-200 dark:border-neutral-800 flex justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Summary</h2>
                                <p className="text-sm text-gray-500 dark:text-neutral-400">
                                    AI generated summary
                                </p>
                            </div>
                            <RefreshCw onClick={() => generateSummary()} className="w-5 h-5 my-auto text-gray-500 dark:text-neutral-400 hover:text-blue-500 hover:cursor-pointer hover:rotate-180 duration-200 " />
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-4 p-6 border-b border-gray-200 dark:border-neutral-800">
                            {/* Left Info */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Rating
                                </h2>
                                <p className="text-xs text-gray-500 dark:text-neutral-400">
                                    AI profile score (out of 5)
                                </p>

                                {/* Badge */}
                                <span
                                    className={`inline-block mt-2 px-2 py-0.5 text-xs rounded-full font-medium
        ${4.3 >= 4.5
                                            ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                                            : 4.3 >= 3.5
                                                ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
                                                : 4.3 >= 2.5
                                                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"
                                                    : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                                        }`}
                                >
                                    {4.3 >= 4.5
                                        ? "Excellent"
                                        : 4.3 >= 3.5
                                            ? "Good"
                                            : 4.3 >= 2.5
                                                ? "Average"
                                                : "Needs Improvement"}
                                </span>
                            </div>

                            {/* Circle Rating */}
                            <div className="ml-auto relative w-16 h-16">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle
                                        cx="32"
                                        cy="32"
                                        r="28"
                                        className="stroke-gray-200 dark:stroke-neutral-700"
                                        strokeWidth="6"
                                        fill="transparent"
                                    />
                                    <circle
                                        cx="32"
                                        cy="32"
                                        r="28"
                                        className="stroke-indigo-500 transition-all duration-700 ease-out"
                                        strokeWidth="6"
                                        strokeLinecap="round"
                                        fill="transparent"
                                        strokeDasharray={2 * Math.PI * 28}
                                        strokeDashoffset={(1 - 4.3 / 5) * 2 * Math.PI * 28}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center font-bold text-gray-900 dark:text-white">
                                    4.3
                                </div>
                            </div>
                        </div>


                        {/* Body */}
                        <div className="p-6">
                            <p className="text-sm leading-relaxed text-gray-600 dark:text-neutral-400">
                                {summary.length > 0 ? summary : "Summary not available"}
                            </p>
                        </div>
                    </aside>


                    <aside className="lg:col-span-1 rounded-xl overflow-hidden bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 animate-fade-in delay-300">
                        <div className="p-6 border-b border-gray-200 dark:border-neutral-800">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Latest Applications</h2>
                            <p className="text-sm text-gray-500 dark:text-neutral-400">Your most recent submissions</p>
                        </div>

                        <ul className="divide-y divide-gray-200 dark:divide-neutral-800">
                            {latestApplications.map((app, i) => (
                                <li
                                    key={app.id}
                                    className="p-5 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition animate-fade-up"
                                    style={{ animationDelay: `${i * 150}ms` }}
                                >
                                    <div className="flex-shrink-0">
                                        <img
                                            src={app.logo}
                                            alt={app.company}
                                            className="w-12 h-12 rounded-xl border border-gray-200 dark:border-neutral-700 object-contain bg-white p-1"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                                {app.company}
                                            </span>
                                            <span className="text-sm text-gray-600 dark:text-neutral-300">{app.title}</span>
                                            <span className="text-xs text-gray-500 dark:text-neutral-400 mt-1">{app.date}</span>
                                        </div>
                                        <span
                                            className={`px-2 py-0.5 text-xs rounded-full font-medium ${app.status === "Approved"
                                                ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                                                : app.status === "In Review"
                                                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"
                                                    : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                                                }`}
                                        >
                                            {app.status}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </aside>

                    <aside className="lg:col-span-1 rounded-xl overflow-hidden bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 animate-fade-in delay-300">
                        <div className="p-6 animate-fade-up delay-300">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Recent Activity</h3>
                            <div className="relative border-l border-gray-200 dark:border-neutral-700 ml-3">
                                {activityFeed.map((item, idx) => (
                                    <div
                                        key={item.id}
                                        className="mb-6 ml-6 group hover:bg-gray-50 dark:hover:bg-neutral-800 p-3 rounded-lg transition"
                                    >
                                        <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-indigo-500 text-white rounded-full text-xs font-bold ring-4 ring-white dark:ring-neutral-900">
                                            {idx + 1}
                                        </span>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">{item.action}</p>
                                        <p className="text-xs text-gray-500 dark:text-neutral-400 mt-1">{item.date}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>

                </div>
            </div>

            {/* Modal (multi-tabbed) */}
            {open && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center "
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-3xl" onClick={() => setOpen(false)} />
                    <div className="relative z-10 w-full max-w-3xl rounded-2xl bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 shadow-lg animate-fade-in">
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-neutral-800 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Profile</h3>
                            <button
                                className="text-sm p-2 border border-gray-300 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-full"
                                onClick={() => setOpen(false)}
                            >
                                {/* <Cross className="w-6 h-6" /> */}
                                <X className="size-4 text-black dark:text-white" />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="px-6 pt-4">
                            <div className="flex flex-wrap gap-2">
                                {tabs.map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setActiveTab(t)}
                                        className={`px-3 py-1.5 rounded-md text-sm border ${activeTab === t
                                            ? "bg-indigo-600 text-white border-indigo-600"
                                            : "border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-neutral-800"
                                            }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Body */}
                        <div className="px-6 py-5 max-h-[70vh] overflow-y-auto space-y-6">
                            {activeTab === "Basic Info" && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Input
                                        label="Full Name"
                                        value={profile.fullName || ""}
                                        onChange={(v) => handleProfileChange("fullName", v)}
                                    />
                                    <Input
                                        label="Username"
                                        value={profile.user.username || ""}
                                        onChange={(v) => handleNestedProfileChange("user", "username", v)}
                                    />
                                    <Input
                                        label="Role"
                                        value={profile.professionalRole || ""}
                                        onChange={(v) => handleProfileChange("professionalRole", v)}
                                    />
                                    <Input
                                        label="Location"
                                        value={profile.currentLocation || ""}
                                        onChange={(v) => handleProfileChange("currentLocation", v)}
                                    />
                                    <TextArea
                                        className="sm:col-span-2"
                                        label="Bio"
                                        value={profile.bio || ""}
                                        onChange={(v) => handleProfileChange("bio", v)}
                                    />
                                    <Input
                                        label="GitHub URL"
                                        value={profile.githubUrl || ""}
                                        onChange={(v) => handleProfileChange("githubUrl", v)}
                                    />
                                    <Input
                                        label="Resume URL"
                                        value={profile.resumeUrl || ""}
                                        onChange={(v) => handleProfileChange("resumeUrl", v)}
                                    />
                                    <Input
                                        label="Background"
                                        value={profile.background || ""}
                                        onChange={(v) => handleProfileChange("background", v)}
                                    />
                                    <Input
                                        label="Experience"
                                        value={profile.experience || ""}
                                        onChange={(v) => handleProfileChange("experience", v)}
                                    />
                                </div>
                            )}


                            {activeTab === "Resume" && (
                                <div className="space-y-3">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Upload Resume (PDF recommended)
                                    </label>
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleResumeUpload}
                                        className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-neutral-800 dark:file:text-gray-200 dark:hover:file:bg-neutral-700"
                                    />
                                    {profile.resumeUrl && (
                                        <div className="text-sm">
                                            <p className="text-gray-600 dark:text-neutral-300">
                                                Selected: <strong>{profile.resumeUrl}</strong>
                                            </p>
                                            {resumePreview === "pdf" && (
                                                <iframe
                                                    src={profile.resumeUrl}
                                                    className="w-full h-64 mt-2 rounded-lg border border-gray-200 dark:border-neutral-800"
                                                />
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === "Skills" && (
                                <div>
                                    <div className="flex gap-2">
                                        <input
                                            value={newSkill}
                                            onChange={(e) => setNewSkill(e.target.value)}
                                            placeholder="Add a skill"
                                            className="flex-1 px-3 py-2 rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100"
                                        />
                                        <button
                                            onClick={addSkill}
                                            className="px-3 py-2 rounded-md bg-indigo-600 text-white text-sm"
                                        >
                                            Add
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {skills.map((s) => (
                                            <span
                                                key={s}
                                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 dark:bg-neutral-800 dark:text-gray-200 text-sm"
                                            >
                                                {s}
                                                <button
                                                    onClick={() => removeSkill(s)}
                                                    className="rounded-full w-5 h-5 flex items-center justify-center border border-gray-300 dark:border-neutral-600 hover:bg-gray-200 dark:hover:bg-neutral-700"
                                                    aria-label={`Remove ${s}`}
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === "Experience" && (
                                <div className="space-y-4">
                                    {experiences.map((exp) => (
                                        <div key={exp.id} className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-lg border border-gray-200 dark:border-neutral-800">
                                            <Input label="Role" value={exp.role} onChange={(v) => updateExperience(exp.id, "role", v)} />
                                            <Input label="Company" value={exp.company} onChange={(v) => updateExperience(exp.id, "company", v)} />
                                            <Input label="Period" value={exp.period} onChange={(v) => updateExperience(exp.id, "period", v)} />
                                            <TextArea
                                                className="sm:col-span-2"
                                                label="Details"
                                                value={exp.details}
                                                onChange={(v) => updateExperience(exp.id, "details", v)}
                                            />
                                            <div className="sm:col-span-2 flex justify-end">
                                                <button
                                                    onClick={() => removeExperience(exp.id)}
                                                    className="text-sm px-3 py-1.5 rounded-md border border-red-300 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-950/30"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        onClick={addExperience}
                                        className="px-4 py-2 rounded-md border border-gray-300 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 text-sm"
                                    >
                                        + Add Experience
                                    </button>
                                </div>
                            )}

                            {activeTab === "Education" && (
                                <div className="space-y-4">
                                    {education.map((edu) => (
                                        <div key={edu.id} className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-lg border border-gray-200 dark:border-neutral-800">
                                            <Input label="Degree" value={edu.degree} onChange={(v) => updateEducation(edu.id, "degree", v)} />
                                            <Input
                                                label="Institution"
                                                value={edu.institution}
                                                onChange={(v) => updateEducation(edu.id, "institution", v)}
                                            />
                                            <Input label="Year" value={edu.year} onChange={(v) => updateEducation(edu.id, "year", v)} />
                                            <div className="sm:col-span-2 flex justify-end">
                                                <button
                                                    onClick={() => removeEducation(edu.id)}
                                                    className="text-sm px-3 py-1.5 rounded-md border border-red-300 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-950/30"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        onClick={addEducation}
                                        className="px-4 py-2 rounded-md border border-gray-300 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 text-sm"
                                    >
                                        + Add Education
                                    </button>
                                </div>
                            )}

                            {activeTab === "Projects" && (
                                <div className="space-y-4">
                                    {projects.map((proj) => (
                                        <div key={proj.id} className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-lg border border-gray-200 dark:border-neutral-800">
                                            <Input label="Name" value={proj.name} onChange={(v) => updateProject(proj.id, "name", v)} />
                                            <Input label="Link (optional)" value={proj.link || ""} onChange={(v) => updateProject(proj.id, "link", v)} />
                                            <TextArea
                                                className="sm:col-span-2"
                                                label="Description"
                                                value={proj.description}
                                                onChange={(v) => updateProject(proj.id, "description", v)}
                                            />
                                            <div className="sm:col-span-2">

                                                <Input
                                                    label="Images (comma-separated URLs)"
                                                    value={(proj.img || []).join(", ")}
                                                    onChange={(v) => updateProject(proj.id, "img", v.split(", "))}
                                                />
                                            </div>
                                            <div className="sm:col-span-2 flex justify-end">
                                                <button
                                                    onClick={() => removeProject(proj.id)}
                                                    className="text-sm px-3 py-1.5 rounded-md border border-red-300 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-950/30"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        onClick={addProject}
                                        className="px-4 py-2 rounded-md border text-gray-900 dark:text-gray-100 border-gray-300 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 text-sm"
                                    >
                                        + Add Project
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 border-t border-gray-200 dark:border-neutral-800 flex items-center justify-between">
                            <button
                                onClick={() => {
                                    // reset to defaults
                                    localStorage.removeItem(STORAGE_KEY);
                                    setProfile({
                                        id: 0,
                                        userId: 0,
                                        fullName: "",
                                        bio: "",
                                        location: "",
                                        background: "",
                                        githubUrl: "",
                                        resumeUrl: "",
                                        rating: 0,
                                        skills: [],
                                        experience: "",
                                        createdAt: "",
                                        updatedAt: "",
                                        user: {
                                            id: 0,
                                            username: "",
                                            email: "",
                                            avatar: "",
                                            role: "SEEKER",
                                        },
                                    });
                                    setSkills(initialSkills);
                                    setExperiences(initialExperiences);
                                    setEducation(initialEducation);
                                    setProjects(initialProjects);
                                    setLatestApplications(initialApplications);
                                    setActivityFeed(initialActivity);
                                }}
                                className="text-sm px-3 py-2 rounded-md border text-black dark:text-white border-gray-300 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800"
                            >
                                Reset to Defaults
                            </button>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setOpen(false)}
                                    className="text-sm px-3 py-2 rounded-md text-black dark:text-white border border-gray-300 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleProfileUpdate}
                                    className="text-sm px-4 py-2 rounded-md bg-indigo-600 text-white"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }

            {/* Animations */}
            <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.6s ease-out both; }
        .animate-fade-up { animation: fade-up 0.6s ease-out both; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-700 { animation-delay: 0.7s; }
      `}</style>
        </section >
    );
};

export default SaaSProfilePage;
