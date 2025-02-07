'use client'

import Link from "next/link";
import { useState } from "react"
import { IoMenu } from "react-icons/io5";

function Menu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <div className="">
            <IoMenu
                className="cursor-pointer text-xl"
                onClick={() => setIsMenuOpen((prev) => !prev)}
            />{
                isMenuOpen && (
                    <div className="absolute bg-primaryColor text-white left-0 top-16 w-full h-[calc(100vh-64px)] flex flex-col items-center justify-center gap-8 text-xl z-40">
                        <Link href='/'>Home</Link>
                        <Link href='/'>Shop Now</Link>
                        <Link href='/'>About Us</Link>
                        <Link href='/'>Contact Us</Link>
                        <Link href='/'>Logout</Link>
                        <Link href='/'>Cart(1)</Link>
                    </div>
                )
            }
        </div>
    )
}

export default Menu
