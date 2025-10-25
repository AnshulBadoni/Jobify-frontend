import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-white text-gray-900">
            <main>{children}</main>
        </div>
    );
}
