"use client";
import React, { useState } from "react";
import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, Cell, PieChart, Pie } from 'recharts';

// --- Icons ---
const Icons = {
    Bell: () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
    Bolt: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    Mail: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    Clock: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    Refresh: () => <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
    Server: () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>,
    CheckCircle: () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    Database: () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
};

// --- Data ---
const activityData = [
    { name: 'M', apps: 12, msgs: 5 }, { name: 'T', apps: 18, msgs: 8 },
    { name: 'W', apps: 10, msgs: 12 }, { name: 'T', apps: 25, msgs: 6 },
    { name: 'F', apps: 20, msgs: 10 }, { name: 'S', apps: 8, msgs: 4 },
    { name: 'S', apps: 5, msgs: 2 },
];

const sparklineData = [
    { v: 10 }, { v: 25 }, { v: 15 }, { v: 30 }, { v: 12 }, { v: 40 }, { v: 50 }
];

const teamActivity = [
    { user: "Sarah J.", role: "Recruiter", action: "moved", candidate: "John Doe", to: "Offer", time: "10m", avatar: "https://i.pravatar.cc/150?u=1" },
    { user: "Mike T.", role: "Hiring Mgr", action: "interviewed", candidate: "Jane Smith", to: "Tech Round", time: "1h", avatar: "https://i.pravatar.cc/150?u=2" },
    { user: "Anna B.", role: "Admin", action: "posted job", candidate: "Senior UX", to: "Active", time: "2h", avatar: "https://i.pravatar.cc/150?u=3" },
    { user: "David L.", role: "Recruiter", action: "rejected", candidate: "Mark P.", to: "Archived", time: "4h", avatar: "https://i.pravatar.cc/150?u=4" },
];

const notifications = [
    { id: 1, type: 'app', title: 'Application: React Dev', desc: 'Strong portfolio match', time: '2m', priority: 'high' },
    { id: 2, type: 'msg', title: 'Msg: Sarah Jenkins', desc: 'Available for interview?', time: '15m', priority: 'med' },
    { id: 3, type: 'sys', title: 'System Alert', desc: 'Job "UX Lead" expiring in 24h', time: '1h', priority: 'low' },
    { id: 4, type: 'app', title: 'Application: Data Lead', desc: 'Internal referral', time: '2h', priority: 'high' },
    { id: 5, type: 'msg', title: 'Msg: Mike Ross', desc: 'Accepted the offer!', time: '5h', priority: 'high' },
    { id: 6, type: 'sys', title: 'Weekly Report', desc: 'Download PDF available', time: '1d', priority: 'low' },
    { id: 7, type: 'app', title: 'Application: DevOps', desc: 'From LinkedIn', time: '1d', priority: 'med' },
    { id: 8, type: 'msg', title: 'Msg: Scheduling', desc: 'Confirming Tuesday slot', time: '2d', priority: 'low' },
];

const heatmapData = Array.from({ length: 52 }, () => Math.floor(Math.random() * 5));

export default function ActivityMasonryPage() {
    const [notifs, setNotifs] = useState(notifications);

    const markRead = (id: number) => setNotifs(notifs.map(n => n.id === id ? { ...n, read: true } : n));
    const deleteNotif = (id: number) => setNotifs(notifs.filter(n => n.id !== id));

    return (
        <section className="font-sans min-h-screen bg-gray-50/50 dark:bg-neutral-950 text-slate-800 dark:text-slate-200 p-2">

            {/* MASONRY / BENTO GRID LAYOUT */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 auto-rows-[minmax(140px,auto)]">

                {/* 1. HEATMAP (Col Span 2, Row 1) */}
                <div className="col-span-1 md:col-span-2 bg-white dark:bg-neutral-900 p-3 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between h-full">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide">Yearly Intensity</h3>
                            <p className="text-[10px] text-slate-400">Total: 2,405 Actions</p>
                        </div>
                        <div className="flex gap-1 text-[9px] text-slate-400 items-center">
                            <span>Less</span>
                            <div className="w-2 h-2 bg-gray-100 dark:bg-neutral-800 rounded-sm"></div>
                            <div className="w-2 h-2 bg-indigo-600 dark:bg-indigo-500 rounded-sm"></div>
                            <span>More</span>
                        </div>
                    </div>
                    <div className="flex gap-0.5 flex-wrap content-end h-16 pt-2">
                        {heatmapData.map((level, i) => (
                            <div key={i} className={`flex-1 h-full min-w-[4px] rounded-[1px] transition-all hover:scale-y-110 ${level === 0 ? 'bg-gray-100 dark:bg-neutral-800' : level === 1 ? 'bg-indigo-100 dark:bg-indigo-900/30' : level === 2 ? 'bg-indigo-300 dark:bg-indigo-700' : level === 3 ? 'bg-indigo-500 dark:bg-indigo-500' : 'bg-indigo-700 dark:bg-indigo-400'}`}></div>
                        ))}
                    </div>
                </div>

                {/* 2. KPI: APPLICANTS (Col 1, Row 1) */}
                <div className="col-span-1 bg-white dark:bg-neutral-900 p-0 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm relative overflow-hidden group">
                    <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={sparklineData}><Area type="monotone" dataKey="v" stroke="none" fill="#10b981" /></AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="p-4 h-full flex flex-col justify-between relative z-10">
                        <div className="flex justify-between items-start">
                            <div className="p-1.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-600"><Icons.Bolt /></div>
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-1.5 py-0.5 rounded">+12%</span>
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-slate-900 dark:text-white group-hover:translate-x-1 transition-transform">142</h3>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">New Applicants</p>
                        </div>
                    </div>
                </div>

                {/* 3. KPI: MESSAGES (Col 1, Row 1) */}
                <div className="col-span-1 bg-white dark:bg-neutral-900 p-0 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm relative overflow-hidden group">
                    <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={sparklineData}><Area type="monotone" dataKey="v" stroke="none" fill="#3b82f6" /></AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="p-4 h-full flex flex-col justify-between relative z-10">
                        <div className="flex justify-between items-start">
                            <div className="p-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600"><Icons.Mail /></div>
                            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-1.5 py-0.5 rounded">+5</span>
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-slate-900 dark:text-white group-hover:translate-x-1 transition-transform">8</h3>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Unread Messages</p>
                        </div>
                    </div>
                </div>

                {/* 4. NOTIFICATION FEED (Col 1, Row Span 2) */}
                <div className="col-span-1 md:col-span-1 lg:col-span-1 row-span-2 bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm flex flex-col overflow-hidden">
                    <div className="p-3 border-b border-gray-100 dark:border-neutral-800 flex justify-between items-center bg-gray-50/50 dark:bg-neutral-950">
                        <div className="flex items-center gap-2">
                            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase">Feed</h3>
                            <span className="bg-rose-500 text-white text-[9px] font-bold px-1.5 rounded-full">3</span>
                        </div>
                        <button className="text-slate-400 hover:text-indigo-600 transition" title="Refresh"><Icons.Refresh /></button>
                    </div>
                    <div className="overflow-y-auto flex-1 p-0 scrollbar-hide">
                        {notifs.map((n) => (
                            <div key={n.id} className="group p-3 border-b border-gray-50 dark:border-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition cursor-pointer relative">
                                <div className="flex justify-between items-start mb-1">
                                    <span className={`text-[9px] font-bold px-1.5 rounded uppercase ${n.type === 'app' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30' : n.type === 'msg' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30' : 'bg-gray-100 text-gray-600 dark:bg-gray-800'}`}>{n.type}</span>
                                    <span className="text-[9px] text-slate-400">{n.time}</span>
                                </div>
                                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">{n.title}</h4>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">{n.desc}</p>
                                {n.priority === 'high' && <div className="absolute left-0 top-3 bottom-3 w-0.5 bg-rose-500 rounded-r"></div>}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. ENGAGEMENT CHART (Col Span 2, Row Span 2) */}
                <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 bg-white dark:bg-neutral-900 p-4 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Engagement Trends</h3>
                        <div className="flex gap-3">
                            <span className="flex items-center gap-1 text-[10px] text-slate-500 font-medium"><span className="w-2 h-2 bg-indigo-500 rounded-full"></span> Apps</span>
                            <span className="flex items-center gap-1 text-[10px] text-slate-500 font-medium"><span className="w-2 h-2 bg-emerald-500 rounded-full"></span> Msgs</span>
                        </div>
                    </div>
                    <div className="flex-1 w-full min-h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={activityData}>
                                <defs>
                                    <linearGradient id="colorApp" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} /><stop offset="95%" stopColor="#6366f1" stopOpacity={0} /></linearGradient>
                                    <linearGradient id="colorMsg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
                                </defs>
                                <Tooltip contentStyle={{ backgroundColor: '#171717', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#fff' }} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                <Area type="monotone" dataKey="apps" stroke="#6366f1" strokeWidth={2} fill="url(#colorApp)" />
                                <Area type="monotone" dataKey="msgs" stroke="#10b981" strokeWidth={2} fill="url(#colorMsg)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 6. SYSTEM STATUS (Updated: Row Span 2 to fill gap) */}
                <div className="col-span-1 md:col-span-1 lg:col-span-1 row-span-2 bg-white dark:bg-neutral-900 p-4 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm flex flex-col overflow-hidden">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase flex items-center gap-2"><div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div> System Status</h3>
                        <span className="text-[10px] text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-1.5 py-0.5 rounded-full font-bold">99.9%</span>
                    </div>

                    <div className="space-y-4 flex-1">
                        <div>
                            <div className="flex justify-between text-[10px] text-slate-500 mb-1"><span>API Latency</span><span className="text-emerald-500 font-bold">24ms</span></div>
                            <div className="w-full h-1.5 bg-gray-100 dark:bg-neutral-800 rounded-full overflow-hidden"><div className="bg-emerald-500 h-full rounded-full" style={{ width: '15%' }}></div></div>
                        </div>
                        <div>
                            <div className="flex justify-between text-[10px] text-slate-500 mb-1"><span>Database Load</span><span className="text-blue-500 font-bold">42%</span></div>
                            <div className="w-full h-1.5 bg-gray-100 dark:bg-neutral-800 rounded-full overflow-hidden"><div className="bg-blue-500 h-full rounded-full" style={{ width: '42%' }}></div></div>
                        </div>
                        <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-neutral-800">
                            <div className="flex items-center justify-between text-[11px]">
                                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300"><Icons.Server /> Search Index</div>
                                <span className="text-emerald-500 font-bold text-[10px]">Operational</span>
                            </div>
                            <div className="flex items-center justify-between text-[11px]">
                                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300"><Icons.Mail /> Email Service</div>
                                <span className="text-emerald-500 font-bold text-[10px]">Operational</span>
                            </div>
                            <div className="flex items-center justify-between text-[11px]">
                                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300"><Icons.Database /> Storage</div>
                                <span className="text-emerald-500 font-bold text-[10px]">Operational</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 7. TEAM PULSE (Col Span 2) */}
                <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-white dark:bg-neutral-900 p-0 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm overflow-hidden h-full">
                    <div className="p-3 border-b border-gray-100 dark:border-neutral-800 bg-gray-50/50 dark:bg-neutral-950 flex justify-between items-center">
                        <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase">Team Pulse</h3>
                        <button className="text-[10px] text-indigo-600 hover:underline">View All</button>
                    </div>
                    <div className="divide-y divide-gray-50 dark:divide-neutral-800 overflow-y-auto max-h-48">
                        {teamActivity.map((act, i) => (
                            <div key={i} className="p-3 flex gap-3 items-center hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition">
                                <img src={act.avatar} className="w-8 h-8 rounded-full border border-gray-100 dark:border-neutral-700" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-slate-800 dark:text-slate-200 truncate">
                                        <span className="font-bold">{act.user}</span> {act.action} <span className="font-bold text-slate-900 dark:text-white">{act.candidate}</span>
                                    </p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-[9px] bg-gray-100 dark:bg-neutral-800 text-slate-500 px-1.5 rounded">{act.role}</span>
                                        <span className="text-[9px] text-indigo-500 font-medium">→ {act.to}</span>
                                    </div>
                                </div>
                                <span className="text-[10px] text-slate-400 whitespace-nowrap">{act.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 8. PENDING ACTIONS (Col Span 2, Purple) */}
                <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-indigo-600 p-4 rounded-xl shadow-lg text-white flex flex-col relative overflow-hidden h-full">
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-sm font-bold uppercase flex items-center gap-2"><Icons.Clock /> Pending Actions</h3>
                                <p className="text-[10px] text-indigo-200">3 tasks require your attention today</p>
                            </div>
                            <button className="bg-white/20 hover:bg-white/30 text-[10px] font-bold px-2 py-1 rounded transition">View All</button>
                        </div>
                        <div className="space-y-2 mt-auto">
                            <div className="flex items-center justify-between p-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10 cursor-pointer hover:bg-white/20 transition">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full border border-white/50 flex items-center justify-center"><Icons.CheckCircle /></div>
                                    <span className="text-xs font-medium">Approve offer for Senior React Dev</span>
                                </div>
                                <span className="text-[9px] bg-rose-500 px-1.5 py-0.5 rounded">Urgent</span>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10 cursor-pointer hover:bg-white/20 transition">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full border border-white/50 flex items-center justify-center"></div>
                                    <span className="text-xs font-medium">Schedule final round with Sarah</span>
                                </div>
                                <span className="text-[9px] bg-emerald-500 px-1.5 py-0.5 rounded">Due 5pm</span>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                </div>

            </div>
        </section>
    );
}