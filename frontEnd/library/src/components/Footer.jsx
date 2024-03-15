import React from 'react';

export default function Footer() {

    const currentUrl = window.location.href;

    const backGround = () => {
        if (currentUrl === "http://localhost:8000/") {
            return "fixed bg-transparent bottom-0 left-0 z-20 w-full p-4 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600";
        } else {
            return "inset-x-0 bottom-0 bottom left-0 w-full  p-4 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600 ";
        }

    }

    return (
        <div className="">
            <footer className={backGround()} >
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.</span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">

                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                    </li>

                </ul>
            </footer>
        </div>
    );
}
