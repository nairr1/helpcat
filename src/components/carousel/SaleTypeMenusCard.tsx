import React from "react";
import { cssDisplay } from "~/utils/cssDisplay";
import { cssOpacity } from "~/utils/cssOpacity";
import { cssTransformProperties } from "~/utils/cssTransformProperties";

interface Props {
    saleTypeMenus: string;
    activeIndex: number;
    index: number;
}

const SaleTypeMenusCard = ({ saleTypeMenus, activeIndex, index }: Props) => {
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
                <div className='text-center mt-[1rem] bg-2f334a/30 py-2 rounded-xl'>
                    <p className='text-2xl'>Sale Type Menus</p>

                    <p className="font-light text-xs p-1">Keypad menu data that reflects for Polygon Central Web Ordering</p>
                </div>

                <div className='space-y-3 p-4 font-light text-xs'>
                    <p>
                        Dine In: {saleTypeMenus['100'] ? saleTypeMenus['100']: 'None'}
                    </p>

                    <p>
                        Takeaway: {saleTypeMenus['101'] ? saleTypeMenus['101'] : 'None'}
                    </p>

                    <p>
                        Pick Up: {saleTypeMenus['102'] ? saleTypeMenus['102']: 'None'}
                    </p>

                    <p>
                        Delivery: {saleTypeMenus['103'] ? saleTypeMenus['103']: 'None'}
                    </p>

                    <p>
                        Table Ordering: {saleTypeMenus['104'] ? saleTypeMenus['104'] : 'None'}
                    </p>

                    <p>
                        Web Ordering: {saleTypeMenus['106'] ? saleTypeMenus['106'] : 'None'}
                    </p>

                    <p>
                        Catering: {saleTypeMenus['107'] ? saleTypeMenus['107'] : 'None'}
                    </p>

                </div>
            </div>
        </>
    );
};

export default SaleTypeMenusCard;