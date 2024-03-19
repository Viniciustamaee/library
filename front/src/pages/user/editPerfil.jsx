import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function editPerfil() {
    const [imageUrl, setImageUrl] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { id } = useParams()

    const handleFileChange = async (e) => {
        const file = e.target.files[0];

        if (file) {
            setImageUrl(file);
        }
    };

    function clear() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/User/Login';
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsSubmitting(true);
            const formDataObject = new FormData();
            formDataObject.append('email', user.email);
            formDataObject.append('username', user.username);
            formDataObject.append('password', user.password);
            formDataObject.append('img', imageUrl);
            formDataObject.append('description', user.description);

            const response = await axios.put(`${import.meta.env.VITE_PORT}/User/Perfil/${id}/edit`, formDataObject, {});

            notifySucess(`/User/perfil/${id}`);


        } catch (error) {
            console.error('Error calling API:', error.message);
            setIsSubmitting(true);
            notifyFail(`/User/Perfil/${id}/edit`)
        }
    };

    const [user, setUser] = useState({});

    const userChange = (e) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value,
        });
    };


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_PORT}/User/${id}`);
                setUser(response.data[0]);

            } catch (error) {
                console.error("Error fetching user:", error);

            }
        };

        fetchUser();
    }, [id]);

    const notifySucess = () => {
        toast.success("User edit", {
            position: "bottom-right",
            autoClose: 1000,
            onClose: () => {
                clear()
            },
        });
    };

    const notifyFail = (redirectUrl) => {
        toast.error("Error to edit", {
            position: "bottom-right",
            autoClose: 1000,
            onClose: () => {
                window.location.href = redirectUrl;
            },
        });

    };


    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center">Edit Perfil</h5>
                        <div className="mb-6">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required onChange={userChange} value={user.email} />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
                            <input type="text" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Admin" required onChange={userChange} value={user.username} />
                        </div>

                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                            <input type="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required onChange={userChange} />
                        </div>

                        <div className="">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">
                                Choose your profile picture
                            </label>
                            <input
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                id="file_input"
                                type="file"
                                required
                                onChange={handleFileChange}
                            />


                        </div>

                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                        <textarea id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." onChange={userChange} value={user.description} style={{ marginTop: "10px" }}></textarea>

                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={isSubmitting}>Edit Account</button>
                    </form>
                </div>
            </div >
        </>
    )
}