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
            <div className="xl:container mx-auto px-1">
                <div className="flex text-center justify-center ">
                    <h1 className="ml-5 mr-5 text-3xl">Famous Books</h1>
                </div>
                <div className="flex justify-center">
                    <div className="grid md:grid-cols-1 xl:grid-cols-3 gap-1 ">
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
                </div>


                <div className="flex justify-center mt-10">
                    <div className="flex gap-10 w-4/6 items-center grid grid-cols-1 md:grid-cols-2">
                        <div className="">
                            <h1 className="text-center mt-5 text-5xl mb-5">About the library</h1>
                            <p className="text-start tracking-wider sm:text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore suscipit provident quam, at harum porro eum. Dicta ratione pariatur fugiat, eaque, fuga suscipit voluptas natus animi laboriosam ullam voluptates tenetur!
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, placeat eius. Alias corrupti cupiditate eveniet porro, voluptatum cumque labore unde delectus molestiae eaque. Facere doloribus debitis assumenda aperiam quae asperiores!
                            </p>
                        </div>
                        <img src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="h-64 rounded-lg sm:h-auto" />

                    </div>
                </div>





                <div id="background" className="mt-10 flex justify-around items-center grid grid-cols-1 md:grid-cols-3 text-center">
                    <div id="text">
                        <h1 className="text-center text-3xl">Data of Library</h1>
                        <p className="p-5">Alguns dados sobre a LIBRARY, aqui podemos ver quantidades de usuários, e a quantidade e livros que o nosso site apresenta.</p>
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

            </div>
        </>
    )
}
