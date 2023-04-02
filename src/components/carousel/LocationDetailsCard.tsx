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
}

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
                <div className='text-center my-[0.5rem] bg-2f334a/30 py-2 rounded-xl'>
                    <p className="text-2xl px-2">{locationName}</p>

                    <p className="text-xs text-center p-1 font-light">
                        <span className=''>{address}</span>

                        <span className='capitalize'>, {suburb.charAt(0).toUpperCase()}{suburb.slice(1).toLowerCase()}</span>

                        <span className=''>, {postcode}</span>

                        <span className=''>, {state}</span>

                        <span className='capitalize'>, {country.charAt(0).toUpperCase()}{country.slice(1).toLowerCase()}</span>
                    </p>
                </div>

                <div className="flex font-light text-xs mb-[1rem]">
                    <div className="flex-1 space-y-4 px-4 py-2">

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

                            <p className='text-xl'>ID: {storeId}</p>
                        </div>

                        <div className="flex items-center space-x-1">
                            <span className='border border-4ca662 rounded-full h-1.5 w-1.5 bg-4ca662'>{' '}</span>

                            <p>Last Online: None</p>
                        </div>

                        <div className="flex items-center space-x-1">
                            <span className='border border-4ca662 rounded-full h-1.5 w-1.5 bg-4ca662'>{' '}</span>

                            <p>Menu Synced: {lastMenuUpdate ? formatDateTime(lastMenuUpdate) : "None"}</p>
                        </div>
                    </div>

                    <div className="space-y-4 p-4">
                        <div className="flex items-center space-x-1">
                            <p>
                                Polygon Central: {" "}

                                <a 
                                    href={`https://${brand}.redcatcloud.com.au/admin`}
                                    target="_blank" 
                                    className="hover:text-ffffff/80 hover:underline"
                                >
                                    Admin Url
                                </a>
                            </p>
                        </div>

                        <div className="flex items-center space-x-1">
                            <p>
                                API Endpoint: {" "}

                                <a 
                                    href={`https://${brand}.redcatcloud.com.au/api/v1/stores/${storeId}`}
                                    target="_blank" 
                                    className="hover:text-ffffff/80 hover:underline"
                                >
                                    {`api/v1/stores/${storeId}`}
                                </a>
                            </p>
                        </div>

                    </div>

                </div>

            </div>
        </>
    );
};

export default LocationDetailsCard;