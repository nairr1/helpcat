import type { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

import styled from "styled-components";
import { useUser } from "@clerk/nextjs";

import type { StoreStatusLogs } from "@prisma/client";

import Header from "~/components/Header";

import { Brands } from "~/utils/brands";
import { userVerification } from "~/utils/userVerification";
import { api } from "~/utils/api";
import { cssTransformProperties } from "~/utils/cssTransformProperties";
import { cssOpacity } from "~/utils/cssOpacity";
import { cssDisplay } from "~/utils/cssDisplay";
import { yesNoString } from "~/utils/yesNoString";
import { formatDateTime } from "~/utils/formatDateTime";
import { formatTradingTime } from "~/utils/formatTradingTime";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { AiOutlinePhone } from "react-icons/ai";
import HelpcatPageLoader from "~/components/HelpcatPageLoader";

type ConfigurationCardProps = {
    orderingEnabled: boolean;
    holidayName: string | null;
    hiddenStore: boolean;
    longitude: number;
    avgOrderTime: number;
    latitude: number;
    orderAfterHours: boolean;
    timezone: string;
    posType: string;
    phone: string;
    activeIndex: number;
    index: number;
}

type EndpointsCardProps = {
    activeIndex: number;
    index: number;
    brand: string;
    storeId: number;
}

type LocationDetailsCardProps = {
    locationName: string;
    storeStatus: string;
    storeId: number;
    address: string;
    suburb: string;
    postcode: string;
    state: string;
    country: string;
    lastMenuUpdate: string;
    activeIndex: number;
    index: number;
    brand: string;
    logs: StoreStatusLogs[] | undefined
}

type ProviderMenusCardProps = {
    orderingProviderMenus: string;
    activeIndex: number;
    index: number;
}

type SaleTypeMenusCardProps = {
    saleTypeMenus: string;
    activeIndex: number;
    index: number;
}

type StoreTradingHoursCardProps = {
    openingHours: {
        Friday: {
            ClosingTime: string;
            OpeningTime: string;
        },
        Monday: {
            ClosingTime: string;
            OpeningTime: string;
        },
        Publicholiday: {
            ClosingTime: string;
            OpeningTime: string;
        },
        Saturday: {
            ClosingTime: string;
            OpeningTime: string;
        },
        Sunday: {
            ClosingTime: string;
            OpeningTime: string;
        },
        Thursday: {
            ClosingTime: string;
            OpeningTime: string;
        },
        Tuesday: {
            ClosingTime: string;
            OpeningTime: string;
        },
        Wednesday: {
            ClosingTime: string;
            OpeningTime: string;
        },
    };
    activeIndex: number;
    index: number;
    holidayName: string | null;
    timezone: string;
}

const ConfigurationCard = ({ 
    orderingEnabled,
    holidayName,
    hiddenStore,
    longitude,
    avgOrderTime,
    latitude,
    orderAfterHours,
    timezone,
    posType,
    phone,
    activeIndex, 
    index
 }: ConfigurationCardProps) => {
    return (
        <>
            <div 
                className="carousel-item"
                style={{
                    transform: cssTransformProperties(index, activeIndex),
                    opacity: cssOpacity(index, activeIndex),
                    display: cssDisplay(index, activeIndex)
                }}
            >
                <div className="text-center my-[0.5rem] bg-2f334a/30 py-2 rounded-xl">
                    <p className="text-2xl">Web Ordering Configuration</p>

                    <p className="text-xs font-light p-1">Web Ordering settings configured in Polygon POS Management</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-left font-light text-xs p-4 mb-[1rem]">

                    <div className="flex items-center space-x-1">
                        <span className="border border-4ca662 rounded-full h-1.5 w-1.5 bg-4ca662">{" "}</span>

                        <p>Customer Ordering Interface: {yesNoString(orderingEnabled)}</p> 
                    </div>

                    <p>Public Holiday: {holidayName ? ` ${holidayName}` : "None"}</p>
        
                    <p>Hidden on The App Picklist: {yesNoString(hiddenStore)}</p>

                    <div className="flex items-center space-x-1">
                        <span className="border border-4ca662 rounded-full h-1.5 w-1.5 bg-4ca662">{" "}</span>

                        <p>Longitude: {longitude}</p> 
                    </div>

                    <div className="flex items-center space-x-1">
                        <span className="border border-4ca662 rounded-full h-1.5 w-1.5 bg-4ca662">{" "}</span>

                        <p>Average Order Time: {avgOrderTime} {avgOrderTime === 1 ? "Minute" : "Minutes"}</p>
                    </div>

                    <div className="flex items-center space-x-1">
                        <span className="border border-4ca662 rounded-full h-1.5 w-1.5 bg-4ca662">{" "}</span>

                        <p>Latitude: {latitude}</p> 
                    </div>

                    <p>Order After Hours: {yesNoString(orderAfterHours)}</p>

                    <div className="flex items-center space-x-1">
                        <span className="border border-4ca662 rounded-full h-1.5 w-1.5 bg-4ca662">{" "}</span>

                        <p>Timezone: {timezone}</p>
                    </div>

                    <p className="flex items-center">
                        <span className="mr-1"><HiOutlineDesktopComputer /></span>
                        
                        {posType === "1" ? "Legacy" : "Polygon"}
                    </p>

                    <p className="flex items-center"> 
                        <span className="mr-1 text-sm"><AiOutlinePhone /></span>
                        {phone ? `${phone}` : "None"}
                    </p>
                </div>

                <div className="flex items-center space-x-1 text-xs italic font-light">
                    <span className="border border-4ca662 rounded-full h-1.5 w-1.5 bg-4ca662">{" "}</span>

                    <p>These settings are required to enable Web Ordering.</p>
                </div>

            </div>

        </>
    );
};

const EndpointsCard = ({ activeIndex, index, brand, storeId }: EndpointsCardProps) => {
    const [pluCode, setPluCode] = useState("0");
    const [provider, setProvider] = useState("0");
    const [saleType, setSaleType] = useState("0");

    function handlePluCodeInput(event: React.ChangeEvent<HTMLInputElement>) {
        setPluCode(event.target.value);
    }

    function handleProviderInput(event: React.ChangeEvent<HTMLInputElement>) {
        setProvider(event.target.value);
    }

    function handleSaleTypeInput(event: React.ChangeEvent<HTMLInputElement>) {
        setSaleType(event.target.value);
    }

    return (
        <>
            <div 
                className="carousel-item"
                style={{
                    transform: cssTransformProperties(index, activeIndex),
                    opacity: cssOpacity(index, activeIndex),
                    display: cssDisplay(index, activeIndex)
                }}
            >
                <div className="text-center my-[0.5rem] bg-2f334a/30 py-2 rounded-xl">
                    <p className="text-2xl">API Endpoints</p>

                    <p className="font-light text-xs p-1">How to access API data that requires authentication via the browser.</p>
                </div>

                <div className="flex mb-[1rem]">
                    <div className="flex flex-col flex-1 space-y-2 p-4 font-light text-xs">
                        <div className="flex items-center space-x-1">
                            <span className="border border-4549b5 rounded-full h-1.5 w-1.5 bg-4549b5">{" "}</span>

                            <a 
                                href={`https://${brand}.redcatcloud.com.au/admin`}
                                target="_blank" 
                                className="hover:text-ffffff/80 hover:underline"
                            >
                                Get Auth Token
                            </a>
                        </div>

                        <div>
                            <span className="border mr-1 border-4ca662 rounded-full h-1.5 w-1.5 bg-4ca662">{" "}</span>

                            <input 
                                type="text"
                                placeholder="PLU Code"
                                className="bg-2f334a px-1 w-16 font-light rounded-md outline-none"
                                onChange={handlePluCodeInput}
                            />
                        </div>

                        <div>
                            <span className="border mr-1 border-cf7b3c rounded-full h-1.5 w-1.5 bg-cf7b3c">{" "}</span>

                            <input 
                                type="text"
                                placeholder="Provider"
                                className="bg-2f334a px-1 w-16 font-light rounded-md outline-none"
                                onChange={handleProviderInput}
                            />
                        </div>

                        <div>
                            <span className="border mr-1 border-cfca3c rounded-full h-1.5 w-1.5 bg-cfca3c">{" "}</span>

                            <input 
                                type="text"
                                placeholder="Sale Type"
                                className="bg-2f334a px-1 w-16 font-light rounded-md outline-none"
                                onChange={handleSaleTypeInput}
                            />
                        </div>

                    </div>


                    <div className="grid grid-cols-2 gap-x-4 gap-y-3 p-4 font-light text-xs">
                        <div className="flex items-center">
                            <span className="border mr-1 border-cf7b3c rounded-full h-1 w-1 bg-cf7b3c">{" "}</span>

                            <span className="border mr-1 border-cfca3c rounded-full h-1 w-1 bg-cfca3c">{" "}</span>

                            <a 
                                href={`https://${brand}.redcatcloud.com.au/api/v1/stores/${storeId}/menu/?load_details=true&sale_type=${saleType}&ordering_provider=${provider}`}
                                target="_blank" 
                                className="hover:text-ffffff/80 hover:underline"
                            >
                                Full Menu
                            </a>
                        </div>

                        <div className="flex items-center">
                            <span className="border mr-1 border-4ca662 rounded-full h-1 w-1 bg-4ca662">{" "}</span>

                            <span className="border mr-1 border-cf7b3c rounded-full h-1 w-1 bg-cf7b3c">{" "}</span>

                            <span className="border mr-1 border-cfca3c rounded-full h-1 w-1 bg-cfca3c">{" "}</span>

                            <a 
                                href={`https://${brand}.redcatcloud.com.au/api/v1/stores/${storeId}/menu/${pluCode}/?load_details=true&sale_type=${saleType}&ordering_provider=${provider}`}
                                target="_blank" 
                                className="hover:text-ffffff/80 hover:underline"
                            >
                                Single Item
                            </a>
                        </div>

                        <div>
                            <a 
                                href={`https://${brand}.redcatcloud.com.au/api/v1/interfaces/uber_eats/${storeId}/get_store_status_json`}
                                target="_blank" 
                                className="hover:text-ffffff/80 hover:underline"
                            >
                                Uber POS Status
                            </a>
                        </div>

                        <div>
                            <a 
                                href={`https://${brand}.redcatcloud.com.au/api/v1/interfaces/uber_eats/${storeId}/get_store_paused_status`}
                                target="_blank" 
                                className="hover:text-ffffff/80 hover:underline"
                            >
                                Uber Paused Status
                            </a>
                        </div>

                        <div>
                            <a 
                                href={`https://${brand}.redcatcloud.com.au/api/v1/store_uber_cfgs/uber/${storeId}`}
                                target="_blank" 
                                className="hover:text-ffffff/80 hover:underline"
                            >
                                Uber Config
                            </a>
                        </div>

                        <div>
                            <a 
                                href={`https://${brand}.redcatcloud.com.au/api/v1/store_uber_cfgs/doordash/${storeId}`}
                                target="_blank" 
                                className="hover:text-ffffff/80 hover:underline"
                            >
                                DoorDash Config
                            </a>
                        </div>

                        <div>
                            <a 
                                href={`https://${brand}.redcatcloud.com.au/api/v1/store_uber_cfgs/google/${storeId}`}
                                target="_blank" 
                                className="hover:text-ffffff/80 hover:underline"
                            >
                                Google Food Config
                            </a>
                        </div>

                        <div>
                            <a 
                                href={`https://${brand}.redcatcloud.com.au/api/v1/pluavailabilityrules`}
                                target="_blank" 
                                className="hover:text-ffffff/80 hover:underline"
                            >
                                Item Availability Rules
                            </a>
                        </div>

                        <div>
                            <a 
                                href={`https://${brand}.redcatcloud.com.au/api/v1/stores/${storeId}/pluqty`}
                                target="_blank" 
                                className="hover:text-ffffff/80 hover:underline"
                            >
                                PLU Quantity Levels
                            </a>
                        </div>

                        <div>
                            <a 
                                href={`https://${brand}.redcatcloud.com.au/api/v1/users`}
                                target="_blank" 
                                className="hover:text-ffffff/80 hover:underline"
                            >
                                Polygon Central Users
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-1 text-xs italic font-light">
                    <span className="border border-4549b5 rounded-full h-1.5 w-1.5 bg-4549b5">{" "}</span>

                    <p>Login into Polygon Central to cache your authentication token to the browser.</p>
                </div>

                <div className="flex items-center space-x-1 text-xs italic font-light mt-1">
                    <p> - Click an endpoint to return API data in a new browser tab.</p>
                </div>

            </div>
        </>
    );
};

const LocationDetailsCard = ({ 
    locationName, 
    storeStatus, 
    storeId, 
    address,
    suburb,
    postcode,
    state,
    country,
    lastMenuUpdate,
    activeIndex,
    index,
    brand,
    logs
}: LocationDetailsCardProps) => {
    const log = logs?.find(log => log.storeId === storeId);

    return (
        <div 
            className="carousel-item"
            style={{
                transform: cssTransformProperties(index, activeIndex),
                opacity: cssOpacity(index, activeIndex),
                display: cssDisplay(index, activeIndex)
            }}
        >
            <div className="text-center my-[0.5rem] bg-2f334a/30 py-2 rounded-xl">
                <p className="text-2xl px-2">{locationName}</p>

                <p className="text-xs text-center py-1 px-2 font-light">
                    <span className="">{address}</span>

                    <span className="capitalize">, {suburb.charAt(0).toUpperCase()}{suburb.slice(1).toLowerCase()}</span>

                    <span className="">, {postcode}</span>

                    <span className="">, {state}</span>

                    <span className="capitalize">, {country.charAt(0).toUpperCase()}{country.slice(1).toLowerCase()}</span>
                </p>
            </div>

            <div className="flex font-light text-xs mb-[1rem]">
                <div className="flex-1 px-4 py-2">

                    <div className="space-y-3">
                        {storeStatus === "Online" && (
                            <p className="text-2xl text-4ca662">{storeStatus}</p>
                        )}

                        {storeStatus === "OffLine" && (
                            <p className="text-2xl text-b32d2d">{storeStatus.charAt(0).toUpperCase()}{storeStatus.slice(1).toLowerCase()}</p>
                        )}

                        {storeStatus === "Unknown" && (
                            <p className="text-2xl text-5e4fb3">{storeStatus}</p>
                        )}

                        <p className="text-xl">ID: {storeId}</p>
                    </div>
                </div>

                <div className="space-y-3 p-4">
                    {log && storeStatus !== "Online" && (
                        <div className="flex items-center space-x-1">
                            <span 
                                className={`border  rounded-full h-1.5 w-1.5 
                                    ${storeStatus === "OffLine" && "border-b32d2d bg-b32d2d" || ""}
                                    ${storeStatus === "Unknown" && "border-5e4fb3 bg-5e4fb3" || ""}
                                `}
                            >
                                {" "}
                            </span>

                            <p>
                                Last Online: {log ? formatDateTime(log?.lastOnline.toISOString())?.slice(0, 20) : "None"}
                            </p>
                            
                        </div>
                    )}

                    <div className="flex items-center space-x-1">
                        <span className="border border-cfca3c rounded-full h-1.5 w-1.5 bg-cfca3c">{" "}</span>

                        <p>Menu Synced: {lastMenuUpdate ? formatDateTime(lastMenuUpdate) : "None"}</p>
                    </div>

                    <div>
                        <a 
                            href={`https://${brand}.redcatcloud.com.au/admin`}
                            target="_blank" 
                            className="hover:text-ffffff/80 hover:underline"
                        >
                            Polygon Central Admin Page
                        </a>
                    </div>


                    <div>
                        <a 
                            href={`https://${brand}.redcatcloud.com.au/api/v1/stores/${storeId}`}
                            target="_blank" 
                            className="hover:text-ffffff/80 hover:underline"
                        >
                            JSON Data 
                        </a>
                    </div>

                </div>

            </div>

            {log && storeStatus !== "Online" && (
                <div className="mt-[2rem] flex items-center space-x-1 text-xs italic font-light">
                    <span 
                        className={`border  rounded-full h-1.5 w-1.5 
                            ${storeStatus === "OffLine" && "border-b32d2d bg-b32d2d" || ""}
                            ${storeStatus === "Unknown" && "border-5e4fb3 bg-5e4fb3" || ""}
                        `}
                    >
                        {" "}
                    </span>

                    <p>When the location was last available for Web Ordering.</p>
                </div>
            )}

            <div className="flex items-center space-x-1 text-xs italic font-light mt-1">
                <span className="border border-cfca3c rounded-full h-1.5 w-1.5 bg-cfca3c">{" "}</span>

                <p>The last time a Menu Sync was pushed to Polygon Central.</p>
            </div>

        </div>
    );
};

const ProviderMenusCard = ({ orderingProviderMenus, activeIndex, index }: ProviderMenusCardProps) => {
    return (
        <>
            <div 
                className="carousel-item"
                style={{
                    transform: cssTransformProperties(index, activeIndex),
                    opacity: cssOpacity(index, activeIndex),
                    display: cssDisplay(index, activeIndex)
                }}
            >
                <div className="w-full text-center my-[0.5rem] bg-2f334a/30 m-auto px-4 py-2 rounded-xl">
                    <p className="text-center text-2xl">Ordering Provider Menus</p>

                    <p className="text-xs font-light p-1">Keypad menu data that reflects for External Ordering Providers</p>
                </div>

                <div className="grid grid-cols-2 font-light text-xs rounded-xl space-y-1">
                    <div className="flex items-center space">
                        <img 
                            src="http://www.greenspeares.co.uk/wp-content/uploads/2020/12/Deliveroo-logo.png" 
                            alt="Deliveroo Logo" 
                            className="rounded-full w-14 h-14"
                        /> 

                        <p>{orderingProviderMenus["2"]? orderingProviderMenus["2"]: "None"}</p> 
                    </div>

                    <div className="flex items-center ml-1.5 space-x-3">
                        <img 
                            src="https://play-lh.googleusercontent.com/AQtSF5Sl18yp3mQ2tcbOrBLekb7cyP3kyg5BB1uUuc55zfcnbkCDLHFTBwZfYiu1aDI" 
                            alt="Uber Logo" 
                            className="rounded-full w-8 h-8"
                        /> 

                        <p>{orderingProviderMenus["4"]? orderingProviderMenus["4"]: "None"}</p> 
                    </div>

                    <div className="flex items-center ml-2 space-x-2">
                        <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/ML_Logo_Stacked_RGB.svg/1200px-ML_Logo_Stacked_RGB.svg.png" 
                            alt="Menulog Logo" 
                            className="rounded-full w-10 h-10"
                        /> 

                        <p>{orderingProviderMenus["7"]? orderingProviderMenus["7"]: "None"}</p> 
                    </div>

                    <div className="flex items-center space-x-4 ml-2.5 pb-1.5">
                        <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/588px-Google_%22G%22_Logo.svg.png" 
                            alt="Google Food Logo" 
                            className="rounded-full h-6 w-6"
                        /> 

                        <p>{orderingProviderMenus["10"]? orderingProviderMenus["10"]["106"]: "None"}</p> 
                    </div>

                    <div className="flex items-center space-x-3.5 ml-3.5">
                        <img 
                            src="https://i.pinimg.com/736x/f5/f2/11/f5f2112ee6f926edfc1e3bc7ef4f5487.jpg" 
                            alt="DoorDash Logo" 
                            className="rounded-full h-7 w-7"
                        /> 

                        <p>{orderingProviderMenus["12"]? orderingProviderMenus["12"]: "None"}</p> 
                    </div>

                    <div className="flex items-center space-x-1.5">
                        <img 
                            src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/jfkxxtx3noejfdu5sqxt" 
                            alt="TabSquare Logo" 
                            className="rounded-full w-12 h-12 -ml-0.5"
                        /> 

                        <p>{orderingProviderMenus["14"]? orderingProviderMenus["14"]: "None"}</p> 
                    </div>

                    <div className="flex items-center space-x-3.5 ml-3.5 pt-1">
                        <img 
                            src="https://assets.lightspeedhq.com/img/78686acf-image-addon-mryum.png" 
                            alt="Mr Yum Logo" 
                            className="rounded-full w-7 h-7"
                        /> 

                        <p>{orderingProviderMenus["15"]? orderingProviderMenus["15"]: "None"}</p> 
                    </div>


                </div>
            </div>
        </>
    );
};

const SaleTypeMenusCard = ({ saleTypeMenus, activeIndex, index }: SaleTypeMenusCardProps) => {
    return (
        <>
            <div 
                className="carousel-item"
                style={{
                    transform: cssTransformProperties(index, activeIndex),
                    opacity: cssOpacity(index, activeIndex),
                    display: cssDisplay(index, activeIndex)
                }}
            >
                <div className="text-center my-[0.5rem] bg-2f334a/30 py-2 rounded-xl">
                    <p className="text-2xl">Sale Type Menus</p>

                    <p className="font-light text-xs p-1">Keypad menu data that reflects for Polygon Central Web Ordering</p>
                </div>

                <div className="grid grid-cols-2 gap-6 p-4 font-light text-xs">
                    <p>
                        Dine In: {saleTypeMenus["100"] ? saleTypeMenus["100"]: "None"}
                    </p>

                    <p>
                        Takeaway: {saleTypeMenus["101"] ? saleTypeMenus["101"] : "None"}
                    </p>

                    <p>
                        Pick Up: {saleTypeMenus["102"] ? saleTypeMenus["102"]: "None"}
                    </p>

                    <p>
                        Delivery: {saleTypeMenus["103"] ? saleTypeMenus["103"]: "None"}
                    </p>

                    <p>
                        Table Ordering: {saleTypeMenus["104"] ? saleTypeMenus["104"] : "None"}
                    </p>

                    <p>
                        Web Ordering: {saleTypeMenus["106"] ? saleTypeMenus["106"] : "None"}
                    </p>

                    <p>
                        Catering: {saleTypeMenus["107"] ? saleTypeMenus["107"] : "None"}
                    </p>

                </div>
            </div>
        </>
    );
};

const StoreTradingHoursCard = ({ openingHours, activeIndex, index, holidayName, timezone }: StoreTradingHoursCardProps) => {
    const localDateTime = new Date().toLocaleString("en-AU", { timeZone: timezone });

    function getDay(dateTime: string) {
        const index = dateTime?.indexOf(",");

        const date = dateTime.slice(0, index);

        const day = new Date(date).getDay();

        return day;
    }

    return (
        <>
            <div 
                className="carousel-item"
                style={{
                    transform: cssTransformProperties(index, activeIndex),
                    opacity: cssOpacity(index, activeIndex),
                    display: cssDisplay(index, activeIndex)
                }}
            >
                <div className="text-center my-[0.5rem] space-y-1 bg-2f334a/30 py-2 rounded-xl">
                    <p className=" text-2xl">
                        Store Trading Hours
                    </p>

                    <p className="text-xs font-light">Trading hours configured in Polygon POS Management</p>
                </div>

                <div className="grid grid-cols-2 gap-6 p-4 text-xs font-light mb-[1rem]">
                    <div className="flex items-center space-x-1">
                        {!holidayName && getDay(localDateTime) === 1 && (
                            <span className="border border-4ca662 rounded-full h-1.5 w-1.5 bg-4ca662">{" "}</span>
                        )}

                        <p>
                            Monday:
                            {
                                openingHours.Monday.OpeningTime === "Closed" 
                                ? " Closed" 
                                : ` ${formatTradingTime(openingHours.Monday.OpeningTime)} - ${formatTradingTime(openingHours.Monday.ClosingTime)}`
                            }
                        </p>
                    </div>

                    <div className="flex items-center space-x-1">
                        {!holidayName && getDay(localDateTime) === 2 && (
                            <span className="border border-4ca662 rounded-full h-1.5 w-1.5 bg-4ca662">{" "}</span>
                        )}

                        <p>
                            Tuesday: 
                            {
                                openingHours.Tuesday.OpeningTime === "Closed" 
                                ? " Closed" 
                                : ` ${formatTradingTime(openingHours.Tuesday.OpeningTime)} - ${formatTradingTime(openingHours.Tuesday.ClosingTime)}`
                            }
                        </p>
                    </div>

                    <div className="flex items-center space-x-1">
                        {!holidayName && getDay(localDateTime) === 3 && (
                            <span className="border border-4ca662 rounded-full h-1.5 w-1.5 bg-4ca662">{" "}</span>
                        )}
                        
                        <p>
                            Wednesday: 
                            {
                                openingHours.Wednesday.OpeningTime === "Closed" 
                                ? " Closed" 
                                : ` ${formatTradingTime(openingHours.Wednesday.OpeningTime)} - ${formatTradingTime(openingHours.Wednesday.ClosingTime)}`
                            }
                        </p>
                    </div>

                    <div className="flex items-center space-x-1">
                        {!holidayName && getDay(localDateTime) === 4 && (
                            <span className="border border-4ca662 rounded-full h-1.5 w-1.5 bg-4ca662">{" "}</span>
                        )}
                        
                        <p>
                            Thursday: 
                            {
                                openingHours.Thursday.OpeningTime === "Closed" 
                                ? " Closed" 
                                : ` ${formatTradingTime(openingHours.Thursday.OpeningTime)} - ${formatTradingTime(openingHours.Thursday.ClosingTime)}`
                            }
                        </p>
                    </div>

                    <div className="flex items-center space-x-1">
                        {!holidayName && getDay(localDateTime) === 5 && (
                            <span className="border border-4ca662 rounded-full h-1.5 w-1.5 bg-4ca662">{" "}</span>
                        )}

                        <p>
                            Friday: 
                            {
                                openingHours.Friday.OpeningTime === "Closed" 
                                ? " Closed" 
                                : ` ${formatTradingTime(openingHours.Friday.OpeningTime)} - ${formatTradingTime(openingHours.Friday.ClosingTime)}`
                            }
                        </p>
                    </div>

                    <div className="flex items-center space-x-1">
                        {!holidayName && getDay(localDateTime) === 6 && (
                            <span className="border border-4ca662 rounded-full h-1.5 w-1.5 bg-4ca662">{" "}</span>
                        )}
                        
                        <p>
                            Saturday: 
                            {
                                openingHours.Saturday.OpeningTime === "Closed" 
                                ? " Closed" 
                                : ` ${formatTradingTime(openingHours.Saturday.OpeningTime)} - ${formatTradingTime(openingHours.Saturday.ClosingTime)}`
                            }
                        </p>
                    </div>

                    <div className="flex items-center space-x-1">
                        {!holidayName && getDay(localDateTime) === 0 && (
                            <span className="border border-4ca662 rounded-full h-1.5 w-1.5 bg-4ca662"></span>
                        )}

                        <p>
                            Sunday: 
                            {
                                openingHours.Sunday.OpeningTime === "Closed" 
                                ? " Closed" 
                                : ` ${formatTradingTime(openingHours.Sunday.OpeningTime)} - ${formatTradingTime(openingHours.Sunday.ClosingTime)}`
                            }
                        </p>
                    </div>

                    <div className="flex items-center space-x-1"> 
                        {holidayName && (
                            <span className="border border-4ca662 rounded-full h-1.5 w-1.5 bg-4ca662"></span>
                        )}
                        
                        <p>
                            Public Holiday: 
                            {
                                openingHours.Publicholiday.OpeningTime === "Closed" 
                                ? " Closed" 
                                : ` ${formatTradingTime(openingHours.Publicholiday.OpeningTime)} - ${formatTradingTime(openingHours.Publicholiday.ClosingTime)}`
                            }
                        </p>
                    </div>

                </div>

                <div className="flex items-center space-x-1 text-xs italic font-light">
                    <span className="border border-4ca662 rounded-full h-1.5 w-1.5 bg-4ca662">{" "}</span>

                    {localDateTime.length === 22 && (
                        <p>
                            Trading hours for the current local time - {`${localDateTime.slice(0, 16)}${localDateTime.slice(19).toUpperCase()}`}.
                        </p>
                    )}

                    {localDateTime.length === 23 && (
                        <p>
                            Trading hours for the current local time - {`${localDateTime.slice(0, 17)}${localDateTime.slice(20).toUpperCase()}`}.
                        </p>
                    )}

                </div>

            </div>
        </>
    );
};

const StoreStatus = ({ res1, res2 }: StoreStatus) => {
    const router = useRouter();

    api.posts.getLatest.useQuery();
    api.posts.getAll.useQuery();
    api.posts.getUserPosts.useQuery();
    
    const { data: storeStatusData } = res1;

    const { data: menuData } = res2;

    const { data: statusLogs } = api.logs.getAll.useQuery({ brand: router.query.brand as string});

    const user = useUser();

    let userEmail = "";

    if (user.user?.primaryEmailAddress) {
        userEmail = user.user.primaryEmailAddress.toString();
    }

    const filteredLogsByBrand = statusLogs?.filter(function(log): boolean {
        return log.brand === router.query.brand;
    });

    const [searchLocation, setSearchLocation] = useState("");

    const [showOnlineLocations, setShowOnlineLocations] = useState(false);
    const [showOfflineLocations, setShowOfflineLocations] = useState(false);
    const [showUnknownLocations, setShowUnknownLocations] = useState(false);

    const [counter, setCounter] = useState(0);

    setTimeout(() => {
        if(counter < 1) {
            setCounter(1);
        }
    }, 2000);

    const obj: {[key: number]: number} = {};

    storeStatusData.forEach((item) => {
        obj[item.StoreID] = 3;
    });

    const [sliderState, setSliderState] = useState(obj);

    function handleNextCardBtn(sliderId: number) {
        setSliderState((prev) => {

            const currIndex = prev[sliderId] || 0;

            const newIndex = currIndex + 1 < 6 ? currIndex + 1 : currIndex;
            
            return {...prev, [sliderId]: newIndex};
        });
    }

    function handlePrevCardBtn(sliderId: number) {
        setSliderState((prev) => {

            const currIndex = prev[sliderId] || 0;

            const newIndex = currIndex - 1 >= 0 ? currIndex - 1 : currIndex;
            
            return {...prev, [sliderId]: newIndex};
        });
    }
  
    function handleSearchLocationChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchLocation(event.target.value);
    }
    
    const filteredStoreStatusData = storeStatusData?.filter((location) =>
        location.LocationName.toLowerCase().includes(searchLocation.toLowerCase())
        || location.Timezone.toLowerCase().includes(searchLocation.toLowerCase())
        || location.StoreStatus.toLowerCase().includes(searchLocation.toLowerCase())
        || location.StoreID.toString().includes(searchLocation.toLowerCase())
    );
    
    let onlineLocations: string[] = [];
    let offlineLocations: string[] = [];
    let unknownLocations: string[] = [];
    
    if (filteredStoreStatusData) {
        for (let i = 0; i < filteredStoreStatusData?.length; i++) {
            if (filteredStoreStatusData[i]?.StoreStatus === "Online") {
                onlineLocations = [...onlineLocations, filteredStoreStatusData[i]?.LocationName ?? ""];
            }
        
            if (filteredStoreStatusData[i]?.StoreStatus === "OffLine") {
                offlineLocations = [...offlineLocations, filteredStoreStatusData[i]?.LocationName ?? ""];
            }
        
            if (filteredStoreStatusData[i]?.StoreStatus === "Unknown") {
                unknownLocations = [...unknownLocations, filteredStoreStatusData[i]?.LocationName ?? ""]
            }
        }
    }

    return (
        <>
            <Header />

            {userVerification(userEmail, router.query.brand as string) ? (
                <div className="hidden lg:flex flex-col items-center justify-center ">
                    <div className="sticky top-34 hidden lg:flex lg:flex-col z-40 w-full items-center justify-center pb-[2rem]">
                        {Brands.map((brand) => (
                            <div key={brand.id}>
                                {router.query.brand === brand.query && (
                                    <Image 
                                        src={brand.image} 
                                        height={50}
                                        width={50}
                                        className="rounded-md"
                                        alt="Brand Logo"
                                    />
                                )}
                            </div>
                        ))}

                        <div className="my-[0.5rem] bg-20222e flex items-center text-xs font-normal py-2 mt-3.5 px-3 space-x-4 rounded-md">
                            <p className="">Locations: {filteredStoreStatusData?.length}</p>
                            
                            <div 
                                className={`cursor-pointer text-4ca662`}
                                onMouseEnter={(() => {setShowOnlineLocations(true)})}
                                onMouseLeave={(() => {setShowOnlineLocations(false)})}
                            >
                                Online: {onlineLocations.length}

                                {showOnlineLocations && onlineLocations.length > 0 && (
                                    <ScrollContainer className="max-h-[30rem] bg-1b1b1c text-ffffff space-y-2 z-10 p-3 rounded-lg font-light">
                                        {onlineLocations.map((location, index) => (
                                            <p key={index}>{location}</p>
                                        ))}
                                    </ScrollContainer>
                                )}

                            </div>

                            <div
                                className={`cursor-pointer text-b32d2d`}
                                onMouseEnter={(() => {setShowOfflineLocations(true)})}
                                onMouseLeave={(() => {setShowOfflineLocations(false)})}
                            >
                                Offline: {offlineLocations.length}

                                {showOfflineLocations && offlineLocations.length > 0 && (
                                    <ScrollContainer className="max-h-[30rem] bg-1b1b1c text-ffffff space-y-2 z-10 p-3 rounded-lg font-light">
                                        {offlineLocations.map((location, index) => (
                                            <p key={index}>{location}</p>
                                        ))}
                                    </ScrollContainer>
                                )}
                                
                            </div>
                        

                            <div 
                                className={`cursor-pointer text-5e4fb3`}
                                onMouseEnter={(() => {setShowUnknownLocations(true)})}
                                onMouseLeave={(() => {setShowUnknownLocations(false)})}
                            >
                                Unknown: {unknownLocations.length}

                                {showUnknownLocations && unknownLocations.length > 0 && (
                                    <ScrollContainer className="max-h-[30rem] bg-1b1b1c text-ffffff space-y-2 z-10 p-3 rounded-lg font-light">                       
                                        {unknownLocations.map((location, index) => (
                                            <p key={index}>{location}</p>
                                        ))}
                                    </ScrollContainer>
                                )}

                            </div>

                        </div>

                        <form className="mt-[0.5rem]">
                            <input
                            type="text"
                            spellCheck="false"
                            placeholder="Search Locations"
                            className="w-[20rem] bg-20222e font-light rounded-md px-[1rem] py-[0.5rem] outline-none"
                            onChange={handleSearchLocationChange}
                            />
                        </form>

                    </div>

                    <div>
                        {filteredStoreStatusData?.map(({ 
                            StoreID, 
                            LocationName, 
                            StoreStatus, 
                            Address1, 
                            Suburb, 
                            Postcode, 
                            State, 
                            Country, 
                            OrderingEnabled, 
                            HiddenStore, 
                            AvgOrderTime, 
                            Longitude,
                            Latitude,
                            HolidayName, 
                            Timezone,
                            PosType,
                            OrderingProviderMenus,
                            SaleTypeMenus,
                            OpeningHours,
                            OrderAfterHours,
                            Phone
                        }) => (
                            <div 
                                key={StoreID}  
                                className="flex flex-col justify-center items-center mb-[2rem]"
                            >
                                <div className="flex justify-center items-center">
                                    {sliderState[StoreID] as number < 5 ? (
                                        <button 
                                            className="carousel-btn-switch-card right-28"
                                            onClick={(() => handleNextCardBtn(StoreID))}
                                        >
                                            <IoIosArrowBack />
                                        </button>
                                    ): (
                                        <button 
                                            className="relative z-40 flex h-9 w-9 items-center cursor-default justify-center rounded-full border-2 border-18181a bg-18181a text-2xl opacity-75 transition duration-300 hover:opacity-100 md:h-12 md:w-12 right-28 text-18181a"
                                            onClick={(() => handleNextCardBtn(StoreID))}
                                        >
                                            <IoIosArrowBack />
                                        </button>
                                    )}


                                    <div className="carousel-container">

                                        <LocationDetailsCard 
                                            locationName={LocationName}
                                            storeStatus={StoreStatus}
                                            storeId={StoreID}
                                            address={Address1}
                                            suburb={Suburb}
                                            postcode={Postcode}
                                            state={State}
                                            country={Country}
                                            lastMenuUpdate={menuData?.LastUpdateDate}
                                            activeIndex={sliderState[StoreID] as number}
                                            index={3}
                                            brand={router.query.brand as string}
                                            logs={filteredLogsByBrand}
                                        />

                                        <ConfigurationCard 
                                            orderingEnabled={OrderingEnabled}
                                            holidayName={HolidayName}
                                            hiddenStore={HiddenStore}
                                            longitude={Longitude}
                                            avgOrderTime={AvgOrderTime}
                                            latitude={Latitude}
                                            orderAfterHours={OrderAfterHours}
                                            timezone={Timezone}
                                            posType={PosType}
                                            phone={Phone}
                                            activeIndex={sliderState[StoreID] as number}
                                            index={2}
                                        />

                                        <StoreTradingHoursCard 
                                            openingHours={OpeningHours} 
                                            activeIndex={sliderState[StoreID] as number}
                                            index={1}
                                            holidayName={HolidayName}
                                            timezone={Timezone}
                                        />

                                        <EndpointsCard 
                                            activeIndex={sliderState[StoreID] as number}
                                            index={0}
                                            brand={router.query.brand as string}
                                            storeId={StoreID}
                                        />

                                        <ProviderMenusCard 
                                            orderingProviderMenus={OrderingProviderMenus} 
                                            activeIndex={sliderState[StoreID] as number}
                                            index={4}
                                        />

                                        <SaleTypeMenusCard 
                                            saleTypeMenus={SaleTypeMenus} 
                                            activeIndex={sliderState[StoreID] as number}
                                            index={5}
                                        />
                                    </div>

                                    {sliderState[StoreID] as number > 0 ? (
                                        <button 
                                            className="carousel-btn-switch-card left-28"
                                            onClick={(() => handlePrevCardBtn(StoreID))}
                                        >
                                            <IoIosArrowForward />
                                        </button>
                                    ): (
                                        <button 
                                            className="relative z-40 flex h-9 w-9 items-center cursor-default justify-center rounded-full border-2 border-18181a bg-18181a text-2xl opacity-75 transition duration-300 hover:opacity-100 md:h-12 md:w-12 left-28 text-18181a"
                                            onClick={(() => handlePrevCardBtn(StoreID))}
                                        >
                                            <IoIosArrowForward />
                                        </button>
                                    )}

                                </div>

                                <div className="carousel-indicator-container">
                                    {Array.from(Array(6), (_, index) => (
                                        <div 
                                            key={index}
                                            className={`carousel-indicator-dots ${sliderState[StoreID] === index ? "opacity-100 w-4" : "w-2 bg-ffffff/60" || ""}`}
                                            onClick={() => {
                                                setSliderState((prev) => {
                                                    return {...prev, [StoreID]: index};
                                                });
                                            }}
                                        >
                                        </div>
                                    ))}

                                </div>

                            </div>
                        ))}

                    </div>
                    
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

export default StoreStatus;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const brand = context?.query.brand as string;

    const res1: unknown = await fetch(`https://${brand}.redcatcloud.com.au/api/v1/stores`).then(res => res.json());

    const res2: unknown = await fetch(`https://${brand}.redcatcloud.com.au/api/v1/stores/1/menu`).then(res => res.json());

    return {
        props: {
            res1,
            res2
        },
    };
};

const ScrollContainer = styled.div`
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
    max-height: 12rem;
    overflow: auto;
    position: absolute;
`