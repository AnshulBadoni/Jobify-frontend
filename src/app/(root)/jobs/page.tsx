import PosterJobs from '@/app/components/jobs/PosterJobs';
import SeekerJobs from '@/app/components/jobs/SeekerJobs';
import jwt from "jsonwebtoken";
import { User } from '@/app/types';
import { cookies } from 'next/headers';
import React from 'react'

const page = async () => {
    const cookieStore = cookies();
    const token = (await cookieStore).get("jwt")?.value as string;
    let user;
    try {
        user = jwt.verify(token, process.env.JWT_SECRET as string) as User;
    } catch (err) {
        return <p>Invalid or expired token</p>;
    }

    return (
        <div>
            {user.role.toLowerCase() == "seeker" && <SeekerJobs />}
            {user.role.toLowerCase() == "poster" && <PosterJobs />}
            {user.role.toLowerCase() == "admin" && <div>Admin Dashboard</div>}s
        </div>
    )
}

export default page