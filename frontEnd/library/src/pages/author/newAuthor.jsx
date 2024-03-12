import { useState } from 'react';
import axios from 'axios';

export default function newAuthor() {

    const [authors, setAuthors] = useState({});


    const handleChange = (e) => {
        setAuthors({
            ...authors,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const hasToken = localStorage.getItem('token');

        try {


            const response = await axios.post('http://localhost:3000/Authors', authors, {
                headers: {
                    'Authorization': `Bearer ${hasToken}`,
                },
            });

            console.log(response);
            window.location.href = '/Author';
        } catch (error) {
            console.error('Error calling API:', error.message);
            if (error.response) {
                console.error('Server response:', error.response.data);
            }
        }
    };
    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center">New author</h5>
                        <div className="mb-6">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New author</label>
                            <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="J. K. Rowling" required onChange={handleChange} />
                        </div>

                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create new Author</button>
                    </form>
                </div>
            </div >
        </>
    )
}