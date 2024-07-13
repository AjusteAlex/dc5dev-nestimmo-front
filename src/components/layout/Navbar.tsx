"use client";

import Link from "next/link";
import DrawerPost from "../post/DrawerPost";
import DrawerCategory from "../category/DrawerCategory";

import { useState } from "react";
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-end">
                <div className="md:hidden">
                    {isOpen ? (
                        <button onClick={toggleMenu} className="text-white focus:outline-none">
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"
                                ></path>
                            </svg>
                        </button>
                    ) : (
                        <button onClick={toggleMenu} className="text-white focus:outline-none">
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                ></path>
                            </svg>
                        </button>
                    )}

                </div>
            </div>
            <div className={`${isOpen ? ' flex flex-col items-end' : 'flex'}`}>
                <Link href="/category" className="text-white block px-4 py-2 hover:bg-gray-700 rounded">Category
                    list</Link>
                <Link href="/" className="text-white block px-4 py-2 hover:bg-gray-700 rounded">Post list</Link>
            </div>
        </nav>

    );
}

export default Navbar;

