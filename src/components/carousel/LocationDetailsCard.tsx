import type { StoreStatusLogs } from "@prisma/client";
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
    logs: StoreStatusLogs[] | undefined
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
    brand,
    logs
}: Props) => {
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

export default LocationDetailsCard;