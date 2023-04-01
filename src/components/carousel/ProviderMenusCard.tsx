import React from "react";
import { cssDisplay } from "~/utils/cssDisplay";
import { cssOpacity } from "~/utils/cssOpacity";
import { cssTransformProperties } from "~/utils/cssTransformProperties";

interface Props {
    orderingProviderMenus: string;
    activeIndex: number;
    index: number;
};

const ProviderMenusCard = ({ orderingProviderMenus, activeIndex, index }: Props) => {
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
                <div className='text-center mt-[1rem] space-y-1 bg-2f334a/30  m-auto w-fit px-4 py-2 rounded-xl text-3xl'>
                    <p className='text-center '>Ordering Provider Menus</p>

                    <p className="text-xs font-light">Keypad data that reflects for external ordering provider menus</p>
                </div>

                <div className='p-4 font-light text-xs rounded-xl space-y-3'>
                    <p>
                        Deliveroo: {orderingProviderMenus['2']? orderingProviderMenus['2']: 'None'}
                    </p>

                    <p>
                        Uber: {orderingProviderMenus['4'] ? orderingProviderMenus['4'] : 'None'}
                    </p>

                    <p>
                        Menulog: {orderingProviderMenus['7'] ? orderingProviderMenus['7'] : 'None'}
                    </p>

                    <p>
                        Google: {orderingProviderMenus['10'] ? orderingProviderMenus['10']['106'] : 'None'}
                    </p>

                    <p>
                        DoorDash: {orderingProviderMenus['12'] ? orderingProviderMenus['12'] : 'None'}
                    </p>

                    <p>
                        TabSquare: {orderingProviderMenus['14'] ? orderingProviderMenus['14'] : 'None'}
                    </p>

                    <p>
                        Mr Yum: {orderingProviderMenus['15'] ? orderingProviderMenus['15'] : 'None'}
                    </p>

                </div>
            </div>
        </>
    );
};

export default ProviderMenusCard;