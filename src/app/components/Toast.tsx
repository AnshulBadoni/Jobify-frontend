"use client";
import React from "react";
import { ToastData } from "../hooks/useToast";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

interface ToastContainerProps {
    toasts: ToastData[];
    removeToast: (id: number) => void;
}

export const ToastContainer = ({ toasts, removeToast }: ToastContainerProps) => {
    const getTypeStyles = (type: string | undefined) => {
        switch (type) {
            case "success":
                return {
                    text: "text-green-600 dark:text-green-400",
                    icon: <CheckCircle className="w-5 h-5" />,
                    accent: "bg-green-500"
                };
            case "error":
                return {
                    text: "text-red-600 dark:text-red-400",
                    icon: <AlertCircle className="w-5 h-5" />,
                    accent: "bg-red-500"
                };
            case "info":
            default:
                return {
                    text: "text-blue-600 dark:text-blue-400",
                    icon: <Info className="w-5 h-5" />,
                    accent: "bg-blue-500"
                };
        }
    };

    return (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-50">
            {toasts.map((toast) => {
                const styles = getTypeStyles(toast.type);
                return (
                    <div
                        key={toast.id}
                        className="flex items-center justify-between max-w-xl w-[90vw] bg-white/80 dark:bg-neutral-950 backdrop-blur-md border border-gray-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 animate-slideUp"
                    >
                        {/* Left Accent Bar */}
                        <div className={`${styles.accent} w-1 h-full`} />

                        <div className="flex items-center gap-3 p-4 flex-1">
                            {React.cloneElement(styles.icon, { className: styles.text })}
                            <p className={`font-medium ${styles.text}`}>{toast.message}</p>
                        </div>

                        <button
                            onClick={() => removeToast(toast.id)}
                            className="ml-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition p-4"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                );
            })}
        </div>
    );
};
