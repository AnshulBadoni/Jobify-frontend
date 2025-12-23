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
        user = jwt.verify(token, process.env.JWT_SECRET as string) as User;
    } catch (err) {
        return <p>Invalid or expired token</p>;
    }

    return (
        <>
            {user.role.toLowerCase() == "seeker" && <Seeker />}
            {user.role.toLowerCase() == "poster" && <Poster />}
            {user.role.toLowerCase() == "admin" && <div>Admin Dashboard</div>}
        </>
    );
}
