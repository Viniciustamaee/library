import { Link } from "react-router-dom";


export default function booksCover({ title, img, id, quantity, rentDate, deleteS }) {
    return (
        <>
            <Link to={`/Books/${id}`}>
                <div className="flex justify-center ">
                    <div class="h-94 w-60 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">

                        <a href="#" className="flex justify-center">
                            <img class="rounded-t-lg  p-2 h-48 md:h-80" src={img} alt="" />
                        </a>
                        <div class="p-4">
                            <h4 className="text-center font-bold">{title}</h4>
                            <a href="#" className="flex justify-evenly">
                                <div className="">
                                    <h3 className="text-center text-gray-500">Status:</h3>
                                    <h5 className={`mb-1 text-lg font-bold tracking-tight ${typeof quantity === 'undefined' ? 'text-blue-500' : (quantity > 0 ? 'text-green-500' : 'text-red-500')} dark:text-white`}>
                                        {typeof quantity === 'undefined' ? "Alugado" : (quantity > 0 ? 'Disponivel' : 'Indisponivel')}
                                    </h5>

                                </div>
                                <div className="">
                                    <h3 className="text-center text-gray-500">{typeof quantity === 'undefined' ? 'Date Rent' : 'Quantity'}</h3>
                                    <h5 class="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white text-center">{typeof quantity === 'undefined' ? rentDate : quantity}</h5>
                                </div>
                            </a>
                        </div>
                        {typeof quantity === 'undefined' ? (<div className="flex justify-center">
                            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={deleteS}>Devolver</button>
                        </div>) : ''}

                    </div>
                </div>
            </Link>
        </>
    )
}