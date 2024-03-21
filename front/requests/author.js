import axios from "axios";

export const allAuthors = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_PORT}/Authors`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteAuhtor = async (id, config) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_PORT}/Authors/${id}`, config);
        return response.data;
    } catch {
        throw error;
    }
}

export const oneAuthor = async (id) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_PORT}/Authors/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateAuthor = async (id, authors, config) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_PORT}/Authors/${id}`, authors, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const insertAuthor = async (authors, config) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_PORT}/Authors`, authors, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}