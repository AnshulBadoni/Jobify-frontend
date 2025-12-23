"use client";
import React, { useState, useMemo, useEffect } from "react";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell, PieChart, Pie, Legend
} from 'recharts';

// --- Icons ---
const Icons = {
    ArrowLeft: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>,
    Download: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>,
    Filter: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>,
    Sort: () => <svg className="w-3 h-3 opacity-50 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>,
    Search: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
    More: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>,
    Check: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>,
    X: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
    Document: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    ChartBar: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    External: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>,
    Grid: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
    List: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
};

// --- Data ---
const performanceData = [
    { name: 'Mon', views: 400, apps: 24 }, { name: 'Tue', views: 300, apps: 13 },
    { name: 'Wed', views: 550, apps: 48 }, { name: 'Thu', views: 450, apps: 30 },
    { name: 'Fri', views: 600, apps: 55 }, { name: 'Sat', views: 200, apps: 10 },
    { name: 'Sun', views: 150, apps: 8 },
];

const funnelData = [
    { name: 'Applied', value: 142, fill: '#6366f1' },
    { name: 'Screening', value: 86, fill: '#3b82f6' },
    { name: 'Interview', value: 42, fill: '#8b5cf6' },
    { name: 'Offer', value: 12, fill: '#10b981' },
];

const sourceData = [
    { name: 'LinkedIn', value: 65, fill: '#0077b5' },
    { name: 'Indeed', value: 25, fill: '#2164f3' },
    { name: 'Referral', value: 10, fill: '#10b981' },
];

const initialCandidates = [
    { id: 1, name: "Sarah Jenkins", stage: "Interview", match: 94, exp: "6 yrs", source: "LinkedIn", date: "2024-10-22", avatar: "https://i.pravatar.cc/150?u=1" },
    { id: 2, name: "Michael Chen", stage: "Screening", match: 88, exp: "4 yrs", source: "Indeed", date: "2024-10-21", avatar: "https://i.pravatar.cc/150?u=2" },
    { id: 3, name: "Jessica Alba", stage: "New", match: 91, exp: "5 yrs", source: "Direct", date: "2024-10-20", avatar: "https://i.pravatar.cc/150?u=3" },
    { id: 4, name: "David Smith", stage: "New", match: 76, exp: "3 yrs", source: "LinkedIn", date: "2024-10-20", avatar: "https://i.pravatar.cc/150?u=4" },
    { id: 5, name: "Emily Davis", stage: "Offer", match: 98, exp: "7 yrs", source: "Referral", date: "2024-10-18", avatar: "https://i.pravatar.cc/150?u=5" },
    { id: 6, name: "James Wilson", stage: "Rejected", match: 45, exp: "1 yr", source: "Indeed", date: "2024-10-15", avatar: "https://i.pravatar.cc/150?u=6" },
    { id: 7, name: "Ana Lopez", stage: "Screening", match: 82, exp: "4 yrs", source: "LinkedIn", date: "2024-10-14", avatar: "https://i.pravatar.cc/150?u=7" },
    { id: 8, name: "Robert Fox", stage: "New", match: 65, exp: "2 yrs", source: "LinkedIn", date: "2024-10-23", avatar: "https://i.pravatar.cc/150?u=8" },
];

export default function JobAnalyticsPage() {
    const [candidates, setCandidates] = useState(initialCandidates);
    const [search, setSearch] = useState("");
    const [filterStage, setFilterStage] = useState("All");
    const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' | null }>({ key: '', direction: null });
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
    const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

    useEffect(() => {
        const handleClickOutside = () => setActiveMenuId(null);
        if (activeMenuId !== null) window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, [activeMenuId]);

    const filteredCandidates = useMemo(() => {
        let data = [...candidates];
        if (search) data = data.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
        if (filterStage !== "All") data = data.filter(c => c.stage === filterStage);
        if (sortConfig.key) {
            data.sort((a: any, b: any) => {
                if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
                if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return data;
    }, [candidates, search, filterStage, sortConfig]);

    const handleSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
        setSortConfig({ key, direction });
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === filteredCandidates.length) setSelectedIds([]);
        else setSelectedIds(filteredCandidates.map(c => c.id));
    };

    const toggleSelectId = (id: number) => {
        if (selectedIds.includes(id)) setSelectedIds(selectedIds.filter(sid => sid !== id));
        else setSelectedIds([...selectedIds, id]);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'New': return 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800';
            case 'Interview': return 'bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800';
            case 'Offer': return 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800';
            case 'Rejected': return 'bg-red-50 text-red-700 border-red-100 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800';
            default: return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700';
        }
    };

    return (
        <section className="font-sans min-h-screen bg-gray-50/50 dark:bg-neutral-950 text-slate-800 dark:text-slate-200 pb-12">
            <div className="space-y-2">

                {/* HEADER */}
                <div className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 text-slate-500 dark:text-slate-400 transition"><Icons.ArrowLeft /></button>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-xl font-bold text-slate-900 dark:text-white">Senior React Developer</h1>
                                <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900">ACTIVE</span>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">ID: JB-402 • Remote • Posted 12d ago</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-neutral-700 transition shadow-sm"><Icons.Download /> Report</button>
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition shadow-md shadow-indigo-100 dark:shadow-none">Edit Job</button>
                    </div>
                </div>

                {/* CHARTS GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                    <div className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm flex flex-col">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Pipeline Funnel</h3>
                        <div className="flex-1 min-h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart layout="vertical" data={funnelData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 500 }} width={70} />
                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ fontSize: '12px', borderRadius: '6px', backgroundColor: '#171717', border: '1px solid #404040', color: '#fff' }}
                                    />
                                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                                        {funnelData.map((entry, index) => <Cell key={index} fill={entry.fill} />)}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="lg:col-span-2 bg-white dark:bg-neutral-900 p-4 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm flex flex-col">
                        <div className="flex justify-between mb-4">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Traffic vs. Applicants</h3>
                            <div className="flex gap-4 text-xs text-slate-500 dark:text-slate-400">
                                <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-indigo-500 rounded-full"></div> Views</span>
                                <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div> Apps</span>
                            </div>
                        </div>
                        <div className="flex-1 min-h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={performanceData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} /><stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.3} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                                    <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '6px', backgroundColor: '#171717', border: '1px solid #404040', color: '#fff' }} />
                                    <Area type="monotone" dataKey="views" stroke="#6366f1" strokeWidth={2} fill="url(#colorViews)" />
                                    <Area type="monotone" dataKey="apps" stroke="#10b981" strokeWidth={2} fill="transparent" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm flex flex-col">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Source Breakdown</h3>
                        <div className="flex-1 min-h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                    <Pie data={sourceData} innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value">
                                        {sourceData.map((entry, index) => <Cell key={index} fill={entry.fill} />)}
                                    </Pie>
                                    <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '6px', backgroundColor: '#171717', border: '1px solid #404040', color: '#fff' }} />
                                    <Legend verticalAlign="bottom" height={36} iconSize={10} wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* --- CANDIDATES SECTION --- */}
                <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm overflow-visible flex flex-col">

                    {/* Toolbar */}
                    <div className={`p-4 border-b border-gray-100 dark:border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-4 transition-colors ${selectedIds.length > 0 ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''}`}>
                        {selectedIds.length > 0 ? (
                            // Bulk Actions Toolbar
                            <div className="w-full flex items-center justify-between animate-in fade-in duration-200">
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300">{selectedIds.length} Selected</span>
                                    <div className="h-5 w-px bg-indigo-200 dark:bg-indigo-800"></div>
                                    <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-neutral-800 border border-indigo-200 dark:border-indigo-800 rounded-lg text-xs font-bold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition">
                                        <Icons.Check /> Shortlist
                                    </button>
                                    <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-neutral-800 border border-rose-200 dark:border-rose-900 rounded-lg text-xs font-bold text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition">
                                        <Icons.X /> Reject
                                    </button>
                                </div>
                                <button onClick={() => setSelectedIds([])} className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white">Cancel</button>
                            </div>
                        ) : (
                            // Default Toolbar
                            <>
                                <div className="flex items-center gap-3 w-full sm:w-auto">
                                    <div className="relative flex-1 sm:flex-none">
                                        <input
                                            type="text"
                                            placeholder="Search candidates..."
                                            className="pl-9 pr-4 py-2 text-sm bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-indigo-500 w-full sm:w-64 transition shadow-sm text-slate-800 dark:text-slate-200 placeholder-slate-400"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                        />
                                        <div className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500"><Icons.Search /></div>
                                    </div>
                                    <div className="flex bg-gray-100 dark:bg-neutral-800 p-1 rounded-lg">
                                        {["All", "New", "Screening", "Interview"].map(tab => (
                                            <button key={tab} onClick={() => setFilterStage(tab)} className={`px-4 py-1.5 text-xs font-bold rounded-md transition ${filterStage === tab ? "bg-white text-slate-900 shadow-sm dark:bg-neutral-700 dark:text-white" : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"}`}>{tab}</button>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex bg-gray-100 dark:bg-neutral-800 p-1 rounded-lg">
                                    <button onClick={() => setViewMode('table')} className={`p-2 rounded-md transition ${viewMode === 'table' ? 'bg-white dark:bg-neutral-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'}`}><Icons.List /></button>
                                    <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md transition ${viewMode === 'grid' ? 'bg-white dark:bg-neutral-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'}`}><Icons.Grid /></button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Views */}
                    <div className="p-0">
                        {viewMode === 'table' ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-gray-50 dark:bg-neutral-950 border-b border-gray-100 dark:border-neutral-800 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                                        <tr>
                                            <th className="px-6 py-3 w-12"><input type="checkbox" className="rounded border-gray-300 dark:border-neutral-600 text-indigo-600 dark:bg-neutral-800 w-4 h-4 cursor-pointer" checked={selectedIds.length === filteredCandidates.length && filteredCandidates.length > 0} onChange={toggleSelectAll} /></th>
                                            <th onClick={() => handleSort('name')} className="px-6 py-3 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 select-none group"><div className="flex items-center">Name <Icons.Sort /></div></th>
                                            <th onClick={() => handleSort('stage')} className="px-6 py-3 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 select-none group"><div className="flex items-center">Status <Icons.Sort /></div></th>
                                            <th onClick={() => handleSort('match')} className="px-6 py-3 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 select-none group"><div className="flex items-center">Match % <Icons.Sort /></div></th>
                                            <th className="px-6 py-3">Experience</th>
                                            <th className="px-6 py-3">Source</th>
                                            <th className="px-6 py-3">Date</th>
                                            <th className="px-6 py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50 dark:divide-neutral-800 bg-white dark:bg-neutral-900">
                                        {filteredCandidates.map((c) => (
                                            <tr key={c.id} className={`hover:bg-slate-50 dark:hover:bg-neutral-800 group transition-colors ${selectedIds.includes(c.id) ? 'bg-indigo-50/30 dark:bg-indigo-900/10' : ''}`}>
                                                <td className="px-6 py-4"><input type="checkbox" className="rounded border-gray-300 dark:border-neutral-600 text-indigo-600 dark:bg-neutral-800 w-4 h-4 cursor-pointer" checked={selectedIds.includes(c.id)} onChange={() => toggleSelectId(c.id)} /></td>
                                                <td className="px-6 py-4"><div className="flex items-center gap-3"><img src={c.avatar} className="w-8 h-8 rounded-full border dark:border-neutral-700" /><span className="text-sm font-bold text-slate-900 dark:text-white">{c.name}</span></div></td>
                                                <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(c.stage)}`}>{c.stage}</span></td>
                                                <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="w-16 h-1.5 bg-gray-200 dark:bg-neutral-700 rounded-full overflow-hidden"><div style={{ width: `${c.match}%` }} className={`h-full rounded-full ${c.match > 85 ? 'bg-emerald-500' : c.match < 60 ? 'bg-red-500' : 'bg-amber-500'}`}></div></div><span className="text-xs font-bold text-slate-700 dark:text-slate-300">{c.match}%</span></div></td>
                                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{c.exp}</td>
                                                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{c.source}</td>
                                                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{c.date}</td>
                                                <td className="px-6 py-4 text-right relative">
                                                    <div className="flex justify-end items-center gap-2">
                                                        <button className="px-3 py-1.5 border border-gray-200 dark:border-neutral-700 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-neutral-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition"><Icons.External /> </button>
                                                        <button onClick={(e) => { e.stopPropagation(); setActiveMenuId(activeMenuId === c.id ? null : c.id); }} className={`p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 text-slate-400 dark:text-slate-500 transition ${activeMenuId === c.id ? 'bg-gray-100 dark:bg-neutral-800 text-indigo-600 dark:text-indigo-400' : ''}`}><Icons.More /></button>
                                                    </div>
                                                    {activeMenuId === c.id && (
                                                        <div className="absolute right-8 top-8 w-48 bg-white dark:bg-neutral-900 rounded-lg shadow-xl border border-gray-100 dark:border-neutral-800 z-50 py-1 text-left animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                                                            <button className="w-full px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-neutral-800 flex items-center gap-2"><Icons.Check /> Shortlist</button>
                                                            <button className="w-full px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-neutral-800 flex items-center gap-2"><Icons.Document /> Resume</button>
                                                            <button className="w-full px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-neutral-800 flex items-center gap-2"><Icons.ChartBar /> Analytics</button>
                                                            <div className="h-px bg-gray-100 dark:bg-neutral-800 my-1"></div>
                                                            <button className="w-full px-4 py-2 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 flex items-center gap-2"><Icons.X /> Reject</button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 bg-gray-50/30 dark:bg-neutral-900/20">
                                {filteredCandidates.map((c) => (
                                    <div key={c.id} className={`bg-white dark:bg-neutral-900 border rounded-xl p-4 shadow-sm hover:shadow-md transition relative group ${selectedIds.includes(c.id) ? 'border-indigo-300 ring-1 ring-indigo-200 dark:border-indigo-700 dark:ring-indigo-900' : 'border-gray-200 dark:border-neutral-800'}`}>
                                        <div className="absolute top-3 right-3"><input type="checkbox" className="rounded border-gray-300 dark:border-neutral-600 text-indigo-600 w-4 h-4 cursor-pointer" checked={selectedIds.includes(c.id)} onChange={() => toggleSelectId(c.id)} /></div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <img src={c.avatar} className="w-10 h-10 rounded-full object-cover border border-gray-100 dark:border-neutral-700" />
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{c.name}</h4>
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusColor(c.stage)}`}>{c.stage}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2 mb-4">
                                            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400"><span>Match</span><span className="font-bold text-slate-800 dark:text-white">{c.match}%</span></div>
                                            <div className="w-full h-1.5 bg-gray-100 dark:bg-neutral-700 rounded-full overflow-hidden"><div style={{ width: `${c.match}%` }} className={`h-full rounded-full ${c.match > 85 ? 'bg-emerald-500' : 'bg-amber-500'}`}></div></div>
                                            <div className="flex justify-between text-xs mt-2 text-slate-500 dark:text-slate-400"><span>{c.exp} Exp</span><span>{c.source}</span></div>
                                        </div>
                                        <div className="flex gap-2 border-t border-gray-100 dark:border-neutral-800 pt-3">
                                            <button className="flex-1 py-1.5 border border-gray-200 dark:border-neutral-700 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-neutral-800 transition">Profile</button>
                                            <button className="flex-1 py-1.5 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400 rounded-lg text-xs font-bold hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition">Shortlist</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}