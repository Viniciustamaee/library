import { Link } from "react-router-dom";


export default function booksCover({ title, img, id, quantity, bookId, rentId }) {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const hasToken = localStorage.getItem('token');

        try {
            const response = await axios.delete(`http://localhost:3000/Rents/${rentId}`, {
                headers: {
                    'Authorization': `Bearer ${hasToken}`,
                },
            });


            console.log(response);
            // window.location.href = `/Books/${idUrl}`;

        } catch (error) {
            console.error('Error calling API:', error.message);
        }
    };


    return (
        <>

            <Link to={`/Books/${id}`}>
                <div className="flex justify-center ">
                    <div class="h-94 w-60 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">

                        <a href="#" className="flex justify-center">
                            <img className="rounded-t-lg p-2 h-48 md:h-80" src={books && books.img ? books.img : (img === 'undefined' ? defaultImage : img)} alt="" />
                        </a>
                        <div class="p-4">
                            <h4 className="text-center font-bold">{title}</h4>
                            <a href="#" className="flex justify-evenly">
                                <div className="">
                                    <h3 className="text-center text-gray-500">Status:</h3>
                                    <h5 className={`mb-1 text-lg font-bold tracking-tight ${(quantity > 0 ? 'text-green-500' : 'text-red-500')} dark:text-white`}>
                                        {quantity > 0 ? 'Disponivel' : 'Indisponivel'}
                                    </h5>
                                </div>
                                <div className="">
                                    <h3 className="text-center text-gray-500">{typeof quantity === 'undefined' ? '' : 'Quantity'}</h3>
                                    <h5 class="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white text-center">{typeof quantity === 'undefined' ? '' : quantity}</h5>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}