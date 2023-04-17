import React, { type Dispatch, type SetStateAction, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { SignIn, UserButton, useUser } from "@clerk/nextjs";

import styled from "styled-components";

import { Brands } from "~/utils/brands";

import helpcatLogo from "../components/assets/helpcatLogo.png";

import { IoMdMenu } from "react-icons/io";
import { IoIosCreate } from "react-icons/io";

type HeaderProps = {
    togglePostWizard?: boolean;
    handlePostWizardToggle?: () => void;
}

type SidebarProps = {
    toggleSidebar: boolean;
    setToggleSidebar: Dispatch<SetStateAction<boolean>>;
}

const SideBar = ({ toggleSidebar, setToggleSidebar }: SidebarProps) => {
    return (
            <div 
                className="bg-20222e rounded-xl transition absolute top-10 cursor-pointer duration-500 shadow-[0_3px_10px_rgb(0,0,0,0.5)]"
                onMouseLeave={(() => setToggleSidebar(!toggleSidebar))}
            >
                <div className="grid grid-cols-4 gap-y-6 gap-x-10 p-4">
                    <Link href={"/"} className="flex justify-center items-center">
                        <ShakeContainer>
                            <Image 
                                src={helpcatLogo} 
                                height={20}
                                width={20}
                                className="rounded-md"
                                alt="Brand Logo"
                            />
                        </ShakeContainer>
                    </Link>

                    {Brands.map((brand) => (
                        <div key={brand.id}>
                            <Link href={`/${brand.query}`}>
                                <ShakeContainer>
                                    <Image 
                                        src={brand.image} 
                                        height={35}
                                        width={35}
                                        className="rounded-md"
                                        alt="Brand Logo"
                                    />
                                </ShakeContainer>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        );
};

const Header = ({ togglePostWizard, handlePostWizardToggle }: HeaderProps) => {
    const user = useUser();

    const router = useRouter();

    const [toggleSidebar, setToggleSidebar] = useState(false);

    const [fadeIn, setFadeIn] = useState(false);

    const [displaySignIn, setDisplaySignIn] = useState(false);

    const handleSignInClick = () => {
        setDisplaySignIn(!displaySignIn);

        setTimeout(() => {
            setFadeIn(!fadeIn);
        }, 100);
    };

    let userEmail = "";

    if (user.user?.primaryEmailAddress) {
        userEmail = user.user.primaryEmailAddress.toString();
    }

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
                            className="text-xl transition duration-500 cursor-pointer bg-282a36 w-8 h-8 p-1.5 rounded-md shadow-md" 
                            onClick={(() => setToggleSidebar(!toggleSidebar))}
                        />
                    )}
                </div>

                <Link href={"/"}>
                    <div className="flex flex-1 font-sans text-[3rem] items-center justify-center">
                        <Image 
                            src={helpcatLogo} 
                            width={30} 
                            height={50} 
                            alt="Helpcar Logo"
                        />

                        <p className="ml-2">Helpcat&#8482;</p> 
                    </div>
                </Link>

                <div className="flex-1 flex items-center justify-end p-[2rem] space-x-6 font-light">
                    {user.isSignedIn ? (
                            <UserButton 
                                appearance={{
                                    variables: {
                                        colorBackground: "#20222e",
                                        colorText: "#ffffff",
                                        colorPrimary: "#6C47FF",
                                        fontWeight: { normal: 300 },
                                        colorInputBackground: "#292c3e",
                                        colorInputText: "#ffffff",
                                        colorTextSecondary: "#ffffff",
                                        colorAlphaShade: "#ffffff",
                                    }
                                }}
                            />
                    ) : (
                        <div 
                            className="px-2 py-1 rounded-md bg-6C47FF cursor-pointer border border-282a36 hover:bg-2f334a hover:border-5e4fb3/40 duration-500"
                            onClick={handleSignInClick}
                        >
                            <p>Sign in</p>
                        </div>
                    )}



                    {router.pathname === "/feed" ? (
                        <IoIosCreate 
                            className={`cursor-pointer text-xl transform transition duration-500 hover:text-ffffff
                                ${togglePostWizard ? "text-ffffff" : "text-ffffff/70" || ""}
                            `} 
                            onClick={handlePostWizardToggle} 
                        />
                    ) : (
                        <>
                            {userEmail.includes("@redcat.com.au") || userEmail === "rnair1199@gmail.com" && (
                                <Link href='/feed'>
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        viewBox="0 0 20 20" 
                                        fill="currentColor" 
                                        className="w-5 h-5 m-[0.5rem] text-ffffff/70 hover:text-ffffff transform transition duration-500 cursor-pointer hover:scale-110"
                                    >
                                        <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                                    </svg>
                                </Link>

                            )}
                        </>
                    )}
                </div>

            </div>

            <div 
                className={`fixed right-8 top-20 transition transform duration-500 shadow-md
                    ${!fadeIn && "opacity-0" || "opacity-100"} 
                    ${!displaySignIn && "hidden" || ""}
                `}>
                {!user.isSignedIn && (
                    <SignIn 
                        appearance={{
                            variables: {
                                colorBackground: "#20222e",
                                colorText: "#ffffff",
                                colorPrimary: "#6C47FF",
                                fontWeight: { normal: 300 },
                                colorInputBackground: "#292c3e",
                                colorInputText: "#ffffff"
                            }
                        }}
                    />
                )}
            </div>

        </div>
    );
};

export default Header;

const ShakeContainer = styled.div`
    :hover {
        animation: shake 1s ease-in-out;
    }

    @keyframes shake {
        10% { transform: rotate(8deg); }
        20% { transform: rotate(-8deg); }
        30% { transform: rotate(6deg); }
        40% { transform: rotate(-6deg); }
        50% { transform: rotate(4deg); }
        60% { transform: rotate(-4deg); }
        70% { transform: rotate(2deg); }
        80% { transform: rotate(-2deg); }
        90% { transform: rotate(1deg); }
        100% { transform: initial; }
    }
`