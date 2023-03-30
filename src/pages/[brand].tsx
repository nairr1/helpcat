import type { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import { Brands } from "~/utils/brands";
import { formatDateTime } from "~/utils/formatDateTime";
import { formatTradingTime } from "~/utils/formatTradingTime";
import { yesNoString } from "~/utils/yesNoString";

const StoreStatus = ({ res1, res2 }: StoreStatus) => {
    const { data: storeStatusData } = res1;

    const { data: menuData } = res2;

    const router = useRouter();

    const [searchLocation, setSearchLocation] = useState("");
    const [showOnlineLocations, setShowOnlineLocations] = useState(false);
    const [showOfflineLocations, setShowOfflineLocations] = useState(false);
    const [showUnknownLocations, setShowUnknownLocations] = useState(false);
  
    const handleSearchLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchLocation(event.target.value);
    };
    
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
        <div className='hidden lg:flex flex-col items-center justify-center '>
            <div className='sticky top-34 hidden lg:flex lg:flex-col z-40 w-full items-center justify-center pb-[2rem]'>
                {Brands.map((brand) => (
                    <div key={brand.id}>
                        {router.query.brand === brand.query && (
                            <Image 
                                src={brand.image} 
                                height={50}
                                width={50}
                                className='rounded-md'
                                alt="Brand Logo"
                            />
                        )}
                    </div>
                ))}

                <div className='my-[0.5rem] bg-282a36 flex items-center text-xs font-normal py-2 mt-3.5 px-3 space-x-4 rounded-md'>
                    <p className=''>Locations: {filteredStoreStatusData?.length}</p>
                    
                    <div 
                        className={`${offlineLocations.length > 0 && 'cursor-pointer'} text-2db34d`}
                        onMouseEnter={(() => {setShowOnlineLocations(true)})}
                        onMouseLeave={(() => {setShowOnlineLocations(false)})}
                    >
                        Online: {onlineLocations.length}

                        {showOnlineLocations && onlineLocations.length > 0 && (
                            <ScrollContainer className='max-h-[30rem] bg-3a3d52 text-ffffff z-10 p-2 rounded-lg text-[10px] font-light'>
                                {onlineLocations.map((location, index) => (
                                    <p key={index}>{location}</p>
                                ))}
                            </ScrollContainer>
                        )}

                    </div>

                    <div
                        className={`${offlineLocations.length > 0 && 'cursor-pointer'} text-b32d2d`}
                        onMouseEnter={(() => {setShowOfflineLocations(true)})}
                        onMouseLeave={(() => {setShowOfflineLocations(false)})}
                    >
                        Offline: {offlineLocations.length}

                        {showOfflineLocations && offlineLocations.length > 0 && (
                            <ScrollContainer className='max-h-[30rem] bg-3a3d52 text-ffffff z-10 p-2 rounded-lg text-[10px] font-light'>
                                {offlineLocations.map((location, index) => (
                                    <p key={index} className='mr-2'>{location}</p>
                                ))}
                            </ScrollContainer>
                        )}
                        
                    </div>
                

                    <div 
                        className={`${offlineLocations.length > 0 && 'cursor-pointer'} text-5e4fb3`}
                        onMouseEnter={(() => {setShowUnknownLocations(true)})}
                        onMouseLeave={(() => {setShowUnknownLocations(false)})}
                    >
                        Unknown: {unknownLocations.length}

                        {showUnknownLocations && unknownLocations.length > 0 && (
                            <ScrollContainer className='max-h-[30rem] bg-3a3d52 text-ffffff z-10 p-2 rounded-lg text-[10px] font-light'>                       
                                {unknownLocations.map((location, index) => (
                                    <p key={index} className='mr-2'>{location}</p>
                                ))}
                            </ScrollContainer>
                        )}

                    </div>

                </div>

                <form className='mt-[0.5rem]'>
                    <input
                    type='text'
                    spellCheck='false'
                    placeholder='Search Locations'
                    className='w-[20rem] bg-282a36 font-light rounded-md px-[1rem] py-[0.5rem] outline-none'
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
                        className='cursor-pointer transform transition duration-500 bg-282a36 hover:scale-[1.01] text-sm font-light mb-[2rem] p-[0.25rem] rounded-md'
                    >
                        <div className='flex space-x-4 p-[1rem]'>
                            <div className='flex-1 flex flex-col items-start justify-center bg-b5bfc9 shadow-lg p-[1rem] rounded-md'>
                                <p className='text-2xl mb-1 px-1 py-0.5 mr-[1rem] text-edc2d8ff font-normal rounded-md '>{LocationName}</p>

                                {StoreStatus === "Online" && (
                                    <p className="text-lg text-2db34d">{StoreStatus}</p>
                                )}

                                {StoreStatus === "OffLine" && (
                                    <p className="text-lg text-b32d2d">{StoreStatus.charAt(0).toUpperCase()}{StoreStatus.slice(1).toLowerCase()}</p>
                                )}

                                {StoreStatus === "Unknown" && (
                                    <p className="text-lg text-5e4fb3">{StoreStatus}</p>
                                )}

                                <p className='text-lg my-1'>ID: {StoreID}</p>

                                <p className='w-[30rem] pr-[1rem] my-1'>Address: {Address1}, {Suburb}, {Postcode}, {State}, {Country}</p>

                                <p className="mt-1">Menu updated: {formatDateTime(menuData?.LastUpdateDate)}</p>
                            </div>

                            <div className='flex-1 p-[1rem] rounded-md bg-b5bfc9 shadow-lg'>
                                <div className='mb-3'>
                                    <p className='text-center font-normal underline'>Configuration</p>
                                </div>

                                <div className='grid grid-cols-2 text-left text-xs'>
                                    <div className='py-1 px-4'>
                                        <p className='cursor-pointer rounded-md px-1 py-0.5'>Customer Ordering Interface: {yesNoString(OrderingEnabled)}</p>
                                    </div>

                                    <div className='py-1 px-4'>
                                        <p className='px-1 py-0.5 cursor-pointer rounded-md'>
                                            Public Holiday: {HolidayName ? ` ${HolidayName}` : 'None'}
                                        </p>
                                    </div>

                                    <div className='py-1 px-4 mt-0.5'>
                                        <p className='rounded-md cursor-pointer px-1 py-0.5'>Hidden on The App Picklist: {yesNoString(HiddenStore)}</p>
                                    </div>

                                    <div className='py-1 px-4 mt-0.5'>
                                        <p className='rounded-md cursor-pointer px-1 py-0.5'>Longitude: {Longitude}</p>
                                    </div>

                                    <div className='py-1 px-4 mt-0.5'>
                                        <p className='rounded-md cursor-pointer px-1 py-0.5'>
                                            Average Order Time: {AvgOrderTime} {AvgOrderTime === 1 ? 'Minute' : 'Minutes'}
                                        </p>
                                    </div>

                                    <div className='py-1 px-4 mt-0.5'>
                                        <p className='px-1 py-0.5 cursor-pointer  rounded-md'>Latitude: {Latitude}</p>
                                    </div>

                                    <div className='py-1 px-4 mt-0.5'>
                                        <p className='cursor-pointer rounded-md px-1 py-0.5'>Order After Hours: {yesNoString(OrderAfterHours)}</p>
                                    </div>

                                    <div className='py-1 px-4 mt-0.5'>
                                        <p className='px-1 py-0.5 cursor-pointer ounded-md'>Timezone: {Timezone}</p>
                                    </div>

                                    <div className='py-1 px-4 mt-0.5'>
                                        <p className='px-1 py-0.5 cursor-pointer rounded-md'>
                                            POS: {PosType === '1' ? 'Legacy' : 'Polygon'}
                                        </p>
                                    </div>

                                    <div className='py-1 px-4 mt-0.5'>
                                        <p className='cursor-pointer rounded-md px-1 py-0.5'>
                                            Phone: {Phone ? `${Phone}` : 'None'}
                                        </p>
                                    </div>
                                    
                                </div>

                            </div>

                        </div>

                        <div className='flex space-x-[5rem] rounded-md px-[1rem] pb-[1rem]'>
                            <div className='flex flex-col flex-1 bg-b5bfc9 shadow-lg p-[1rem] rounded-md'>
                                <div className='mb-4'>
                                    <p className='text-center font-normal underline'>
                                        Store Trading Hours
                                    </p>
                                </div>

                                <div className='w-max space-y-3 text-xs'>
                                    <p>
                                        Monday: 
                                        {
                                            OpeningHours.Monday.OpeningTime === 'Closed' 
                                            ? ' Closed' 
                                            : ` ${formatTradingTime(OpeningHours.Monday.OpeningTime)} - ${formatTradingTime(OpeningHours.Monday.ClosingTime)}`
                                        }
                                    </p>
                                    <p> 
                                        Tuesday: 
                                        {
                                            OpeningHours.Tuesday.OpeningTime === 'Closed' 
                                            ? ' Closed' 
                                            : ` ${formatTradingTime(OpeningHours.Tuesday.OpeningTime)} - ${formatTradingTime(OpeningHours.Tuesday.ClosingTime)}`
                                        }
                                    </p>
                                    <p> 
                                        Wednesday: 
                                        {
                                            OpeningHours.Wednesday.OpeningTime === 'Closed' 
                                            ? ' Closed' 
                                            : ` ${formatTradingTime(OpeningHours.Wednesday.OpeningTime)} - ${formatTradingTime(OpeningHours.Wednesday.ClosingTime)}`
                                        }
                                    </p>
                                    <p> 
                                        Thursday: 
                                        {
                                            OpeningHours.Thursday.OpeningTime === 'Closed' 
                                            ? ' Closed' 
                                            : ` ${formatTradingTime(OpeningHours.Thursday.OpeningTime)} - ${formatTradingTime(OpeningHours.Thursday.ClosingTime)}`
                                        }
                                    </p>
                                    <p> 
                                        Friday: 
                                        {
                                            OpeningHours.Friday.OpeningTime === 'Closed' 
                                            ? ' Closed' 
                                            : ` ${formatTradingTime(OpeningHours.Friday.OpeningTime)} - ${formatTradingTime(OpeningHours.Friday.ClosingTime)}`
                                        }
                                    </p>
                                    <p> 
                                        Saturday: 
                                        {
                                            OpeningHours.Saturday.OpeningTime === 'Closed' 
                                            ? ' Closed' 
                                            : ` ${formatTradingTime(OpeningHours.Saturday.OpeningTime)} - ${formatTradingTime(OpeningHours.Saturday.ClosingTime)}`
                                        }
                                    </p>
                                    <p> 
                                        Sunday: 
                                        {
                                            OpeningHours.Sunday.OpeningTime === 'Closed' 
                                            ? ' Closed' 
                                            : ` ${formatTradingTime(OpeningHours.Sunday.OpeningTime)} - ${formatTradingTime(OpeningHours.Sunday.ClosingTime)}`
                                        }
                                    </p>
                                    <p> 
                                        Public Holiday: 
                                        {
                                            OpeningHours.Publicholiday.OpeningTime === 'Closed' 
                                            ? ' Closed' 
                                            : ` ${formatTradingTime(OpeningHours.Publicholiday.OpeningTime)} - ${formatTradingTime(OpeningHours.Publicholiday.ClosingTime)}`
                                        }
                                    </p>
                                </div>

                            </div>

                            <div className='flex flex-col flex-1 bg-b5bfc9 shadow-lg p-[1rem] rounded-md'>
                                <div className='mb-4'>
                                    <p className='text-center font-normal underline'>Ordering Provider Menus</p>
                                </div>

                                <div className='w-max space-y-3 text-xs'>
                                    <p>
                                        Deliveroo: {OrderingProviderMenus['2']? OrderingProviderMenus['2']: 'None'}
                                    </p>

                                    <p>
                                        Uber: {OrderingProviderMenus['4'] ? OrderingProviderMenus['4'] : 'None'}
                                    </p>

                                    <p>
                                        Menulog: {OrderingProviderMenus['7'] ? OrderingProviderMenus['7'] : 'None'}
                                    </p>

                                    <p>
                                        Google: {OrderingProviderMenus['10'] ? OrderingProviderMenus['10']['106'] : 'None'}
                                    </p>

                                    <p>
                                        DoorDash: {OrderingProviderMenus['12'] ? OrderingProviderMenus['12'] : 'None'}
                                    </p>

                                    <p>
                                        TabSquare: {OrderingProviderMenus['14'] ? OrderingProviderMenus['14'] : 'None'}
                                    </p>

                                    <p>
                                        Mr Yum: {OrderingProviderMenus['15'] ? OrderingProviderMenus['15'] : 'None'}
                                    </p>

                                </div>
                            </div>

                            <div className='flex flex-col flex-1 bg-b5bfc9 shadow-lg p-[1rem] rounded-md'>
                                <div className='mb-4'>
                                    <p className='text-center font-normal underline'>Sale Type Menus</p>
                                </div>

                                <div className='w-max space-y-3 text-xs'>
                                    <p>
                                        Dine In: {SaleTypeMenus['100'] ? SaleTypeMenus['100']: 'None'}
                                    </p>

                                    <p>
                                        Takeaway: {SaleTypeMenus['101'] ? SaleTypeMenus['101'] : 'None'}
                                    </p>

                                    <p>
                                        Pick Up: {SaleTypeMenus['102'] ? SaleTypeMenus['102']: 'None'}
                                    </p>

                                    <p>
                                        Delivery: {SaleTypeMenus['103'] ? SaleTypeMenus['103']: 'None'}
                                    </p>

                                    <p>
                                        Table Ordering: {SaleTypeMenus['104'] ? SaleTypeMenus['104'] : 'None'}
                                    </p>

                                    <p>
                                        Web Ordering: {SaleTypeMenus['106'] ? SaleTypeMenus['106'] : 'None'}
                                    </p>

                                    <p>
                                        Catering: {SaleTypeMenus['107'] ? SaleTypeMenus['107'] : 'None'}
                                    </p>

                                </div>
                            </div>

                        </div>

                    </div>
                ))}

            </div>

        </div>

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