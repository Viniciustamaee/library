import React, { useEffect, useState } from "react";
import BooksCover from "./components/bookCover";
import axios from "axios";



export default function allBooks() {

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
    )
}