import { useState, useEffect } from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/User/login', {
                username: username,
                password: password,
            });

            setUser(response.data);
            console.log(response.data);
        } catch (error) {
            setError('Erro ao fazer login. Verifique suas credenciais.');
            console.error('Erro ao fazer login:', error);
        }
    };

    useEffect(() => {
    }, []);

    return (
        <div className='pt-20'>
            <form action="/Rents" method="post">
                <label>Username: </label>
                <input type="text" id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <br />
                <label>Password: </label>
                <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <button onClick={handleLogin}>Login</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default LoginForm;
