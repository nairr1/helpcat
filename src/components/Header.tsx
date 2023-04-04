import React, { useState } from 'react';
import Image from 'next/image';
import Link from "next/link";

import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

import helpcatLogo from '../components/assets/helpcatLogo.png';
import SideBar from "./Sidebar";

import { IoMdMenu } from 'react-icons/io';

const Header = () => {
    const user = useUser();

    const [openSearch, setOpenSearch] = useState(false);
    const [search, setSearch] = useState('');

    const [toggleSidebar, setToggleSidebar] = useState(false);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    return (
        <div className={`text-sm sticky top-0 bg-18181a hidden lg:flex lg:flex-col z-50 pb-[0.5rem]`}>
            <div className="flex items-center">
                <div className="flex-1 flex items-center justify-start p-[2rem]">
                    {toggleSidebar ? (
                        <SideBar  
                            toggleSidebar={toggleSidebar}
                            setToggleSidebar={setToggleSidebar}
                        />
                    ) : (
                        <IoMdMenu 
                            className="text-xl transition duration-500 cursor-pointer bg-282a36 w-8 h-8 p-1.5 rounded-md" 
                            onClick={(() => setToggleSidebar(!toggleSidebar))}
                        />
                    )}
                </div>

                <Link href={"/"}>
                    <div className='flex flex-1 font-sans text-[3rem] items-center justify-center'>
                        <Image 
                            src={helpcatLogo} 
                            width={30} 
                            height={50} 
                            alt="Helpcar Logo"
                        />

                        <p className='ml-2'>Helpcat&#8482;</p> 
                    </div>
                </Link>

                <div className="flex-1 flex items-center justify-end p-[2rem] space-x-6 font-light">
                    {user.isSignedIn ? (
                        <SignOutButton />
                    ) : (
                        <>
                            <div className="px-2 py-1 rounded-md bg-6C47FF hover:bg-20222e duration-500">
                                <SignInButton />
                            </div>
                        </>


                    )}

                    <div className="flex">
                        {true && (
                            <>
                                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='w-5 h-5 m-[0.5rem]'>
                                    <path fillRule='evenodd' d='M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z' clipRule='evenodd' />
                                </svg>

                                <input 
                                    type='text' 
                                    className='placeholder-ffffff/60  outline-none bg-18181a'
                                    placeholder='Helpcat is here to help!' 
                                    spellCheck='false' 
                                    onChange={handleSearchChange}
                                    disabled={!user.user?.primaryEmailAddress?.toString().includes("@redcat.com.au")}
                                    value={search}
                                    onClick={(() => setOpenSearch(!openSearch))}
                                />
                            </>
                        )}
                    </div>

                </div>

            </div>

        </div>
    );
};

export default Header;