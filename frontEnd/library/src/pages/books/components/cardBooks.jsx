import { Link } from "react-router-dom";


export default function CardBooks({ title, img, id, quantity, description }) {
    return (
        <Link to={`/Books/${id}`}>
            <a href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 m-3">
                <img className="object-cover w-full rounded-t-lg h-48 md:h-80 md:w-48 md:rounded-none md:rounded-s-lg" src={img} alt="" />

                <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
                    <div className="flex ">
                        <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-5 " style={{ height: '50px' }}>More info</button>
                        <h5 className="mb-3 font-normal text-gray-700 dark:text-gray-400 mt-7 ml-2">Quantidade: {quantity}</h5>
                    </div>
                </div>
            </a>

        </Link>
    )
}