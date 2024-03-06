import { Link, useParams } from "react-router-dom";
import Typography from '@mui/material/Typography';
import { useState, useEffect } from "react";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import * as React from 'react';
import axios from "axios";
import GrupoButton from "../../../components/buttonGruop";


export default function haha() {
    const { id } = useParams()

    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:3000/Books');
                setBooks(response.data[id - 1]);
                console.log(setBooks)
            } catch (error) {
                console.error("Erro ao buscar os livros:", error);
            }
        };

        fetchBooks();
    }, []);


    const [value, setValue] = React.useState(2);

    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-2 gap-1 ">
                < div className="" >
                    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#" className="flex justify-center">
                            <img class="rounded-t-lg" src={books.img} alt="" />
                        </a>
                        <div class="p-5">
                            <a href="#">
                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{books.title}</h5>
                            </a>
                            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{books.description}</p>

                            <GrupoButton
                                id={id}
                                urlLink={`/Books/${id}/edit`}
                                quantity={books.quantity_available}
                            />

                        </div>
                    </div>
                </div >

                <div className="">
                    <form>
                        <Box
                            sx={{
                                '& > legend': { mt: 2 },
                            }}
                        >
                            <Typography component="legend" className="text-white">Rating</Typography>
                            <Rating
                                name="simple-controlled"
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                            />

                        </Box>

                        <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                            <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                <label for="comment" class="sr-only">Your comment</label>
                                <textarea id="comment" rows="4" class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required></textarea>
                            </div>
                            <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                                <button type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                    Post comment
                                </button>
                                <div class="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                                </div>
                            </div>
                        </div>
                        <p class="ms-auto text-xs text-gray-500 dark:text-gray-400">Remember, contributions to this topic should follow our <a href="#" class="text-blue-600 dark:text-blue-500 hover:underline">Community Guidelines</a>.</p>
                    </form>
                </div>
            </div >
        </div>
    );
}
