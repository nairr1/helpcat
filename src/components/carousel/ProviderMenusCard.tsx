import React from "react";
import { cssDisplay } from "~/utils/cssDisplay";
import { cssOpacity } from "~/utils/cssOpacity";
import { cssTransformProperties } from "~/utils/cssTransformProperties";

interface Props {
    orderingProviderMenus: string;
    activeIndex: number;
    index: number;
}

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
                <div className='w-full text-center mt-[1rem] bg-2f334a/30 m-auto px-4 py-2 rounded-xl'>
                    <p className='text-center text-2xl'>Ordering Provider Menus</p>

                    <p className="text-xs font-light p-1">Keypad menu data that reflects for External Ordering Providers</p>
                </div>

                <div className='grid grid-cols-2 p-4 font-light text-xs rounded-xl space-y-1'>
                    <div className="flex items-center space">
                        <img 
                            src="http://www.greenspeares.co.uk/wp-content/uploads/2020/12/Deliveroo-logo.png" 
                            alt="Deliveroo Logo" 
                            className="rounded-full w-14 h-14"
                        /> 

                        <p>{orderingProviderMenus['2']? orderingProviderMenus['2']: 'None'}</p> 
                    </div>

                    <div className="flex items-center ml-1.5 space-x-3">
                        <img 
                            src="https://play-lh.googleusercontent.com/AQtSF5Sl18yp3mQ2tcbOrBLekb7cyP3kyg5BB1uUuc55zfcnbkCDLHFTBwZfYiu1aDI" 
                            alt="Uber Logo" 
                            className="rounded-full w-8 h-8"
                        /> 

                        <p>{orderingProviderMenus['4']? orderingProviderMenus['4']: 'None'}</p> 
                    </div>

                    <div className="flex items-center ml-2 space-x-2">
                        <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/ML_Logo_Stacked_RGB.svg/1200px-ML_Logo_Stacked_RGB.svg.png" 
                            alt="Menulog Logo" 
                            className="rounded-full w-10 h-10"
                        /> 

                        <p>{orderingProviderMenus['7']? orderingProviderMenus['7']: 'None'}</p> 
                    </div>

                    <div className="flex items-center space-x-4 ml-2.5 pb-1.5">
                        <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/588px-Google_%22G%22_Logo.svg.png" 
                            alt="Google Food Logo" 
                            className="rounded-full h-6 w-6"
                        /> 

                        <p>{orderingProviderMenus['10']? orderingProviderMenus['10']["106"]: 'None'}</p> 
                    </div>

                    <div className="flex items-center space-x-3.5 ml-3.5">
                        <img 
                            src="https://i.pinimg.com/736x/f5/f2/11/f5f2112ee6f926edfc1e3bc7ef4f5487.jpg" 
                            alt="DoorDash Logo" 
                            className="rounded-full h-7 w-7"
                        /> 

                        <p>{orderingProviderMenus['12']? orderingProviderMenus['12']: 'None'}</p> 
                    </div>

                    <div className="flex items-center space-x-1.5">
                        <img 
                            src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/jfkxxtx3noejfdu5sqxt" 
                            alt="TabSquare Logo" 
                            className="rounded-full w-12 h-12 -ml-0.5"
                        /> 

                        <p>{orderingProviderMenus['14']? orderingProviderMenus['14']: 'None'}</p> 
                    </div>

                    <div className="flex items-center space-x-3.5 ml-3.5 pt-1">
                        <img 
                            src="https://assets.lightspeedhq.com/img/78686acf-image-addon-mryum.png" 
                            alt="Mr Yum Logo" 
                            className="rounded-full w-7 h-7"
                        /> 

                        <p>{orderingProviderMenus['15']? orderingProviderMenus['15']: 'None'}</p> 
                    </div>


                </div>
            </div>
        </>
    );
};

export default ProviderMenusCard;