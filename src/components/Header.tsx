import { useState, useEffect, MouseEvent } from 'react';
import React from 'react';
import styled from 'styled-components';
import helpcatLogo from '../components/assets/helpcatLogo.png';
import Image from 'next/image';
import helpcat from '../components/assets/helpcat.jpeg';

const Header = () => {
    const [mounted, setMounted] = useState(false);

    const [openSearch, setOpenSearch] = useState(false);
    const [search, setSearch] = useState('');

    const [topicDropdown, setTopicDropdown] = useState(false);
    const [storeDropdown, setStoreDropdown] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    return (
        <div className={`text-sm sticky top-0 bg-181818 hidden lg:flex lg:flex-col z-50 pb-[0.5rem]`}>
            <HeaderContainer>
                    <HeaderLeft>
                        {true && (
                            <>
                                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='w-5 h-5 mr-[0.5rem]'>
                                    <path fillRule='evenodd' d='M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z' clipRule='evenodd' />
                                </svg>

                                <input 
                                    type='text' 
                                    className='placeholder-ffffff/60 w-[15rem] outline-none bg-181818'
                                    placeholder='Helpcat is here to help!' 
                                    spellCheck='false' 
                                    onChange={handleSearchChange}
                                    disabled={!true}
                                    value={search}
                                    onClick={(() => setOpenSearch(!openSearch))}
                                />
                            </>
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
                    {loading && (
                        <>
                            <HelpcatLoading3Animation>
                                <Image 
                                    className='m-auto rounded-full'
                                    src={helpcat} 
                                    width={10}
                                    height={10}
                                    alt="Helpcat loading animation"
                                />
                            </HelpcatLoading3Animation>

                            <div className='mr-[1rem] ml-2'>
                                <p className='text-xs'>
                                    <H>H</H><E>E</E>LPCA<T>T</T> I<S>S</S> BU<I>I</I>LDI<N>N</N><G>G</G>..
                                </p>
                            </div>
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

const HelpcatLoading3Animation = styled.div`
    animation: bounce3 2s ease infinite;

    display: flex;
    align-items: center;
    justify-content: center;

    @keyframes bounce3 {
        0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
        40% {transform: translateY(-10px);}
        60% {transform: translateY(-5px);}
    }
`

const E = styled.span`
    animation: e 1.5s linear infinite;

    @keyframes e {
        100% {
            color: #9141e6
        }
    }
`

const S = styled.span`
    animation: s 3s linear infinite;

    @keyframes s {
        100% {
            color: #cae3dd
        }
    }
`

const I = styled.span`
    animation: i 2.5s linear infinite;

    @keyframes i {
        100% {
            color: #5382d2
        }
    }
`

const N = styled.span`
    animation: n 3.5s linear infinite;

    @keyframes n {
        100% {
            color: #80eaac
        }
    }
`

const H = styled.span`
    animation: h 2s ease-in-out infinite;

    @keyframes h {
        100% {
            color: #72e6e8
        }
    }
`

const T = styled.span`
    animation: t 1.5s linear infinite;

    @keyframes t {
        100% {
            color: #d588d5
        }
    }
`

const G = styled.span`
    animation: g 1.75s ease-in-out infinite;

    @keyframes g {
        100% {
            color: #af8be9
        }
    }
`