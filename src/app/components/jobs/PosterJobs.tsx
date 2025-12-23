"use client";
import React, { useState, useEffect } from "react";
import { AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Table from "../Table";
import Link from "next/link";

const columns = [
    {
        key: "title",
        label: "Job Title",
        sortable: true,
    },
    {
        key: "location",
        label: "Location",
        sortable: true,
    },
    {
        key: "type",
        label: "Type",
        sortable: true,
    },
    {
        key: "dept",
        label: "Department",
        sortable: true,
    },
    {
        key: "status",
        label: "Status",
        type: "badge",
    }

];

// --- Icons ---
const Icons = {
    Search: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
    Filter: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>,
    Plus: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>,
    Dots: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>,
    Close: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
    Sort: () => <svg className="w-3 h-3 text-slate-400 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>,
    Trash: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
    Archive: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>,
    Edit: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    External: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>,
    Briefcase: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    Users: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    Chart: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    Stop: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    ChevronLeft: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>,
    ChevronRight: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
};

// --- Mock Data ---
const appTrendData = [
    { name: 'M', value: 40 }, { name: 'T', value: 30 }, { name: 'W', value: 65 },
    { name: 'T', value: 50 }, { name: 'F', value: 80 }, { name: 'S', value: 20 }, { name: 'S', value: 35 }
];
const statusData = [
    { name: 'Active', value: 15, color: '#10b981' },
    { name: 'Draft', value: 5, color: '#94a3b8' },
    { name: 'Paused', value: 3, color: '#f59e0b' },
];

// Generate more mock jobs for pagination
const generateJobs = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        title: ["Senior React Developer", "AI/ML Engineer", "Product Manager", "UX Designer", "QA Tester", "Marketing Lead", "DevOps Engineer", "Full Stack Dev", "Data Scientist"][i % 9],
        location: ["Remote", "Seattle, WA", "New York", "Remote", "Austin, TX", "Remote", "Remote", "San Francisco", "London"][i % 9],
        type: ["Full-Time", "Contract", "Full-Time", "Full-Time", "Full-Time", "Part-Time", "Full-Time", "Contract", "Full-Time"][i % 9],
        dept: ["Engineering", "Engineering", "Product", "Design", "Engineering", "Marketing", "Engineering", "Engineering", "Data"][i % 9],
        posted: `Oct ${10 + (i % 20)}`,
        status: i % 5 === 0 ? "Paused" : i % 7 === 0 ? "Draft" : "Active",
        team: i % 2 === 0 ? ["https://i.pravatar.cc/150?u=" + (i + 1)] : ["https://i.pravatar.cc/150?u=" + (i + 1), "https://i.pravatar.cc/150?u=" + (i + 5)],
        stats: {
            views: 1000 + Math.floor(Math.random() * 2000),
            applicants: 20 + Math.floor(Math.random() * 100),
            conversion: (1 + Math.random() * 4).toFixed(1)
        }
    }));
};

const allJobs = generateJobs(35); // 35 Total Jobs

export default function JobsManagerPage() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedJobs, setSelectedJobs] = useState<number[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [openActionId, setOpenActionId] = useState<number | null>(null);
    const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' | null }>({ key: '', direction: null });

    // --- Pagination State ---
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Click outside handler
    useEffect(() => {
        const handleClickOutside = () => setOpenActionId(null);
        if (openActionId !== null) window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, [openActionId]);

    // Filter & Sort Logic
    const filteredJobs = allJobs.filter(job => job.title.toLowerCase().includes(searchQuery.toLowerCase()));

    const sortedJobs = [...filteredJobs].sort((a: any, b: any) => {
        if (!sortConfig.key) return 0;
        let aVal = sortConfig.key.split('.').reduce((o, i) => o[i], a);
        let bVal = sortConfig.key.split('.').reduce((o, i) => o[i], b);
        if (typeof aVal === 'string') { aVal = aVal.toLowerCase(); bVal = bVal.toLowerCase(); }
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    // Pagination Logic
    const totalPages = Math.ceil(sortedJobs.length / itemsPerPage);
    const paginatedJobs = sortedJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
        setSortConfig({ key, direction });
    };

    const toggleSelectAll = () => selectedJobs.length === paginatedJobs.length ? setSelectedJobs([]) : setSelectedJobs(paginatedJobs.map(j => j.id));
    const toggleSelectJob = (id: number) => selectedJobs.includes(id) ? setSelectedJobs(selectedJobs.filter(jid => jid !== id)) : setSelectedJobs([...selectedJobs, id]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active": return "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-900";
            case "Paused": return "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-900";
            case "Draft": return "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700";
            default: return "bg-gray-100 text-gray-600";
        }
    };

    return (
        <section className="font-sans min-h-screen bg-gray-50/50 dark:bg-neutral-950 text-slate-800 dark:text-slate-200 relative overflow-hidden">

            {/* --- ADVANCED FILTER SIDEBAR --- */}
            <div className={`fixed inset-0 z-50 bg-slate-900/20 backdrop-blur-sm transition-opacity duration-300 ${isFilterOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={() => setIsFilterOpen(false)}></div>
            <aside className={`fixed inset-y-0 right-0 z-50 w-180 px-4 bg-white dark:bg-neutral-900 shadow-2xl transform transition-transform duration-300 ease-out border-l border-gray-200 dark:border-neutral-800 flex flex-col ${isFilterOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="p-5 border-b border-gray-100 dark:border-neutral-800 flex justify-between items-center bg-white dark:bg-neutral-900">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Advanced Filters</h3>
                    <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full text-slate-400 hover:text-slate-600 transition"><Icons.Close /></button>
                </div>
                <div className="flex-1 overflow-y-auto space-y-2">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Keywords</label>
                        <div className="relative">
                            <input type="text" placeholder="Title, ID, or Tag" className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                            <div className="absolute left-3 top-3 text-slate-400"><Icons.Search /></div>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Department</label>
                        <div className="grid grid-cols-2 gap-2">
                            {["Engineering", "Product", "Design", "Marketing", "Sales", "HR"].map((dept) => (
                                <label key={dept} className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800 transition border border-transparent hover:border-gray-200 dark:hover:border-neutral-800">
                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:bg-neutral-800 dark:border-neutral-700" />
                                    <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{dept}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Status</label>
                        <div className="flex flex-wrap gap-2">
                            {['Active', 'Paused', 'Draft', 'Closed'].map(status => (
                                <button key={status} className="px-4 py-2 border border-gray-200 dark:border-neutral-700 rounded-lg text-sm font-medium hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition">{status}</button>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Salary Range</label>
                        <div className="flex gap-3 items-center">
                            <input type="number" placeholder="Min" className="w-full px-3 py-2 bg-gray-50 dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 rounded-lg text-sm" />
                            <span className="text-slate-400">-</span>
                            <input type="number" placeholder="Max" className="w-full px-3 py-2 bg-gray-50 dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 rounded-lg text-sm" />
                        </div>
                    </div>
                </div>
                <div className="p-5 border-t border-gray-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex gap-3">
                    <button onClick={() => setIsFilterOpen(false)} className="flex-1 py-3 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm font-bold text-slate-600 hover:bg-gray-50 dark:hover:bg-neutral-800 transition">Reset</button>
                    <button onClick={() => setIsFilterOpen(false)} className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 dark:shadow-none transition">Apply Filters</button>
                </div>
            </aside>

            {/* --- MAIN CONTAINER --- */}
            <div className="w-full space-y-2 h-screen flex flex-col mb-10">

                {/* 1. ANALYTICS ROW */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 shrink-0">
                    <div className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm flex items-center gap-5 relative overflow-hidden">
                        <div className="z-10 flex-1">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Total Jobs</p>
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{allJobs.length}</h3>
                            <p className="text-[10px] text-emerald-600 font-bold mt-2 flex items-center gap-1"><span>▲ 2</span> <span className="text-slate-400 font-normal">active this week</span></p>
                        </div>
                        <div className="h-20 w-28 z-10"><ResponsiveContainer><PieChart><Pie data={statusData} innerRadius={20} outerRadius={35} dataKey="value" stroke="none"><Cell fill="#10b981" /><Cell fill="#94a3b8" /><Cell fill="#f59e0b" /></Pie></PieChart></ResponsiveContainer></div>
                    </div>

                    <div className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
                        <div className="flex justify-between items-center mb-2">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Applicant Trend</p>
                            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full dark:bg-indigo-900/20">+142 New</span>
                        </div>
                        <div className="h-14 w-full"><ResponsiveContainer><AreaChart data={appTrendData}><defs><linearGradient id="grad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} /><stop offset="95%" stopColor="#6366f1" stopOpacity={0} /></linearGradient></defs><Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} fill="url(#grad)" /></AreaChart></ResponsiveContainer></div>
                    </div>

                    <div className="bg-purple-600 p-5 rounded-xl shadow-lg text-white flex flex-col justify-between h-32 relative overflow-hidden">
                        <div className="relative z-10 flex justify-between items-start">
                            <div>
                                <p className="text-xs font-bold text-purple-200 uppercase flex items-center gap-1">Pipeline Velocity</p>
                                <h3 className="text-2xl font-bold mt-1">14 Days</h3>
                                <p className="text-xs text-purple-100 mt-1">Avg time to hire</p>
                            </div>
                            <div className="bg-white/20 p-2 rounded-lg"><Icons.Chart /></div>
                        </div>
                        <div className="relative z-10 w-full bg-purple-800/50 rounded-full h-1.5 mt-auto overflow-hidden">
                            <div className="bg-white h-1.5 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                        <div className="absolute -right-6 -bottom-10 w-32 h-32 bg-purple-500 rounded-full blur-2xl opacity-50"></div>
                    </div>
                </div>

                {/* <Table
                    data={allJobs}
                    searchable
                    searchPlaceholder="Search employees..."
                    selectable
                    pagination
                    pageSize={10}
                    advancedFilter={true}  // Enable off-canvas filters
                    // filterFields={filterFields}
                    onFilterChange={(filters) => console.log("Filters changed:", filters)}
                /> */}

                {/* 2. DATA TABLE CONTAINER */}
                <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm overflow-hidden flex flex-col flex-1">

                    {/* Toolbar */}
                    <div className="p-4 border-b border-gray-100 dark:border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-2 bg-white dark:bg-neutral-900 shrink-0">
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            {selectedJobs.length > 0 ? (
                                <div className="flex items-center gap-3 animate-in fade-in duration-200 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1.5 rounded-lg border border-indigo-100 dark:border-indigo-800">
                                    <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300">{selectedJobs.length} Selected</span>
                                    <div className="h-4 w-px bg-indigo-200 dark:bg-indigo-700"></div>
                                    <button className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1"><Icons.Trash /> Delete</button>
                                    <button className="text-xs font-bold text-slate-600 hover:underline flex items-center gap-1 dark:text-slate-300"><Icons.Archive /> Archive</button>
                                    <button onClick={() => setSelectedJobs([])} className="ml-auto text-xs font-bold text-slate-500 hover:text-slate-800 px-3">Cancel</button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            placeholder="Search jobs..."
                                            className="pl-9 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-72 transition-all"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                        <div className="absolute left-3 top-3 text-gray-400 group-hover:text-indigo-500 transition-colors"><Icons.Search /></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-3">
                            <button onClick={() => setIsFilterOpen(true)} className="px-4 py-2.5 border border-gray-200 dark:border-neutral-700 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-neutral-800 transition">
                                <Icons.Filter /> Filters
                            </button>
                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold py-2.5 px-5 rounded-lg shadow-md shadow-indigo-200 dark:shadow-none flex items-center gap-2 transition-colors transform active:scale-95">
                                <Icons.Plus /> Post Job
                            </button>
                        </div>
                    </div>

                    {/* Table (Scrollable Area) */}
                    <div className="overflow-y-auto flex-1 relative scrollbar-hide">
                        <table className="w-full text-left border-collapse table-fixed">
                            <thead className="bg-gray-50/95 dark:bg-neutral-950/95 border-b border-gray-100 dark:border-neutral-800 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider sticky top-0 z-10 backdrop-blur-sm">
                                <tr>
                                    <th className="px-6 py-4 w-14 text-center"><input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer dark:bg-neutral-800 dark:border-neutral-700" checked={selectedJobs.length === paginatedJobs.length && paginatedJobs.length > 0} onChange={toggleSelectAll} /></th>
                                    <th className="px-6 py-4 w-[35%] cursor-pointer hover:text-indigo-600 group select-none" onClick={() => handleSort('title')}><div className="flex items-center gap-1">Job Details <Icons.Sort /></div></th>
                                    <th className="px-6 py-4 w-32">Team</th>
                                    <th className="px-6 py-4 w-32 cursor-pointer hover:text-indigo-600 group select-none" onClick={() => handleSort('status')}><div className="flex items-center gap-1">Status <Icons.Sort /></div></th>
                                    <th className="px-6 py-4 w-[25%] cursor-pointer hover:text-indigo-600 group select-none" onClick={() => handleSort('stats.conversion')}><div className="flex items-center gap-1">Performance <Icons.Sort /></div></th>
                                    <th className="px-6 py-4 w-20 text-right"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-neutral-800">
                                {paginatedJobs.map((job) => (
                                    <tr key={job.id} className={`group transition-colors ${selectedJobs.includes(job.id) ? "bg-indigo-50/30 dark:bg-indigo-900/10" : "hover:bg-gray-50 dark:hover:bg-neutral-800/50"}`}>
                                        <td className="px-6 py-4 text-center">
                                            <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" checked={selectedJobs.includes(job.id)} onChange={() => toggleSelectJob(job.id)} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link href={`/jobs/${job.id}`} className="truncate pr-4">
                                                <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors truncate" title={job.title}>{job.title}</h4>
                                                <div className="flex flex-wrap gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 font-medium items-center">
                                                    <span className="uppercase tracking-wide">{job.dept}</span>
                                                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                                    <span>{job.location}</span>
                                                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                                    <span className="bg-gray-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-300">{job.type}</span>
                                                </div>
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex -space-x-2">
                                                {job.team.length > 0 ? job.team.map((src, i) => (
                                                    <img key={i} src={src} alt="Team" className="w-8 h-8 rounded-full border-2 border-white dark:border-neutral-900 hover:z-10 hover:scale-110 transition-transform cursor-pointer" />
                                                )) : <span className="text-xs text-slate-400 italic">--</span>}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${job.status === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900" :
                                                job.status === "Paused" ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900" :
                                                    "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
                                                }`}>{job.status}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="w-full max-w-[140px]">
                                                <div className="flex justify-between text-[11px] mb-1 font-medium">
                                                    <span className="text-slate-900 dark:text-white">{job.stats.applicants} Apps</span>
                                                    <span className="text-slate-500">{job.stats.conversion}%</span>
                                                </div>
                                                <div className="w-full h-1.5 bg-gray-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                                                    <div className="bg-indigo-500 h-full rounded-full" style={{ width: Math.min(Number(job.stats.conversion) * 10, 100) + '%' }}></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right relative">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setOpenActionId(openActionId === job.id ? null : job.id); }}
                                                className={`p-2 rounded-lg border border-transparent hover:border-gray-200 dark:hover:border-neutral-700 text-slate-400 hover:text-slate-600 dark:hover:text-white transition ${openActionId === job.id ? 'bg-gray-100 dark:bg-neutral-800 text-indigo-600' : ''}`}
                                            >
                                                <Icons.Dots />
                                            </button>
                                            {openActionId === job.id && (
                                                <div className="absolute right-10 top-8 w-48 bg-white dark:bg-neutral-900 rounded-xl shadow-xl border border-gray-100 dark:border-neutral-800 z-50 py-1 text-left animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                                                    <button className="w-full px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-neutral-800 flex items-center gap-3"><Icons.External /> View Live Page</button>
                                                    <Link href={`/jobs/${job.id}/edit`} className="w-full px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-neutral-800 flex items-center gap-3"><Icons.Edit /> Edit Details</Link>
                                                    <button className="w-full px-4 py-2.5 text-xs font-bold text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 flex items-center gap-3"><Icons.Stop /> Close Job</button>
                                                    <div className="h-px bg-gray-100 dark:bg-neutral-800 my-1"></div>
                                                    <button className="w-full px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 flex items-center gap-3"><Icons.Trash /> Delete Job</button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-gray-100 dark:border-neutral-800 flex justify-between items-center bg-white dark:bg-neutral-900 shrink-0 rounded-b-xl">
                        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                            Showing <span className="font-bold text-slate-900 dark:text-white">{(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, sortedJobs.length)}</span> of <span className="font-bold text-slate-900 dark:text-white">{sortedJobs.length}</span>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-4 py-2 border border-gray-200 dark:border-neutral-700 rounded-lg text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-neutral-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"><Icons.Sort /> Prev</button>
                            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-4 py-2 border border-gray-200 dark:border-neutral-700 rounded-lg text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-neutral-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1">Next <Icons.Sort /></button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}