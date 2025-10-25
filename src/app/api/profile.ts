// const api = "http://192.168.5.148:3001/profile";
const api = "http://192.168.29.48:3001/profile";

export const getMe = async () => {
    const response = await fetch(`${api}/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    return response.json();
};

export const getProfile = async (id?: string) => {
    const response = await fetch(`${api}/profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    return response.json();
}


export const getSummary = async (usernames: string) => {
    const response = await fetch(`${api}/summary`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ usernames }),
    });
    return response.json();
};

export const updateProfile = async (formData: any) => {
    //destructure the formData
    const { fullName, email, avatar, bio, skills, experience } = formData;
    const response = await fetch(`${api}/profile`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ fullName, email, avatar, bio, skills, experience }),
    });

    const projectresponse = await fetch(`${api}/projects`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
    return response.json();
};