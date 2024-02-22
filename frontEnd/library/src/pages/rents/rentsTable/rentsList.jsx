export default function rentsList({ rented_date, due_date, user_id, id_book, id }) {
    return (
        <>
            <tbody>

                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center">

                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                        Ainda não tem
                    </th>
                    <td class="px-6 py-4">
                        {rented_date}
                    </td>
                    <td class="px-6 py-4">
                        {due_date}
                    </td>
                    <td class="px-6 py-4">
                        {user_id}
                    </td>

                    <td class="px-6 py-4">
                        {id_book}
                    </td>
                    <td class="px-6 py-4">
                        {id}
                    </td>
                    <td class="px-6 py-4">
                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                </tr>
            </tbody>

        </>
    )
}