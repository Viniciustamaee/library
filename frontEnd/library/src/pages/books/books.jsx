import React, { useEffect, useState } from "react";
import axios from "axios";
import CardBooks from "./cardBooks";
import "../books/books.css";

export default function Allbooks() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:3000/Books');
                setBooks(response.data);
                console.log(response.data)
            } catch (error) {
                console.error("Erro ao buscar os livros:", error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <>
            <div className="flex pt-20 ">
                <h1 className="ml-5 mr-5">Ação</h1>
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Read more</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                {books.map((book) => (
                    <CardBooks
                        key={book.id}
                        className='h-auto max-w-full rounded-lg'
                        title={book.title}
                        img={book.img}
                        id={book.id}
                        quantity={book.quantity_available}
                    />
                ))}
            </div>


        </>
    )
}
