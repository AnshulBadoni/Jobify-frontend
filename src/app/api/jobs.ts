const API_URL = process.env.NEXT_PUBLIC_API_URL + '/jobs';

export const listJobs = async (page: number = 1, limit: number = 10) => {
    const response = await fetch(`${API_URL}/listJobs?page=${page}&limit=${limit}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    return response.json();
};

export const getJob = async (id?: string) => {
    const response = await fetch(`${API_URL}/profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    return response.json();
}

export const postJob = async (formData: any) => {
    const response = await fetch(`${API_URL}/postJob`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ ...formData }),
    });

    const projectresponse = await fetch(`${API_URL}/projects`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
    return response.json();
};

export const getMyPostedJobs = async () => {
    const response = await fetch(`${API_URL}/my/posted`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    return response.json();
}