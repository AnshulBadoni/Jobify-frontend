"use client";
import { useState, useRef } from "react";
import { ChevronUp, Send, X } from "lucide-react";

interface Message {
    id: number;
    text: string;
    sender: "bot" | "user";
    agent?: string;
}


const agents = [
    { name: "Alice", color: "bg-red-500" }, // you can add image URLs
    { name: "Bob", color: "bg-green-500" },
    { name: "Priya", color: "bg-blue-500" },
    { name: "Canela", color: "bg-purple-500" },
];
export default function ChatBottomSheet() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState<{ name: string; color: string; img?: string } | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");

    const sheetRef = useRef<HTMLDivElement>(null);
    const dragStartY = useRef<number | null>(null);
    const sheetStartY = useRef<number>(0);

    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim() || !selectedAgent) return;

        const userMessage = { id: Date.now(), text: input, sender: "user" };
        setMessages((prev: any) => [...prev, userMessage]);
        setInput("");

        // Show loading placeholder
        const loadingId = Date.now() + 1;
        setMessages((prev) => [
            ...prev,
            { id: loadingId, text: "Typing...", sender: "bot", agent: selectedAgent.name },
        ]);
        setIsLoading(true);

        try {
            const res = await fetch("http://localhost:3001/support/getSupport", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: input,
                    agent: selectedAgent.name,
                }),
            });

            if (!res.ok) throw new Error("Failed to fetch response");

            const data = await res.json();
            const reply =
                data?.data?.response ||
                `${selectedAgent.name} will get back shortly.`;

            // Replace loading with real response
            setMessages((prev) =>
                prev.map((m) =>
                    m.id === loadingId ? { ...m, text: reply } : m
                )
            );
        } catch (err) {
            // Replace loading with error
            setMessages((prev) =>
                prev.map((m) =>
                    m.id === loadingId
                        ? {
                            ...m,
                            text: "⚠️ Sorry, something went wrong. Please try again later.",
                        }
                        : m
                )
            );
        } finally {
            setIsLoading(false);
        }
    };


    // Drag handlers
    const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
        dragStartY.current = "touches" in e ? e.touches[0].clientY : e.clientY;
        sheetStartY.current = sheetRef.current?.getBoundingClientRect().top || 0;
        document.addEventListener("mousemove", handleDragging);
        document.addEventListener("mouseup", handleDragEnd);
        document.addEventListener("touchmove", handleDragging);
        document.addEventListener("touchend", handleDragEnd);
    };

    const handleDragging = (e: MouseEvent | TouchEvent) => {
        if (dragStartY.current === null || !sheetRef.current) return;
        const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
        const diff = clientY - dragStartY.current;
        let newY = sheetStartY.current + diff;
        const maxY = window.innerHeight - 80;
        const minY = 80;
        newY = Math.min(Math.max(newY, minY), maxY);
        sheetRef.current.style.transform = `translateY(${newY}px)`;
    };

    const handleDragEnd = () => {
        if (!sheetRef.current) return;
        const top = sheetRef.current.getBoundingClientRect().top;
        const mid = window.innerHeight / 2;
        if (top < mid) setIsOpen(true);
        else setIsOpen(false);

        sheetRef.current.style.transform = "";
        dragStartY.current = null;
        document.removeEventListener("mousemove", handleDragging);
        document.removeEventListener("mouseup", handleDragEnd);
        document.removeEventListener("touchmove", handleDragging);
        document.removeEventListener("touchend", handleDragEnd);
    };

    return (
        <>
            {/* Bottom Sheet */}
            <div
                ref={sheetRef}
                className={`fixed lg:right-2 right-0 bottom-0 shadow-2xl border-t-4 border-gray-200 dark:border-neutral-800 lg:w-[25rem] md:w-screen sm:w-screen transition-all duration-300 ease-in-out z-50
          ${isOpen ? "h-[85vh] sm:h-[500px]" : "h-0"}
          bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl flex flex-col w-full`}
            >
                {/* Drag Handle + Close */}
                <div
                    onMouseDown={handleDragStart}
                    onTouchStart={handleDragStart}
                    className="flex justify-center items-center w-full p-2 cursor-grab relative"
                >
                    <div className="w-12 h-1.5 bg-gray-300 dark:bg-neutral-700 rounded-full"></div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute right-4 top-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-800 transition"
                    >
                        <X className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </button>
                </div>

                {/* Agent Selection */}
                {!selectedAgent && isOpen && (
                    <div className="flex flex-col items-center justify-center flex-1 gap-6 p-4">
                        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Choose a support agent</h3>
                        <div className="flex gap-6 flex-wrap justify-center">
                            {agents.map((agent) => (
                                <button
                                    key={agent.name}
                                    onClick={() => {
                                        setSelectedAgent(agent);
                                        setMessages([
                                            {
                                                id: Date.now(),
                                                text: `Hello! I am ${agent.name}, how can I help you today?`,
                                                sender: "bot",
                                                agent: agent.name,
                                            },
                                        ]);
                                    }}
                                    className="flex flex-col items-center gap-2 transition hover:scale-105"
                                >
                                    <div
                                        className={`w-16 h-16 rounded-full flex items-center justify-center ${agent.color} text-white text-lg font-bold`}
                                    >
                                        {/* {agent.img ? (
                                            <img src={agent.img} alt={agent.name} className="w-full h-full rounded-full object-cover" />
                                        ) : (
                                            agent.name[0]
                                        )} */}
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{agent.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Messages */}
                {selectedAgent && isOpen && (
                    <>
                        <div className="flex-1 p-4 space-y-3 overflow-y-auto text-sm">
                            {messages.map((msg) => {
                                const agentColor = agents.find((a) => a.name === msg.agent)?.color || "bg-gray-500";
                                return (
                                    <div
                                        key={msg.id}
                                        className={`flex items-end gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        {msg.sender === "bot" && (
                                            <div
                                                className={`w-6 h-6 rounded-full flex items-center justify-center ${agentColor} text-white text-xs font-bold`}
                                            >
                                                {msg.agent?.[0]}
                                            </div>
                                        )}
                                        <div
                                            className={`px-3 py-2 rounded-2xl max-w-[75%] ${msg.sender === "user"
                                                ? "bg-indigo-600 text-white rounded-br-none"
                                                : "bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-gray-200 rounded-bl-none"
                                                }`}
                                        >
                                            {msg.text}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Input */}
                        <div className="border-t border-gray-200 dark:border-neutral-800 p-3 flex items-center gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                            <button
                                onClick={handleSend}
                                className="p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* Support Button */}
            {!isOpen && (
                <div className="fixed right-4 bottom-20 lg:bottom-6 flex flex-col items-end z-50">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`flex items-center justify-center rounded-full 
               bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 
               shadow-md hover:shadow-lg transition-all duration-300
               p-3 gap-2`}
                    >
                        <span className="sm:block hidden text-sm font-medium text-gray-700 dark:text-gray-200">Support</span>
                        <ChevronUp className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>
            )}
        </>
    );
}
