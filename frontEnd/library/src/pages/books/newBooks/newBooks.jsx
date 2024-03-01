import React, { useEffect, useState } from "react";
import { Label, Select } from 'flowbite-react';
import axios from "axios";

export default function newBooks() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3000/Categories');
                setCategories(response.data);
                console.log(response.data)
            } catch (error) {
                console.error("Erro ao buscar os caregorias:", error);
            }
        };

        fetchCategories();
    }, []);


    const [author, setAuthor] = useState([]);

    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                const response = await axios.get('http://localhost:3000/Authors');
                setAuthor(response.data);
                console.log(response.data)
            } catch (error) {
                console.error("Erro ao buscar os caregorias:", error);
            }
        };

        fetchAuthor();
    }, []);



    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">

                <form className="space-y-6" >
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center">Sign in Library</h5>

                    <div className="mb-6">
                        <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title of book</label>
                        <input type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Harry Potter" />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity of stock</label>
                        <input type="number" id="quantity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="20" />
                    </div>

                    <div className="">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Choose the books cover</label>
                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
                    </div>

                    <label htmlFor="description" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Description</label>
                    <textarea id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." style={{ marginTop: "0px" }}></textarea>


                    <div className="max-w-md">
                        <div className="mb-2 block">
                            <Label htmlFor="countries" value="Select the category" />
                        </div>
                        <Select id="countries" required>
                            {categories.map((category) => (
                                <option>{category.category_name}</option>

                            ))}
                        </Select>
                    </div>

                    <div className="max-w-md">
                        <div className="mb-2 block">
                            <Label htmlFor="countries" value="Select the author" />
                        </div>
                        <Select id="countries" required>
                            {author.map((authors) => (
                                <option>{authors.name}</option>

                            ))}
                        </Select>
                    </div>





                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Account</button>

                </form>
            </div>
        </div>
    )
}