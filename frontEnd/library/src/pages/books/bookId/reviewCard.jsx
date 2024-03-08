import React, { useEffect, useState } from "react";
import axios from "axios";



export default function Review({ comment, rating, username, id }) {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/User');
                const filteredUsers = response.data.filter(user => user.id === id);
                setUsers(filteredUsers);
                console.log('sla');
                console.log(filteredUsers);
            } catch (error) {
                console.error("Erro ao buscar os usuários:", error);
            }
        };

        fetchUsers();
    }, [id]);





    const Stars = ({ rating }) => {
        const stars = [];

        for (let i = 1; i <= 5; i++) {
            const isFilled = i <= rating;

            stars.push(
                <svg
                    key={i}
                    className={`w-4 h-4 ${isFilled ? 'text-yellow-300' : 'text-gray-300'}`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
            );
        }

        return <div className="flex">{stars}</div>;




    }
    return (
        <>
            <article className="max-w-md bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2">

                <div class="flex justify-between m-3">
                    <div className="flex items-center mb-4 ">

                        {users.map((user) => (
                            <>
                                <img class="w-10 h-10 me-4 rounded-full" src={user.img} alt="" />
                                <div class="font-medium dark:text-white">
                                    <p className="text-black">{user.username}<time datetime="2014-08-16 19:00" class="block text-sm text-gray-500 dark:text-gray-400">{user.email}</time></p>
                                </div>
                            </>
                        ))}



                    </div>

                    <div class="flex items-center mb-1 space-x-1 rtl:space-x-reverse ">
                        <Stars rating={rating} className='' />
                    </div>
                </div>

                <p class="mb-2 text-gray-500 dark:text-gray-400 text-sm m-3 text-black">{comment}</p>
            </article>

        </>
    )
}

