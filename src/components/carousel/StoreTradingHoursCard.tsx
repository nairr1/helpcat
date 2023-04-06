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
    holidayName: string | null;
    timezone: string;
}

const StoreTradingHoursCard = ({ openingHours, activeIndex, index, holidayName, timezone }: Props) => {
    const localDateTime = new Date().toLocaleString("en-US", { timeZone: timezone });

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

                    <div className="flex items-center sapce-x-1">
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

                    {localDateTime.charAt(10) === "1" ? (
                        <p>
                            Trading hours for the current local time - {`${localDateTime.slice(0, 15)}${localDateTime.slice(18)}`}.
                        </p>
                    ) : (
                        <p>Trading hours for the current local time - {`${localDateTime.slice(0, 14)}${localDateTime.slice(17)}`}.</p>
                    )}
                </div>

            </div>
        </>
    );
};

export default StoreTradingHoursCard;