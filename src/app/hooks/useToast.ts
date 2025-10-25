"use client";
import { useState, useCallback } from "react";

// Toast type
export type ToastType = "success" | "error" | "info";

export interface ToastData {
    id: number;
    message: string;
    type?: ToastType;
}

// Hook
export const useToast = () => {
    const [toasts, setToasts] = useState<ToastData[]>([]);

    // Add a new toast
    const addToast = useCallback((message: string, type: ToastType = "success", duration = 3000) => {
        const id = Date.now() + Math.floor(Math.random() * 1000); // unique id
        const newToast: ToastData = { id, message, type };
        setToasts((prev) => [...prev, newToast]);

        // Auto-remove after duration
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
    }, []);

    // Remove a toast manually
    const removeToast = useCallback((id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return { toasts, addToast, removeToast };
};
