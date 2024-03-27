import axios from "axios";
const url = import.meta.env.VITE_URL_API


export const allBooksCover = async () => {
    try {
        const response = await axios.get(`${url}/Books`);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const oneBook = async (id) => {
    try {
        const response = await axios.get(`${url}/Books/${id}`);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}


export const updateBook = async (id, formDataObject, config) => {
    try {
        const response = await axios.put(`${url}/Books/${id}`, formDataObject, config);
        return response.data;
    } catch {
        console.log(error)
        throw error;
    }
}

export const insertBooks = async (formDataObject, config) => {
    try {
        const response = await axios.post(`${url}/Books`, formDataObject, config);
        return response.data;
    } catch {
        console.log(error)
        throw error;
    }
}

export const deleteBook = async (id, config) => {
    try {
        const response = await axios.delete(`${url}/Books/${id}`, config);
        return response.data;
    } catch {
        throw error;
    }
}

