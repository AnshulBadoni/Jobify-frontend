// lib/auth/server.ts
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { User, AuthenticationError, Session } from "../../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const TOKEN_COOKIE_NAME = "jwt";
const REFRESH_TOKEN_COOKIE_NAME = "refresh_token";

/**
 * Get current session from cookies
 * Throws AuthenticationError if invalid
 */
async function getSession(): Promise<Session | null> {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(TOKEN_COOKIE_NAME)?.value;

    if (!accessToken) {
        return null;
    }

    // Decode JWT to check expiry (simplified - use jose library in production)
    try {
        const payload = JSON.parse(atob(accessToken.split('.')[1]));
        const expiresAt = payload.exp * 1000;

        // Token expired
        if (Date.now() >= expiresAt) {
            return null;
        }

        return {
            user: payload.user,
            accessToken,
            expiresAt,
        };
    } catch {
        return null;
    }
}

/**
 * Fetch user profile from API
 * Cached per request to prevent multiple calls
 */
async function fetchUserProfile(token: string): Promise<User> {
    const res = await fetch(`${API_URL}/profile/me`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        cache: "no-store", // Always get fresh data
    });

    if (!res.ok) {
        if (res.status === 401) {
            throw new AuthenticationError("UNAUTHORIZED", "Invalid or expired token");
        }
        throw new AuthenticationError("NETWORK_ERROR", "Failed to fetch user profile");
    }

    const data = await res.json();
    return data.data;
}

/**
 * Get current authenticated user
 * Cached per request - call multiple times without performance hit
 */
export const getCurrentUser = cache(async (): Promise<User> => {
    const session = await getSession();

    if (!session) {
        redirect("/signin");
    }

    try {
        const user = await fetchUserProfile(session.accessToken);
        return user;
    } catch (error) {
        if (error instanceof AuthenticationError) {
            // Try to refresh token
            const refreshed = await refreshAccessToken();
            if (refreshed) {
                return getCurrentUser(); // Retry with new token
            }
        }
        redirect("/signin");
    }
});

/**
 * Get user or null (doesn't redirect)
 * Use in layouts or components that work with/without auth
 */
export const getOptionalUser = cache(async (): Promise<User | null> => {
    try {
        return await getCurrentUser();
    } catch {
        return null;
    }
});

/**
 * Refresh access token using refresh token
 */
async function refreshAccessToken(): Promise<boolean> {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE_NAME)?.value;

    if (!refreshToken) {
        return false;
    }

    try {
        const res = await fetch(`${API_URL}/auth/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken }),
        });

        if (!res.ok) {
            return false;
        }

        const data = await res.json();

        // Set new tokens
        cookieStore.set(TOKEN_COOKIE_NAME, data.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: data.expiresIn,
        });

        return true;
    } catch {
        return false;
    }
}

/**
 * Require specific role
 */
export async function requireRole(role: User["role"]) {
    const user = await getCurrentUser();

    if (user.role !== role) {
        redirect("/unauthorized");
    }

    return user;
}

/**
 * Check if user has permission
 */
export async function requirePermission(check: (user: User) => boolean) {
    const user = await getCurrentUser();

    if (!check(user)) {
        redirect("/unauthorized");
    }

    return user;
}