import { useState, useEffect, MouseEvent } from 'react';
import React from 'react';
import styled from 'styled-components';
import helpcatLogo from '../components/assets/helpcatLogo.png';
import Image from 'next/image';
import { IoMdMenu } from 'react-icons/io';
import SideBar from "./Sidebar";

const Header = () => {
    const [openSearch, setOpenSearch] = useState(false);
    const [search, setSearch] = useState('');

    const [toggleSidebar, setToggleSidebar] = useState(false);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    return (
        <div className={`text-sm sticky top-0 bg-1c1b1c hidden lg:flex lg:flex-col z-50 pb-[0.5rem]`}>
            <HeaderContainer>
                    <HeaderLeft>
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
                    </HeaderLeft>

                <HeaderLogo className='font-sans flex items-center justify-center'>
                    <Image 
                        src={helpcatLogo} 
                        width={30} 
                        height={50} 
                        alt="Helpcar Logo"
                    />

                    <p className='ml-2'>Helpcat&#8482;</p> 

                </HeaderLogo>

                <HeaderRight>
                    {true && (
                        <>
                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='w-5 h-5 m-[0.5rem]'>
                                <path fillRule='evenodd' d='M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z' clipRule='evenodd' />
                            </svg>

                            <input 
                                type='text' 
                                className='placeholder-ffffff/60  outline-none bg-1c1b1c'
                                placeholder='Helpcat is here to help!' 
                                spellCheck='false' 
                                onChange={handleSearchChange}
                                disabled={!true}
                                value={search}
                                onClick={(() => setOpenSearch(!openSearch))}
                            />
                        </>
                    )}
                </HeaderRight>

            </HeaderContainer>

        </div>
    );
};

export default Header;

// stylesheet

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
`
const HeaderLeft = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 2rem;
    font-weight: 350;
`

const HeaderRight = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 2rem;
    font-weight: 350;
`

const HeaderLogo = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    font-size: 3rem;
`