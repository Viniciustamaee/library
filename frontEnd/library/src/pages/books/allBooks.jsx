import React, { useEffect, useState } from "react";
import BooksCover from "./components/bookCover";
import axios from "axios";

export default function allBooks() {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`http://localhost:${import.meta.env.VITE_PORT}/Books`);
                setBooks(response.data);
            } catch (error) {
                console.error("Erro ao buscar os livros:", error);
            }
        };

        fetchBooks();
    }, []);


    console.log(books.length)

    return (
        <>

            {books.length == 0 && (
                <div className="h-screen text-xl text-center flex justify-center flex-col">
                    <h1 className="text-4xl">We don't have book yet</h1>
                    <p className="">Wait the admin, insert some books...</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-1 p-5 gap-4">

                {books.map((book) => (
                    <BooksCover
                        key={book.id}
                        className='h-auto max-w-full rounded-lg'
                        title={book.title}
                        img={book.img}
                        id={book.id}
                        quantity={book.quantity_available}
                        description={book.description}
                    />
                ))}
            </div>
        </>
    )
}