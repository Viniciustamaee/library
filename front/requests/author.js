import axios from "axios";

export const allAuthors = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_PORT}/Authors`);
        return response.data;
    } catch (error) {
        throw error;
    }
}