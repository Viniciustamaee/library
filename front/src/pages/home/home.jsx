import './home.css'

export default function home() {

    return (
        <div className='text-white' id='container'>
            <div id="content">
                <h1 className='text-4xl font-normal text-white-900 '>Wellcome the Páginas Infinitas</h1>
                <p className='text-4xl font-thin text-white-900 text-center m-5'>A website where you can rent books</p>
                <p className='text-4xl font-thin text-white-900 text-center'><a href="/Books" className='hover:text-violet-600 '>Click here</a> for more information</p>
            </div>
        </div>
    )
}