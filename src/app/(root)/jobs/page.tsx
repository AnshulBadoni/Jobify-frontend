"use client";
import React, { useState } from "react";
import { Bookmark, BookmarkCheck, Clock, ExternalLink, MapPin, Moon, Sun, Wallet } from "lucide-react";
import Link from "next/link";
import Header from "@/app/components/Header";
import { useToast } from "@/app/hooks/useToast";
import { ToastContainer } from "@/app/components/Toast";
import Bread from "@/app/components/Bread";
import { useRouter } from "next/navigation";
import JobContainer from "@/app/components/JobContainer";

const jobsData = [
    { id: 1, company: "Google", role: "Frontend Engineer", location: "San Francisco, CA", type: "Full-time", salary: 150000, experience: "3-5 years", logo: "https://logo.clearbit.com/google.com" },
    { id: 2, company: "Amazon", role: "AI Developer", location: "Seattle, WA", type: "Full-time", salary: 160000, experience: "5-7 years", logo: "https://logo.clearbit.com/amazon.com" },
    { id: 3, company: "Netflix", role: "Data Scientist", location: "Remote", type: "Contract", salary: 110000, experience: "2-4 years", logo: "https://logo.clearbit.com/netflix.com" },
    { id: 4, company: "Airbnb", role: "Product Designer", location: "Remote", type: "Full-time", salary: 130000, experience: "4-6 years", logo: "https://logo.clearbit.com/airbnb.com" },
    { id: 5, company: "Stripe", role: "Backend Engineer", location: "Remote", type: "Full-time", salary: 170000, experience: "3-6 years", logo: "https://logo.clearbit.com/stripe.com" },
];

const closestJobs = jobsData.slice(0, 3); // Top 3 as closest matches
const jobTypes = ["All", "Full-time", "Part-time", "Contract"];
const locations = ["All", "San Francisco, CA", "Seattle, WA", "Remote"];
const experiences = ["All", "0-2 years", "2-4 years", "3-5 years", "4-6 years", "5-7 years"];

export default function JobListings() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("All");
    const [locationFilter, setLocationFilter] = useState("All");
    const [experienceFilter, setExperienceFilter] = useState("All");
    const [salaryRange, setSalaryRange] = useState([80000, 180000]);
    const { toasts, addToast, removeToast } = useToast();


    const filteredJobs = jobsData.filter((job) => {
        const matchesSearch =
            job.role.toLowerCase().includes(search.toLowerCase()) ||
            job.company.toLowerCase().includes(search.toLowerCase()) ||
            job.location.toLowerCase().includes(search.toLowerCase());
        const matchesType = typeFilter === "All" || job.type === typeFilter;
        const matchesLocation = locationFilter === "All" || job.location === locationFilter;
        const matchesExperience = experienceFilter === "All" || job.experience === experienceFilter;
        const matchesSalary = job.salary >= salaryRange[0] && job.salary <= salaryRange[1];
        return matchesSearch && matchesType && matchesLocation && matchesExperience && matchesSalary;
    });

    return (
        <section className="min-h-screen font-sans space-y-2">
            <Header heading="Job Listings" subHeading="Browse and apply to the latest jobs that match your skills" />
            <JobContainer title="Closest Match Jobs" closestJobs={closestJobs} />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                {/* Sticky Filters */}
                <aside className="lg:col-span-1 sticky top-20 h-max rounded-2xl bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md p-6 shadow-lg border border-gray-200 dark:border-neutral-800">
                    <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Filters</h2>
                    <input
                        type="text"
                        placeholder="Search role, company..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full mb-4 rounded-2xl border border-gray-200 dark:border-neutral-800 p-3 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
                    />
                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="w-full mb-4 rounded-2xl border border-gray-200 dark:border-neutral-800 p-3 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
                    >
                        {jobTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                    </select>
                    <select
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                        className="w-full mb-4 rounded-2xl border border-gray-200 dark:border-neutral-800 p-3 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
                    >
                        {locations.map((loc) => <option key={loc} value={loc}>{loc}</option>)}
                    </select>
                    <select
                        value={experienceFilter}
                        onChange={(e) => setExperienceFilter(e.target.value)}
                        className="w-full mb-4 rounded-2xl border border-gray-200 dark:border-neutral-800 p-3 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
                    >
                        {experiences.map((exp) => <option key={exp} value={exp}>{exp}</option>)}
                    </select>
                    <div className="mt-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Salary Range</p>
                        <input
                            type="range"
                            min={50000}
                            max={200000}
                            step={5000}
                            value={salaryRange[1]}
                            onChange={(e) => setSalaryRange([salaryRange[0], parseInt(e.target.value)])}
                            className="w-full accent-indigo-600"
                        />
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">${salaryRange[0].toLocaleString()} - ${salaryRange[1].toLocaleString()}</p>
                    </div>
                </aside>

                {/* Job Cards */}
                <div className="lg:col-span-3 grid md:grid-cols-2 gap-2 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-gray-200 dark:border-neutral-800 mb-20">
                    {filteredJobs.length > 0 ? filteredJobs.map((job) => (
                        <Link key={job.id} href={`/job/${job.id}`} className="w-full">
                            <div className="relative p-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl bg-gray-50 dark:bg-neutral-900 backdrop-blur-md">
                                {/* Company info */}
                                <div className="flex items-start gap-4 mb-5">
                                    <div className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center ">
                                        <img src={job.logo} alt={job.company} className="size-12 object-contain rounded-md" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-lg truncate text-gray-900 dark:text-white">{job.role}</h3>
                                        <p className="text-indigo-500 font-medium truncate">{job.company}</p>
                                    </div>
                                </div>

                                {/* Job details */}
                                <div className="space-y-3 mb-5">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                        <span className="text-gray-700 dark:text-gray-300">{job.location}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Wallet className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                        <span className="text-gray-700 dark:text-gray-300">
                                            ${job.salary.toLocaleString()}/year
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                        <span className="text-gray-700 dark:text-gray-300">Posted {job.location}</span>
                                    </div>
                                </div>

                                {/* Tags and action */}
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-2">
                                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
                                            {job.type}
                                        </span>
                                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                                            {job.experience}
                                        </span>
                                    </div>

                                    <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white transition-colors">
                                        View Job
                                        <ExternalLink className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </Link>

                    )) : (
                        <p className="col-span-full text-gray-500 dark:text-gray-400 text-center mt-10">No jobs found matching your criteria.</p>
                    )}
                </div>
            </div>
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </section>
    );
}
