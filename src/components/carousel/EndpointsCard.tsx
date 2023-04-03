import React, { useState } from "react";
import { cssDisplay } from "~/utils/cssDisplay";
import { cssOpacity } from "~/utils/cssOpacity";
import { cssTransformProperties } from "~/utils/cssTransformProperties";

interface Props {
    activeIndex: number;
    index: number;
    brand: string;
    storeId: number;
}

const EndpointsCard = ({ activeIndex, index, brand, storeId }: Props) => {
    const [pluCode, setPluCode] = useState("0");
    const [provider, setProvider] = useState("0");
    const [saleType, setSaleType] = useState("0");

    function handlePluCodeInput(event: React.ChangeEvent<HTMLInputElement>) {
        setPluCode(event.target.value);
    }

    function handleProviderInput(event: React.ChangeEvent<HTMLInputElement>) {
        setProvider(event.target.value);
    }

    function handleSaleTypeInput(event: React.ChangeEvent<HTMLInputElement>) {
        setSaleType(event.target.value);
    }

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
                    <p className='text-2xl'>API Endpoints</p>

                    <p className="font-light text-xs p-1">How to access API data that requires authentication via the browser.</p>
                </div>

                <div className="flex mb-[1rem]">
                    <div className='flex flex-col flex-1 space-y-2 p-4 font-light text-xs'>
                        <div className="flex items-center space-x-1">
                            <span className='border border-4549b5 rounded-full h-1.5 w-1.5 bg-4549b5'>{' '}</span>

                            <a 
                                href={`https://${brand}.redcatcloud.com.au/admin`}
                                target="_blank" 
                                className="hover:text-ffffff/80 hover:underline"
                            >
                                Get Auth Token
                            </a>
                        </div>

                        <div>
                            <span className='border mr-1 border-4ca662 rounded-full h-1.5 w-1.5 bg-4ca662'>{' '}</span>

                            <input 
                                type="text"
                                placeholder='PLU Code'
                                className='bg-2f334a px-1 w-16 font-light rounded-md outline-none'
                                onChange={handlePluCodeInput}
                            />
                        </div>

                        <div>
                            <span className='border mr-1 border-cf7b3c rounded-full h-1.5 w-1.5 bg-cf7b3c'>{' '}</span>

                            <input 
                                type="text"
                                placeholder='Provider'
                                className='bg-2f334a px-1 w-16 font-light rounded-md outline-none'
                                onChange={handleProviderInput}
                            />
                        </div>

                        <div>
                            <span className='border mr-1 border-cfca3c rounded-full h-1.5 w-1.5 bg-cfca3c'>{' '}</span>

                            <input 
                                type="text"
                                placeholder='Sale Type'
                                className='bg-2f334a px-1 w-16 font-light rounded-md outline-none'
                                onChange={handleSaleTypeInput}
                            />
                        </div>

                    </div>


                    <div className='grid grid-cols-2 gap-x-4 gap-y-3 p-4 font-light text-xs'>
                        <div className="flex items-center">
                            <span className='border mr-1 border-cf7b3c rounded-full h-1.5 w-1.5 bg-cf7b3c'>{' '}</span>

                            <span className='border mr-1 border-cfca3c rounded-full h-1.5 w-1.5 bg-cfca3c'>{' '}</span>

                            <a 
                                href={`https://${brand}.redcatcloud.com.au/api/v1/stores/${storeId}/menu/?load_details=true&sale_type=${saleType}&ordering_provider=${provider}`}
                                target="_blank" 
                                className="hover:text-ffffff/80 hover:underline"
                            >
                                Full Menu
                            </a>
                        </div>

                        <div className="flex items-center">
                            <span className='border mr-1 border-4ca662 rounded-full h-1.5 w-1.5 bg-4ca662'>{' '}</span>

                            <span className='border mr-1 border-cf7b3c rounded-full h-1.5 w-1.5 bg-cf7b3c'>{' '}</span>

                            <span className='border mr-1 border-cfca3c rounded-full h-1.5 w-1.5 bg-cfca3c'>{' '}</span>

                            <a 
                                href={`https://${brand}.redcatcloud.com.au/api/v1/stores/${storeId}/menu/${pluCode}/?load_details=true&sale_type=${saleType}&ordering_provider=${provider}`}
                                target="_blank" 
                                className="hover:text-ffffff/80 hover:underline"
                            >
                                Single Item
                            </a>
                        </div>

                        <div>
                            <a 
                                href={`https://${brand}.redcatcloud.com.au/api/v1/interfaces/uber_eats/${storeId}/get_store_status_json`}
                                target="_blank" 
                                className="hover:text-ffffff/80 hover:underline"
                            >
                                Uber POS Status
                            </a>
                        </div>

                        <div>
                            <a 
                                href={`https://${brand}.redcatcloud.com.au/api/v1/interfaces/uber_eats/${storeId}/get_store_paused_status`}
                                target="_blank" 
                                className="hover:text-ffffff/80 hover:underline"
                            >
                                Uber Paused Status
                            </a>
                        </div>

                        <div>
                            <a 
                                href={`https://${brand}.redcatcloud.com.au/api/v1/store_uber_cfgs/uber/${storeId}`}
                                target="_blank" 
                                className="hover:text-ffffff/80 hover:underline"
                            >
                                Uber Config
                            </a>
                        </div>

                        <div>
                            <a 
                                href={`https://${brand}.redcatcloud.com.au/api/v1/store_uber_cfgs/doordash/${storeId}`}
                                target="_blank" 
                                className="hover:text-ffffff/80 hover:underline"
                            >
                                DoorDash Config
                            </a>
                        </div>

                        <div>
                            <a 
                                href={`https://${brand}.redcatcloud.com.au/api/v1/store_uber_cfgs/google/${storeId}`}
                                target="_blank" 
                                className="hover:text-ffffff/80 hover:underline"
                            >
                                Google Food Config
                            </a>
                        </div>

                        <div>
                            <a 
                                href={`https://${brand}.redcatcloud.com.au/api/v1/pluavailabilityrules`}
                                target="_blank" 
                                className="hover:text-ffffff/80 hover:underline"
                            >
                                Item Availability Rules
                            </a>
                        </div>

                        <div>
                            <a 
                                href={`https://${brand}.redcatcloud.com.au/api/v1/stores/${storeId}/pluqty`}
                                target="_blank" 
                                className="hover:text-ffffff/80 hover:underline"
                            >
                                PLU Quantity Levels
                            </a>
                        </div>

                        <div>
                            <a 
                                href={`https://${brand}.redcatcloud.com.au/api/v1/users`}
                                target="_blank" 
                                className="hover:text-ffffff/80 hover:underline"
                            >
                                Polygon Central Users
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-1 text-xs italic font-light">
                    <span className='border border-4549b5 rounded-full h-1.5 w-1.5 bg-4549b5'>{' '}</span>

                    <p>Login into Polygon Central to cache your authentication token to the browser.</p>
                </div>

                <div className="flex items-center space-x-1 text-xs italic font-light mt-1">
                    <p> - Click an endpoint to return the API data in a new browser tab.</p>
                </div>

            </div>
        </>
    );
};

export default EndpointsCard;