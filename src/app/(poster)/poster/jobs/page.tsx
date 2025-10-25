"use client";
import React, { useEffect, useState } from "react";
import { List, LayoutGrid, Search, Filter, Plus, Edit3, Trash2, X } from "lucide-react";
import Header from "@/app/components/Header";
import { getMe } from "@/app/api/profile";
import ProfilePreview from "@/app/components/ProfilePreview";

const initialJobs = [
    { id: 1, title: "Frontend Engineer", location: "Remote", applicants: 120, status: "Active", type: "Full-time", postedDate: "2023-10-15" },
    { id: 2, title: "Cloud Engineer", location: "San Francisco, CA", applicants: 65, status: "Active", type: "Contract", postedDate: "2023-11-02" },
    { id: 3, title: "UI Designer", location: "Remote", applicants: 40, status: "Closed", type: "Part-time", postedDate: "2023-09-20" },
];

export default function JobsPage() {
    const [me, setMe] = useState<any>({ id: -1, username: "", role: "poster" });
    const [jobs, setJobs] = useState(initialJobs);
    const [statusFilter, setStatusFilter] = useState("All");
    const [typeFilter, setTypeFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [viewMode, setViewMode] = useState<"card" | "list">("card");
    const [newJob, setNewJob] = useState({ title: "", location: "", status: "Active", type: "Full-time" });
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            const resp = await getMe();
            if (resp.status === 200) setMe(resp.data);
        };
        fetchProfile();
    }, []);

    const filteredJobs = jobs.filter(
        (job) =>
            (statusFilter === "All" || job.status === statusFilter) &&
            (typeFilter === "All" || job.type === typeFilter) &&
            (job.title.toLowerCase().includes(search.toLowerCase()) || job.location.toLowerCase().includes(search.toLowerCase()))
    );

    const handleAddJob = () => {
        const id = jobs.length ? Math.max(...jobs.map((j) => j.id)) + 1 : 1;
        const currentDate = new Date().toISOString().split('T')[0];
        setJobs([...jobs, { ...newJob, id, applicants: 0, postedDate: currentDate }]);
        setNewJob({ title: "", location: "", status: "Active", type: "Full-time" });
        setShowModal(false);
    };

    const handleDeleteJob = (id: number) => {
        setJobs(jobs.filter(job => job.id !== id));
    };

    return (
        <section className="min-h-screen font-sans bg-gray-50 dark:bg-neutral-900 p-4 md:p-6">
            <Header
                heading="Your Job Postings"
                subHeading={`Manage and track your posted positions, ${me.username}`}
            />

            <div className="grid lg:grid-cols-4 gap-6 mt-6">
                {/* Main Content */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Filters and Actions Bar */}
                    <div className="bg-white dark:bg-neutral-800 rounded-xl border border-gray-200 dark:border-neutral-700 p-4 shadow-sm">
                        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                            {/* Search Bar */}
                            <div className="relative flex-1 w-full">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search jobs by title or location..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-neutral-600 text-sm bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>

                            {/* Filter Toggle for Mobile */}
                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className="md:hidden flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-neutral-600 text-sm text-gray-700 dark:text-gray-300"
                            >
                                <Filter className="w-4 h-4" />
                                Filters
                            </button>

                            {/* View Toggles */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setViewMode("card")}
                                    className={`p-2.5 rounded-lg border ${viewMode === "card"
                                        ? "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-700"
                                        : "border-gray-300 dark:border-neutral-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-700"
                                        }`}
                                >
                                    <LayoutGrid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`p-2.5 rounded-lg border ${viewMode === "list"
                                        ? "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-700"
                                        : "border-gray-300 dark:border-neutral-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-700"
                                        }`}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Add Job Button */}
                            <button
                                onClick={() => setShowModal(true)}
                                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition shadow-md shadow-indigo-500/20"
                            >
                                <Plus className="w-4 h-4" />
                                Post Job
                            </button>
                        </div>

                        {/* Filters - visible on desktop or when toggled on mobile */}
                        <div className={`${isFilterOpen ? 'flex' : 'hidden'} md:flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-neutral-700`}>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Status</label>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="px-3 py-2 rounded-lg border border-gray-300 dark:border-neutral-600 text-sm bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                >
                                    <option value="All">All Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Closed">Closed</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Job Type</label>
                                <select
                                    value={typeFilter}
                                    onChange={(e) => setTypeFilter(e.target.value)}
                                    className="px-3 py-2 rounded-lg border border-gray-300 dark:border-neutral-600 text-sm bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                >
                                    <option value="All">All Types</option>
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Internship">Internship</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Jobs List */}
                    {viewMode === "card" ? (
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                            {filteredJobs.map((job) => (
                                <div
                                    key={job.id}
                                    className="bg-white dark:bg-neutral-800 p-5 rounded-xl border border-gray-200 dark:border-neutral-700 shadow-sm hover:shadow-md transition-all duration-200"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">{job.title}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs text-gray-500 dark:text-gray-400">{job.location}</span>
                                                <span className="text-gray-300 dark:text-gray-600">•</span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">{job.type}</span>
                                            </div>
                                        </div>
                                        <span
                                            className={`text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap ${job.status === "Active"
                                                ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
                                                : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                                                }`}
                                        >
                                            {job.status}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100 dark:border-neutral-700">
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Posted on {job.postedDate}</p>
                                            <p className="text-indigo-600 dark:text-indigo-400 font-medium mt-1">{job.applicants} applicants</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="p-2 rounded-lg border border-gray-300 dark:border-neutral-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-700 transition">
                                                <Edit3 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteJob(job.id)}
                                                className="p-2 rounded-lg border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-neutral-800 rounded-xl border border-gray-200 dark:border-neutral-700 overflow-hidden shadow-sm">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 dark:bg-neutral-700 text-gray-600 dark:text-gray-300">
                                    <tr>
                                        <th className="text-left p-4 font-medium">Title</th>
                                        <th className="text-left p-4 font-medium">Location</th>
                                        <th className="text-left p-4 font-medium">Type</th>
                                        <th className="text-left p-4 font-medium">Status</th>
                                        <th className="text-left p-4 font-medium">Applicants</th>
                                        <th className="text-left p-4 font-medium">Posted</th>
                                        <th className="text-right p-4 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredJobs.map((job) => (
                                        <tr key={job.id} className="border-t border-gray-100 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700/50 transition">
                                            <td className="p-4 font-medium text-gray-900 dark:text-gray-100">{job.title}</td>
                                            <td className="p-4 text-gray-600 dark:text-gray-400">{job.location}</td>
                                            <td className="p-4 text-gray-600 dark:text-gray-400">{job.type}</td>
                                            <td className="p-4">
                                                <span
                                                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${job.status === "Active"
                                                        ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
                                                        : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                                                        }`}
                                                >
                                                    {job.status}
                                                </span>
                                            </td>
                                            <td className="p-4 font-medium text-indigo-600 dark:text-indigo-400">{job.applicants}</td>
                                            <td className="p-4 text-gray-600 dark:text-gray-400">{job.postedDate}</td>
                                            <td className="p-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button className="p-2 rounded-lg border border-gray-300 dark:border-neutral-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-700 transition">
                                                        <Edit3 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteJob(job.id)}
                                                        className="p-2 rounded-lg border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {filteredJobs.length === 0 && (
                        <div className="bg-white dark:bg-neutral-800 rounded-xl border border-gray-200 dark:border-neutral-700 p-8 text-center">
                            <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 dark:bg-neutral-700 flex items-center justify-center mb-4">
                                <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">No jobs found</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                Try adjusting your search or filters to find what you're looking for.
                            </p>
                        </div>
                    )}
                </div>

                {/* Right Sidebar */}
                <aside className="space-y-6">
                    <ProfilePreview profile={me} />

                    {/* Stats Summary */}
                    <div className="bg-white dark:bg-neutral-800 rounded-xl border border-gray-200 dark:border-neutral-700 p-5 shadow-sm">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">Job Posting Summary</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Active Jobs</span>
                                    <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                        {jobs.filter(job => job.status === "Active").length}
                                    </span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-green-500"
                                        style={{ width: `${(jobs.filter(job => job.status === "Active").length / jobs.length) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Total Applicants</span>
                                    <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                        {jobs.reduce((acc, job) => acc + job.applicants, 0)}
                                    </span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-indigo-500"
                                        style={{ width: `${Math.min(100, (jobs.reduce((acc, job) => acc + job.applicants, 0) / 200) * 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Add Job Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-xl w-full max-w-md relative">
                        <div className="p-5 border-b border-gray-200 dark:border-neutral-700">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Post a New Job</h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute right-4 top-4 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 transition"
                            >
                                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            </button>
                        </div>

                        <div className="p-5 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Job Title</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Senior Frontend Developer"
                                    value={newJob.title}
                                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-neutral-600 text-sm bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Location</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Remote, San Francisco, CA"
                                    value={newJob.location}
                                    onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-neutral-600 text-sm bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Type</label>
                                    <select
                                        value={newJob.type}
                                        onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-neutral-600 text-sm bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    >
                                        <option>Full-time</option>
                                        <option>Part-time</option>
                                        <option>Contract</option>
                                        <option>Internship</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Status</label>
                                    <select
                                        value={newJob.status}
                                        onChange={(e) => setNewJob({ ...newJob, status: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-neutral-600 text-sm bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    >
                                        <option>Active</option>
                                        <option>Closed</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="p-5 border-t border-gray-200 dark:border-neutral-700 flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2.5 rounded-lg border border-gray-300 dark:border-neutral-600 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-700 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddJob}
                                disabled={!newJob.title || !newJob.location}
                                className="px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-md shadow-indigo-500/20"
                            >
                                Add Job
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}