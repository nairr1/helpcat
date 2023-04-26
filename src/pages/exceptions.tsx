import Image from "next/image";
import React, { useState } from "react";

import { AiOutlinePhone } from "react-icons/ai";

import Header from "~/components/Header";
import HelpcatPageLoader from "~/components/HelpcatPageLoader";
import sadcat from "../components/assets/helpcatNotFound.jpeg";

import { api } from "~/utils/api";
import { Brands } from "~/utils/brands";

import styled from "styled-components";
import { useUser } from "@clerk/nextjs";
import { userVerification } from "~/utils/userVerification";

type ExceptionCardProps = {
    locationName: string;
    storeStatus: string;
    storeId: number;
    phone: string;
    brand: string;
    lastOnline: Date;
}

const ExceptionCard = ({ locationName, storeStatus, storeId, phone, brand, lastOnline }: ExceptionCardProps) => {
    const logDateTime = new Date(lastOnline.toISOString().slice(0, 19) || "");

    const currentBrand = Brands.find(item => item.query === brand);

    if (!currentBrand) return null;

    return (
        <div className="flex flex-col space-y-3 p-6 bg-20222e rounded-2xl">
            <div className="flex items-center justify-between">
                <p className="text-sm">ID: {storeId}</p>

                <Image 
                    src={currentBrand.image} 
                    height={35}
                    width={35}
                    className="rounded-md"
                    alt="Brand Logo"
                />
            </div>

            <div className="flex items-center space-x-2">


                <h1 className="text-sm">{locationName}</h1>

            </div>

            <div className="flex items-center text-xs ">
                {storeStatus === "OffLine" && (
                    <p className="text-b32d2d">{storeStatus.charAt(0).toUpperCase()}{storeStatus.slice(1).toLowerCase()}</p>
                )}

                {storeStatus === "Unknown" && (
                    <p className="text-5e4fb3">{storeStatus}</p>
                )}

                <span className="border border-ffffff/70 mr-1 bg-ffffff/70 rounded-full h-1 w-1 ml-1">{" "}</span> 

                <p className="text-ffffff/70 font-light">
                    {logDateTime.toLocaleString('en-AU', { day:"2-digit", month:"2-digit", year:"2-digit", hour: 'numeric', minute: 'numeric', hour12: true }).toLocaleUpperCase()}
                </p>
            </div>

            <p className="flex text-xs font-light items-center"> 
                <span className="mr-1 text-sm"><AiOutlinePhone /></span>
                {phone ? `${phone}` : "None"}
            </p>

        </div>
    );
};

const Exceptions = () => {
    const ctx = api.useContext();

    api.posts.getLatest.useQuery();
    api.posts.getAll.useQuery();

    const [counter, setCounter] = useState(0);

    setTimeout(() => {
        if(counter < 1) {
            setCounter(1);
        }
    }, 2000);

    const user = useUser();

    let userEmail = "";

    if (user.user?.primaryEmailAddress) {
        userEmail = user.user.primaryEmailAddress.toString();
    }

    setInterval(function() {
        void ctx.logs.getAll.invalidate();
    }, 120000);

    const { data: logs } = api.logs.getAll.useQuery();

    if (!logs) return <HelpcatPageLoader />
    
    return (
        <>
            <Header />

            {!userVerification(userEmail, "exceptions") ? (
                <div className="flex flex-col justify-center items-center px-10 py-4">
                    <div className="flex flex-col justify-center items-center space-y-1 mb-2 font-light text-sm">
                        <p>
                            The exceptions page will return all major clients that are <span className="italic">currently trading</span>, but <span className="underline">aren&apos;t</span> able to process web transactions.
                        </p>

                        <p>
                            This data is polled every 5 minutes and will display in real time.
                        </p>
                    </div>

                    <div className="grid justify-center sm:grid-cols-1 xl:grid-cols-5 p-6 gap-4">
                        {logs.map(({ locationName, status, storeId, phone, brand, lastOnline }) => (
                            <ExceptionCard 
                                key={storeId}
                                locationName={locationName || ""}
                                storeStatus={status || ""}
                                storeId={storeId}
                                phone={phone || ""}
                                brand={brand}
                                lastOnline={lastOnline}
                            />
                        ))}
                    </div>

                    {logs && logs.length === 0 && (
                        <div className="flex items-center space-x-2">
                            <HelpcatErrorAnimation>
                                <Image 
                                    className='m-auto rounded-full p-1'
                                    src={sadcat} 
                                    width={40}
                                    height={40}
                                    alt=""
                                />
                            </HelpcatErrorAnimation>

                            <p className="text-2xl">No current exceptions!</p>

                            <HelpcatErrorAnimation>
                                <Image 
                                    className='m-auto rounded-full p-1'
                                    src={sadcat} 
                                    width={40}
                                    height={40}
                                    alt=""
                                />
                            </HelpcatErrorAnimation>
                            
                        </div>
                    )}

                </div>
            ) : (
                <div className="text-center mt-[2rem]">
                    {counter === 1 && (
                        <p className={`transition duration-1000 transform ${counter !== 1 && "opacity-0" || "opacity-100" }`}>
                            YOU AREN&apos;T AUTHORIZED TO VIEW THIS PAGE.
                        </p>
                    )}
                </div>
            )}
        </>


    );
};

export default Exceptions;

// stylesheet

const HelpcatErrorAnimation = styled.div`
    animation: gelatine 0.5s infinite;

    @keyframes gelatine {
        from, to { transform: scale(1, 1); }
        25% { transform: scale(0.9, 1.1); }
        50% { transform: scale(1.1, 0.9); }
        75% { transform: scale(0.95, 1.05); }
    }
`