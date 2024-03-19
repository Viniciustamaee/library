import axios from "axios";

export const allRents = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_PORT}/Rents`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const rentsDelete = async (id, config) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_PORT}/Rents/${id}`, config);
        return response.data;
    } catch {
        throw error;
    }
}

export const oneRent = async (id) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_PORT}/Rents/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// export const updateAuthor = async (id, authors, config) => {
//     try {
//         const response = axios.put(`${import.meta.env.VITE_PORT}/Authors/${id}`, authors, config);
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// }


export const insertRent = async (dataForInsert, config) => {
    try {
        const response = axios.post('http://localhost:3000/Rents', dataForInsert, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}