import { type GetServerSideProps } from "next";
import Image from "next/image";
import React from "react";

import { AiOutlinePhone } from "react-icons/ai";

import { api } from "~/utils/api";
import { Brands } from "~/utils/brands";
import { formatDateTime } from "~/utils/formatDateTime";

type ServerProps = {
    data: StoreStatusData[];
}

type ExceptionProps = {
    exceptionData: {
        locationName: string;
        storeStatus: string;
        storeId: number;
        phone: string;
        openNow: boolean | undefined;
        brand: string;
    }[];
}

type ExceptionCardProps = {
    locationName: string;
    storeStatus: string;
    storeId: number;
    phone: string;
    brand: string;
    openNow: boolean | undefined;
}

const ExceptionCard = ({ locationName, storeStatus, storeId, phone, brand, openNow }: ExceptionCardProps) => {
    const { data: logs } = api.logs.getAll.useQuery({ brand: brand });

    const log = logs?.find(log => log.storeId === storeId);

    const currentBrand = Brands.find(item => item.query === brand);

    if (!currentBrand) return null;

    return (
        <>
            {openNow && log && (
                <div className="flex flex-col space-y-3 p-6 bg-20222e rounded-2xl">
                    <div className="flex items-center justify-between">
                        <p className="text-sm">ID: {storeId}</p>

                        <Image 
                            src={currentBrand.image} 
                            height={30}
                            width={30}
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

                        <p className="text-ffffff/70 font-light">{formatDateTime(log?.lastOnline.toISOString())?.slice(0, 20)}</p>
                    </div>

                    <p className="flex text-xs font-light items-center"> 
                        <span className="mr-1 text-sm"><AiOutlinePhone /></span>
                        {phone ? `${phone}` : "None"}
                    </p>

                </div>
            )}
        </>

    );
};

const Exceptions = ({ 
    exceptionData
}: ExceptionProps) => {
    return (
        <div className="flex justify-center items-center">
            <div className="place-content-center grid grid-cols-6 p-6 gap-4">
                {exceptionData?.map(({ locationName, storeStatus, storeId, phone, brand, openNow }) => (
                    <ExceptionCard 
                        key={storeId}
                        locationName={locationName}
                        storeStatus={storeStatus}
                        storeId={storeId}
                        phone={phone}
                        brand={brand}
                        openNow={openNow}
                    />
                ))}

            </div>
        </div>

    );
};

export default Exceptions;

export const getServerSideProps: GetServerSideProps = async () => {
    const res1: unknown = await fetch("https://augustusgelatery.redcatcloud.com.au/api/v1/stores").then(res => res.json());
    const res2: unknown = await fetch("https://banjos.redcatcloud.com.au/api/v1/stores").then(res => res.json());
    const res3: unknown = await fetch("https://bettysburgers.redcatcloud.com.au/api/v1/stores").then(res => res.json());
    const res4: unknown = await fetch("https://boostjuice.redcatcloud.com.au/api/v1/stores").then(res => res.json());

    const { data: augustusGelateryData } = res1 as ServerProps;
    
    const augustusGelateryExceptions = augustusGelateryData.filter(function(location): boolean {
        return location.StoreStatus !== "Online" && location.OpenNow === true;
    })
    .map(({ StoreStatus, LocationName, StoreID, Phone, OpenNow }) =>  ({
        locationName: LocationName,
        storeStatus: StoreStatus,
        storeId: StoreID,
        phone: Phone,
        openNow: OpenNow,
        brand: "augustusgelatery"
    }));

    const { data: banjosData } = res2 as ServerProps;

    const banjosExceptions = banjosData.filter(function(location): boolean {
        return location.StoreStatus !== "Online" && location.OpenNow === true;
    })
    .map(({ StoreStatus, LocationName, StoreID, Phone, OpenNow }) =>  ({
        locationName: LocationName,
        storeStatus: StoreStatus,
        storeId: StoreID,
        phone: Phone,
        openNow: OpenNow,
        brand: "banjos"
    }));

    const { data: bettysBurgersData } = res3 as ServerProps;
    
    const bettysBurgersExceptions = bettysBurgersData.filter(function(location): boolean {
        return location.StoreStatus !== "Online" && location.OpenNow === true;
    })
    .map(({ StoreStatus, LocationName, StoreID, Phone, OpenNow }) =>  ({
        locationName: LocationName,
        storeStatus: StoreStatus,
        storeId: StoreID,
        phone: Phone,
        openNow: OpenNow,
        brand: "bettysburgers"
    }));

    const { data: boostJuiceData } = res4 as ServerProps;

    const boostJuiceExceptions = boostJuiceData.filter(function(location): boolean {
        return location.StoreStatus !== "Online" && location.OpenNow === true;
    })
    .map(({ StoreStatus, LocationName, StoreID, Phone, OpenNow }) =>  ({
        locationName: LocationName,
        storeStatus: StoreStatus,
        storeId: StoreID,
        phone: Phone,
        openNow: OpenNow,
        brand: "boostjuice"
    }));

    const exceptionData = augustusGelateryExceptions.concat(
        banjosExceptions,
        bettysBurgersExceptions,
        boostJuiceExceptions,
    );

    return {
        props: {
            exceptionData,
        },
    };
};