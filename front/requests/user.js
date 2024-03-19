import axios from "axios";

export const allUsers = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_PORT}/User`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const oneUser = async (id) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_PORT}/User/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const insertBook = async (formDataObject) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_PORT}/User/register`, formDataObject);
        return response.data;
    } catch {
        console.log(error)
        throw error;
    }
}

export const login = async (formData, config) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_PORT}/User/login`, formData, config);
        return response.data;
    } catch {
        console.log(error)
        throw error;
    }
}

export const updateUser = async (id, formDataObject) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_PORT}/User/Perfil/${id}/edit`, formDataObject);
        return response.data;
    } catch {
        console.log(error)
        throw error;
    }
}