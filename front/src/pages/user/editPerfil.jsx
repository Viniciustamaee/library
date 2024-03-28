import { updateUser, oneUser } from '../../../requests/user';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function EditPerfil() {
    const [imageUrl, setImageUrl] = useState('');
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await oneUser(id);
                setUser(response[0]);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, [id]);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageUrl(file);
        }
    };

    const userChange = (e) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value,
        });
    };

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataObject = new FormData();
            formDataObject.append('email', user.email);
            formDataObject.append('username', user.username);
            formDataObject.append('password', user.password);
            formDataObject.append('description', user.description);
            formDataObject.append('img', imageUrl);

            await updateUser(id, formDataObject);
            navigate('/login');
            notifySuccess();
            logout()

        } catch (error) {
            notifyFail();
            console.error('Error calling API:', error.message);
        }
    };

    const notifySuccess = () => {
        toast.success("User edited successfully", {
            position: "bottom-right",
            autoClose: 1000,
        });
    };

    const notifyFail = () => {
        toast.error("There is already a user with that name, please change it", {
            position: "bottom-right",
            autoClose: 1000,
        });
    };

    return (
        <div className="flex items-center justify-center mt-10">
            <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center">Edit Profile</h5>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" id='email'>Email address</label>
                        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900  bg-slate-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required onChange={userChange} value={user.email} disabled />
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
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Edit your picture</label>
                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" onChange={handleFileChange} />
                    </div>
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                    <textarea id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." onChange={userChange} value={user.description} style={{ marginTop: "10px" }}></textarea>
                    <button type="submit" className="w-full text-white bg-amber-600 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit Account</button>
                </form>
            </div>
        </div>
    );
}
