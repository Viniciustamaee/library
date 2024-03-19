import axios from "axios";

export const allCategories = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_PORT}/Categories`);
        return response.data;
    } catch (error) {
        throw error;
    }
}