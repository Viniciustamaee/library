import React, { useEffect, useState } from "react";
import { allCategories } from "../../../requests/categories";
import { allAuthors } from "../../../requests/author";
import { insertBooks } from "../../../requests/book";
import { Label, Select } from 'flowbite-react';
import { toast } from 'react-toastify';

export default function newBooks() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [categories, setCategories] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const [authors, setAuthors] = useState([]);

    const [formData, setFormData] = useState({
        title: '',
        quantity_available: '',
        description: '',
        author_id: '',
        category_id: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];

        if (file) {
            setImageUrl(file);
        }
    };


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await allCategories();
                setCategories(response);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);


    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await allAuthors();
                setAuthors(response);
            } catch (error) {
                console.error("Error fetching authors:", error);
            }
        };

        fetchAuthors();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const hasToken = localStorage.getItem('token');

        try {
            setIsSubmitting(true);
            const formDataObject = new FormData();
            formDataObject.append('title', formData.title);
            formDataObject.append('quantity_available', formData.quantity_available);
            formDataObject.append('description', formData.description);
            formDataObject.append('img', imageUrl);

            formDataObject.append('author_id', formData.author_id);
            formDataObject.append('category_id', formData.category_id);


            await insertBooks(formDataObject, {
                headers: {
                    'Authorization': `Bearer ${hasToken}`,
                },
            });
            notifySucess('/Books/allBooks')
        } catch (error) {
            console.error('Error calling API:', error.message);
            setIsSubmitting(true);
            notifyFail('/Books/new')
        }
    };


    const notifySucess = (redirectUrl) => {
        toast.success("Book insert with success", {
            position: "bottom-right",
            autoClose: 1000,
            onClose: () => {
                window.location.href = redirectUrl;
            },
        });
    };

    const notifyFail = (redirectUrl) => {
        toast.error("Something empty", {
            position: "bottom-right",
            autoClose: 1000,
            onClose: () => {
                window.location.href = redirectUrl;
            },
        });

    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center">New Book</h5>

                    <div className="mb-6">
                        <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title of book</label>
                        <input type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Harry Potter" required onChange={handleChange} />
                    </div>


                    <div className="mb-6">
                        <label htmlFor="quantity_available" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity of stock</label>
                        <input type="number" id="quantity_available" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="20" required onChange={handleChange} />
                    </div>

                    <div className="">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Choose the books cover</label>
                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" onChange={handleFileChange} />
                    </div>

                    <label htmlFor="description" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Description</label>
                    <textarea id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." style={{ marginTop: "0px" }} required onChange={handleChange}></textarea>




                    <div className="max-w-md">
                        <div className="mb-2 block">
                            <Label htmlFor="category_id" value="Select the category" />
                        </div>
                        <Select id="category_id" required onChange={handleChange} value={formData.category_id}>
                            <option value="" disabled>Choose the category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.category_name}</option>
                            ))}
                        </Select>

                    </div>

                    <div className="max-w-md">
                        <div className="mb-2 block">
                            <Label htmlFor="author_id" value="Select the author" />
                        </div>
                        <Select id="author_id" required onChange={handleChange} value={formData.author_id}>
                            <option value="" disabled>Choose the author</option>
                            {authors.map((authors) => (
                                <option key={authors.id} value={authors.id} >{authors.name}</option>
                            ))}
                        </Select>
                    </div>

                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={isSubmitting} >Create New Book</button>
                </form>
            </div>
        </div>
    );
}
