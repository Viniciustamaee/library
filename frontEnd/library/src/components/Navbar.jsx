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
    return (
        <div className="fixed w-full z-50 ">
            <Navbar fluid rounded className="bg-transpaent" >
                <NavbarBrand href="/" >
                    <svg class="w-12 h-12 text-gray-800 text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M11 4.7C8.7 4.1 6.8 4 4 4a2 2 0 0 0-2 2v11c0 1.1 1 2 2 2 2.8 0 4.5.2 7 .8v-15Zm2 15.1c2.5-.6 4.2-.8 7-.8a2 2 0 0 0 2-2V6c0-1-.9-2-2-2-2.8 0-4.7.1-7 .7v15.1Z" clip-rule="evenodd" />
                    </svg>

                    <span className="self-center whitespace-nowrap text-xl font-semibold text-white">Library</span>
                </NavbarBrand>
                <div className="flex md:order-2 text-lg ">


                    <div className="flex flex-wrap gap-2 " >
                        <Button color="blue" href='/User/Register'>Register</Button>
                        <Button color="success" className='mr-2' href='/User/Login'>Login</Button>
                    </div>

                    {/* <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded size='lg' />
                    }
                >
                    <DropdownHeader>
                        <span className="block text-sm text-lg">Nome user</span>
                        <span className="block truncate text-sm font-medium">Emailuser </span>
                    </DropdownHeader>
                    <DropdownItem>Perfil</DropdownItem>
                    <DropdownItem>Rents</DropdownItem>
                    <DropdownDivider />
                    <DropdownItem>Sign out</DropdownItem>
                </Dropdown> */}
                    <NavbarToggle />
                </div>
                <NavbarCollapse >
                    <NavbarLink className='text-lg text-white '  ><Link to="/" >Home</Link></NavbarLink>
                    <NavbarLink className='text-lg text-white'  ><Link to="/Books">Books</Link></NavbarLink>
                    <NavbarLink href="#" className='text-lg text-white'  ><Link to="/Rents">Rents</Link></NavbarLink>
                </NavbarCollapse>
            </Navbar>
        </div>
    );
}
