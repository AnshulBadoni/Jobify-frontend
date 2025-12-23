import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export function cryptoId() {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
    return Math.random().toString(36).slice(2);
}
