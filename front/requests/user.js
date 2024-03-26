import axios from "axios";

const url = import.meta.env.VITE_URL_API

export const allUsers = async () => {
    try {
        const response = await axios.get(`${url}/User`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const oneUser = async (id) => {
    try {
        const response = await axios.get(`${url}/User/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const insertBook = async (formDataObject) => {
    try {
        const response = await axios.post(`${url}/User/register`, formDataObject);
        return response.data;
    } catch {
        console.log(error)
        throw error;
    }
}

export const login = async (formData, config) => {
    try {
        const response = await axios.post(`${url}/User/login`, formData, config);
        return response.data;
    } catch {
        console.log(error)
        throw error;
    }
}

export const updateUser = async (id, formDataObject) => {
    try {
        const response = await axios.put(`${url}/User/Perfil/${id}/edit`, formDataObject);
        return response.data;
    } catch {
        console.log(error)
        throw error;
    }
}