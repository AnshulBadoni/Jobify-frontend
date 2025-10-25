"use client";
import React, { useEffect, useState, useRef } from "react";

type Character = {
    id: string;
    name: string;
    description: string;
    system_prompt?: string;
    examples?: { user: string; assistant: string }[];
};

type Message = {
    role: "user" | "assistant";
    content: string;
};

export default function LLMChatUI() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [selectedChar, setSelectedChar] = useState<Character | null>(null);
    const [newChar, setNewChar] = useState({
        name: "",
        description: "",
        system_prompt: "",
        examples: [{ user: "", assistant: "" }],
    });
    const [messages, setMessages] = useState<Message[]>([]);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [input, setInput] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchCharacters();
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const fetchCharacters = async () => {
        try {
            setIsLoading(true);
            const res = await fetch("http://localhost:8000/apifreellm/characters");
            const data = await res.json();
            setCharacters(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const selectCharacter = (char: Character) => {
        setSelectedChar(char);
        setMessages([]);
        setSessionId(null);
    };

    const createCharacter = async () => {
        if (!newChar.name.trim()) return;

        try {
            const payload = {
                name: newChar.name,
                description: newChar.description,
                system_prompt: newChar.system_prompt,
                examples: newChar.examples.filter((ex) => ex.user || ex.assistant),
            };
            const res = await fetch("http://localhost:8000/apifreellm/characters", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const char = await res.json();
            setCharacters((prev) => [...prev, char]);
            setNewChar({ name: "", description: "", system_prompt: "", examples: [{ user: "", assistant: "" }] });
            setIsCreating(false);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteCharacter = async (id: string) => {
        try {
            await fetch(`http://localhost:8000/apifreellm/characters/${id}`, { method: "DELETE" });
            setCharacters((prev) => prev.filter((c) => c.id !== id));
            if (selectedChar?.id === id) {
                setSelectedChar(null);
                setSessionId(null);
                setMessages([]);
            }
            setDeleteConfirm(null);
        } catch (error) {
            console.error(error);
        }
    };

    const sendMessage = async () => {
        if (!selectedChar || !input.trim()) return;

        try {
            const payload = { message: input, session_id: sessionId ?? "", reset_session: false };
            const res = await fetch(`http://localhost:8000/apifreellm/character_chat/${selectedChar.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            setSessionId(data.session_id);
            if (data.status === "success") {
                setMessages((prev) => [...prev, { role: "user", content: input }, { role: "assistant", content: data.response }]);
                setInput("");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex h-[88vh] overflow-hidden gap-2 my-2">
            {/* Sidebar */}
            <div className="w-96 my-2 bg-white shadow-xl flex flex-col border-r border-gray-200 rounded-2xl">
                <div className="p-6 border-b border-gray-200  rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                    <h2 className="text-2xl font-bold">AI Characters</h2>
                    <p className="text-blue-100 text-sm mt-1">Manage your conversation personas</p>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-32">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        </div>
                    ) : (
                        <>
                            {characters.map((char) => (
                                <div
                                    key={char.id}
                                    className={`cursor-pointer p-4 rounded-xl transition-all duration-200 hover:shadow-md border ${selectedChar?.id === char.id
                                        ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300 shadow-sm"
                                        : "border-gray-100 bg-white"
                                        }`}
                                    onClick={() => selectCharacter(char)}
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                                <p className="font-semibold text-gray-800">{char.name}</p>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-2 line-clamp-2">{char.description}</p>
                                        </div>
                                        <button
                                            className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setDeleteConfirm(char.id);
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* Create Character Toggle */}
                            <div className="pt-4">
                                <button
                                    className="w-full py-3 bg-white border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:text-blue-600 hover:border-blue-400 transition-colors flex items-center justify-center gap-2"
                                    onClick={() => setIsCreating(true)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Add New Character
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Chat Window */}
            <div className="flex-1 flex flex-col rounded-2xl">
                {selectedChar ? (
                    <>
                        <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                <div>
                                    <h2 className="font-semibold text-gray-800">{selectedChar.name}</h2>
                                    <p className="text-sm text-gray-500">{selectedChar.description}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-white to-gray-50">
                            {messages.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <div className="mb-4 rounded-full bg-blue-100 p-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-700">Start a conversation with {selectedChar.name}</h3>
                                    <p className="text-gray-500 mt-2 max-w-md">Send a message to begin interacting with your AI character.</p>
                                </div>
                            ) : (
                                messages.map((msg, idx) => (
                                    <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                        <div className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-sm ${msg.role === "user"
                                            ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-none"
                                            : "bg-white border border-gray-200 rounded-bl-none"
                                            }`}>
                                            <div className="text-sm">{msg.content}</div>
                                        </div>
                                    </div>
                                ))
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        <div className="p-4 border-t bg-white border-gray-200">
                            <div className="flex items-center gap-3 max-w-4xl mx-auto">
                                <input
                                    className="flex-1 border border-gray-200 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                                    placeholder="Type your message..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                />
                                <button
                                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full p-3 shadow-md transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={sendMessage}
                                    disabled={!input.trim()}
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-white to-gray-100 p-8">
                        <div className="text-center max-w-md mx-auto">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Character Selected</h2>
                            <p className="text-gray-500 mb-6">Choose a character from the sidebar or create a new one to start chatting.</p>
                            <button
                                onClick={() => setIsCreating(true)}
                                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2 px-6 rounded-full shadow-md transition-all"
                            >
                                Create Character
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Create Character Modal */}
            {isCreating && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-gray-800">Create New Character</h2>
                                <button
                                    onClick={() => setIsCreating(false)}
                                    className="text-gray-400 hover:text-gray-600 rounded-full p-2 hover:bg-gray-100"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                    <input
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Character name"
                                        value={newChar.name}
                                        onChange={(e) => setNewChar({ ...newChar, name: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700
                  mb-2">Description</label>
                                    <input
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Brief description"
                                        value={newChar.description}
                                        onChange={(e) => setNewChar({ ...newChar, description: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">System Prompt</label>
                                <textarea
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Instructions for the character"
                                    rows={4}
                                    value={newChar.system_prompt}
                                    onChange={(e) => setNewChar({ ...newChar, system_prompt: e.target.value })}
                                />
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Examples</label>
                                    <button
                                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                                        onClick={() => setNewChar({ ...newChar, examples: [...newChar.examples, { user: "", assistant: "" }] })}
                                    >
                                        + Add Example
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {newChar.examples.map((ex, idx) => (
                                        <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm font-medium text-gray-700">Example {idx + 1}</span>
                                                {newChar.examples.length > 1 && (
                                                    <button
                                                        className="text-red-500 hover:text-red-700 text-sm"
                                                        onClick={() => {
                                                            const updated = newChar.examples.filter((_, i) => i !== idx);
                                                            setNewChar({ ...newChar, examples: updated });
                                                        }}
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-500 mb-1">User</label>
                                                    <input
                                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        placeholder="User message"
                                                        value={ex.user}
                                                        onChange={(e) => {
                                                            const updated = [...newChar.examples];
                                                            updated[idx].user = e.target.value;
                                                            setNewChar({ ...newChar, examples: updated });
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-500 mb-1">Assistant</label>
                                                    <input
                                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        placeholder="Assistant response"
                                                        value={ex.assistant}
                                                        onChange={(e) => {
                                                            const updated = [...newChar.examples];
                                                            updated[idx].assistant = e.target.value;
                                                            setNewChar({ ...newChar, examples: updated });
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl flex justify-end gap-3">
                            <button
                                className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition-colors"
                                onClick={() => setIsCreating(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={createCharacter}
                                disabled={!newChar.name.trim()}
                            >
                                Create Character
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mt-4">Delete Character</h3>
                            <p className="text-sm text-gray-500 mt-2">Are you sure you want to delete this character? This action cannot be undone.</p>
                        </div>
                        <div className="mt-6 flex gap-3 justify-center">
                            <button
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition-colors"
                                onClick={() => setDeleteConfirm(null)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                                onClick={() => deleteCharacter(deleteConfirm)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
