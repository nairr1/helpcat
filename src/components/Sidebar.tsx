import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";

import { Brands } from "~/utils/brands";

import helpcatLogo from "~/components/assets/helpcatLogo.png";

import styled from "styled-components";

interface Props {
    toggleSidebar: boolean;
    setToggleSidebar: Dispatch<SetStateAction<boolean>>;
}

const SideBar = ({ toggleSidebar, setToggleSidebar }: Props) => {
    return (
            <div 
                className="bg-20222e rounded-xl transition absolute top-10 cursor-pointer duration-500"
                onMouseLeave={(() => setToggleSidebar(!toggleSidebar))}
            >
                <div className="grid grid-cols-4 gap-y-6 gap-x-10 p-4">
                    <Link href={`http://localhost:3000`} className="flex justify-center items-center">
                        <ShakeContainer>
                            <Image 
                                src={helpcatLogo} 
                                height={20}
                                width={20}
                                className='rounded-md'
                                alt="Brand Logo"
                            />
                        </ShakeContainer>
                    </Link>

                    {Brands.map((brand) => (
                        <div key={brand.id}>
                            <Link href={`http://localhost:3000/${brand.query}`}>
                                <ShakeContainer>
                                    <Image 
                                        src={brand.image} 
                                        height={35}
                                        width={35}
                                        className='rounded-md'
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

export default SideBar;

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