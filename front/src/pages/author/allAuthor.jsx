import AuthorHeads from "./components/headTable"
import { allAuthors } from "../../../requests/author";
import AuthorList from "./components/authorlist"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AllAuthors() {

    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await allAuthors();
                setAuthors(response);
            } catch (error) {
                console.error("Erro ao buscar os livros:", error);
            }
        };

        fetchAuthors();
    }, []);

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
                        <Link to={'/author/new'}>
                            <div className="flex justify-center items-center text-white  bg-amber-600 hover:bg-amber-800 pb-2 ">
                                <h1 className="" >New author</h1>
                            </div>
                        </Link>
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