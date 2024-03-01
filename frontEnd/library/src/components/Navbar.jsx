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

    if (adminData) {
        const adminObject = JSON.parse(adminData);

        const adminId = adminObject.id;

        console.log(adminId);
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
        <div className="w-full z-50">
            <Navbar fluid rounded className="bg-transparent">

                <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                    <svg className="w-10 h-10 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M11 4.7C8.7 4.1 6.8 4 4 4a2 2 0 0 0-2 2v11c0 1.1 1 2 2 2 2.8 0 4.5.2 7 .8v-15Zm2 15.1c2.5-.6 4.2-.8 7-.8a2 2 0 0 0 2-2V6c0-1-.9-2-2-2-2.8 0-4.7.1-7 .7v15.1Z" clipRule="evenodd" />
                    </svg>

                    <span class="self-center text-2xl font-semibold whitespace-nowrap text-white ">Library</span>
                </a>

                <div className="flex md:order-2 text-lg">
                    <div className="flex flex-wrap gap-2">
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
                        <Link to={`User/perfil/${userData.id}`}> <DropdownItem>Perfil</DropdownItem></Link>
                        <DropdownItem>Rents</DropdownItem>
                        <DropdownDivider />
                        <DropdownItem onClick={logout}>Sign out</DropdownItem>
                    </Dropdown>
                    )}

                    <NavbarToggle />
                </div>
                <NavbarCollapse>
                    <NavbarLink className='text-lg text-white'><Link to="/">Home</Link></NavbarLink>
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <a className='flex items-center text-lg text-white' >
                                Books
                                <svg className="w-6 h-6 ml-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
                                </svg>
                            </a>

                        }
                    >
                        <Link to='Books'><Dropdown.Item>All books</Dropdown.Item></Link>
                        {hasToken && <Dropdown.Divider />}
                        {hasToken && <Link to='Books/new'><Dropdown.Item>New book</Dropdown.Item></Link>}
                    </Dropdown>
                    { }<NavbarLink href="#" className='text-lg text-white'><Link to="/Rents">Rents</Link></NavbarLink>
                </NavbarCollapse>
            </Navbar>
        </div >
    );
}
