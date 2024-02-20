import { Button } from 'flowbite-react';
import './home.css'

export default function home() {
    return (
        <div className='text-white' id='container'>
            <div id="content">
                <h1 className='text-4xl font-normal text-white-900 '>Bem vindo a Library</h1>
                <p className='text-4xl font-thin text-white-900 text-center m-5'>Um site a onde você pode alugar livros</p>
                <p className='text-4xl font-thin text-white-900  text-center'>Clique aqui para mais informações</p>
                <Button gradientMonochrome="info" id='buttonInfo' className='mt-5'>Info</Button>
            </div>
        </div>
    )
}