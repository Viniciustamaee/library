import axios from "axios";
const url = import.meta.env.VITE_URL_API


export const insertReview = async (id, formData, config) => {
    try {
        const response = await axios.post(`${url}/Review/${id}`, formData, config);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const allReview = async (id) => {
    try {
        const response = await axios.get(`${url}/Review/${id}`);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const deleteReview = async (idUrl, idReview) => {
    try {
        const response = axios.delete(`${url}/Review/${idUrl}/${idReview}`);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}


