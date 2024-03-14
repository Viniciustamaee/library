import React, { useEffect, useState } from "react";
import RentsList from './rentsTable/rentsList'
import RentsHead from './rentsTable/rentsHead'
import { useParams } from "react-router-dom";
import { format } from 'date-fns';
import axios from "axios";

export default function Rents() {
    const [rents, setRents] = useState([]);
    const [books, setBooks] = useState([]);
    const [user, setUser] = useState([]);
    const { id } = useParams()

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/Books`);
                setBooks(response.data);
                console.log(response.data)
            } catch (error) {
                console.error("Erro ao buscar os livros:", error);
            }
        };

        fetchBooks();
    }, []);


    useEffect(() => {
        const fetchRents = async () => {
            try {
                const response = await axios.get('http://localhost:3000/User');
                setUser(response.data);
                console.log(response.data)
            } catch (error) {
                console.error("Erro ao buscar os rents:", error);
            }
        };

        fetchRents();
    }, []);

    useEffect(() => {
        const fetchRents = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/Rents/${id}`);
                setRents(response.data);
                console.log(response.data)
            } catch (error) {
                console.error("Erro ao buscar os rents:", error);
            }
        };

        fetchRents();
    }, []);

    function getStandardFormattedDateTime(date = new Date()) {
        return format(date, 'dd-MM-yyyy');
    }

    return (
        <div className="pt-20 flex justify-center content-center " >
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <RentsHead />
                    {rents.map((rents) => (
                        <RentsList
                            key={rents.id}
                            rented_date={getStandardFormattedDateTime(rents.rented_date.slice(0, 10))}
                            due_date={getStandardFormattedDateTime(rents.due_date.slice(0, 10))}
                            user_id={user.find(user => user.id === rents.user_id)?.username || "N/A"}
                            books_id={books.find(book => book.id === rents.book_id)?.title || "N/A"}
                            id={rents.id} />
                    ))}
                </table>
            </div>
        </div>
    )
}
