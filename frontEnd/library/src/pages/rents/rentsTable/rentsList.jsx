import axios from "axios";

export default function rentsList({ rented_date, due_date, user_id, books_id, id }) {

    const deleteRents = async (e) => {
        e.preventDefault();
        const hasToken = localStorage.getItem('token');

        try {
            const response = await axios.delete(`http://localhost:3000/Rents/${id}`, {
                headers: {
                    'Authorization': `Bearer ${hasToken}`,
                },
            });


            console.log(response);
            window.location.href = `/Rents/${user_id}`;

        } catch (error) {
            console.error('Error calling API:', error.message);
        }
    };


    return (
        <>
            <tbody>

                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center">

                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                        {user_id}

                    </th>
                    <td class="px-6 py-4">
                        {rented_date}
                    </td>
                    <td class="px-6 py-4">
                        {due_date}
                    </td>
                    <td class="px-6 py-4">
                        {books_id}
                    </td>
                    <td class="px-6 py-4">
                        <a class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer" onClick={deleteRents}>Return</a>
                    </td>
                </tr>
            </tbody>

        </>
    )
}