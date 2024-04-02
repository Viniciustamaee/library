import { allBooksCover } from "../../../requests/book";
import React, { useEffect, useState } from "react";
import { allRents } from "../../../requests/rent";
import { allUsers } from "../../../requests/user";
import RentsList from './rentsTable/rentsList'
import RentsHead from './rentsTable/rentsHead'
import { Pagination } from 'flowbite-react';
import { format } from 'date-fns';

export default function allRentsAdmin() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const User = localStorage.getItem('user');
    const [books, setBooks] = useState([]);
    const [rents, setRents] = useState([]);
    const [user, setUser] = useState([]);

    const onPageChange = (page) => setCurrentPage(page);

    useEffect(() => {
        const fetchRents = async () => {
            try {
                const response = await allRents();
                setRents(response);
                setTotalPages(Math.ceil(response.length / 5));
            } catch (error) {
                console.error("Erro search rents:", error);
            }
        };

        fetchRents();
    }, []);

    useEffect(() => {
        const fetchRents = async () => {
            try {
                const response = await allUsers();
                setUser(response);
            } catch (error) {
                console.error("Erro search users:", error);
            }
        };

        fetchRents();
    }, []);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await allBooksCover();
                setBooks(response);
            } catch (error) {
                console.error("Erro search book:", error);
            }
        };

        fetchBooks();
    }, []);


    function getStandardFormattedDateTime(date = new Date()) {
        return format(date, 'dd-MM-yyyy');
    }

    const indexOfLastAuthor = currentPage * 5;
    const indexOfFirstAuthor = indexOfLastAuthor - 5;
    const currentRents = rents.slice(indexOfFirstAuthor, indexOfLastAuthor);
    return (
        <>
            <div className="flex items-center justify-center mt-20" >
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <RentsHead />
                        {currentRents.map((rents) => (
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
            <div className="flex justify-center mt-4">
                <Pagination
                    layout="pagination"
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                    previousLabel="Back"
                    nextLabel="Next"
                    showIcons
                />
            </div>
        </>
    )
}
