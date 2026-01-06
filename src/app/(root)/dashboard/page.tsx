import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Poster from "@/app/components/dashboard/Poster";
import Seeker from "@/app/components/dashboard/Seeker";
import { User } from "@/app/types";

export default async function Page() {
    const cookieStore = cookies();
    const token = (await cookieStore).get("jwt")?.value as string;
    let user;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        console.log(decoded);
        user = decoded as User;
    } catch (err) {
        console.error("JWT ERROR:", err);
        throw err;
    }

    return (
        <>
            {user.role.toLowerCase() == "seeker" && <Seeker />}
            {user.role.toLowerCase() == "poster" && <Poster />}
            {user.role.toLowerCase() == "admin" && <div>Admin Dashboard</div>}
        </>
    );
}
