import React from "react";

import { cssDisplay } from "~/utils/cssDisplay";
import { cssOpacity } from "~/utils/cssOpacity";
import { cssTransformProperties } from "~/utils/cssTransformProperties";
import { yesNoString } from "~/utils/yesNoString";

import { HiOutlineDesktopComputer } from "react-icons/hi";
import { AiOutlinePhone } from "react-icons/ai";

interface Props {
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
 }: Props) => {
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
                <div className='text-center my-[0.5rem] bg-2f334a/30 py-2 rounded-xl'>
                    <p className='text-2xl'>Web Ordering Configuration</p>

                    <p className="text-xs font-light p-1">Web Ordering settings configured in Polygon POS Management</p>
                </div>

                <div className='grid grid-cols-2 gap-4 text-left font-light text-xs p-4 mb-[1rem]'>

                    <div className="flex items-center space-x-1">
                        <span className='border border-4ca662 rounded-full h-1.5 w-1.5 bg-4ca662'>{' '}</span>

                        <p>Customer Ordering Interface: {yesNoString(orderingEnabled)}</p> 
                    </div>

                    <p>Public Holiday: {holidayName ? ` ${holidayName}` : 'None'}</p>
        
                    <p>Hidden on The App Picklist: {yesNoString(hiddenStore)}</p>

                    <div className="flex items-center space-x-1">
                        <span className='border border-4ca662 rounded-full h-1.5 w-1.5 bg-4ca662'>{' '}</span>

                        <p>Longitude: {longitude}</p> 
                    </div>

                    <div className="flex items-center space-x-1">
                        <span className='border border-4ca662 rounded-full h-1.5 w-1.5 bg-4ca662'>{' '}</span>

                        <p>Average Order Time: {avgOrderTime} {avgOrderTime === 1 ? 'Minute' : 'Minutes'}</p>
                    </div>

                    <div className="flex items-center space-x-1">
                        <span className='border border-4ca662 rounded-full h-1.5 w-1.5 bg-4ca662'>{' '}</span>

                        <p>Latitude: {latitude}</p> 
                    </div>

                    <p>Order After Hours: {yesNoString(orderAfterHours)}</p>

                    <div className="flex items-center space-x-1">
                        <span className='border border-4ca662 rounded-full h-1.5 w-1.5 bg-4ca662'>{' '}</span>

                        <p>Timezone: {timezone}</p>
                    </div>

                    <p className="flex items-center">
                        <span className="mr-1"><HiOutlineDesktopComputer /></span>
                        
                        {posType === '1' ? 'Legacy' : 'Polygon'}
                    </p>

                    <p className="flex items-center"> 
                        <span className="mr-1 text-sm"><AiOutlinePhone /></span>
                        {phone ? `${phone}` : 'None'}
                    </p>
                </div>

                <div className="flex items-center space-x-1 text-xs italic font-light">
                    <span className='border border-4ca662 rounded-full h-1.5 w-1.5 bg-4ca662'>{' '}</span>

                    <p>These settings are required to enable Web Ordering.</p>
                </div>

            </div>

        </>
    );
};

export default ConfigurationCard;