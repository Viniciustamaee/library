import axios from "axios";
const url = import.meta.env.VITE_URL_API


export const allAuthors = async () => {
    try {
        const response = await axios.get(`${url}/Authors`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteAuhtor = async (id, config) => {
    try {
        const response = await axios.delete(`${url}/Authors/${id}`, config);
        return response.data;
    } catch {
        throw error;
    }
}

export const oneAuthor = async (id) => {
    try {
        const response = await axios.get(`${url}/Authors/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateAuthor = async (id, authors, config) => {
    try {
        const response = await axios.put(`${url}/Authors/${id}`, authors, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const insertAuthor = async (authors, config) => {
    try {
        const response = await axios.post(`${url}/Authors`, authors, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}