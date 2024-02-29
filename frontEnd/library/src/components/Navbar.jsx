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

export default function Component() {
    const hasToken = localStorage.getItem('token')


    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/User/Login';
    }
    return (
        <div className="fixed w-full z-50">
            <Navbar fluid rounded className="bg-transparent">

                <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                    <svg className="w-10 h-10 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M11 4.7C8.7 4.1 6.8 4 4 4a2 2 0 0 0-2 2v11c0 1.1 1 2 2 2 2.8 0 4.5.2 7 .8v-15Zm2 15.1c2.5-.6 4.2-.8 7-.8a2 2 0 0 0 2-2V6c0-1-.9-2-2-2-2.8 0-4.7.1-7 .7v15.1Z" clipRule="evenodd" />
                    </svg>

                    <span class="self-center text-2xl font-semibold whitespace-nowrap text-white ">Library</span>
                </a>

                <div className="flex md:order-2 text-lg">
                    <div className="flex flex-wrap gap-2">
                        {!hasToken && <Button color="blue" href='/User/Register'>Register</Button>}
                        {!hasToken && <Button color="success" className='mr-2' href='/User/Login'>Login</Button>}
                    </div>

                    {hasToken && (<Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar alt="User settings" img="https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" rounded size='sm' />
                        }
                    >
                        <DropdownHeader>
                            <span className="block text-sm text-lg">Nome user</span>
                            <span className="block truncate text-sm font-medium">Emailuser </span>
                        </DropdownHeader>
                        <DropdownItem>Perfil</DropdownItem>
                        <DropdownItem>Rents</DropdownItem>
                        <DropdownDivider />
                        <DropdownItem onClick={logout}>Sign out</DropdownItem>
                    </Dropdown>
                    )}

                    <NavbarToggle />
                </div>
                <NavbarCollapse>
                    <NavbarLink className='text-lg text-white'><Link to="/">Home</Link></NavbarLink>
                    <NavbarLink className='text-lg text-white'><Link to="/Books">Books</Link></NavbarLink>
                    <NavbarLink href="#" className='text-lg text-white'><Link to="/Rents">Rents</Link></NavbarLink>
                </NavbarCollapse>
            </Navbar>
        </div>
    );
}
