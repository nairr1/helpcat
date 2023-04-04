import type { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

import styled from "styled-components";
import { useUser } from "@clerk/nextjs";

import ConfigurationCard from "~/components/carousel/ConfigurationCard";
import LocationDetailsCard from "~/components/carousel/LocationDetailsCard";
import ProviderMenusCard from "~/components/carousel/ProviderMenusCard";
import SaleTypeMenusCard from "~/components/carousel/SaleTypeMenusCard";
import StoreTradingHoursCard from "~/components/carousel/StoreTradingHoursCard";
import EndpointsCard from "~/components/carousel/EndpointsCard";

import { Brands } from "~/utils/brands";
import { userVerification } from "~/utils/userVerification";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const StoreStatus = ({ res1, res2 }: StoreStatus) => {
    const { data: storeStatusData } = res1;

    const { data: menuData } = res2;

    const user = useUser();

    const router = useRouter();

    const [searchLocation, setSearchLocation] = useState("");

    const [showOnlineLocations, setShowOnlineLocations] = useState(false);
    const [showOfflineLocations, setShowOfflineLocations] = useState(false);
    const [showUnknownLocations, setShowUnknownLocations] = useState(false);

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

    console.log(user.user?.fullName)

    return (
        <>
            {userVerification(user.user?.primaryEmailAddress?.toString() || "", router.query.brand as string) ? (
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

                        <div className='my-[0.5rem] bg-20222e flex items-center text-xs font-normal py-2 mt-3.5 px-3 space-x-4 rounded-md'>
                            <p className=''>Locations: {filteredStoreStatusData?.length}</p>
                            
                            <div 
                                className={`cursor-pointer text-4ca662`}
                                onMouseEnter={(() => {setShowOnlineLocations(true)})}
                                onMouseLeave={(() => {setShowOnlineLocations(false)})}
                            >
                                Online: {onlineLocations.length}

                                {showOnlineLocations && onlineLocations.length > 0 && (
                                    <ScrollContainer className='max-h-[30rem] bg-1b1b1c text-ffffff space-y-2 z-10 p-3 rounded-lg font-light'>
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
                                    <ScrollContainer className='max-h-[30rem] bg-1b1b1c text-ffffff space-y-2 z-10 p-3 rounded-lg font-light'>
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
                                    <ScrollContainer className='max-h-[30rem] bg-1b1b1c text-ffffff space-y-2 z-10 p-3 rounded-lg font-light'>                       
                                        {unknownLocations.map((location, index) => (
                                            <p key={index}>{location}</p>
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
                            className='w-[20rem] bg-20222e font-light rounded-md px-[1rem] py-[0.5rem] outline-none'
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
                                className="flex justify-center items-center"
                            >
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
                        ))}

                    </div>
                    
                </div>
            ) : (
                <>
                    {user?.user && (
                        <div className="text-center mt-[2rem]">
                            <p>YOU AREN&apos;T AUTHORIZED TO VIEW THIS PAGE.</p>
                            
                        </div>
                    )}
                </>
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