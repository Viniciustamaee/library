import React, { useEffect, useState } from "react";
import RentsList from './rentsTable/rentsList'
import RentsHead from './rentsTable/rentsHead'
import '../rents/rents.css'
import axios from "axios";

export default function Rents() {

    const [rents, setRents] = useState([]);

    useEffect(() => {
        const fetchRents = async () => {
            try {
                const response = await axios.get('http://localhost:3000/Rents');
                setRents(response.data);
                console.log(response.data)
            } catch (error) {
                console.error("Erro ao buscar os rents:", error);
            }
        };

        fetchRents();
    }, []);


    return (
        <div className="pt-20 flex justify-center content-center " >
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <RentsHead />
                    {rents.map((rents) => (
                        <RentsList
                            key={rents.id}
                            rented_date={rents.rented_date.slice(0, 10)}
                            due_date={rents.due_date.slice(0, 10)}
                            user_id={rents.user_id}
                            books_id={rents.book_id}
                            id={rents.id} />
                    ))}

                </table>


            </div>
        </div>
    )
}
