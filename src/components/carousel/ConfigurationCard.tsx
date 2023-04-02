import React from "react";
import { cssDisplay } from "~/utils/cssDisplay";
import { cssOpacity } from "~/utils/cssOpacity";
import { cssTransformProperties } from "~/utils/cssTransformProperties";
import { yesNoString } from "~/utils/yesNoString";

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
                <div className='text-center mt-[1rem] bg-2f334a/30 py-2 rounded-xl'>
                    <p className='text-2xl'>Configuration</p>

                    <p className="text-xs font-light p-1">Web Ordering settings configured in Polygon POS Management</p>
                </div>

                <div className='grid grid-cols-2 gap-4 text-left font-light text-xs p-4'>

                    <p>Customer Ordering Interface: {yesNoString(orderingEnabled)}</p>

                    <p>Public Holiday: {holidayName ? ` ${holidayName}` : 'None'}</p>

                    <p>Hidden on The App Picklist: {yesNoString(hiddenStore)}</p>

                    <p>Longitude: {longitude}</p>

                    <p>Average Order Time: {avgOrderTime} {avgOrderTime === 1 ? 'Minute' : 'Minutes'}</p>

                    <p>Latitude: {latitude}</p>

                    <p>Order After Hours: {yesNoString(orderAfterHours)}</p>

                    <p>Timezone: {timezone}</p>

                    <p>POS: {posType === '1' ? 'Legacy' : 'Polygon'}</p>

                    <p>Phone: {phone ? `${phone}` : 'None'}</p>
                </div>

            </div>

        </>
    );
};

export default ConfigurationCard;