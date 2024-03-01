import React, { useState } from 'react';
import axios from 'axios';

export default function Haha() {
    const [books, setBooks] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get('http://localhost:3000/User/rota-protegida', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = response.data;
            setBooks(data); // Atualize o estado de acordo com a resposta da API, se necessário

        } catch (error) {
            console.error('Erro ao chamar a API:', error.message);
        }
    };

    return (
        <div className="pt-20">
            {/* Adicione aqui a renderização dos livros ou qualquer outra lógica de interface do usuário */}
            <button onClick={handleSubmit}>Fazer Solicitação Protegida</button>
        </div>
    );
}
