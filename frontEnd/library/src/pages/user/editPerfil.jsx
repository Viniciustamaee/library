import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

export default function editPerfil() {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        description: ''
    });

    const [imageUrl, setImageUrl] = useState(null);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const { id } = useParams()


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:3000/User/Perfil/${id}/edit`, {
                ...user,
                img: imageUrl
            });
            const data = response.data;
            console.log(data);
            window.location.href = '/User/login';
        } catch (error) {
            console.error('Error calling API:', error.message);
        }
    };

    const [user, setUser] = useState([]);

    const userChange = (e) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value,
        });
    };


    useEffect(() => {
        const fetchUser = async () => {

            try {
                const response = await axios.get('http://localhost:3000/User');
                setUser(response.data[id - 1]);
            } catch (error) {
                console.error("Erro ao buscar os livros:", error);
            }
        };

        fetchUser();
    }, []);
    console.log(user)


    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in Library</h5>
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
                            <input type="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required onChange={userChange} value={user.password} />
                        </div>

                        <div className="">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Choose your profile picture</label>
                            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" required onChange={handleFileChange} />
                        </div>

                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                        <textarea id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." onChange={userChange} value={user.description}></textarea>

                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Account</button>
                    </form>
                </div>
            </div >
        </>
    )
}