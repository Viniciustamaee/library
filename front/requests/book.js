import axios from "axios";

export const allBooksCover = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_PORT}/Books`);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const oneBook = async (id) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_PORT}/Books/${id}`);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}


export const updateBook = async (id, formDataObject, config) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_PORT}/Books/${id}`, formDataObject, config);
        return response.data;
    } catch {
        console.log(error)
        throw error;
    }
}

export const insertBooks = async (formDataObject, config) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_PORT}/Books`, formDataObject, config);
        return response.data;
    } catch {
        console.log(error)
        throw error;
    }
}

export const deleteBook = async (id, config) => {
    try {
        const response = await axios.delete(`http://localhost:3000/Books/${id}`, config);
        return response.data;
    } catch {
        throw error;
    }
}

