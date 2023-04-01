import React from "react";
import { cssDisplay } from "~/utils/cssDisplay";
import { cssOpacity } from "~/utils/cssOpacity";
import { cssTransformProperties } from "~/utils/cssTransformProperties";
import { formatDateTime } from "~/utils/formatDateTime";

interface Props {
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
    brand
}: Props) => {
    return (
        <>
            <div 
                className='carousel-item'
                style={{
                    transform: cssTransformProperties(index, activeIndex),
                    opacity: cssOpacity(index, activeIndex),
                    display: cssDisplay(index, activeIndex)
                }}
            >
                <div className='text-center mt-[1rem] space-y-1 bg-2f334a/30 py-2 rounded-xl'>
                    <p className="text-3xl">{locationName}</p>

                    <p className="text-xs text-center font-light">
                        <span className=''>Address: {address}</span>

                        <span className='capitalize'>, {suburb.charAt(0).toUpperCase()}{suburb.slice(1).toLowerCase()}</span>

                        <span className=''>, {postcode}</span>

                        <span className=''>, {state}</span>

                        <span className='capitalize'>, {country.charAt(0).toUpperCase()}{country.slice(1).toLowerCase()}</span>
                    </p>
                </div>

                <div className=" font-light text-xs space-y-3 p-4 rounded-xl">
                    {storeStatus === "Online" && (
                        <p className="text-lg text-4ca662">{storeStatus}</p>
                    )}

                    {storeStatus === "OffLine" && (
                        <p className="text-lg text-b32d2d">{storeStatus.charAt(0).toUpperCase()}{storeStatus.slice(1).toLowerCase()}</p>
                    )}

                    {storeStatus === "Unknown" && (
                        <p className="text-lg text-5e4fb3">{storeStatus}</p>
                    )}

                    <p className=''>• ID: {storeId}</p>

                    <p>• Last Online: None</p>

                    <p className="">• Menu Synced: {lastMenuUpdate ? formatDateTime(lastMenuUpdate) : "None"}</p>

                    <p>
                        • Polygon Central: {" "}
                        <a 
                            href={`https://${brand}.redcatcloud.com.au/admin`}
                            target="_blank" 
                        >
                        {`${brand}.redcatcloud.com.au`}
                        </a>
                    </p>

                </div>
            </div>
        </>
    );
};

export default LocationDetailsCard;