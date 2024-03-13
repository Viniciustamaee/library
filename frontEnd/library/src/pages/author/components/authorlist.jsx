import { toast } from 'react-toastify';
import { useState } from 'react';
import axios from "axios";


export default function authorList({ nameAuthor, id }) {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const deleteAuthor = async (e) => {
        e.preventDefault();
        const hasToken = localStorage.getItem('token');

        try {
            const response = await axios.delete(`http://localhost:3000/Authors/${id}`, {
                headers: {
                    'Authorization': `Bearer ${hasToken}`,
                },
            });

            console.log(response)

            setIsSubmitting(true);
            notifySuccess(`/Author`)

        } catch (error) {
            console.error('Error calling API:', error.message);
            setIsSubmitting(true);
            notifyFail(`/Author`);
        }
    };

    const notifySuccess = (redirectUrl) => {
        toast.success("Author insert with Sucess", {
            position: "bottom-right",
            autoClose: 1000,
            onClose: () => {
                window.location.href = redirectUrl;
            },
        });
    };

    const notifyFail = (redirectUrl) => {
        toast.error("Change the name", {
            position: "bottom-right",
            autoClose: 1000,
            onClose: () => {
                window.location.href = redirectUrl;
            },
        });
    };

    return (
        <>
            <tbody>

                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center">

                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                        {nameAuthor}
                    </th>
                    <td class="px-6 py-4">
                        <a class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer" href={`/Author/${id}/edit`}>Edit</a>
                    </td>

                    <td class="px-6 py-4">
                        <a class="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer" onClick={deleteAuthor}>Delete</a>
                    </td>
                </tr>
            </tbody>

        </>
    )
}