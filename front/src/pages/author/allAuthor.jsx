import AuthorHeads from "./components/headTable"
import AuthorList from "./components/authorlist"
import { useState, useEffect } from "react";
import axios from "axios";

export default function AllAuthors() {

    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await axios.get(`http://localhost:${import.meta.env.VITE_PORT}/Authors`);
                setAuthors(response.data);
            } catch (error) {
                console.error("Erro ao buscar os livros:", error);
            }
        };

        fetchAuthors();
    }, []);

    console.log(authors.length)

    return (
        <>
            {authors.length !== 0 ? <div className="mt-20">
                <div className=" flex justify-center content-center " >
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"></table>
                        <AuthorHeads />

                        {authors.map((author) => (
                            <AuthorList
                                key={author.id}
                                nameAuthor={author.name}
                                id={author.id}
                            />
                        ))}
                        <table />
                    </div>
                </div>
            </div> : (
                <div className="mt-20 text-xl text-center flex justify-center flex-col">
                    <h1 className="text-4xl">We don't have Author yet</h1>
                    <p className="">Wait the admin, insert some author...</p>
                </div>
            )}
        </>
    )
}