import { Link } from "react-router-dom"; // Certifique-se de ter o React Router configurado para usar o Link


export default function CardBooks({ title, img, id, quantity }) {
    return (
        <Link to={`/Books/${id}`}>
            <a href="#" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 m-3">
                <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={img} alt="" />

                <div class="flex flex-col justify-between p-4 leading-normal">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, veniam, architecto deleniti assumenda debitis quis est sit, culpa dolorem at alias minus? Odio ex, delectus soluta sed distinctio voluptatibus fugiat.</p>
                    <div className="flex">
                        <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-8 py-2.5 text-center me-2 mb-2 mt-5" style={{ width: '150px' }}>More info</button>

                        <h5 className="mb-3 font-normal text-gray-700 dark:text-gray-400 mt-7 ml-10">Quantidade: {quantity}</h5>
                    </div>

                </div>
            </a>
        </Link>
    )
}