"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

export type ToastType = "success" | "error" | "info";

export interface ToastData {
    id: number;
    message: string;
    type?: ToastType;
}

interface ToastContextProps {
    addToast: (message: string, type?: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error("useToast must be used within ToastProvider");
    return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastData[]>([]);

    const addToast = useCallback((message: string, type: ToastType = "success", duration = 3000) => {
        const id = Date.now() + Math.floor(Math.random() * 1000);
        const newToast: ToastData = { id, message, type };
        setToasts((prev) => [...prev, newToast]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
    }, []);

    const removeToast = useCallback((id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            {/* Global Toast Container */}
            <div className="fixed bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-50">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className="flex items-center justify-between max-w-xl w-[90vw] bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-gray-200 dark:border-neutral-800 rounded-2xl p-4 shadow-lg animate-slideUp"
                    >
                        <p className="text-gray-900 dark:text-white">{toast.message}</p>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="ml-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
