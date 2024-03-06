import { useState, useEffect } from "react";
import GrupoButton from "../../components/buttonGruop";
import BooksCover from "../books/components/bookCover"
import axios from "axios";
import { format } from 'date-fns';



export default function Perfil() {

    const adminData = localStorage.getItem('user');
    const adminObject = JSON.parse(adminData);


    const [userData, setUserData] = useState('');

    useEffect(() => {
        const userDataFromStorage = localStorage.getItem('user');

        if (userDataFromStorage) {
            const parsedUserData = JSON.parse(userDataFromStorage);
            setUserData(parsedUserData);
        }
    }, []);

    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:3000/Books');
                setBooks(response.data);
            } catch (error) {
                console.error("Erro ao buscar os livros:", error);
            }
        };

        fetchBooks();
    }, []);


    const [rents, setRents] = useState([]);

    useEffect(() => {
        const fetchRents = async () => {
            try {
                const response = await axios.get('http://localhost:3000/Rents');
                setRents(response.data);
            } catch (error) {
                console.error("Erro ao buscar os rents:", error);
            }
        };

        fetchRents();
    }, []);


    const handDelete = async (id) => {
        const hasToken = localStorage.getItem('token');

        try {
            const response = await axios.delete(`http://localhost:3000/Rents/${id}`, {
                headers: {
                    'Authorization': `Bearer ${hasToken}`,
                },
            });
            console.log(response);
        } catch (error) {
            console.error('Error calling API:', error.message);
        }
    };



    function getStandardFormattedDateTime(date = new Date()) {
        return format(date, 'dd-MM-yyyy');
    }


    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-1 ">
                <div className="">
                    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
                        <img class="rounded-lg" src={userData.img} alt="" />

                        <div class="p-5">
                            <div className="emailAndUsername">
                                <h5 class=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">{userData.username}</h5>
                                <h5 class='text-center mb-5 text-gray-400 dark:text-gray-300'>
                                    {userData.email}
                                </h5>
                            </div>

                            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center mb-5">{userData.description}</p>

                            <GrupoButton
                                urlLink={`/User/Perfil/${adminObject.id}/edit`}
                            />

                        </div>
                    </div>
                </div>

                <div className="">
                    <h1 className="text-center">ALL RENTS</h1>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-1 mt-10">
                        {books.slice(0, 3).map((book) => (
                            <div key={book.id} >
                                <BooksCover
                                    title={book.title}
                                    img={book.img}
                                    id={book.id}
                                    rentDate={getStandardFormattedDateTime(rents[book.id - 1].due_date.slice(0, 10))}
                                    deleteS={() => handDelete(book.id)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div >
        </>
    );
}

