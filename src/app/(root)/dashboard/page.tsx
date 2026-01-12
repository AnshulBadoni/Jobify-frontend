import Poster from "@/app/components/dashboard/Poster";
import Seeker from "@/app/components/dashboard/Seeker";
import { cookies } from "next/headers";

export default async function Page() {
    const cookieHeader = cookies().toString();
    const res = await fetch("https://jobify-backend-pgum.onrender.com/profile/me", {
        headers: {
            Cookie: cookieHeader,
        },
        cache: "no-store",
    });
    if (!res.ok) return <p>Unauthorized</p>;

    const user = await res.json();
    const { role } = user.data;
    if (role === "SEEKER") return <Seeker />;
    if (role === "POSTER") return <Poster />;
    if (role === "ADMIN") return <div>Admin Dashboard</div>;
}
