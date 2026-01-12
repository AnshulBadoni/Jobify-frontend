"use client";
import React, { useState, useEffect, useRef } from "react";
import { Send, ArrowLeft, Search, MoreHorizontal, Phone, Video, Paperclip, Image as ImageIcon, MapPin, Mail, Calendar, Briefcase, ChevronRight } from "lucide-react";
import Header from "@/app/components/Header";

// --- Mock Data ---
const conversations = [
    {
        id: 1,
        name: "Jane Doe",
        role: "Frontend Engineer",
        avatar: "https://i.pravatar.cc/150?u=1",
        online: true,
        lastMessage: "Can we schedule a call for tomorrow?",
        time: "10:30 AM",
        unread: 2,
        email: "jane.doe@example.com",
        location: "New York, USA",
        joined: "Oct 2023",
        bio: "Passionate frontend developer with 5 years of experience building responsive web applications.",
        // New Data Structure: Applications per candidate
        applications: [
            { title: "Senior React Developer", status: "Interview", match: 94, date: "2d ago" },
            { title: "UI Engineer", status: "Applied", match: 82, date: "1w ago" }
        ]
    },
    {
        id: 2,
        name: "John Smith",
        role: "UI/UX Designer",
        avatar: "https://i.pravatar.cc/150?u=2",
        online: false,
        lastMessage: "I sent the portfolio link. Let me know if you need anything else.",
        time: "Yesterday",
        unread: 0,
        email: "john.smith@design.co",
        location: "London, UK",
        joined: "Sep 2023",
        bio: "Creative designer focused on user-centric experiences.",
        applications: [
            { title: "Product Designer", status: "Reviewing", match: 88, date: "3d ago" }
        ]
    },
    {
        id: 3,
        name: "Robert Fox",
        role: "DevOps Engineer",
        avatar: "https://i.pravatar.cc/150?u=3",
        online: true,
        lastMessage: "The server logs look clean now.",
        time: "Mon",
        unread: 5,
        email: "robert.fox@dev.ops",
        location: "Remote",
        joined: "Aug 2023",
        bio: "Infrastructure expert ensuring 99.9% uptime.",
        applications: [
            { title: "Lead DevOps", status: "Offer Sent", match: 98, date: "1mo ago" }
        ]
    },
];

const initialMessages = [
    { id: 1, sender: "them", text: "Hi, thanks for reaching out! I saw the job posting for the Senior React role.", time: "10:00 AM" },
    { id: 2, sender: "me", text: "Glad to connect, Jane. I was really impressed by your portfolio project.", time: "10:02 AM" },
    { id: 3, sender: "them", text: "Thank you! That project was a labor of love. I'm very interested in how your team handles state management.", time: "10:05 AM" },
    { id: 4, sender: "them", text: "Do you have time to discuss the technical requirements briefly?", time: "10:05 AM" },
    { id: 5, sender: "me", text: "Absolutely. How does tomorrow at 2 PM sound?", time: "10:10 AM" },
];

export default function ChatPage() {
    const [activeChat, setActiveChat] = useState(conversations[0]);
    const [messages, setMessages] = useState(initialMessages);
    const [newMessage, setNewMessage] = useState("");
    const [showProfile, setShowProfile] = useState(true);
    const [mobileView, setMobileView] = useState<"list" | "chat">("list");

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = () => {
        if (!newMessage.trim()) return;
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setMessages([...messages, { id: Date.now(), sender: "me", text: newMessage, time }]);
        setNewMessage("");
    };

    const handleChatSelect = (conv: any) => {
        setActiveChat(conv);
        setMobileView("chat");
    };

    // Helper for status colors
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Interview': return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800';
            case 'Offer Sent': return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800';
            default: return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
        }
    };

    return (
        <section className="font-sans h-screen flex flex-col bg-white dark:bg-neutral-950 text-slate-800 dark:text-slate-200 overflow-hidden">
            {/* --- MAIN LAYOUT --- */}
            <div className="flex-1 flex overflow-hidden">

                {/* --- PANE 1: SIDEBAR LIST --- */}
                <aside className={`${mobileView === "list" ? "flex" : "hidden"} md:flex w-full md:w-80 lg:w-[340px] flex-col border-r border-gray-100 dark:border-neutral-800 bg-white dark:bg-neutral-950 z-10`}>
                    {/* Search */}
                    <div className="p-4 border-b border-gray-50 dark:border-neutral-900">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Search conversations..."
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-neutral-900 border border-transparent focus:bg-white dark:focus:bg-neutral-950 focus:border-indigo-500/30 focus:ring-4 focus:ring-indigo-500/10 rounded-xl text-sm transition-all outline-none placeholder:text-slate-400"
                            />
                            <div className="absolute left-3.5 top-3 text-slate-400 group-focus-within:text-indigo-500 transition-colors"><Search className="w-4 h-4" /></div>
                        </div>
                    </div>

                    {/* List */}
                    <div className="flex-1 overflow-y-auto px-2 space-y-1 pt-2 custom-scrollbar">
                        {conversations.map((conv) => (
                            <div
                                key={conv.id}
                                onClick={() => handleChatSelect(conv)}
                                className={`relative group flex items-center gap-3 p-3 mx-2 rounded-xl cursor-pointer transition-all duration-200 ${activeChat.id === conv.id
                                    ? "bg-indigo-50 dark:bg-indigo-900/20 shadow-sm"
                                    : "hover:bg-gray-50 dark:hover:bg-neutral-900"
                                    }`}
                            >
                                {/* Active Indicator */}
                                {activeChat.id === conv.id && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-indigo-600 rounded-r-full"></div>}

                                <div className="relative shrink-0">
                                    <img src={conv.avatar} alt="" className="w-12 h-12 rounded-full object-cover border border-gray-100 dark:border-neutral-800" />
                                    {conv.online && <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-neutral-950 rounded-full shadow-sm"></span>}
                                </div>

                                {/* Text Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h4 className={`text-sm truncate ${activeChat.id === conv.id ? 'font-bold text-slate-900 dark:text-white' : 'font-semibold text-slate-700 dark:text-slate-200'}`}>{conv.name}</h4>
                                        <span className="text-[10px] text-slate-400 shrink-0 font-medium ml-2">{conv.time}</span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <p className={`text-xs truncate pr-2 ${conv.unread > 0 ? 'font-semibold text-slate-800 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400'}`}>
                                            {conv.lastMessage}
                                        </p>
                                        {/* Unread Badge (Fixed positioning) */}
                                        {conv.unread > 0 && (
                                            <span className="shrink-0 flex items-center justify-center h-5 min-w-[1.25rem] bg-indigo-600 text-white text-[10px] font-bold px-1.5 rounded-full shadow-sm">
                                                {conv.unread}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* --- PANE 2: CHAT AREA --- */}
                <main className={`${mobileView === "chat" ? "flex" : "hidden"} md:flex flex-1 flex-col bg-slate-50/30 dark:bg-neutral-900/30 relative`}>

                    {/* Chat Header */}
                    <div className="h-16 px-6 border-b border-gray-100 dark:border-neutral-800 flex justify-between items-center bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md shrink-0 z-10">
                        <div className="flex items-center gap-4">
                            <button className="md:hidden p-2 -ml-2 text-slate-500 hover:bg-gray-100 rounded-full" onClick={() => setMobileView("list")}><ArrowLeft className="w-5 h-5" /></button>
                            <div className="relative">
                                <img src={activeChat.avatar} className="w-10 h-10 rounded-full object-cover shadow-sm" />
                                {activeChat.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-neutral-950 rounded-full"></span>}
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white text-sm leading-tight">{activeChat.name}</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{activeChat.role}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                            <button className="p-2.5 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-neutral-800 rounded-full transition"><Phone className="w-4 h-4" /></button>
                            <button className="p-2.5 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-neutral-800 rounded-full transition"><Video className="w-4 h-4" /></button>
                            <div className="h-5 w-px bg-gray-200 dark:bg-neutral-800 mx-2"></div>
                            <button className={`p-2.5 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-neutral-800 rounded-full transition ${showProfile ? "text-indigo-600 bg-indigo-50 dark:bg-neutral-800" : ""}`} onClick={() => setShowProfile(!showProfile)}><MoreHorizontal className="w-4 h-4" /></button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-5">
                        <div className="flex justify-center py-2">
                            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest bg-gray-100/50 dark:bg-neutral-800/50 px-3 py-1 rounded-full backdrop-blur-sm">Today</span>
                        </div>

                        {messages.map((msg, index) => {
                            const isMe = msg.sender === "me";
                            const isSeq = index > 0 && messages[index - 1].sender === msg.sender;
                            return (
                                <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                                    {!isMe && !isSeq && (
                                        <img src={activeChat.avatar} className="w-8 h-8 rounded-full mr-3 self-end shadow-sm border border-white dark:border-neutral-800" />
                                    )}
                                    {!isMe && isSeq && <div className="w-11" />}

                                    <div className={`max-w-[75%] sm:max-w-[65%] relative group`}>
                                        <div className={`px-4 py-3 text-sm leading-relaxed shadow-sm ${isMe
                                            ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white rounded-2xl rounded-br-sm"
                                            : "bg-white dark:bg-neutral-900 text-slate-700 dark:text-slate-200 rounded-2xl rounded-bl-sm border border-gray-100 dark:border-neutral-800"
                                            }`}>
                                            {msg.text}
                                        </div>
                                        <span className={`text-[10px] font-medium text-slate-400 absolute -bottom-5 opacity-0 group-hover:opacity-100 transition-opacity ${isMe ? "right-1" : "left-1"}`}>
                                            {msg.time}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white dark:bg-neutral-950 border-t border-gray-100 dark:border-neutral-800 shrink-0">
                        <div className="flex items-end gap-2 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all shadow-sm">
                            <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white dark:hover:bg-neutral-800 rounded-xl transition"><Paperclip className="w-5 h-5" /></button>
                            <textarea
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                                placeholder="Write a message..."
                                rows={1}
                                className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 resize-none py-2.5 max-h-32 scrollbar-hide"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!newMessage.trim()}
                                className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition shadow-md disabled:opacity-50 disabled:hover:bg-indigo-600 disabled:shadow-none transform active:scale-95"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </main>

                {/* --- PANE 3: PROFILE RAIL (Right) --- */}
                {showProfile && (
                    <aside className="hidden xl:flex w-[320px] flex-col border-l border-gray-100 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-y-auto">

                        {/* Profile Header */}
                        <div className="p-8 flex flex-col items-center border-b border-gray-100 dark:border-neutral-800 bg-gray-50/30 dark:bg-neutral-900/30">
                            <div className="relative group cursor-pointer">
                                <div className="absolute inset-0 bg-indigo-500 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                <img src={activeChat.avatar} className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-neutral-950 shadow-lg relative z-10" />
                            </div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-4">{activeChat.name}</h2>
                            <p className="text-sm text-slate-500 font-medium">{activeChat.role}</p>

                            <div className="flex gap-3 mt-6 w-full">
                                <button className="flex-1 py-2.5 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold hover:bg-gray-50 dark:hover:bg-neutral-800 hover:border-gray-300 transition shadow-sm">View Profile</button>
                                <button className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition shadow-md shadow-indigo-200 dark:shadow-none">Schedule</button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-0">

                            {/* Contact Info */}
                            <div className="p-6 border-b border-gray-100 dark:border-neutral-800">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Contact Details</h4>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-sm group cursor-pointer">
                                        <div className="p-2 bg-gray-100 dark:bg-neutral-900 rounded-lg text-slate-500 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition"><Mail className="w-4 h-4" /></div>
                                        <span className="text-slate-600 dark:text-slate-300 font-medium truncate">{activeChat.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm group cursor-pointer">
                                        <div className="p-2 bg-gray-100 dark:bg-neutral-900 rounded-lg text-slate-500 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition"><MapPin className="w-4 h-4" /></div>
                                        <span className="text-slate-600 dark:text-slate-300 font-medium">{activeChat.location}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm group cursor-pointer">
                                        <div className="p-2 bg-gray-100 dark:bg-neutral-900 rounded-lg text-slate-500 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition"><Calendar className="w-4 h-4" /></div>
                                        <span className="text-slate-600 dark:text-slate-300 font-medium">Joined {activeChat.joined}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Active Applications (Replaces Rating/Match) */}
                            <div className="p-6">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    Active Applications <span className="bg-gray-100 dark:bg-neutral-800 text-slate-600 px-1.5 py-0.5 rounded-full text-[10px]">{activeChat.applications.length}</span>
                                </h4>
                                <div className="space-y-3">
                                    {activeChat.applications.map((app, i) => (
                                        <div key={i} className="p-3 rounded-xl bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 hover:border-indigo-200 dark:hover:border-indigo-900 transition cursor-pointer group">
                                            <div className="flex justify-between items-start mb-1">
                                                <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 transition-colors">{app.title}</h5>
                                                <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-indigo-500 transition-transform group-hover:translate-x-1" />
                                            </div>
                                            <div className="flex justify-between items-center mt-2">
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusColor(app.status)}`}>
                                                    {app.status}
                                                </span>
                                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-1.5 py-0.5 rounded">
                                                    {app.match}% Match
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>
                )}

            </div>
        </section>
    );
}