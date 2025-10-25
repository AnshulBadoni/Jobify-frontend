// app/api/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
    const cookie = req.cookies.get("jwt")?.value;
    if (!cookie) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

    try {
        const user = jwt.verify(cookie, process.env.JWT_SECRET);
        return NextResponse.json({ user });
    } catch (err) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
}
