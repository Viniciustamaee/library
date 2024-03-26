import axios from "axios";
const url = import.meta.env.VITE_URL_API


export const allCategories = async () => {
    try {
        const response = await axios.get(`${url}/Categories`);
        return response.data;
    } catch (error) {
        throw error;
    }
}