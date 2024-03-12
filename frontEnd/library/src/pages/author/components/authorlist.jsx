import axios from "axios";

export default function authorList({ nameAuthor, id }) {
    console.log('id')
    console.log(id)
    const deleteAuthor = async (e) => {
        e.preventDefault();
        const hasToken = localStorage.getItem('token');

        try {
            const response = await axios.delete(`http://localhost:3000/Authors/${id}`, {
                headers: {
                    'Authorization': `Bearer ${hasToken}`,
                },
            });


            console.log(response);
            window.location.href = '/Author';

        } catch (error) {
            console.error('Error calling API:', error.message);
            if (error.response) {
                console.error('Server response:', error.response.data);
                window.location.href = '/Author';


            }
        }
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
                        <a class="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer" href={`/Author/${id}/edit`} onClick={deleteAuthor}>Delete</a>
                    </td>
                </tr>
            </tbody>

        </>
    )
}