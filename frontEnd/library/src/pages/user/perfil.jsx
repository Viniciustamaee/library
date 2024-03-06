import { useState, useEffect } from "react";
import GrupoButton from "../../components/buttonGruop";


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



    return (
        <>
            <div className="pt-20 flex justify-center	">
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

        </>
    );
}

