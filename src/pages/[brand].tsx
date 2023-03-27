import { GetServerSideProps } from "next";
import React from 'react';

const StoreStatus = ({ storeStatusData }: StoreStatus) => {

    console.log(storeStatusData);

    if (!storeStatusData) (
        <div>
            Not found
        </div>
    );

    return (
        <div>
            hey
        </div>
    );
};

export default StoreStatus;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const brand = context?.query.brand as string;

    const response = await fetch(`https://${brand}.redcatcloud.com.au/api/v1/stores`).then(res => res.json());

    const { data: storeStatusData } = response;

    return {
        props: {
            storeStatusData
        },
    };
}; 