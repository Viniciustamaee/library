import React from 'react';
import {
    Avatar,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
} from 'flowbite-react';

import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Component() {
    const hasToken = localStorage.getItem('token')
    const adminData = localStorage.getItem('user');
    const adminObject = JSON.parse(adminData);
    const currentUrl = window.location.href;

    const backGround = () => {
        if (currentUrl === import.meta.env.VITE_URL_HOME) {
            return "fixed bg-tranparent";
        } else {
            return "bg-tranparent";
        }
    }

    if (adminData) {
        const adminObject = JSON.parse(adminData);

    } else {
        console.log('Não há dados de usuário no localStorage');
    }

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/User/Login';
    }


    const [userData, setUserData] = useState('');


    useEffect(() => {
        const userDataFromStorage = localStorage.getItem('user');

        if (userDataFromStorage) {
            const parsedUserData = JSON.parse(userDataFromStorage);
            setUserData(parsedUserData);
        }
    }, []);

    return (
        <div className=" flex content-between " >



            {<Navbar fluid rounded className={`w-screen ${backGround()}`} >

                <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                    <svg className="w-10 h-10 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M11 4.7C8.7 4.1 6.8 4 4 4a2 2 0 0 0-2 2v11c0 1.1 1 2 2 2 2.8 0 4.5.2 7 .8v-15Zm2 15.1c2.5-.6 4.2-.8 7-.8a2 2 0 0 0 2-2V6c0-1-.9-2-2-2-2.8 0-4.7.1-7 .7v15.1Z" clipRule="evenodd" />
                    </svg>

                    <span class="self-center text-2xl font-semibold whitespace-nowrap text-white ">Páginas Infinitas</span>
                </a>

                <div className="flex md:order-2 text-lg">
                    <div className="flex flex-wrap gap-2">
                        {!hasToken && <Button className='mr-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-1 text-center me-2 mb-2' href='/User/register'>Register</Button>}
                        {!hasToken && <Button className='mr-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-1 text-center me-2 mb-2' href='/User/Login'>Login</Button>}
                    </div>

                    {hasToken && (<Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar alt="User settings" img={userData.img} rounded size='sm' />
                        }
                    >
                        <DropdownHeader>
                            <span className="block text-sm text-lg">{userData.username}</span>
                            <span className="block truncate text-sm font-medium">{userData.email}</span>
                        </DropdownHeader>

                        <Link to={`User/perfil/${userData.id}`}>
                            <div className="flex flex-row">
                                <DropdownItem>
                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M12 20a8 8 0 0 1-5-1.8v-.6c0-1.8 1.5-3.3 3.3-3.3h3.4c1.8 0 3.3 1.5 3.3 3.3v.6a8 8 0 0 1-5 1.8ZM2 12a10 10 0 1 1 10 10A10 10 0 0 1 2 12Zm10-5a3.3 3.3 0 0 0-3.3 3.3c0 1.7 1.5 3.2 3.3 3.2 1.8 0 3.3-1.5 3.3-3.3C15.3 8.6 13.8 7 12 7Z" clip-rule="evenodd" />
                                    </svg>
                                    Perfil</DropdownItem>
                            </div>
                        </Link>

                        {hasToken && <Link to={`Rents/${userData.id}`}>
                            <div className="flex flex-row">
                                <DropdownItem>
                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M7 2a2 2 0 0 0-2 2v1a1 1 0 0 0 0 2v1a1 1 0 0 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1c0 1.1.9 2 2 2h11a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H7Zm3 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm-1 7a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3c0 .6-.4 1-1 1h-6a1 1 0 0 1-1-1Z" clip-rule="evenodd" />
                                    </svg>
                                    Rents</DropdownItem>
                            </div>
                            <DropdownDivider />
                        </Link>}


                        <div className="flex flex-row">
                            <DropdownItem onClick={logout}>
                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2" />
                                </svg>
                                Sign out

                            </DropdownItem>
                        </div>
                    </Dropdown>
                    )}

                    <NavbarToggle />
                </div>


                <NavbarCollapse>
                    <div className="xl:flex flex-row text-center">
                        <NavbarLink className='text-lg text-white hover:bg-transparent'><Link to="/">Home</Link>
                            <svg class="w-6 h-6 ml-2  mb-1 text-white hidden sm:inline " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19c0 .6.4 1 1 1h3v-3c0-.6.4-1 1-1h2c.6 0 1 .4 1 1v3h3c.6 0 1-.4 1-1v-8.5" />
                            </svg>

                        </NavbarLink>
                    </div>


                    {hasToken && <div className="xl:flex flex-row text-center">
                        <NavbarLink href="#" className='text-lg text-white hover:bg-transparent'>
                            <Link to={`Rents/${userData.id}`}>Rents</Link>
                            <svg class="w-6 h-6 ml-2 text-white hidden sm:inline" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19V4c0-.6.4-1 1-1h12c.6 0 1 .4 1 1v13H7a2 2 0 0 0-2 2Zm0 0c0 1.1.9 2 2 2h12M9 3v14m7 0v4" />
                            </svg>
                        </NavbarLink>
                    </div>
                    }

                    <div className="flex justify-around	">
                        {hasToken && <div>
                            {adminObject.admin == '1' && <div >
                                <div className="flex justify-center mr-5">
                                    <Dropdown
                                        arrowIcon={false}
                                        inline
                                        label={
                                            <a className='flex items-center text-lg text-white' >
                                                Authors
                                                <svg className="w-6 h-6 ml-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
                                                </svg>
                                            </a>

                                        }
                                    >
                                        <Link to='Author'><Dropdown.Item>All Authors</Dropdown.Item></Link>
                                        {adminObject.admin == '1' && <Link to='Author/new'><Dropdown.Item>New Author</Dropdown.Item></Link>}
                                    </Dropdown>
                                </div>
                            </div>}
                        </div>}
                        <div className="flex justify-center">
                            <Dropdown
                                arrowIcon={false}
                                inline
                                className=''
                                label={
                                    <a className='flex items-center text-lg text-white' >
                                        Books
                                        <svg className="w-6 h-6 ml-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
                                        </svg>
                                    </a>

                                }
                            >
                                <Link to='Books'><Dropdown.Item>Books</Dropdown.Item></Link>
                                <Link to='Books/allBooks'><Dropdown.Item>All books</Dropdown.Item></Link>
                                {hasToken && <Dropdown.Divider />}
                                {hasToken && <Link to='Books/new'>{adminObject.admin == '1' && <Dropdown.Item>New book</Dropdown.Item>}</Link>}
                            </Dropdown>
                        </div>
                    </div>
                </NavbarCollapse>
            </Navbar>}
        </div >
    );
}
