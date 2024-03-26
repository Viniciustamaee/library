import axios from "axios";
const url = import.meta.env.VITE_URL_API

export const allRents = async () => {
    try {
        const response = await axios.get(`${url}/Rents`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const rentsDelete = async (id, config) => {
    try {
        const response = await axios.delete(`${url}/Rents/${id}`, config);
        return response.data;
    } catch {
        throw error;
    }
}

export const oneRent = async (id) => {
    try {
        const response = await axios.get(`${url}/Rents/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const insertRent = async (dataForInsert, config) => {
    try {
        const response = axios.post(`${url}/Rents`, dataForInsert, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}