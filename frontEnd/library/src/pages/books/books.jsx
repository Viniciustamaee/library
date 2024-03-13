import React, { useEffect, useState } from "react";
import BooksCover from "./components/bookCover";
import CardBooks from "./components/cardBooks";
import "../books/books.css";
import axios from "axios";

export default function Allbooks() {
    const adminData = localStorage.getItem('user');
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


    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:3000/User');
                setUser(response.data);
                console.log(response.data)
            } catch (error) {
                console.error("Erro ao buscar os livros:", error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <>
            <div className="container mx-auto px-1">
                <div className="flex text-center justify-center ">
                    <h1 className="ml-5 mr-5 text-3xl">Famous Books</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                    {books.slice(0, 3).map((book) => (
                        <CardBooks
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

                <div className="flex pt-10 text-center	justify-center ">
                    <h1 className="ml-5 mr-5 text-3xl mb-2">Books</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-1 flex justify-center ">
                    {books.slice(3, 7).map((book) => (
                        <BooksCover
                            key={book.id}
                            className='h-auto max-w-full rounded-lg'
                            title={book.title}
                            img={book.img}
                            id={book.id}
                            quantity={book.quantity_available}

                        />

                    ))}
                </div>



                <div id="background" className="mt-10  flex justify-around items-center">
                    <div id="text">
                        <h1 className="text-center mb-2 mr-5 text-3xl ">Data of Library</h1>
                        <p className="text-start">Alguns dados sobre a LIBRARY, aqui podemos ver quantidades de usuários, e a quantidade e livros que o nosso site apresenta.</p>
                    </div>
                    <div id="dadeUser">
                        <h1 className="mr-5 text-3xl mb-2">Quantidades de User</h1>
                        <h2 className="text-center">{user.length}</h2>
                    </div>

                    <div id="dadeBooks">
                        <h1 className="mr-5 text-3xl mb-2">Quantidade de books</h1>
                        <h2 className="text-center">{books.length}</h2>
                    </div>
                </div>
            </div>
        </>
    )
}
