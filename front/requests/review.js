import axios from "axios";

export const insertReview = async (id, formData, config) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_PORT}/Review/${id}`, formData, config);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const allReview = async (id) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_PORT}/Review/${id}`);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const deleteReview = async (idUrl, idReview) => {
    try {
        const response = axios.delete(`${import.meta.env.VITE_PORT}/Review/${idUrl}/${idReview}`);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}


