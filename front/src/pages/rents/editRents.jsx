import { useParams, useNavigate } from "react-router-dom";
import { updateRents, dataOneRent } from '../../../requests/rent';
import { oneBook } from "../../../requests/book";
import { oneUser } from "../../../requests/user";
import { useState, useEffect } from 'react';
import { Datepicker } from "flowbite-react";

export default function EditRent() {
    const { id } = useParams();
    const [rent, setRent] = useState({ due_date: '' });
    const [book, setBook] = useState({ title: '' });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchRent = async () => {
            try {
                const response = await dataOneRent(id);
                setRent(response[0] ?? {});
                if (response.length > 0) {
                    const bookResponse = await oneBook(response[0].book_id);
                    setBook(bookResponse[0] ?? {});
                }
            } catch (error) {
                console.error("Error fetching rent data:", error);
            }
        };

        if (id) {
            fetchRent();
        }
    }, [id]);

    const handleBookChange = (e) => {
        console.log(e.target.value)
        setBook({
            ...book,
            [e.target.name]: e.target.value,
        });
    };

    const handleRentChange = (e) => {
        setRent({
            ...rent,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateRents(id, rent);
            navigate('/');
        } catch (error) {
            console.error('Error updating rent:', error);
        }
    };

    return (

        <div className="flex items-center justify-center mt-10">
            <form onSubmit={handleSubmit} className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center">Edit rents</h5>
                <div className="mb-6">
                    <label htmlFor="book_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Book Title</label>
                    <input
                        type="text"
                        id="book_id"
                        name="book_id"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        // value={book.title}
                        onChange={handleBookChange}
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="due_date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Due date</label>
                    <Datepicker
                        id="due_date"
                        name="due_date"
                        value={rent.due_date?.slice(0, 10)}
                        onChange={handleRentChange}
                    />
                </div>

                <button type="submit" className="w-full text-white bg-amber-600 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit rents</button>
            </form>
        </div>);
}