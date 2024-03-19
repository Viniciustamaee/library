import axios from "axios";

export const allUsers = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_PORT}/User`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

