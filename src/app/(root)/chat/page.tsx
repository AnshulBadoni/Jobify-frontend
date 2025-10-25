"use client";
import React, { useState, useEffect, useRef } from "react";
import { Send, Star, ArrowLeft } from "lucide-react";
import Header from "@/app/components/Header";

const conversations = [
    {
        id: 1,
        name: "Jane Doe",
        role: "Frontend Engineer",
        avatar: "https://via.placeholder.com/150",
        online: true,
        match: 92,
        rating: 4.5,
        expectedSalary: "$80,000 / year",
        experience: "5 years",
        employmentType: "Full-time",
        languages: "English, Spanish",
        bio: "Experienced frontend engineer...",
        email: "jane@example.com",
        location: "New York, USA",
        joinedDate: "Jan 2022",
    },
    {
        id: 2,
        name: "John Smith",
        role: "UI/UX Designer",
        avatar: "https://via.placeholder.com/150",
        online: true,
        match: 88,
        rating: 4.2,
        expectedSalary: "$70,000 / year",
        experience: "3 years",
        employmentType: "Contract",
        languages: "English",
        bio: "Creative UI/UX designer...",
        email: "john@example.com",
        location: "London, UK",
        joinedDate: "Mar 2021",
    },
];

export default function ChatPage() {
    const [activeChat, setActiveChat] = useState(conversations[0]);
    const [messages, setMessages] = useState([
        { id: 1, sender: "recruiter", text: "Hi, thanks for applying!" },
        { id: 2, sender: "user", text: "Glad to connect. Could you share more details?" },
    ]);
    const [newMessage, setNewMessage] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [showChat, setShowChat] = useState(false); // 👈 mobile state
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, activeChat]);

    const handleSend = () => {
        if (!newMessage.trim()) return;
        setMessages([...messages, { id: Date.now(), sender: "user", text: newMessage }]);
        setNewMessage("");
    };

    return (
        <div className="space-y-2">
            <div className="h-[calc(100vh-6rem)] flex font-sans text-gray-900 dark:text-white gap-2">
                {/* Sidebar (Users list) */}
                <aside
                    className={`${showChat ? "hidden" : "flex"
                        } md:flex lg:w-80 w-screen flex-col border-r border-gray-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-2xl overflow-hidden gap-2`}
                >
                    {/* <div className="p-6 border-b border-gray-200 dark:border-neutral-800">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Messages</h2>
                </div> */}
                    <div className="flex-1 overflow-y-auto space-y-1">
                        {conversations.map((conv) => (
                            <div
                                key={conv.id}
                                onClick={() => {
                                    setActiveChat(conv);
                                    setShowChat(true); // 👈 open chat on mobile
                                }}
                                className={`flex items-center gap-3 p-4 mx-2 cursor-pointer hover:bg-gray-100/50 dark:hover:bg-neutral-800/50 rounded-xl transition ${activeChat.id === conv.id
                                    ? "bg-gray-100/70 dark:bg-neutral-800/70 shadow-md"
                                    : ""
                                    }`}
                            >
                                <img
                                    src={conv.avatar}
                                    alt=""
                                    className="w-12 h-12 rounded-full object-cover shadow-sm"
                                />
                                <div className="flex-1">
                                    <p className="font-medium">{conv.name}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                        {conv.role}
                                    </p>
                                </div>
                                {conv.online && <span className="w-3 h-3 bg-green-500 rounded-full" />}
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Chat Window */}
                <div
                    className={`${showChat ? "flex" : "hidden"
                        } md:flex flex-1 flex-col gap-2 max-w-screen lg:px-0 px-2`}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl sticky top-0 z-10 rounded-2xl shadow-sm">
                        <div className="flex items-center gap-4">
                            {/* 👇 Back button for mobile */}
                            <button
                                className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-700"
                                onClick={() => setShowChat(false)}
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <img
                                onClick={() => setOpenModal(true)}
                                src={activeChat.avatar}
                                alt=""
                                className="w-12 h-12 rounded-full object-cover shadow cursor-pointer"
                            />
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-white">
                                    {activeChat.name}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {activeChat.role}
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-white dark:bg-neutral-900 rounded-2xl">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"
                                    }`}
                            >
                                <div
                                    className={`px-4 py-3 max-w-xs rounded-2xl backdrop-blur-md border border-gray-200 dark:border-neutral-800 shadow transition ${msg.sender === "user"
                                        ? "bg-indigo-600 text-white rounded-br-none"
                                        : "bg-white/50 dark:bg-neutral-800/50 text-gray-900 dark:text-white rounded-bl-none"
                                        }`}
                                >
                                    <p className="mb-1">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="border-t border-gray-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl px-6 py-3 flex items-center gap-3 sticky lg:bottom-0 bottom-20 z-10 rounded-2xl">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 px-4 py-3 rounded-2xl bg-gray-100/60 dark:bg-neutral-800/60 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />
                        <button
                            onClick={handleSend}
                            className="p-3 mr-24 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-lg"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>



                {/* Modal - Detailed View */}
                <div
                    id="modal"
                    className={`${openModal ? "flex" : "hidden"} fixed inset-0 backdrop-blur-2xl items-center justify-center z-50 p-6`}
                >
                    <div className="relative bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
                        {/* Close button */}
                        <button
                            onClick={() => setOpenModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 z-20"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Background cover */}
                        <div className="relative">
                            <img
                                src="https://el.phncdn.com/gif/15762622.gif"
                                alt=""
                                className="w-full h-48 object-cover rounded-t-2xl"
                            />
                            <div className="absolute -bottom-16 left-12">
                                <img
                                    src={activeChat.avatar || "/default-avatar.png"}
                                    alt={activeChat.name || "User"}
                                    className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white dark:border-neutral-900"
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="mt-20 px-8 pb-8">
                            {/* Name + role */}
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div>
                                    <p className="font-bold text-2xl text-gray-900 dark:text-white">{activeChat.name || "Unknown User"}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{activeChat.role || "No role specified"}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100">
                                        {activeChat.match ?? 0}% Match
                                    </span>
                                    <div className="flex items-center gap-1 text-yellow-400">
                                        <Star className="w-4 h-4" /> {activeChat.rating ?? "N/A"}
                                    </div>
                                </div>
                            </div>

                            {/* Bio */}
                            <div
                                className={`mt-6 p-4 rounded-xl text-sm ${activeChat.bio
                                    ? "bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300"
                                    : "bg-gray-50 dark:bg-neutral-700 text-gray-400 italic"
                                    }`}
                            >
                                {activeChat.bio || "No bio available"}
                            </div>

                            {/* Info grid */}
                            <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
                                <p><span className="font-semibold">Email:</span> {activeChat.email || "Not provided"}</p>
                                <p><span className="font-semibold">Joined:</span> {activeChat.joinedDate || "N/A"}</p>
                                <p><span className="font-semibold">Location:</span> {activeChat.location || "N/A"}</p>
                                <p><span className="font-semibold">Experience:</span> {activeChat.experience || "N/A"}</p>
                                <p><span className="font-semibold">Languages:</span> {activeChat.languages || "N/A"}</p>
                                <p><span className="font-semibold">Employment:</span> {activeChat.employmentType || "N/A"}</p>
                            </div>

                            {/* Actions */}
                            <div className="mt-8 flex gap-4">
                                <button className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-xl shadow-md transition">
                                    Message
                                </button>
                                <button className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-3 rounded-xl transition">
                                    Follow
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
