import { cookies } from "next/headers";
import ChatSupport from "../components/ChatSupport";
import { ToastProvider } from "../context/toastContext";
import { redirect } from "next/navigation";
import Navbar from "./components/Navbar";

export default async function LandingLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies(); // ✅ await here
    const token = cookieStore.get("jwt")?.value;

    // If no token, render public version
    // if (!token) {
    //   redirect("/signin");
    // }

    // Token exists, fetch user data server-side
    let user = null;
    // const url = process.env.API_URL
    const url = "http://192.168.5.148:3001";
    try {
        const res = await fetch(`${url}/profile/getMe`, {
            headers: { cookie: `jwt=${token}` },
        });
        if (res.ok) {
            const data = await res.json();
            user = data?.data; // adjust according to your backend response structure
        }
    } catch (err) {
        console.error("Error fetching user:", err);
    }

    return (
        <div className="text-gray-900">
            <main>
                <Navbar />
                <div className="px-2">
                    <ToastProvider>
                        <div className="lg:mb-2 mb-16 mt-2">{children}</div>
                        <ChatSupport />
                    </ToastProvider>
                </div>
            </main>
        </div>
    );
}
