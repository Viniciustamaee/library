import apiFecth from "../axios/apiAxios";

export const allUsers = async () => {
    try {
        const response = await apiFecth.get(`/User`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const oneUser = async (id) => {
    try {
        const response = await apiFecth.get(`/User/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const insertBook = async (formDataObject) => {
    try {
        const response = await apiFecth.post(`/User/register`, formDataObject);
        return response.data;
    } catch {
        console.log(error)
        throw error;
    }
}

export const login = async (formData, config) => {
    try {
        const response = await apiFecth.post(`/User/login`, formData, config);
        return response.data;
    } catch {
        console.log(error)
        throw error;
    }
}

export const updateUser = async (id, formDataObject) => {
    try {
        const response = await apiFecth.put(`/User/Perfil/${id}/edit`, formDataObject);
        return response.data;
    } catch {
        console.log(error)
        throw error;
    }
}