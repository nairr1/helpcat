import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { SignIn, UserButton, useUser } from "@clerk/nextjs";

import { Brands } from "~/utils/brands";

import helpcatLogo from "../components/assets/helpcatLogo.png";

import { IoIosCreate, IoLogoOctocat, IoMdMenu } from "react-icons/io";
import { userVerification } from "~/utils/userVerification";
import { AiOutlineExclamation } from "react-icons/ai";

type HeaderProps = {
    togglePostWizard?: boolean;
    handlePostWizardToggle?: () => void;
}

const SideBar = () => {
    return (
        <div className="absolute left-4 top-32">
            <div className="flex flex-col space-y-2 text-xs font-light">
                <Link href={"/"} className="hover:underline">
                    Home
                </Link>

                {Brands.map((brand) => (
                    <div key={brand.id}>
                        <Link href={`/${brand.query}`} className="hover:underline">
                            {brand.title}
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

    const [fadeIn, setFadeIn] = useState(false);
    const [displaySignIn, setDisplaySignIn] = useState(false);
    const [toggleSidebar, setToggleSidebar] = useState(false);

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
                    {toggleSidebar && (
                        <SideBar />
                    )}
                    
                <div className="flex-1 flex space-x-8 items-center justify-start p-[2rem]">

                    <IoMdMenu 
                        className={`text-xl duration-500 cursor-pointer bg-282a36 w-8 h-8 p-1.5 rounded-md shadow-md border border-282a36 hover:bg-2f334a hover:border-5e4fb3/40 ${toggleSidebar && "border-5e4fb3/40 bg-2f334a" || ""}`}
                        onClick={(() => setToggleSidebar(!toggleSidebar))}
                    />

                    {router.pathname === "/feed" ? (
                        <IoIosCreate 
                            className={`cursor-pointer text-[2.25rem] px-2 transform hover:scale-110 transition duration-500 hover:text-ffffff
                                ${togglePostWizard ? "text-ffffff" : "text-ffffff/70" || ""}
                            `} 
                            onClick={handlePostWizardToggle} 
                        />
                    ) : (
                        <>
                            {!userVerification(userEmail, "feed") && (
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

                <div className="flex-1 flex items-center justify-end p-[2rem] space-x-8 font-light">
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
                            className="px-2 py-1 rounded-md bg-20222e cursor-pointer border border-282a36 hover:bg-2f334a hover:border-5e4fb3/40 duration-500"
                            onClick={handleSignInClick}
                        >
                            <p>Sign in</p>
                        </div>
                    )}

                    {userVerification(userEmail, "feed") && (
                        <Link href='/fixcat'>
                            <IoLogoOctocat className="w-5 h-5  text-ffffff/70 hover:text-ffffff transform transition duration-500 cursor-pointer hover:scale-110" />
                        </Link>
                    )}

                    {userVerification(userEmail, "exceptions") && (
                        <Link href='/exceptions'>
                            <AiOutlineExclamation className={`text-xl hover:text-b32d2d transform transition duration-500  ${router.pathname === "/exceptions" ? "text-b32d2d " : "text-ffffff/70 hover:scale-110"}`} />
                        </Link>
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