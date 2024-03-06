import { Link } from "react-router-dom"
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

export default function GrupoButton({ urlLink, quantity }) {
    const adminData = localStorage.getItem('user');
    const adminObject = JSON.parse(adminData);


    // Rent
    const { id } = useParams();

    const [userData, setUserData] = useState('');
    const [todayDate, setTodayDate] = useState(new Date());

    const [rentedDate, setRentedDate] = useState('');
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        const userDataFromStorage = localStorage.getItem('user');

        if (userDataFromStorage) {
            const parsedUserData = JSON.parse(userDataFromStorage);
            setUserData(parsedUserData);
        }

        setRentedDate(todayDate.toISOString().split('T')[0]);
        const dateFuture = tenDays();
        setDueDate(dateFuture.toISOString().split('T')[0]);
    }, [todayDate]);

    const tenDays = () => {
        const dateFuture = new Date(todayDate);
        dateFuture.setDate(dateFuture.getDate() + 20);
        return dateFuture;
    };

    const dadosParaInserir = {
        rented_date: rentedDate,
        due_date: dueDate,
        user_id: userData.id,
        book_id: id
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const hasToken = localStorage.getItem('token');

        try {
            const response = await axios.post('http://localhost:3000/Rents', dadosParaInserir, {
                withCredentials: true,
            }, {
                headers: {
                    'Authorization': `Bearer ${hasToken}`,
                },
            });
            console.log(response);
            window.location.href = '/Rents';

        } catch (error) {
            console.error('Error calling API:', error.message);
        }
    };

    return (
        <>
            <div className="flex justify-center">
                <div class="inline-flex rounded-md shadow-lg flex" role="group">
                    <Link to={`${urlLink}`}>

                        <button type="button" class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-400 rounded-s-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="square" stroke-linejoin="round" stroke-width="2" d="M7 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h1m4-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm7.4 1.6a2 2 0 0 1 0 2.7l-6 6-3.4.7.7-3.4 6-6a2 2 0 0 1 2.7 0Z" />
                            </svg>
                            Edit
                        </button>
                    </Link>

                    <button
                        type="button"
                        class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-r border-gray-400 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                        onClick={quantity === 0 ? null : handleSubmit}
                        disabled={quantity === 0}
                    >
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19V4c0-.6.4-1 1-1h12c.6 0 1 .4 1 1v13H7a2 2 0 0 0-2 2Zm0 0c0 1.1.9 2 2 2h12M9 3v14m7 0v4" />
                        </svg>
                        Rents
                    </button>

                    {adminObject.admin == '0' && <button type="button" class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border  border-gray-400 rounded-e-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                        </svg>
                        Delete
                    </button>}
                </div>
            </div>
        </>
    )
}