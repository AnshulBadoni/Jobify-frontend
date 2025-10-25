// const API_URL = 'http://192.168.5.148:3001/auth';
const API_URL = 'http://192.168.29.48:3001/auth';

interface User {
    username: string;
    email: string;
    role: string;
    avatar?: string;
    password: string;
}

export const signin = async ({ email, password }: { email: string, password: string }) => {
    const response = await fetch(`${API_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
    });
    return response.json();
}

export const signup = async (formData: User) => {
    const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            role: formData.role,
            avatar: formData.avatar,
            password: formData.password,
        }),
    });
    return response.json();
}

export const Logout = async () => {
    const response = await fetch(`${API_URL}/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    return response.json();
}