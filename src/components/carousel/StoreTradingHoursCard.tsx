import React from "react";
import { cssDisplay } from "~/utils/cssDisplay";
import { cssOpacity } from "~/utils/cssOpacity";
import { cssTransformProperties } from "~/utils/cssTransformProperties";
import { formatTradingTime } from "~/utils/formatTradingTime";

interface Props {
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
}

const StoreTradingHoursCard = ({ openingHours, activeIndex, index }: Props) => {
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
                    <p className=' text-3xl'>
                        Store Trading Hours
                    </p>

                    <p className="text-xs font-light">Trading hours configured in Polygon POS Management</p>
                </div>

                <div className='grid grid-cols-2 gap-4 p-4 text-xs font-light'>
                    <p>
                        Monday: 
                        {
                            openingHours.Monday.OpeningTime === 'Closed' 
                            ? ' Closed' 
                            : ` ${formatTradingTime(openingHours.Monday.OpeningTime)} - ${formatTradingTime(openingHours.Monday.ClosingTime)}`
                        }
                    </p>
                    <p> 
                        Tuesday: 
                        {
                            openingHours.Tuesday.OpeningTime === 'Closed' 
                            ? ' Closed' 
                            : ` ${formatTradingTime(openingHours.Tuesday.OpeningTime)} - ${formatTradingTime(openingHours.Tuesday.ClosingTime)}`
                        }
                    </p>
                    <p> 
                        Wednesday: 
                        {
                            openingHours.Wednesday.OpeningTime === 'Closed' 
                            ? ' Closed' 
                            : ` ${formatTradingTime(openingHours.Wednesday.OpeningTime)} - ${formatTradingTime(openingHours.Wednesday.ClosingTime)}`
                        }
                    </p>
                    <p> 
                        Thursday: 
                        {
                            openingHours.Thursday.OpeningTime === 'Closed' 
                            ? ' Closed' 
                            : ` ${formatTradingTime(openingHours.Thursday.OpeningTime)} - ${formatTradingTime(openingHours.Thursday.ClosingTime)}`
                        }
                    </p>
                    <p> 
                        Friday: 
                        {
                            openingHours.Friday.OpeningTime === 'Closed' 
                            ? ' Closed' 
                            : ` ${formatTradingTime(openingHours.Friday.OpeningTime)} - ${formatTradingTime(openingHours.Friday.ClosingTime)}`
                        }
                    </p>
                    <p> 
                        Saturday: 
                        {
                            openingHours.Saturday.OpeningTime === 'Closed' 
                            ? ' Closed' 
                            : ` ${formatTradingTime(openingHours.Saturday.OpeningTime)} - ${formatTradingTime(openingHours.Saturday.ClosingTime)}`
                        }
                    </p>
                    <p> 
                        Sunday: 
                        {
                            openingHours.Sunday.OpeningTime === 'Closed' 
                            ? ' Closed' 
                            : ` ${formatTradingTime(openingHours.Sunday.OpeningTime)} - ${formatTradingTime(openingHours.Sunday.ClosingTime)}`
                        }
                    </p>
                    <p> 
                        Public Holiday: 
                        {
                            openingHours.Publicholiday.OpeningTime === 'Closed' 
                            ? ' Closed' 
                            : ` ${formatTradingTime(openingHours.Publicholiday.OpeningTime)} - ${formatTradingTime(openingHours.Publicholiday.ClosingTime)}`
                        }
                    </p>
                </div>

            </div>
        </>
    );
};

export default StoreTradingHoursCard;