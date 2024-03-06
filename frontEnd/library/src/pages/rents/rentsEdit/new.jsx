import { Datepicker, Card, Label, Select, Button } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from "axios";

export default function Edit() {

    const { id } = useParams()

    const [userData, setUserData] = useState('');


    useEffect(() => {
        const userDataFromStorage = localStorage.getItem('user');

        if (userDataFromStorage) {
            const parsedUserData = JSON.parse(userDataFromStorage);
            setUserData(parsedUserData);
        }
    }, []);


    const [dataAtual, setDataAtual] = useState(new Date());

    const obterData10DiasDepois = () => {
        const dataFutura = new Date(dataAtual);
        dataFutura.setDate(dataFutura.getDate() + 10);
        return dataFutura;
    };

    const hoje = dataAtual.toLocaleDateString('pt-BR');
    const data10DiasDepois = obterData10DiasDepois().toLocaleDateString('pt-BR');


    const dadosParaInserir = {
        rented_date: hoje,
        due_date: data10DiasDepois,
        user_id: userData.id,
        book_id: id
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const hasToken = localStorage.getItem('token');

        try {
            const response = await axios.post('http://localhost:3000/Rents', dadosParaInserir, {
            }, {
                headers: {
                    'Authorization': `Bearer ${hasToken}`,
                },
            });
            console.log(response);
        } catch (error) {
            console.error('Error calling API:', error.message);
        }
    };




    return (
        <>

            <Button color="gray" onClick={handDelete}>Profile</Button>
            <h1>DataAlugado: {hoje}</h1>
            <h1>DataEntrga:{data10DiasDepois}</h1>
            <h1>Book:{id}</h1>
            <h1>User:{userData.id}</h1>
        </>
    )
}