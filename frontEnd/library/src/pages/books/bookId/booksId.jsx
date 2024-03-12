import GrupoButton from "../../../components/buttonGruop";
import { Link, useParams } from "react-router-dom";
import Typography from '@mui/material/Typography';
import { useState, useEffect } from "react";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Review from "./reviewCard"
import * as React from 'react';
import axios from "axios";


export default function haha() {
    const adminData = localStorage.getItem('user');
    const adminObject = JSON.parse(adminData);
    const { id } = useParams()

    const [books, setBooks] = useState([]);

    const [formData, setFormData] = useState({
        comment: '',
        rating: '',
        user_id: adminObject.id,
    });

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/Books/${id}`);
                setBooks(response.data[0]);
            } catch (error) {
                console.error("Erro ao buscar os livros:", error);
            }
        };

        fetchBooks();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const hasToken = localStorage.getItem('token');
        try {
            const response = await axios.post(`http://localhost:3000/Review/${id}`, {
                ...formData,
            }, {
                headers: {
                    'Authorization': `Bearer ${hasToken}`,
                },
            });

            console.log(response);

            window.location.href = `/Books/${id}`;

        } catch (error) {
            console.error('Error calling API:', error.message);
        }
    };

    const handleRatingChange = (event, newValue) => {
        setFormData({
            ...formData,
            rating: newValue.toString(),
        });
    };

    const [review, setReview] = useState([]);


    useEffect(() => {
        const fectReview = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/Review/${id}`);
                setReview(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Erro ao buscar os livros:", error);
            }
        };

        fectReview();
    }, []);


    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-2 gap-1">
                < div className="" >
                    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" >
                        <div className="flex justify-center">
                            <img class="rounded-t-lg" src={books.img} alt="" />
                        </div>
                        <div class="p-5">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{books.title}</h5>
                            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{books.description}</p>

                            <GrupoButton
                                id={id}
                                urlLink={`/Books/${id}/edit`}
                                quantity={books.quantity_available}
                            />
                        </div>
                    </div>
                </div >

                <div>
                    <form onSubmit={handleSubmit}>
                        <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">

                            <h5 className="flex justify-center ml-1 text-2xl text-gray-500 dark:text-gray-400 text-black mt-2 mb-2">Comment</h5>

                            <Box
                                sx={{
                                    '& > legend': { mt: 2 },
                                    '.MuiRating-root': { fontSize: '1.5rem', mt: 0.5, ml: 1 },
                                }}
                            >
                                <div className="flex">
                                    <Typography component="legend"
                                        className="text-black text-start  "> <label htmlFor="rating" for='rating' className="text-2xl ml-1"> Rating:</label></Typography>
                                    <div className="flex justify-start">
                                        <Rating
                                            name="simple-controlled"
                                            value={parseInt(formData.rating)}
                                            id="rating"
                                            onChange={handleRatingChange}
                                        />
                                    </div>
                                </div>

                            </Box>
                            <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800 border-t">

                                <label for="comment" class="sr-only" htmlFor="comment">Your comment</label>

                                <textarea
                                    id="comment"
                                    rows="4"
                                    className="w-full px-0 text-sm text-gray-500 bg-gray-100 border-0 focus:ring-0 text-black placeholder-gray-400 rounded-md "
                                    placeholder="Write a comment..."
                                    required
                                    onChange={handleChange}
                                ></textarea>

                            </div>
                            <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600 text-center">
                                <button type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800 w-full" >
                                    <p className="mx-auto">Post comment</p>
                                </button>
                            </div>
                        </div>
                    </form>

                    {review.map((reviews) => (
                        <Review
                            key={reviews.id}
                            id={reviews.user_id}
                            comment={reviews.comment}
                            rating={reviews.rating}
                            idUrl={id}
                            idReview={reviews.id}
                        />
                    ))}
                </div>
            </div >
        </div>
    );
}
